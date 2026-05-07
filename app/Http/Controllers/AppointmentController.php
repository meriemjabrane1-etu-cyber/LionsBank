<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    protected function ensureEmployeeAccess(): void
    {
        abort_unless(auth()->user()?->role === 'employee', 403);
    }

    public function index()
    {
        $appointments = Appointment::with(['employee', 'user'])
            ->where('user_id', Auth::id())->latest()
            ->get();

        return Inertia::render('Appointments', [
            'appointments' => $appointments
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_type' => 'required|string|max:255',
            'date' => 'required|date|after:now',
        ]);

        Appointment::create([
            'user_id' => auth()->id(),
            'employee_id' => null,
            'service_type' => $request->service_type,
            'date' => $request->date,
            'status' => 'pending',
        ]);

        return back();
    }
    public function approve(Appointment $appointment)
    {
        $this->ensureEmployeeAccess();

        $appointment->update([
            'status' => 'approved',
            'employee_id' => Auth::id(),
        ]);

        return back();
    }

    public function reject(Appointment $appointment)
    {
        $this->ensureEmployeeAccess();

        $appointment->update([
            'status' => 'rejected',
            'employee_id' => Auth::id(),
        ]);

        return back();
    }

    public function assign(Appointment $appointment)
    {
        $this->ensureEmployeeAccess();

        $appointment->update([
            'employee_id' => Auth::id(),
        ]);

        return back();
    }

    public function employeeDashboard()
    {
        $this->ensureEmployeeAccess();

        $appointments = Appointment::with(['user', 'employee'])
            ->latest('date')
            ->get();

        return Inertia::render('employee/appointments', [
            'appointments' => $appointments,
            'stats' => [
                'total' => $appointments->count(),
                'pending' => $appointments->where('status', 'pending')->count(),
                'approved' => $appointments->where('status', 'approved')->count(),
                'rejected' => $appointments->where('status', 'rejected')->count(),
            ],
        ]);
    }
}
