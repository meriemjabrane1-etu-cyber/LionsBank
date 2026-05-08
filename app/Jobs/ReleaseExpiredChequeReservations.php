<?php

namespace App\Jobs;

use App\Services\Cheques\ReservationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ReleaseExpiredChequeReservations implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public function handle(ReservationService $reservations): void
    {
        $reservations->releaseExpired();
    }
}
