<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['employee'])
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
        $appointment->update([
            'status' => 'approved'
        ]);

        return back();
    }

    public function reject(Appointment $appointment)
    {
        $appointment->update([
            'status' => 'rejected'
        ]);

        return back();
    }
}
