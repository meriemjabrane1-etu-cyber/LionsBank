<?php

namespace App\Services\Cheques;

use App\Models\Account;
use App\Models\ChequeFundReservation;
use App\Models\ChequeGuarantee;
use Illuminate\Support\Carbon;

class ReservationService
{
    public function activeReservedAmount(Account $account): string
    {
        return (string) ChequeFundReservation::query()
            ->where('account_id', $account->id)
            ->active()
            ->where('expires_at', '>', now())
            ->sum('amount');
    }

    public function availableBalance(Account $account): float
    {
        return max(0, (float) $account->balance - (float) $this->activeReservedAmount($account));
    }

    public function create(ChequeGuarantee $guarantee, int $durationHours): ChequeFundReservation
    {
        return ChequeFundReservation::create([
            'cheque_guarantee_id' => $guarantee->id,
            'account_id' => $guarantee->account_id,
            'amount' => $guarantee->verifiable_amount,
            'status' => 'active',
            'reserved_at' => now(),
            'expires_at' => now()->addHours($durationHours),
        ]);
    }

    public function release(ChequeFundReservation $reservation, string $reason = 'manual_release'): ChequeFundReservation
    {
        if ($reservation->status !== 'active') {
            return $reservation;
        }

        $reservation->forceFill([
            'status' => $reason === 'expired' ? 'expired' : 'released',
            'released_at' => now(),
            'release_reason' => $reason,
        ])->save();

        return $reservation;
    }

    public function releaseExpired(?Carbon $now = null): int
    {
        $now ??= now();
        $released = 0;

        ChequeFundReservation::query()
            ->active()
            ->where('expires_at', '<=', $now)
            ->with('guarantee')
            ->chunkById(100, function ($reservations) use (&$released): void {
                foreach ($reservations as $reservation) {
                    $this->release($reservation, 'expired');

                    if ($reservation->guarantee?->status === 'active') {
                        $reservation->guarantee->forceFill(['status' => 'expired'])->save();
                    }

                    $released++;
                }
            });

        return $released;
    }
}
