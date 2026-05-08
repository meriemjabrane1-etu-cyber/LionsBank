<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChequeVerificationAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'cheque_guarantee_id',
        'code_fingerprint',
        'result',
        'ip_address',
        'user_agent',
        'suspicious',
        'metadata',
    ];

    protected $casts = [
        'suspicious' => 'boolean',
        'metadata' => 'array',
    ];

    public function guarantee(): BelongsTo
    {
        return $this->belongsTo(ChequeGuarantee::class, 'cheque_guarantee_id');
    }
}
