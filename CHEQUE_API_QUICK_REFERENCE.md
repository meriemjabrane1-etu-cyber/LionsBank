# Cheque Guarantee System - Quick Reference & API Examples

## 🚀 Quick Start

### 1. Setup & Running

```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start development servers
php artisan serve              # Backend (port 8000)
npm run dev                    # Frontend (port 5173)

# In another terminal - Start queue worker
php artisan queue:work

# Verify scheduler is running
php artisan schedule:run
```

### 2. Test Endpoints Locally

```bash
# Create auth token
TOKEN="your_sanctum_token_here"

# Create account
ACCOUNT_ID=1

# ✅ Create Guarantee
curl -X POST http://localhost:8000/api/cheque-guarantees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": '$ACCOUNT_ID',
    "cheque_amount": 100000,
    "verifiable_amount": 100000,
    "payable_to": "Company ABC",
    "cheque_date": "2026-05-20",
    "verification_enabled": true,
    "reservation_enabled": true,
    "reservation_duration_hours": 72
  }' | jq .

# ✅ Get Balance
curl -X GET "http://localhost:8000/api/cheque-guarantees/balance?account_id=$ACCOUNT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq .

# ✅ List My Guarantees
curl -X GET http://localhost:8000/api/cheque-guarantees \
  -H "Authorization: Bearer $TOKEN" | jq .

# ✅ Verify Code (NO AUTH - Public)
curl -X POST http://localhost:8000/api/cheque-guarantees/verify \
  -H "Content-Type: application/json" \
  -d '{"code": "LB-K9JM-7H2P"}' | jq .

# ✅ Disable Guarantee
GUARANTEE_ID=1
curl -X PATCH http://localhost:8000/api/cheque-guarantees/$GUARANTEE_ID/disable \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "payment_received"}' | jq .
```

---

## 📊 Response Examples

### ✅ Create Guarantee - Success (201)

```json
{
  "success": true,
  "message": "Secure verification code generated.",
  "data": {
    "guarantee": {
      "id": 1,
      "reference_id": "LB-VRF-20260511-ABCD",
      "status": "active",
      "verification_enabled": true,
      "cheque_amount": 100000.0,
      "verifiable_amount": 100000.0,
      "payable_to": "Company ABC",
      "cheque_date": "2026-05-20",
      "code_expires_at": "2026-05-14T15:30:45Z",
      "last_verified_at": null,
      "reservation": {
        "status": "active",
        "amount": 100000.0,
        "reserved_at": "2026-05-11T15:30:45Z",
        "expires_at": "2026-05-14T15:30:45Z",
        "released_at": null,
        "release_reason": null
      },
      "created_at": "2026-05-11T15:30:45Z"
    },
    "verification_code": "LB-K9JM-7H2P-Z5QW",
    "available_balance": 400000.0
  }
}
```

### ❌ Create Guarantee - Insufficient Funds (422)

```json
{
  "success": false,
  "message": "Insufficient available funds for this reservation.",
  "errors": null
}
```

### ❌ Create Guarantee - Unauthorized (403)

```json
{
  "success": false,
  "message": "You cannot create guarantees for this account.",
  "errors": null
}
```

### ✅ Verify Code - Success (200)

```json
{
  "success": true,
  "message": "Funds guaranteed.",
  "data": {
    "state": "success",
    "message": "Funds guaranteed.",
    "guarantee": {
      "amount": "MAD 100,000.00",
      "reservation_status": "active",
      "time_left": "2 days 18 hours",
      "expires": "May 14, 2026 · 03:30 PM",
      "reference_id": "LB-VRF-20260511-ABCD"
    }
  }
}
```

### ⏰ Verify Code - Expired (200)

```json
{
  "success": true,
  "message": "This verification code has expired.",
  "data": {
    "state": "expired",
    "message": "This verification code has expired.",
    "guarantee": null
  }
}
```

### ❌ Verify Code - Invalid (200)

```json
{
  "success": true,
  "message": "Invalid verification code.",
  "data": {
    "state": "invalid",
    "message": "Invalid verification code.",
    "guarantee": null
  }
}
```

### ❌ Verify Code - Rate Limited (429)

```json
{
  "success": false,
  "message": "Too many requests, please slow down.",
  "errors": null
}
```

### ✅ Get Balance (200)

```json
{
  "success": true,
  "message": "Balance summary loaded.",
  "data": {
    "balance": 500000.0,
    "reserved": 100000.0,
    "available": 400000.0
  }
}
```

### ✅ List Guarantees (200)

```json
{
  "success": true,
  "message": "Guarantees loaded.",
  "data": {
    "data": [
      {
        "id": 1,
        "reference_id": "LB-VRF-20260511-ABCD",
        "status": "active",
        "verification_enabled": true,
        "cheque_amount": 100000.0,
        "verifiable_amount": 100000.0,
        "payable_to": "Company ABC",
        "cheque_date": "2026-05-20",
        "code_expires_at": "2026-05-14T15:30:45Z",
        "last_verified_at": "2026-05-12T10:15:30Z",
        "reservation": {
          "status": "active",
          "amount": 100000.0,
          "reserved_at": "2026-05-11T15:30:45Z",
          "expires_at": "2026-05-14T15:30:45Z",
          "released_at": null,
          "release_reason": null
        },
        "created_at": "2026-05-11T15:30:45Z"
      }
    ],
    "links": {
      "first": "http://localhost:8000/api/cheque-guarantees?page=1",
      "last": "http://localhost:8000/api/cheque-guarantees?page=1",
      "prev": null,
      "next": null
    },
    "meta": {
      "current_page": 1,
      "from": 1,
      "last_page": 1,
      "path": "http://localhost:8000/api/cheque-guarantees",
      "per_page": 15,
      "to": 1,
      "total": 1
    }
  }
}
```

### ✅ Disable Guarantee (200)

```json
{
  "success": true,
  "message": "Guarantee disabled.",
  "data": {
    "id": 1,
    "reference_id": "LB-VRF-20260511-ABCD",
    "status": "disabled",
    "verification_enabled": false,
    "cheque_amount": 100000.0,
    "verifiable_amount": 100000.0,
    "payable_to": "Company ABC",
    "cheque_date": "2026-05-20",
    "code_expires_at": "2026-05-14T15:30:45Z",
    "last_verified_at": "2026-05-12T10:15:30Z",
    "reservation": {
      "status": "released",
      "amount": 100000.0,
      "reserved_at": "2026-05-11T15:30:45Z",
      "expires_at": "2026-05-14T15:30:45Z",
      "released_at": "2026-05-12T10:20:00Z",
      "release_reason": "payment_received"
    },
    "created_at": "2026-05-11T15:30:45Z"
  }
}
```

---

## 🔄 Request/Response Examples by Scenario

### Scenario 1: Complete Happy Path

**Step 1: Issuer Creates Guarantee**
```bash
REQUEST:
POST /api/cheque-guarantees
{
  "account_id": 1,
  "cheque_amount": 50000,
  "verifiable_amount": 50000,
  "verification_enabled": true,
  "reservation_enabled": true,
  "reservation_duration_hours": 72
}

RESPONSE (201):
{
  "success": true,
  "data": {
    "guarantee": { ... },
    "verification_code": "LB-XXXX-XXXX",  ⭐ SAVE THIS
    "available_balance": 450000
  }
}
```

**Step 2: Issuer Shares Code with Beneficiary**
```
SMS: Your payment is guaranteed with code: LB-XXXX-XXXX
Reference: LB-VRF-20260511-ABCD
```

**Step 3: Beneficiary Verifies Code**
```bash
REQUEST:
POST /api/cheque-guarantees/verify
{ "code": "LB-XXXX-XXXX" }

RESPONSE (200):
{
  "success": true,
  "data": {
    "state": "success",
    "guarantee": {
      "amount": "MAD 50,000.00",
      "time_left": "2 days 18 hours",
      "expires": "May 14, 2026 · 03:30 PM"
    }
  }
}
```

**Step 4: Payment Is Made**

**Step 5: Issuer Disables Guarantee**
```bash
REQUEST:
PATCH /api/cheque-guarantees/1/disable
{ "reason": "payment_received" }

RESPONSE (200):
{
  "success": true,
  "data": {
    "status": "disabled",
    "reservation": {
      "status": "released",
      "release_reason": "payment_received"
    }
  }
}
```

Account balance is now fully available again: 500,000

---

### Scenario 2: Code Expires Before Verification

**Day 1 - Create guarantee (72 hours)**
```bash
POST /api/cheque-guarantees
{ "reservation_duration_hours": 72 }
```

**Day 4 - Try to verify**
```bash
POST /api/cheque-guarantees/verify
{ "code": "LB-XXXX-XXXX" }

RESPONSE:
{
  "state": "expired",
  "message": "This verification code has expired.",
  "guarantee": null
}
```

---

### Scenario 3: Multiple Verification Attempts

**Attempt 1: Correct code**
```bash
POST /api/cheque-guarantees/verify
{ "code": "LB-XXXX-XXXX" }

✅ Success
```

**Attempt 2: Wrong code**
```bash
POST /api/cheque-guarantees/verify
{ "code": "LB-YYYY-YYYY" }

❌ Invalid
```

**Attempt 3-8: Multiple wrong attempts**
```bash
# Each attempt is logged
# If 5+ failures in 10 min from same IP → marked suspicious
# If 3+ failures on same code in 1 hour → marked suspicious
```

**View attempts:**
```php
$guarantee = ChequeGuarantee::find(1);
$attempts = $guarantee->attempts()->latest()->get();

// Shows: result (success/invalid/expired), suspicious flag, IP, timestamp
```

---

## 📈 Database Operations

### Create Guarantee Directly (Advanced)

```php
use App\Services\Cheques\ChequeGuaranteeService;

$service = app(ChequeGuaranteeService::class);

$result = $service->create(auth()->user(), [
    'account_id' => 1,
    'cheque_amount' => 100000,
    'verifiable_amount' => 100000,
    'payable_to' => 'Client Ltd',
    'cheque_date' => '2026-05-20',
    'verification_enabled' => true,
    'reservation_enabled' => true,
    'reservation_duration_hours' => 72,
], request());

// Access results
$guarantee = $result['guarantee'];
$code = $result['verification_code'];
$available = $result['available_balance'];
```

### Check Fund Availability

```php
use App\Services\Cheques\ReservationService;

$service = app(ReservationService::class);
$account = Account::find(1);

$balance = $account->balance;                    // 500,000
$reserved = $service->activeReservedAmount($account);  // 100,000
$available = $service->availableBalance($account);    // 400,000
```

### Manual Release of Expired Funds

```php
use App\Services\Cheques\ReservationService;

$service = app(ReservationService::class);

// Release all expired reservations
$count = $service->releaseExpired();
echo "Released $count expired reservations";
```

### Query Audit Trail

```php
$guarantee = ChequeGuarantee::find(1);

// All audit events
$audits = $guarantee->audits()
    ->orderBy('created_at', 'desc')
    ->get();

// Example results:
// guarantee.created - User created the guarantee
// verification.success - Someone verified the code
// guarantee.disabled - User disabled the guarantee
// verification.expired - Code was verified after expiration
```

### Detect Suspicious Attempts

```php
$suspicious = ChequeVerificationAttempt::where('suspicious', true)
    ->with('guarantee')
    ->orderBy('created_at', 'desc')
    ->limit(20)
    ->get();

foreach ($suspicious as $attempt) {
    echo "{$attempt->ip_address} - {$attempt->result} - {$attempt->created_at}";
}
```

---

## 🔒 Security Checks

### Verify Authorization

```php
// User can only view their own guarantees
Gate::authorize('view', $guarantee);  // ✅ or throws AuthorizationException

// User can only disable their own active guarantees
Gate::authorize('disable', $guarantee);  // ✅ or throws AuthorizationException
```

### Verify Rate Limiting

```bash
# Code verification rate limit:
# - 8 requests per minute per IP
# - 20 requests per hour per IP + code combo

# This should be rate limited (429):
for i in {1..10}; do
  curl -X POST http://localhost:8000/api/cheque-guarantees/verify \
    -H "Content-Type: application/json" \
    -d '{"code": "LB-XXXX-XXXX"}'
done
```

---

## 🧪 Integration Test Example

```php
namespace Tests\Feature;

use App\Models\Account;
use App\Models\User;
use Tests\TestCase;

class ChequeGuaranteeTest extends TestCase
{
    public function test_can_create_guarantee()
    {
        $user = User::factory()->create();
        $account = Account::factory()->for($user)->create(['balance' => 500000]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/cheque-guarantees', [
                'account_id' => $account->id,
                'cheque_amount' => 100000,
                'verifiable_amount' => 100000,
                'reservation_enabled' => true,
                'reservation_duration_hours' => 72,
            ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'guarantee' => [
                    'id', 'reference_id', 'status', 'cheque_amount', 'verifiable_amount'
                ],
                'verification_code',
                'available_balance',
            ]
        ]);
    }

    public function test_can_verify_code()
    {
        // Create guarantee
        $result = $this->createGuarantee();
        $code = $result['verification_code'];

        // Verify
        $response = $this->postJson('/api/cheque-guarantees/verify', [
            'code' => $code
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.state', 'success');
        $response->assertJsonPath('data.guarantee.amount', 'MAD 100,000.00');
    }

    public function test_insufficient_balance_prevents_guarantee()
    {
        $user = User::factory()->create();
        $account = Account::factory()->for($user)->create(['balance' => 10000]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/cheque-guarantees', [
                'account_id' => $account->id,
                'cheque_amount' => 100000,
                'verifiable_amount' => 100000,
                'reservation_enabled' => true,
                'reservation_duration_hours' => 72,
            ]);

        $response->assertStatus(422);
        $response->assertJsonPath('message', 'Insufficient available funds for this reservation.');
    }

    public function test_expired_code_cannot_be_verified()
    {
        // Create guarantee with 1-hour expiration
        $result = $this->createGuarantee(['reservation_duration_hours' => 1]);

        // Wait for expiration
        $this->travel(2)->hours();

        // Try to verify
        $response = $this->postJson('/api/cheque-guarantees/verify', [
            'code' => $result['verification_code']
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.state', 'expired');
    }
}
```

---

## 🚨 Common Issues & Solutions

### Issue: "Code verification fails with valid code"
```
❌ Likely causes:
1. Code is case-sensitive (converted to uppercase by system)
2. Code has leading/trailing spaces
3. Code is expired
4. Verification disabled on guarantee

✅ Solutions:
- Use trim() and strtoupper() on input
- Check code_expires_at timestamp
- Verify verification_enabled = true
```

### Issue: "Fund is reserved but withdrawal still succeeds"
```
❌ Causes:
1. Withdrawal service doesn't check reservations
2. Different isolation level in transactions

✅ Solutions:
- Always use ReservationService::availableBalance() before withdrawal
- Use database transactions with proper isolation
```

### Issue: "Scheduler not releasing expired funds"
```
❌ Causes:
1. Queue worker not running
2. Scheduler not executing
3. Job failed silently

✅ Solutions:
php artisan queue:work --daemon
php artisan schedule:run  # Test scheduler
tail -f storage/logs/laravel.log  # Check logs
```

### Issue: "High suspicious activity alerts"
```
❌ Causes:
1. Users sharing codes via insecure channels
2. Bots attempting brute force
3. Rate limiting misconfigured

✅ Solutions:
- Add CAPTCHA for verification endpoint
- Implement email verification of code
- Monitor suspicious_attempts table
- Adjust rate limits in AppServiceProvider
```

---

## 📞 Debug Commands

```bash
# Interactive database access
php artisan tinker

# List recent guarantees
>>> App\Models\ChequeGuarantee::latest()->limit(5)->get()

# Check reservations
>>> App\Models\ChequeFundReservation::where('status', 'active')->get()

# View audit log
>>> App\Models\ChequeGuaranteeAudit::latest()->limit(10)->get()

# Check verification attempts
>>> App\Models\ChequeVerificationAttempt::where('suspicious', true)->get()

# Manually release expired
>>> app(App\Services\Cheques\ReservationService::class)->releaseExpired()

# Generate auth token for testing
>>> $user = App\Models\User::first()
>>> $token = $user->createToken('test')->plainTextToken
>>> echo $token
```

---

## 📋 Checklist for Production Deployment

- [x] Database migrations applied
- [x] Models created with relationships
- [x] Services implement business logic
- [x] API endpoints with auth & validation
- [x] Rate limiting configured
- [x] Code generation & hashing secure
- [x] Transactions prevent race conditions
- [x] Audit logging implemented
- [x] Job scheduler configured
- [ ] Feature tests written
- [ ] Integration tests written
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Frontend integrated
- [ ] Monitoring & alerts set up
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Backup strategy documented

---

**Last Updated**: May 11, 2026  
**Version**: 1.0
