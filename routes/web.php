<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AgencyController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

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

require __DIR__.'/settings.php';
