<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\ChequeValidation;


class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'card_number',
        'type',
        'status',
        'limit_amount',
    ];

    protected $casts = [
        'limit_amount' => 'decimal:2',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}