<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Inertia\Inertia;

class AgencyController extends Controller
{
    public function index()
    {
        $agencies = Agency::with('atms')->get();

        return Inertia::render('Agencies', [
            'agencies' => $agencies
        ]);
    }
}