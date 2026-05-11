<?php

namespace App\Services\Credits;

final readonly class DocumentVerificationResult
{
    /**
     * @param array<int, string> $issues
     * @param array<int, string> $recommendations
     */
    public function __construct(
        public string $status,
        public int $confidence,
        public array $issues,
        public array $recommendations,
        public string $summary,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'status' => $this->status,
            'confidence' => $this->confidence,
            'issues' => $this->issues,
            'recommendations' => $this->recommendations,
            'summary' => $this->summary,
        ];
    }

    public function isValid(): bool
    {
        return $this->status === 'valid';
    }
}
