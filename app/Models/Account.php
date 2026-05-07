<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model

{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'account_number',
        'balance',
        'type'
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function cheques()

    {
        return $this->hasMany(Cheque::class);
    }

    public function outgoingTransfers()
    {
        return $this->hasMany(Transfer::class, 'from_account_id');
    }

    public function incomingTransfers()
    {
        return $this->hasMany(Transfer::class, 'to_account_id');
    }
   
}
