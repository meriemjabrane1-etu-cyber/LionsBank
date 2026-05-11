<?php

namespace App\Services\Credits;

use App\Models\CreditRequest;
use Illuminate\Support\Str;

class CreditTrackingCodeGenerator
{
    public function generate(): string
    {
        do {
            $code = sprintf('LB-CRD-%s-%s', now()->year, Str::upper(Str::random(5)));
        } while (CreditRequest::where('tracking_code', $code)->exists());

        return $code;
    }
}
