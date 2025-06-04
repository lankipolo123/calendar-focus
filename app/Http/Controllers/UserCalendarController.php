<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserCalendarController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Show all bookings regardless of status (user can see who booked)
        $allBookings = Reservation::where('location', 'Ben-lor Bldg')
            ->orderBy('start_date')
            ->get()
            ->groupBy('start_date');

        $events = $allBookings->map(function ($group, $date) {
            $users = $group->map(fn($r) => $r->name)->toArray();
            $status = $group->count() >= 5 ? 'full' : 'available'; // Assuming 5 = full capacity

            return [
                'title' => "Bookings",
                'start' => $date,
                'end' => $date,
                'color' => $status === 'full' ? '#ef4444' : '#22c55e', // red or green
                'extendedProps' => [
                    'users' => $users,
                ],
            ];
        })->values();

        return Inertia::render('Customer/Calendar/Index', [
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        // Check if user already has an unexpired booking for same category
        $hasActive = Reservation::where('user_id', $user->id)
            ->where('category', $request->category)
            ->whereDate('end_date', '>=', now()->toDateString())
            ->exists();

        if ($hasActive) {
            return back()->withErrors([
                'date' => "You already have an active booking for this category.",
            ]);
        }

        Reservation::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'contact_number' => $user->contact_number ?? '',
            'start_date' => $request->date,
            'end_date' => $request->date,
            'location' => $request->location,
            'status' => 'active',
            'category' => $request->category,
            'type' => $request->type,
        ]);

        return redirect()->route('customer.calendar.index');
    }
}
