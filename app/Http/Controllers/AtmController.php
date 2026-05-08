<?php

namespace App\Http\Controllers;

use App\Models\Atm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AtmController extends Controller
{
    protected function ensureEmployeeAccess(): void
    {
        abort_unless(auth()->user()?->role === 'employee', 403);
    }

    public function index()
    {
        $this->ensureEmployeeAccess();

        $atms = Atm::with('agency')->latest()->get();

        return Inertia::render('employee/atms', [
            'atms' => $atms,
            'stats' => [
                'total' => $atms->count(),
                'active' => $atms->where('status', 'active')->count(),
                'empty' => $atms->where('status', 'empty')->count(),
                'maintenance' => $atms->where('status', 'maintenance')->count(),
                'out_of_service' => $atms->where('status', 'out_of_service')->count(),
            ]
        ]);
    }

    public function updateStatus(Request $request, Atm $atm)
    {
        $this->ensureEmployeeAccess();

        $request->validate([
            'status' => 'required|string|in:active,empty,maintenance,out_of_service'
        ]);

        $atm->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'ATM status updated successfully.');
    }

    public function refill(Atm $atm)
    {
        $this->ensureEmployeeAccess();

        $atm->update([
            'cash_available' => 100, // Refill to 100%
            'status' => 'active'
        ]);

        return back()->with('success', 'ATM refilled successfully.');
    }
}
