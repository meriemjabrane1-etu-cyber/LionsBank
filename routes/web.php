<?php

use App\Http\Controllers\Aiagentcontroller;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/ai-agent', function () {
    return Inertia::render('AiAgent');
})->name('ai-agent');




require __DIR__.'/settings.php';
