<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['title'];
    
    Const ROLES =[
        'admin' => 'admin',
        'user' => 'user',
        'super_admin' => 'super_admin',

    ];
    
    public function permissions()
    {
        return $this->belongsToMany(Permision::class);
    }

}
