<?php

namespace App\Policies;

use App\Models\ChequeGuarantee;
use App\Models\User;

class ChequeGuaranteePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, ChequeGuarantee $guarantee): bool
    {
        return $guarantee->issuer_id === $user->id;
    }

    public function disable(User $user, ChequeGuarantee $guarantee): bool
    {
        return $guarantee->issuer_id === $user->id && $guarantee->status === 'active';
    }
}
