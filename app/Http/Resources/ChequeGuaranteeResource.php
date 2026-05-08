<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChequeGuaranteeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $reservation = $this->relationLoaded('reservation') ? $this->reservation : null;

        return [
            'id' => $this->id,
            'reference_id' => $this->public_reference,
            'status' => $this->status,
            'verification_enabled' => $this->verification_enabled,
            'cheque_amount' => (float) $this->cheque_amount,
            'verifiable_amount' => (float) $this->verifiable_amount,
            'payable_to' => $this->payable_to,
            'cheque_date' => $this->cheque_date?->toDateString(),
            'code_expires_at' => $this->code_expires_at?->toIso8601String(),
            'last_verified_at' => $this->last_verified_at?->toIso8601String(),
            'reservation' => $reservation ? [
                'status' => $reservation->status,
                'amount' => (float) $reservation->amount,
                'reserved_at' => $reservation->reserved_at?->toIso8601String(),
                'expires_at' => $reservation->expires_at?->toIso8601String(),
                'released_at' => $reservation->released_at?->toIso8601String(),
                'release_reason' => $reservation->release_reason,
            ] : null,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
