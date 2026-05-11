<?php

namespace App\Http\Requests\CreditRequests;

use App\Services\Credits\MoroccanCreditDocumentCatalog;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCreditRequestRequest extends FormRequest
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
            'credit_type' => ['required', 'string', Rule::in(['personal', 'auto', 'housing', 'business'])],
            'amount' => ['required', 'numeric', 'min:5000', 'max:5000000'],
            'duration_months' => ['required', 'integer', 'min:6', 'max:300'],
            'purpose' => ['required', 'string', 'max:255'],
            'employment_status' => ['required', 'string', Rule::in(['salaried', 'self_employed', 'company_owner'])],
            'monthly_income' => ['nullable', 'numeric', 'min:0', 'max:10000000'],
            'full_name' => ['required', 'string', 'max:255'],
            'cin_number' => ['required', 'string', 'max:30'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1500'],
            'documents' => ['required', 'array'],
            'documents.*' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:8192'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            $catalog = app(MoroccanCreditDocumentCatalog::class);
            $employmentStatus = (string) $this->input('employment_status');

            foreach ($catalog->requiredKeys($employmentStatus) as $key) {
                if (! $this->hasFile("documents.$key")) {
                    $validator->errors()->add("documents.$key", "The {$catalog->all()[$key]['label']} document is required.");
                }
            }
        });
    }
}
