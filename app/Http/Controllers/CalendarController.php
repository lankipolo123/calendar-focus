<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('user')->get(); // ✅ include all (expired + active)

        $events = $reservations->map(function ($r) {
            return [
                'title' => "{$r->name} – {$r->location}",
                'start' => $r->start_date,
                'end' => $r->end_date,
                'extendedProps' => [
                    'email' => $r->email,
                    'contact' => $r->contact_number,
                    'delegation' => $r->delegation ?? '1',
                    'status' => $r->status, // ✅ admin can see if it's expired
                ],
            ];
        });

        return Inertia::render('Admin/Calendar/Index', [
            'events' => $events,
        ]);
    }
}
