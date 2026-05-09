<?php

use App\Http\Controllers\Aiagentcontroller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
// use Inertia\Inertia;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\AtmController;
use App\Http\Controllers\ChequeGuaranteePageController;

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

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/comptes', [AccountController::class, 'index'])->name('accounts.index');
    Route::get('/cartes', function () {
        return Inertia::render('Cards');
    })->name('cards');
});

Route::middleware(['auth'])->group(function () {
    // Client Side
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments');
    Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

    Route::get('/agencies', [AgencyController::class, 'index'])->name('agencies');

    Route::get('/auctions', [AuctionController::class, 'index'])->name('auctions');
    Route::post('/auctions/{auction}/join', [AuctionController::class, 'join'])->name('auctions.join');
    Route::post('/auctions/product/{product}/bid', [AuctionController::class, 'bid'])->name('auctions.bid');

    // Employee Side (Staff Portal)
    Route::get('/employee/appointments', [AppointmentController::class, 'employeeDashboard'])->name('employee.appointments');
    Route::patch('/appointments/{appointment}/approve', [AppointmentController::class, 'approve'])->name('appointments.approve');
    Route::patch('/appointments/{appointment}/reject', [AppointmentController::class, 'reject'])->name('appointments.reject');
    Route::patch('/appointments/{appointment}/assign', [AppointmentController::class, 'assign'])->name('appointments.assign');

    Route::get('/employee/atms', [AtmController::class, 'index'])->name('employee.atms');
    Route::patch('/atms/{atm}/update-status', [AtmController::class, 'updateStatus'])->name('atms.updateStatus');
    Route::patch('/atms/{atm}/refill', [AtmController::class, 'refill'])->name('atms.refill');

    Route::get('/employee/agencies', [AgencyController::class, 'employeeDashboard'])->name('employee.agencies');
    Route::post('/employee/agencies', [AgencyController::class, 'store'])->name('employee.agencies.store');
    Route::patch('/employee/agencies/{agency}', [AgencyController::class, 'update'])->name('employee.agencies.update');
    Route::patch('/employee/agencies/{agency}/toggle-status', [AgencyController::class, 'toggleStatus'])->name('employee.agencies.toggle');

    Route::get('/employee/auctions', [AuctionController::class, 'employeeDashboard'])->name('employee.auctions');
    Route::post('/employee/auctions', [AuctionController::class, 'store'])->name('employee.auctions.store');
    Route::patch('/employee/auctions/{auction}/toggle', [AuctionController::class, 'toggleStatus'])->name('employee.auctions.toggle');
    Route::patch('/employee/auctions/{auction}/winner', [AuctionController::class, 'declareWinner'])->name('employee.auctions.winner');
    Route::delete('/employee/auctions/{auction}', [AuctionController::class, 'deleteAuction'])->name('employee.auctions.delete');
    Route::post('/employee/auctions/{auction}/products', [AuctionController::class, 'addProduct'])->name('employee.auctions.addProduct');
    Route::delete('/employee/products/{product}', [AuctionController::class, 'deleteProduct'])->name('employee.auctions.deleteProduct');
});

Route::get('/ai-agent', function () {
    return Inertia::render('AiAgent');
})->name('ai-agent');

Route::get('/cheque-verification', ChequeGuaranteePageController::class)
    ->middleware('auth')
    ->name('ChequeVerification');




require __DIR__.'/settings.php';

