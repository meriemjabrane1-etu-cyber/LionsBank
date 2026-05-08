<?php

namespace App\Services\Cheques;

use App\Models\ChequeGuarantee;
use App\Models\ChequeGuaranteeAudit;
use App\Models\User;
use Illuminate\Http\Request;

class ChequeGuaranteeAuditService
{
    public function record(string $event, ?ChequeGuarantee $guarantee = null, ?User $actor = null, array $payload = [], ?Request $request = null): ChequeGuaranteeAudit
    {
        return ChequeGuaranteeAudit::create([
            'cheque_guarantee_id' => $guarantee?->id,
            'actor_id' => $actor?->id,
            'event' => $event,
            'payload' => $payload,
            'ip_address' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
        ]);
    }
}
