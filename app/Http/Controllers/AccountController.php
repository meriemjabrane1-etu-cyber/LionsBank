<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        $accounts = $user->accounts()->latest()->get();

        return Inertia::render('Accounts', ['accounts' => $accounts,]);
    }
}
