<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreditRequests\StoreCreditRequestRequest;
use App\Http\Requests\CreditRequests\VerifyCreditDocumentRequest;
use App\Models\CreditRequest;
use App\Models\CreditRequestDocument;
use App\Services\Credits\AiDocumentVerificationService;
use App\Services\Credits\CreditTrackingCodeGenerator;
use App\Services\Credits\MoroccanCreditDocumentCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CreditRequestController extends Controller
{
    public function __construct(
        private readonly MoroccanCreditDocumentCatalog $catalog,
        private readonly AiDocumentVerificationService $documentVerification,
        private readonly CreditTrackingCodeGenerator $trackingCodes,
    ) {
    }

    public function index(Request $request): Response
    {
        return Inertia::render('credit-request/index', [
            'documentCatalog' => $this->catalog->all(),
            'recentRequests' => CreditRequest::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (CreditRequest $creditRequest): array => $this->serializeSummary($creditRequest))
                ->values(),
        ]);
    }

    public function verifyDocument(VerifyCreditDocumentRequest $request): JsonResponse
    {
        $result = $this->documentVerification->analyze(
            $request->file('file'),
            (string) $request->input('document_type'),
            (string) $request->input('employment_status'),
            [
                'full_name' => $request->input('full_name'),
                'cin_number' => $request->input('cin_number'),
            ],
        );

        return response()->json($result->toArray());
    }

    public function store(StoreCreditRequestRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $employmentStatus = (string) $validated['employment_status'];
        $requiredKeys = $this->catalog->requiredKeys($employmentStatus);
        $files = $request->file('documents', []);
        $analyses = [];
        $blockingIssues = [];

        foreach ($files as $documentType => $file) {
            if (! $file) {
                continue;
            }

            $result = $this->documentVerification->analyze($file, $documentType, $employmentStatus, [
                'full_name' => $validated['full_name'],
                'cin_number' => $validated['cin_number'],
                'email' => $validated['email'],
            ]);

            $analyses[$documentType] = $result;

            if (! $result->isValid()) {
                $blockingIssues[$documentType] = $result->issues;
            }
        }

        foreach ($requiredKeys as $requiredKey) {
            if (! isset($analyses[$requiredKey])) {
                $blockingIssues[$requiredKey] = ['Required document is missing.'];
            }
        }

        if ($blockingIssues !== []) {
            return response()->json([
                'message' => 'Some documents did not pass LionsBank AI verification.',
                'errors' => $blockingIssues,
            ], 422);
        }

        $creditRequest = DB::transaction(function () use ($validated, $files, $analyses, $request): CreditRequest {
            $creditRequest = CreditRequest::create([
                'user_id' => $request->user()->id,
                'tracking_code' => $this->trackingCodes->generate(),
                'status' => CreditRequest::STATUS_PENDING_REVIEW,
                'credit_type' => $validated['credit_type'],
                'amount' => $validated['amount'],
                'duration_months' => $validated['duration_months'],
                'purpose' => $validated['purpose'],
                'employment_status' => $validated['employment_status'],
                'monthly_income' => $validated['monthly_income'] ?? null,
                'full_name' => $validated['full_name'],
                'cin_number' => $validated['cin_number'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'notes' => $validated['notes'] ?? null,
                'submitted_at' => now(),
                'ai_summary' => [
                    'valid_documents' => count($analyses),
                    'engine' => config('services.document_ai.enabled') ? 'provider' : 'local-policy-fallback',
                    'completed_at' => now()->toIso8601String(),
                ],
            ]);

            foreach ($files as $documentType => $file) {
                if (! $file) {
                    continue;
                }

                $definition = $this->catalog->all()[$documentType] ?? ['label' => Str::headline($documentType)];
                $result = $analyses[$documentType];
                $extension = $file->extension() ?: $file->getClientOriginalExtension();
                $path = $file->storeAs(
                    "credit-requests/{$creditRequest->id}",
                    Str::uuid().'.'.$extension,
                    'local',
                );

                CreditRequestDocument::create([
                    'credit_request_id' => $creditRequest->id,
                    'document_type' => $documentType,
                    'label' => $definition['label'],
                    'disk' => 'local',
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => (string) $file->getMimeType(),
                    'size' => (int) $file->getSize(),
                    'verification_status' => $result->status,
                    'confidence' => $result->confidence,
                    'ai_feedback' => $result->toArray(),
                    'verified_at' => now(),
                ]);
            }

            return $creditRequest->load('documents');
        });

        return response()->json([
            'message' => 'Credit request submitted successfully.',
            'trackingCode' => $creditRequest->tracking_code,
            'request' => $this->serializeSummary($creditRequest),
        ], 201);
    }

    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tracking_code' => ['required', 'string', 'max:40'],
        ]);

        $creditRequest = CreditRequest::with('documents')
            ->where('tracking_code', Str::upper(trim($validated['tracking_code'])))
            ->first();

        if (! $creditRequest) {
            return response()->json([
                'message' => 'No LionsBank credit request was found for this tracking code.',
            ], 404);
        }

        return response()->json([
            'request' => $this->serializeSummary($creditRequest),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeSummary(CreditRequest $creditRequest): array
    {
        $creditRequest->loadMissing('documents');

        return [
            'id' => $creditRequest->id,
            'trackingCode' => $creditRequest->tracking_code,
            'status' => $creditRequest->status,
            'statusLabel' => $creditRequest->statusLabel(),
            'creditType' => $creditRequest->credit_type,
            'amount' => $creditRequest->amount,
            'durationMonths' => $creditRequest->duration_months,
            'purpose' => $creditRequest->purpose,
            'submittedAt' => optional($creditRequest->submitted_at)->toIso8601String(),
            'documents' => $creditRequest->documents->map(fn (CreditRequestDocument $document): array => [
                'type' => $document->document_type,
                'label' => $document->label,
                'status' => $document->verification_status,
                'confidence' => $document->confidence,
                'feedback' => $document->ai_feedback,
            ])->values(),
        ];
    }
}
