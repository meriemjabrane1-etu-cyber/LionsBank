<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\ChequeValidation;


class Cheque extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'cheque_number',
        'amount',
        'status',
        'issued_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'issued_at' => 'date',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function validations()
    {
        return $this->hasMany(ChequeValidation::class);
    }

    public function guarantees()
    {
        return $this->hasMany(ChequeGuarantee::class);
    }
}
