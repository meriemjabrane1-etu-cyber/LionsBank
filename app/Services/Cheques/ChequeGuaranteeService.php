<?php

namespace App\Services\Cheques;

use App\Events\ChequeGuaranteeCreated;
use App\Models\Account;
use App\Models\Cheque;
use App\Models\ChequeGuarantee;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use InvalidArgumentException;

class ChequeGuaranteeService
{
    public function __construct(
        private readonly ReservationService $reservations,
        private readonly SecureVerificationCodeGenerator $codes,
        private readonly ChequeGuaranteeAuditService $audits,
    ) {
    }

    public function create(User $issuer, array $data, ?Request $request = null): array
    {
        return DB::transaction(function () use ($issuer, $data, $request): array {
            $account = Account::query()
                ->whereKey($data['account_id'])
                ->where('user_id', $issuer->id)
                ->lockForUpdate()
                ->first();

            if (! $account) {
                throw new AuthorizationException('You cannot create guarantees for this account.');
            }

            $verifiableAmount = (float) $data['verifiable_amount'];
            $availableBalance = $this->reservations->availableBalance($account);

            if (($data['reservation_enabled'] ?? false) && $verifiableAmount > $availableBalance) {
                throw new InvalidArgumentException('Insufficient available funds for this reservation.');
            }

            $plainCode = $this->codes->generateUniqueCode();
            $expiresAt = isset($data['reservation_duration_hours'])
                ? now()->addHours((int) $data['reservation_duration_hours'])
                : now()->addHours(72);

            $cheque = Cheque::create([
                'account_id' => $account->id,
                'cheque_number' => $data['cheque_number'] ?? 'CHQ-'.Str::upper(Str::random(12)),
                'amount' => $data['cheque_amount'],
                'status' => 'valid',
                'issued_at' => $data['cheque_date'] ?? now()->toDateString(),
            ]);

            $guarantee = ChequeGuarantee::create([
                'cheque_id' => $cheque->id,
                'account_id' => $account->id,
                'issuer_id' => $issuer->id,
                'public_reference' => $this->newReference(),
                'verification_code_hash' => $this->codes->hash($plainCode),
                'cheque_amount' => $data['cheque_amount'],
                'verifiable_amount' => $verifiableAmount,
                'payable_to' => $data['payable_to'] ?? null,
                'cheque_date' => $data['cheque_date'] ?? null,
                'verification_enabled' => (bool) ($data['verification_enabled'] ?? true),
                'status' => 'active',
                'code_expires_at' => $expiresAt,
            ]);

            if ($data['reservation_enabled'] ?? false) {
                $this->reservations->create($guarantee, (int) $data['reservation_duration_hours']);
            }

            $guarantee->load('reservation');

            $this->audits->record('guarantee.created', $guarantee, $issuer, [
                'reservation_enabled' => (bool) ($data['reservation_enabled'] ?? false),
                'verifiable_amount' => $verifiableAmount,
            ], $request);

            event(new ChequeGuaranteeCreated($guarantee));

            return [
                'guarantee' => $guarantee,
                'verification_code' => $plainCode,
                'available_balance' => $this->reservations->availableBalance($account->refresh()),
            ];
        });
    }

    public function disable(ChequeGuarantee $guarantee, User $actor, ?string $reason = null, ?Request $request = null): ChequeGuarantee
    {
        return DB::transaction(function () use ($guarantee, $actor, $reason, $request): ChequeGuarantee {
            $guarantee = ChequeGuarantee::query()
                ->with('reservation')
                ->whereKey($guarantee->id)
                ->lockForUpdate()
                ->firstOrFail();

            $guarantee->forceFill([
                'verification_enabled' => false,
                'status' => 'disabled',
            ])->save();

            if ($guarantee->reservation) {
                $this->reservations->release($guarantee->reservation, $reason ?: 'guarantee_disabled');
            }

            $this->audits->record('guarantee.disabled', $guarantee, $actor, [
                'reason' => $reason,
            ], $request);

            return $guarantee->load('reservation');
        });
    }

    private function newReference(): string
    {
        do {
            $reference = sprintf('LB-VRF-%s-%s', now()->format('Ymd'), Str::upper(Str::random(4)));
        } while (ChequeGuarantee::where('public_reference', $reference)->exists());

        return $reference;
    }
}
