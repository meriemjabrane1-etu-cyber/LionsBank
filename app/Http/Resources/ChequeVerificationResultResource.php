<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChequeVerificationResultResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'state' => $this['state'],
            'message' => $this['message'],
            'guarantee' => $this['guarantee'] ?? null,
        ];
    }
}
