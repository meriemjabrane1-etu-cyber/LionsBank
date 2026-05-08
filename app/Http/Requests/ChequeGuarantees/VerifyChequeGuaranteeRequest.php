<?php

namespace App\Http\Requests\ChequeGuarantees;

use Illuminate\Foundation\Http\FormRequest;

class VerifyChequeGuaranteeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
                'max:32',
                'regex:/^LB-[A-Z2-9]{4}-[A-Z2-9]{4}$/',
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('code')) {
            $this->merge(['code' => strtoupper(trim((string) $this->input('code')))]);
        }
    }
}
