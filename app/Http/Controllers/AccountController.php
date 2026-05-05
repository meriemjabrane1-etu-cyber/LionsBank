<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $accounts = $user->accounts()
            ->with('transactions')
            ->get()
            ->map(function ($account) {
                return [
                    'id' => $account->id,
                    'account_number' => $account->account_number,
                    'balance' => $account->balance,
                    'type' => $account->type,
                    'transactions_count' => $account->transactions->count(),
                ];
            });

        return Inertia::render('comptes', ['accounts' => $accounts,]);
    }
}
