<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;

class CalendarController extends Controller
{
    /**
     * Display all reservations to admin.
     */
   public function index()
{
    $reservations = Reservation::with('user')->get();

    $events = $reservations
        ->groupBy('start_date')
        ->map(function ($bookings, $date) {
            return [
                'title' => '', // fallback only
                'start' => $date,
                'extendedProps' => [
                    'users' => $bookings->pluck('user.name')->toArray(), // e.g., ['Grace', 'Mike', 'Leo']
                ],
            ];
        })
        ->values(); // reset array keys

    return Inertia::render('Admin/Calendar/Index', [
        'events' => $events,
    ]);
}


    // Other scaffolded methods (create, store, etc.) are left untouched for now
}
