<?php

namespace App\Services\Cheques;

use App\Models\ChequeGuarantee;
use App\Models\ChequeVerificationAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerificationService
{
    public function __construct(
        private readonly SecureVerificationCodeGenerator $codes,
        private readonly ChequeGuaranteeAuditService $audits,
    ) {
    }

    public function verify(string $code, Request $request): array
    {
        $codeHash = $this->codes->hash($code);
        $fingerprint = $this->codes->fingerprint($code);

        return DB::transaction(function () use ($codeHash, $fingerprint, $request): array {
            $guarantee = ChequeGuarantee::query()
                ->with('reservation')
                ->where('verification_code_hash', $codeHash)
                ->lockForUpdate()
                ->first();

            $result = $this->determineResult($guarantee);
            $suspicious = $this->isSuspicious($fingerprint, $request);

            ChequeVerificationAttempt::create([
                'cheque_guarantee_id' => $guarantee?->id,
                'code_fingerprint' => $fingerprint,
                'result' => $result,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'suspicious' => $suspicious,
                'metadata' => [
                    'path' => $request->path(),
                ],
            ]);

            if ($guarantee) {
                $this->audits->record('verification.'.$result, $guarantee, null, [
                    'suspicious' => $suspicious,
                ], $request);
            }

            if ($result === 'success') {
                $guarantee->forceFill(['last_verified_at' => now()])->save();
            }

            return $this->publicResponse($result, $guarantee);
        });
    }

    private function determineResult(?ChequeGuarantee $guarantee): string
    {
        if (! $guarantee) {
            return 'invalid';
        }

        if (! $guarantee->verification_enabled || $guarantee->status === 'disabled') {
            return 'disabled';
        }

        if ($guarantee->status === 'expired' || $guarantee->isExpired()) {
            if ($guarantee->status === 'active') {
                $guarantee->forceFill(['status' => 'expired'])->save();
            }

            return 'expired';
        }

        if ($guarantee->status !== 'active') {
            return 'disabled';
        }

        return 'success';
    }

    private function publicResponse(string $result, ?ChequeGuarantee $guarantee): array
    {
        if ($result !== 'success' || ! $guarantee) {
            return [
                'state' => $result,
                'message' => match ($result) {
                    'expired' => 'This verification code has expired.',
                    'disabled' => 'This verification code is no longer active.',
                    default => 'Invalid verification code.',
                },
                'guarantee' => null,
            ];
        }

        $expiresAt = $guarantee->reservation?->expires_at ?? $guarantee->code_expires_at;

        return [
            'state' => 'success',
            'message' => 'Funds guaranteed.',
            'guarantee' => [
                'amount' => 'MAD '.number_format((float) $guarantee->verifiable_amount, 2),
                'reservation_status' => $guarantee->reservation?->status ?? 'not_reserved',
                'time_left' => $expiresAt?->isFuture() ? $expiresAt->diffForHumans(parts: 2, short: true) : null,
                'expires' => $expiresAt?->format('M d, Y · h:i A'),
                'reference_id' => $guarantee->public_reference,
            ],
        ];
    }

    private function isSuspicious(string $fingerprint, Request $request): bool
    {
        $recentIpFailures = ChequeVerificationAttempt::query()
            ->where('ip_address', $request->ip())
            ->whereIn('result', ['invalid', 'expired', 'disabled'])
            ->where('created_at', '>=', now()->subMinutes(10))
            ->count();

        $sameCodeFailures = ChequeVerificationAttempt::query()
            ->where('code_fingerprint', $fingerprint)
            ->whereIn('result', ['invalid', 'expired', 'disabled'])
            ->where('created_at', '>=', now()->subHour())
            ->count();

        return $recentIpFailures >= 5 || $sameCodeFailures >= 3;
    }
}
