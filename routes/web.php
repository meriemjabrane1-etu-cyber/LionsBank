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
    Route::get('/employee/appointments', [AppointmentController::class, 'employeeDashboard'])->name('employee.appointments');
    Route::patch('/appointments/{appointment}/approve', [AppointmentController::class, 'approve'])->name('appointments.approve');
    Route::patch('/appointments/{appointment}/reject', [AppointmentController::class, 'reject'])->name('appointments.reject');
    Route::patch('/appointments/{appointment}/assign', [AppointmentController::class, 'assign'])->name('appointments.assign');
});
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/agencies', [AgencyController::class, 'index'])->name('agencies');
    Route::get('/employee/atms', [App\Http\Controllers\AtmController::class, 'index'])->name('employee.atms');
    Route::patch('/atms/{atm}/update-status', [App\Http\Controllers\AtmController::class, 'updateStatus'])->name('atms.updateStatus');
    Route::patch('/atms/{atm}/refill', [App\Http\Controllers\AtmController::class, 'refill'])->name('atms.refill');

    Route::get('/employee/agencies', [AgencyController::class, 'employeeDashboard'])->name('employee.agencies');
    Route::post('/employee/agencies', [AgencyController::class, 'store'])->name('employee.agencies.store');
    Route::patch('/employee/agencies/{agency}', [AgencyController::class, 'update'])->name('employee.agencies.update');
    Route::patch('/employee/agencies/{agency}/toggle-status', [AgencyController::class, 'toggleStatus'])->name('employee.agencies.toggle');

    Route::get('/employee/auctions', [AuctionController::class, 'employeeDashboard'])->name('employee.auctions');
    Route::post('/employee/auctions', [AuctionController::class, 'store'])->name('employee.auctions.store');
    Route::patch('/employee/auctions/{auction}/toggle', [AuctionController::class, 'toggleStatus'])->name('employee.auctions.toggle');
    Route::patch('/employee/auctions/{auction}/winner', [AuctionController::class, 'declareWinner'])->name('employee.auctions.winner');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/auctions', [AuctionController::class, 'index'])->name('auctions');
    Route::post('/auctions/{auction}/join', [AuctionController::class, 'join'])->name('auctions.join');
    Route::post('/auctions/product/{product}/bid', [AuctionController::class, 'bid'])->name('auctions.bid');
});

require __DIR__.'/settings.php';
