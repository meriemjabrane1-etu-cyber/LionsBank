<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChequeGuaranteeAudit extends Model
{
    use HasFactory;

    protected $fillable = [
        'cheque_guarantee_id',
        'actor_id',
        'event',
        'payload',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    public function guarantee(): BelongsTo
    {
        return $this->belongsTo(ChequeGuarantee::class, 'cheque_guarantee_id');
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}
