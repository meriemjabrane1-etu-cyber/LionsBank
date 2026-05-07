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

        return Inertia::render('comptes', [
            'accounts' => $accounts
        ]);
    }
}
