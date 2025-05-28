<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'contact_number',
        'start_date',
        'end_date',
        'location',
        'status',
        'category',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
