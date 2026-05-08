<?php

use App\Http\Controllers\Aiagentcontroller;
use App\Http\Controllers\Api\ChequeGuaranteeController;
use App\Http\Controllers\Api\PublicChequeVerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('ai-agent/chat',[Aiagentcontroller::class,'handle']);

Route::post('/cheque-guarantees/verify', PublicChequeVerificationController::class)
    ->middleware('throttle:cheque-verification')
    ->name('api.cheque-guarantees.verify');

Route::middleware(['auth:sanctum', 'throttle:cheque-guarantee-management'])
    ->prefix('cheque-guarantees')
    ->name('api.cheque-guarantees.')
    ->group(function (): void {
        Route::get('/', [ChequeGuaranteeController::class, 'index'])->name('index');
        Route::post('/', [ChequeGuaranteeController::class, 'store'])->name('store');
        Route::get('/balance', [ChequeGuaranteeController::class, 'balance'])->name('balance');
        Route::get('/{chequeGuarantee}', [ChequeGuaranteeController::class, 'show'])->name('show');
        Route::patch('/{chequeGuarantee}/disable', [ChequeGuaranteeController::class, 'disable'])->name('disable');
    });
