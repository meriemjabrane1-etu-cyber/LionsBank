<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AccountController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Route::get('/comptes', [AccountController::class, 'index'])->name('accounts.index');
    Route::get('/comptes', [AccountController::class, 'index'])
    ->name('comptes');
});

require __DIR__ . '/settings.php';
