<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'image_url',
        'current_bid',
        'auction_id',
    ];

    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }
}
