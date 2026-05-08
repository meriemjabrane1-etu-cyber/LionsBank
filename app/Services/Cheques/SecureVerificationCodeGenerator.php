<?php

namespace App\Services\Cheques;

use App\Models\ChequeGuarantee;
use Illuminate\Support\Str;

class SecureVerificationCodeGenerator
{
    private const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    public function generateUniqueCode(): string
    {
        do {
            $code = sprintf('LB-%s-%s', $this->segment(), $this->segment());
        } while (ChequeGuarantee::where('verification_code_hash', $this->hash($code))->exists());

        return $code;
    }

    public function hash(string $code): string
    {
        return hash_hmac('sha256', $this->normalize($code), (string) config('app.key'));
    }

    public function fingerprint(string $code): string
    {
        return hash_hmac('sha256', 'attempt:'.$this->normalize($code), (string) config('app.key'));
    }

    public function normalize(string $code): string
    {
        return Str::upper(trim($code));
    }

    private function segment(): string
    {
        $segment = '';

        for ($i = 0; $i < 4; $i++) {
            $segment .= self::ALPHABET[random_int(0, strlen(self::ALPHABET) - 1)];
        }

        return $segment;
    }
}
