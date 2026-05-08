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
            'accountId' => $account?->id,
            'availableBalance' => $account ? $this->reservations->availableBalance($account) : 0,
            'historyEvents' => $historyEvents,
        ]);
    }
}
