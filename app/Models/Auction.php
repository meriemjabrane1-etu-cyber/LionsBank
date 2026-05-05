<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'product_type',
        'description',
        'start_date',
        'end_date',
        'starting_price',
        'current_price',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'starting_price' => 'decimal:2',
        'current_price' => 'decimal:2',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('invited')
            ->withTimestamps();
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}