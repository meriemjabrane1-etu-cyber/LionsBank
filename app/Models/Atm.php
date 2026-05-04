<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atm extends Model
{
    use HasFactory;

    protected $fillable = [
        'agency_id',
        'name',
        'status',
        'cash_available'
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }
}