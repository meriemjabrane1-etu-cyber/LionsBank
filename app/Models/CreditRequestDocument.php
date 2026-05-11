<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditRequestDocument extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_VALID = 'valid';
    public const STATUS_INVALID = 'invalid';
    public const STATUS_NEEDS_REVIEW = 'needs_review';

    protected $fillable = [
        'credit_request_id',
        'document_type',
        'label',
        'disk',
        'path',
        'original_name',
        'mime_type',
        'size',
        'verification_status',
        'confidence',
        'ai_feedback',
        'verified_at',
    ];

    protected $casts = [
        'ai_feedback' => 'array',
        'verified_at' => 'immutable_datetime',
    ];

    public function creditRequest(): BelongsTo
    {
        return $this->belongsTo(CreditRequest::class);
    }
}
