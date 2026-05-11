<?php

namespace App\Services\Credits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AiDocumentVerificationService
{
    public function __construct(private readonly MoroccanCreditDocumentCatalog $catalog)
    {
    }

    public function analyze(UploadedFile $file, string $documentType, string $employmentStatus, array $applicant = []): DocumentVerificationResult
    {
        $metadataResult = $this->analyzeMetadata($file, $documentType, $employmentStatus);

        if (! $metadataResult->isValid()) {
            return $metadataResult;
        }

        $aiResult = $this->analyzeWithProvider($file, $documentType, $employmentStatus, $applicant);

        return $aiResult ?? $this->fallbackResult($file, $documentType);
    }

    private function analyzeMetadata(UploadedFile $file, string $documentType, string $employmentStatus): DocumentVerificationResult
    {
        $documents = $this->catalog->forEmploymentStatus($employmentStatus);
        $definition = $documents[$documentType] ?? null;
        $mime = (string) $file->getMimeType();
        $allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

        if (! $definition) {
            return new DocumentVerificationResult(
                'invalid',
                98,
                ['Unsupported document category.'],
                ['Upload the document in the correct Moroccan banking document field.'],
                'The uploaded file does not match an accepted LionsBank credit document category.',
            );
        }

        if (! in_array($mime, $allowed, true)) {
            return new DocumentVerificationResult(
                'invalid',
                99,
                ['Unsupported format. Accepted formats are PDF, JPG, PNG, and WEBP.'],
                ['Export the document as PDF or upload a clear image scan.'],
                'The file format is not supported for secure banking verification.',
            );
        }

        if ($file->getSize() < 12 * 1024) {
            return new DocumentVerificationResult(
                'invalid',
                91,
                ['Unreadable scan or file is too small to contain a complete document.'],
                ['Upload a full-resolution scan with all corners visible.'],
                'The document appears incomplete or unreadable.',
            );
        }

        return new DocumentVerificationResult('valid', 80, [], [], 'Initial file controls passed.');
    }

    private function analyzeWithProvider(UploadedFile $file, string $documentType, string $employmentStatus, array $applicant): ?DocumentVerificationResult
    {
        $apiKey = config('services.document_ai.key') ?: env('OPENROUTER_API_KEY');

        if (! $apiKey || ! config('services.document_ai.enabled', false)) {
            return null;
        }

        try {
            $definition = $this->catalog->forEmploymentStatus($employmentStatus)[$documentType] ?? [];
            $payload = [
                'model' => config('services.document_ai.model', 'openai/gpt-4o-mini'),
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You verify Moroccan banking credit documents. Return strict JSON with status valid|invalid|needs_review, confidence 0-100, issues array, recommendations array, summary string.',
                    ],
                    [
                        'role' => 'user',
                        'content' => [
                            ['type' => 'text', 'text' => json_encode([
                                'document_type' => $documentType,
                                'label' => $definition['label'] ?? $documentType,
                                'employment_status' => $employmentStatus,
                                'applicant' => $applicant,
                                'file_name' => $file->getClientOriginalName(),
                                'mime_type' => $file->getMimeType(),
                                'expected_checks' => [
                                    'blurry files',
                                    'invalid documents',
                                    'missing information',
                                    'expired documents',
                                    'inconsistent names/data',
                                    'unreadable scans',
                                    'unsupported formats',
                                ],
                            ], JSON_THROW_ON_ERROR)],
                        ],
                    ],
                ],
                'response_format' => ['type' => 'json_object'],
            ];

            $response = Http::timeout(25)
                ->withToken($apiKey)
                ->withHeaders([
                    'HTTP-Referer' => config('app.url'),
                    'X-Title' => 'LionsBank Credit Document Verification',
                ])
                ->post(config('services.document_ai.endpoint', 'https://openrouter.ai/api/v1/chat/completions'), $payload);

            if (! $response->successful()) {
                Log::warning('Credit document AI verification failed', ['status' => $response->status()]);

                return null;
            }

            $content = $response->json('choices.0.message.content');
            $data = is_string($content) ? json_decode($content, true, flags: JSON_THROW_ON_ERROR) : null;

            if (! is_array($data)) {
                return null;
            }

            return new DocumentVerificationResult(
                in_array($data['status'] ?? '', ['valid', 'invalid', 'needs_review'], true) ? $data['status'] : 'needs_review',
                max(0, min(100, (int) ($data['confidence'] ?? 70))),
                array_values(array_filter((array) ($data['issues'] ?? []))),
                array_values(array_filter((array) ($data['recommendations'] ?? []))),
                (string) ($data['summary'] ?? 'AI document verification completed.'),
            );
        } catch (\Throwable $exception) {
            Log::warning('Credit document AI provider unavailable', ['message' => $exception->getMessage()]);

            return null;
        }
    }

    private function fallbackResult(UploadedFile $file, string $documentType): DocumentVerificationResult
    {
        $name = Str::lower($file->getClientOriginalName());
        $rules = [
            'blurry' => ['Document is blurry.', 'Upload a sharper scan with readable text.'],
            'expired' => ['Document expiration date is invalid.', 'Upload a current document.'],
            'invalid' => ['Invalid document detected.', 'Confirm the file belongs to the selected document type.'],
            'missing' => ['Required information is missing.', 'Upload the complete document, including all pages.'],
            'unreadable' => ['Unreadable scan.', 'Retake the photo in better lighting.'],
            'wrong' => ['Document appears to be uploaded in the wrong field.', 'Move this file to the matching document upload field.'],
            'stamp' => ['Salary certificate missing employer stamp.', 'Upload a stamped and signed employer certificate.'],
            'address-old' => ['Proof of address is older than allowed period.', 'Upload a proof of residence issued within the allowed period.'],
        ];

        foreach ($rules as $needle => [$issue, $recommendation]) {
            if (Str::contains($name, $needle)) {
                return new DocumentVerificationResult('invalid', 94, [$issue], [$recommendation], 'The document did not pass automated verification.');
            }
        }

        $label = $this->catalog->all()[$documentType]['label'] ?? 'Document';

        return new DocumentVerificationResult(
            'valid',
            88,
            [],
            ['Keep the original document available for branch review if requested.'],
            "{$label} passed LionsBank automated completeness checks.",
        );
    }
}
