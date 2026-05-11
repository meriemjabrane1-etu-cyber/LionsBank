<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditRequest extends Model
{
    use HasFactory;

    public const STATUS_AI_VERIFICATION = 'ai_verification_in_progress';
    public const STATUS_MISSING_DOCUMENTS = 'missing_documents';
    public const STATUS_PENDING_REVIEW = 'pending_review';
    public const STATUS_UNDER_FINANCIAL_ANALYSIS = 'under_financial_analysis';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_APPROVED = 'approved';

    protected $fillable = [
        'user_id',
        'tracking_code',
        'status',
        'credit_type',
        'amount',
        'duration_months',
        'purpose',
        'employment_status',
        'monthly_income',
        'full_name',
        'cin_number',
        'phone',
        'email',
        'notes',
        'ai_summary',
        'submitted_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'monthly_income' => 'decimal:2',
        'ai_summary' => 'array',
        'submitted_at' => 'immutable_datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(CreditRequestDocument::class);
    }

    public function statusLabel(): string
    {
        return match ($this->status) {
            self::STATUS_AI_VERIFICATION => 'AI Verification In Progress',
            self::STATUS_MISSING_DOCUMENTS => 'Missing Documents',
            self::STATUS_UNDER_FINANCIAL_ANALYSIS => 'Under Financial Analysis',
            self::STATUS_ACCEPTED => 'Accepted',
            self::STATUS_REJECTED => 'Rejected',
            self::STATUS_APPROVED => 'Approved',
            default => 'Pending Review',
        };
    }
}
