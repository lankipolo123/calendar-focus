<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class UserCalendarController extends Controller
{
  public function index()
{
    $user = auth()->user();

    $reservations = Reservation::where('user_id', $user->id)->get();

    $events = $reservations->map(function ($r) {
        return [
            'title' => "My Booking – {$r->location}",
            'start' => $r->start_date,
            'end' => $r->end_date,
        ];
    });

    return \Inertia\Inertia::render('Customer/Calendar/Index', [
        'events' => $events,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today', 
            'location' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        $already = Reservation::where('user_id', $user->id)
            ->whereDate('start_date', $request->date)
            ->first();

        if ($already) {
            return back()->withErrors(['date' => 'You already have a booking on this date.']);
        }

       $user->reservations()->create([
            'name' => $user->name,
            'email' => $user->email,
            'contact_number' => $user->contact_number ?? '',
            'start_date' => $request->date,
            'end_date' => $request->date,
            'location' => $request->location,
            'status' => 'confirmed',
            'category' => 'Seat',
        ]);

        return redirect()->route('customer.calendar.index');
    }

    // You can keep other methods (create, show, edit, etc.) if needed
}
