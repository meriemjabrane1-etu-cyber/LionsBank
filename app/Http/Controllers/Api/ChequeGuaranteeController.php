<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChequeGuarantees\DisableChequeGuaranteeRequest;
use App\Http\Requests\ChequeGuarantees\StoreChequeGuaranteeRequest;
use App\Http\Resources\ChequeGuaranteeResource;
use App\Models\ChequeGuarantee;
use App\Services\Cheques\ApiResponse;
use App\Services\Cheques\ChequeGuaranteeService;
use App\Services\Cheques\ReservationService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use InvalidArgumentException;

class ChequeGuaranteeController extends Controller
{
    public function __construct(
        private readonly ChequeGuaranteeService $guarantees,
        private readonly ReservationService $reservations,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $items = ChequeGuarantee::query()
            ->with('reservation')
            ->where('issuer_id', $request->user()->id)
            ->latest()
            ->paginate(15);

        return ApiResponse::success(ChequeGuaranteeResource::collection($items), 'Guarantees loaded.');
    }

    public function store(StoreChequeGuaranteeRequest $request): JsonResponse
    {
        try {
            $result = $this->guarantees->create($request->user(), $request->validated(), $request);
        } catch (AuthorizationException $exception) {
            return ApiResponse::error($exception->getMessage(), 403);
        } catch (InvalidArgumentException $exception) {
            return ApiResponse::error($exception->getMessage(), 422);
        }

        return ApiResponse::success([
            'guarantee' => new ChequeGuaranteeResource($result['guarantee']),
            'verification_code' => $result['verification_code'],
            'available_balance' => $result['available_balance'],
        ], 'Secure verification code generated.', 201);
    }

    public function show(Request $request, ChequeGuarantee $chequeGuarantee): JsonResponse
    {
        Gate::authorize('view', $chequeGuarantee);

        return ApiResponse::success(
            new ChequeGuaranteeResource($chequeGuarantee->load('reservation')),
            'Guarantee loaded.',
        );
    }

    public function disable(DisableChequeGuaranteeRequest $request, ChequeGuarantee $chequeGuarantee): JsonResponse
    {
        $guarantee = $this->guarantees->disable(
            $chequeGuarantee,
            $request->user(),
            $request->validated('reason'),
            $request,
        );

        return ApiResponse::success(new ChequeGuaranteeResource($guarantee), 'Guarantee disabled.');
    }

    public function balance(Request $request): JsonResponse
    {
        $request->validate([
            'account_id' => ['required', 'integer', 'exists:accounts,id'],
        ]);

        $account = $request->user()
            ->accounts()
            ->whereKey($request->integer('account_id'))
            ->firstOrFail();

        return ApiResponse::success([
            'balance' => (float) $account->balance,
            'reserved' => (float) $this->reservations->activeReservedAmount($account),
            'available' => $this->reservations->availableBalance($account),
        ], 'Balance summary loaded.');
    }
}
