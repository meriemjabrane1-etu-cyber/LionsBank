<?php

namespace App\Services\Credits;

class MoroccanCreditDocumentCatalog
{
    /**
     * @return array<string, array<string, mixed>>
     */
    public function all(): array
    {
        return [
            'cin' => [
                'label' => 'CIN / Carte Nationale',
                'description' => 'Front/back CIN scan or clear photo.',
                'required_for' => ['salaried', 'self_employed', 'company_owner'],
                'max_age_days' => null,
            ],
            'salary_certificate' => [
                'label' => 'Salary Certificate',
                'description' => 'Recent attestation de salaire with employer stamp.',
                'required_for' => ['salaried'],
                'max_age_days' => 90,
            ],
            'bank_statements' => [
                'label' => 'Bank Statements',
                'description' => 'Latest 3 months of bank statements.',
                'required_for' => ['salaried', 'self_employed', 'company_owner'],
                'max_age_days' => 120,
            ],
            'proof_residence' => [
                'label' => 'Proof of Residence',
                'description' => 'Water, electricity, phone bill, or residence certificate.',
                'required_for' => ['salaried', 'self_employed', 'company_owner'],
                'max_age_days' => 90,
            ],
            'work_contract' => [
                'label' => 'Work Contract',
                'description' => 'CDI/CDD or work engagement document.',
                'required_for' => ['salaried'],
                'max_age_days' => null,
            ],
            'tax_declaration' => [
                'label' => 'Tax Declaration',
                'description' => 'Latest Moroccan tax declaration or income proof.',
                'required_for' => ['self_employed', 'company_owner'],
                'max_age_days' => 365,
            ],
            'business_registration' => [
                'label' => 'Business Registration',
                'description' => 'Registre de commerce, ICE, or patente document.',
                'required_for' => ['company_owner'],
                'max_age_days' => null,
            ],
            'cnss_documents' => [
                'label' => 'CNSS Documents',
                'description' => 'CNSS declaration or affiliation documents when applicable.',
                'required_for' => ['company_owner'],
                'max_age_days' => 180,
            ],
            'additional_support' => [
                'label' => 'Additional Supporting Document',
                'description' => 'Optional guarantee, quotation, or supporting document.',
                'required_for' => [],
                'max_age_days' => null,
            ],
        ];
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function forEmploymentStatus(string $employmentStatus): array
    {
        return collect($this->all())
            ->map(fn (array $document): array => [
                ...$document,
                'required' => in_array($employmentStatus, $document['required_for'], true),
            ])
            ->all();
    }

    /**
     * @return array<int, string>
     */
    public function requiredKeys(string $employmentStatus): array
    {
        return collect($this->forEmploymentStatus($employmentStatus))
            ->filter(fn (array $document): bool => (bool) $document['required'])
            ->keys()
            ->values()
            ->all();
    }
}
