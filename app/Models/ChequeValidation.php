<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChequeValidation extends Model
{
    use HasFactory;

    protected $fillable = [
        'cheque_id',
        'checked_by',
        'result',
    ];

    public function cheque()
    {
        return $this->belongsTo(Cheque::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'checked_by');
    }
}