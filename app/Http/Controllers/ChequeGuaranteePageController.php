<?php

namespace App\Http\Controllers;

use App\Services\Cheques\ReservationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChequeGuaranteePageController extends Controller
{
    public function __construct(private readonly ReservationService $reservations)
    {
    }

    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $account = $user?->accounts()->first();
        $activeGuarantee = $user
            ? $user->chequeGuarantees()
                ->with('reservation')
                ->latest()
                ->first()
            : null;

        $historyEvents = $user
            ? $user->chequeGuarantees()
                ->with('attempts')
                ->latest()
                ->limit(10)
                ->get()
                ->flatMap(fn ($guarantee) => $guarantee->attempts->map(fn ($attempt) => [
                'referenceId' => $guarantee->public_reference,
                'result' => $attempt->result,
                'createdAt' => $attempt->created_at?->toIso8601String(),
                ]))
                ->values()
            : collect();

        return Inertia::render('ChequeVerification', [
            'auth' => $user ? ['user' => $user] : null,
            'accountId' => $account?->id,
            'availableBalance' => $account ? $this->reservations->availableBalance($account) : 0,
            'balanceSummary' => $account ? [
                'balance' => (float) $account->balance,
                'reserved' => (float) $this->reservations->activeReservedAmount($account),
                'available' => $this->reservations->availableBalance($account),
            ] : null,
            'chequeData' => $activeGuarantee ? [
                'id' => $activeGuarantee->id,
                'referenceId' => $activeGuarantee->public_reference,
                'status' => $activeGuarantee->status,
                'verificationEnabled' => $activeGuarantee->verification_enabled,
                'chequeAmount' => (float) $activeGuarantee->cheque_amount,
                'verifiableAmount' => (float) $activeGuarantee->verifiable_amount,
                'payableTo' => $activeGuarantee->payable_to,
                'chequeDate' => $activeGuarantee->cheque_date?->toDateString(),
                'codeExpiresAt' => $activeGuarantee->code_expires_at?->toIso8601String(),
                'lastVerifiedAt' => $activeGuarantee->last_verified_at?->toIso8601String(),
                'createdAt' => $activeGuarantee->created_at?->toIso8601String(),
                'reservation' => $activeGuarantee->reservation ? [
                    'status' => $activeGuarantee->reservation->status,
                    'amount' => (float) $activeGuarantee->reservation->amount,
                    'reservedAt' => $activeGuarantee->reservation->reserved_at?->toIso8601String(),
                    'expiresAt' => $activeGuarantee->reservation->expires_at?->toIso8601String(),
                    'releasedAt' => $activeGuarantee->reservation->released_at?->toIso8601String(),
                    'releaseReason' => $activeGuarantee->reservation->release_reason,
                ] : null,
            ] : null,
            'historyEvents' => $historyEvents,
        ]);
    }
}
