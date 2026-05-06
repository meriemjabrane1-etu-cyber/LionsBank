<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\AuctionController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Custom Authentication Routes
Route::get('/login', function () {
    return Inertia::render('auth/login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('login')->middleware('guest');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register')->middleware('guest');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments');
});
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
Route::patch('/appointments/{appointment}/approve', [AppointmentController::class, 'approve']);
Route::patch('/appointments/{appointment}/reject', [AppointmentController::class, 'reject']);

Route::middleware(['auth'])->group(function () {
    Route::get('/agencies', [AgencyController::class, 'index'])->name('agencies');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/auctions', [AuctionController::class, 'index'])->name('auctions');
    Route::post('/auctions/{auction}/join', [AuctionController::class, 'join'])->name('auctions.join');
    Route::post('/auctions/product/{product}/bid', [AuctionController::class, 'bid'])->name('auctions.bid');
});

require __DIR__.'/settings.php';
