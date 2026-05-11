<?php

namespace App\Policies;

use App\Models\CreditRequest;
use App\Models\User;

class CreditRequestPolicy
{
    public function view(User $user, CreditRequest $creditRequest): bool
    {
        return $creditRequest->user_id === $user->id || $user->role === 'employee';
    }
}
