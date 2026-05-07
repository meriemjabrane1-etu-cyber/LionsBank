<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $accounts = $user->accounts()->latest()->get();

<<<<<<< HEAD
        return Inertia::render('comptes', [
            'accounts' => $accounts
        ]);
=======
        return Inertia::render('Accounts', ['accounts' => $accounts,]);
>>>>>>> 7fb8ee9e4073616a51929b86d02fa1aa077d574b
    }
}
