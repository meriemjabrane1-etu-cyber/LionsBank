<?php

namespace App\Http\Requests\ChequeGuarantees;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreChequeGuaranteeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'account_id' => ['required', 'integer', Rule::exists('accounts', 'id')],
            'cheque_number' => ['nullable', 'string', 'max:80'],
            'cheque_amount' => ['required', 'numeric', 'min:1', 'max:999999999999.99'],
            'payable_to' => ['nullable', 'string', 'max:160'],
            'cheque_date' => ['nullable', 'date'],
            'verification_enabled' => ['sometimes', 'boolean'],
            'verifiable_amount' => ['required_if:verification_enabled,true', 'numeric', 'min:1', 'lte:cheque_amount'],
            'reservation_enabled' => ['sometimes', 'boolean'],
            'reservation_duration_hours' => [
                'required_if:reservation_enabled,true',
                'integer',
                Rule::in([24, 48, 72, 168, 336, 720]),
            ],
        ];
    }

    public function validated($key = null, $default = null): mixed
    {
        $validated = parent::validated($key, $default);
        $validated['verification_enabled'] = (bool) ($validated['verification_enabled'] ?? true);
        $validated['reservation_enabled'] = (bool) ($validated['reservation_enabled'] ?? false);

        return $validated;
    }
}
