<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    protected function ensureEmployeeAccess(): void
    {
        abort_unless(auth()->user()?->role === 'employee', 403);
    }

    public function index()
    {
        $agencies = Agency::with('atms')->get();

        return Inertia::render('Agencies', [
            'agencies' => $agencies
        ]);
    }

    public function employeeDashboard()
    {
        $this->ensureEmployeeAccess();

        $agencies = Agency::withCount('atms')->latest()->get();

        return Inertia::render('employee/agencies', [
            'agencies' => $agencies,
            'stats' => [
                'total' => $agencies->count(),
                'open' => $agencies->where('status', 'open')->count(),
                'closed' => $agencies->where('status', 'closed')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureEmployeeAccess();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'working_hours' => 'nullable|string',
        ]);

        Agency::create(array_merge($validated, ['status' => 'open']));

        return back()->with('success', 'Agency created successfully.');
    }

    public function update(Request $request, Agency $agency)
    {
        $this->ensureEmployeeAccess();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'working_hours' => 'nullable|string',
        ]);

        $agency->update($validated);

        return back()->with('success', 'Agency updated successfully.');
    }

    public function toggleStatus(Agency $agency)
    {
        $this->ensureEmployeeAccess();

        $agency->update([
            'status' => $agency->status === 'open' ? 'closed' : 'open'
        ]);

        return back()->with('success', 'Agency status updated.');
    }
}