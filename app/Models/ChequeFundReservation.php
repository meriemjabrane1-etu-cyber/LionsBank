<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChequeFundReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'cheque_guarantee_id',
        'account_id',
        'amount',
        'status',
        'reserved_at',
        'expires_at',
        'released_at',
        'release_reason',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'reserved_at' => 'immutable_datetime',
        'expires_at' => 'immutable_datetime',
        'released_at' => 'immutable_datetime',
    ];

    public function guarantee(): BelongsTo
    {
        return $this->belongsTo(ChequeGuarantee::class, 'cheque_guarantee_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }
}
