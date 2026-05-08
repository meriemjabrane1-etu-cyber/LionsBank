<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChequeGuarantees\VerifyChequeGuaranteeRequest;
use App\Http\Resources\ChequeVerificationResultResource;
use App\Services\Cheques\ApiResponse;
use App\Services\Cheques\VerificationService;
use Illuminate\Http\JsonResponse;

class PublicChequeVerificationController extends Controller
{
    public function __construct(private readonly VerificationService $verification)
    {
    }

    public function __invoke(VerifyChequeGuaranteeRequest $request): JsonResponse
    {
        $result = $this->verification->verify($request->validated('code'), $request);

        return ApiResponse::success(
            new ChequeVerificationResultResource($result),
            $result['message'],
        );
    }
}
