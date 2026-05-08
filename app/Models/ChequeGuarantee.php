<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ChequeGuarantee extends Model
{
    use HasFactory;

    protected $fillable = [
        'cheque_id',
        'account_id',
        'issuer_id',
        'public_reference',
        'verification_code_hash',
        'cheque_amount',
        'verifiable_amount',
        'payable_to',
        'cheque_date',
        'verification_enabled',
        'status',
        'code_expires_at',
        'last_verified_at',
    ];

    protected $casts = [
        'cheque_amount' => 'decimal:2',
        'verifiable_amount' => 'decimal:2',
        'verification_enabled' => 'boolean',
        'cheque_date' => 'date',
        'code_expires_at' => 'immutable_datetime',
        'last_verified_at' => 'immutable_datetime',
    ];

    public function cheque(): BelongsTo
    {
        return $this->belongsTo(Cheque::class);
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function issuer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    public function reservation(): HasOne
    {
        return $this->hasOne(ChequeFundReservation::class);
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(ChequeVerificationAttempt::class);
    }

    public function audits(): HasMany
    {
        return $this->hasMany(ChequeGuaranteeAudit::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active')->where('verification_enabled', true);
    }

    public function isExpired(): bool
    {
        return $this->code_expires_at !== null && $this->code_expires_at->isPast();
    }
}
