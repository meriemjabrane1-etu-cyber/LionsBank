<?php

use App\Http\Controllers\Aiagentcontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('ai-agent/chat',[Aiagentcontroller::class,'handle']);


