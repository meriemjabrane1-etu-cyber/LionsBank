<?php

namespace App\Http\Requests\CreditRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VerifyCreditDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'document_type' => ['required', 'string', Rule::in([
                'cin',
                'salary_certificate',
                'bank_statements',
                'proof_residence',
                'work_contract',
                'tax_declaration',
                'business_registration',
                'cnss_documents',
                'additional_support',
            ])],
            'employment_status' => ['required', 'string', Rule::in(['salaried', 'self_employed', 'company_owner'])],
            'full_name' => ['nullable', 'string', 'max:255'],
            'cin_number' => ['nullable', 'string', 'max:30'],
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:8192'],
        ];
    }
}
