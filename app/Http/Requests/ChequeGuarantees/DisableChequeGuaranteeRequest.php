<?php

namespace App\Http\Requests\ChequeGuarantees;

use App\Models\ChequeGuarantee;
use Illuminate\Foundation\Http\FormRequest;

class DisableChequeGuaranteeRequest extends FormRequest
{
    public function authorize(): bool
    {
        $guarantee = $this->route('chequeGuarantee');

        return $guarantee instanceof ChequeGuarantee
            && $this->user()?->can('disable', $guarantee);
    }

    public function rules(): array
    {
        return [
            'reason' => ['nullable', 'string', 'max:160'],
        ];
    }
}
