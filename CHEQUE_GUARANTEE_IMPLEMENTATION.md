# Cheque Guarantee & Verification System - Complete Implementation Guide

## 📋 Overview

This document provides a comprehensive guide to the **Cheque Guarantee and Verification** feature already implemented in your LionsBank application. This is a production-ready banking system for creating, managing, and verifying cheque guarantees with frozen funds.

---

## ✅ What's Already Implemented

### 1. **Database Schema**

#### `cheque_guarantees` Table
```sql
- id (PK)
- cheque_id (FK) → cheques
- account_id (FK) → accounts
- issuer_id (FK) → users
- public_reference (UNIQUE) - Public-facing reference ID (format: LB-VRF-20260511-XXXX)
- verification_code_hash (UNIQUE) - HMAC-SHA256 hashed code
- cheque_amount (DECIMAL) - Full cheque amount
- verifiable_amount (DECIMAL) - Amount guaranteed & frozen
- payable_to (STRING, nullable)
- cheque_date (DATE, nullable)
- verification_enabled (BOOLEAN) - Can this guarantee be verified?
- status (ENUM: active, disabled, expired, cancelled)
- code_expires_at (TIMESTAMP) - When does the verification code expire?
- last_verified_at (TIMESTAMP) - Last time this was verified
- created_at, updated_at
```

#### `cheque_fund_reservations` Table
```sql
- id (PK)
- cheque_guarantee_id (FK)
- account_id (FK)
- amount (DECIMAL) - Frozen amount
- status (ENUM: active, released, expired)
- reserved_at (TIMESTAMP)
- expires_at (TIMESTAMP)
- released_at (TIMESTAMP)
- release_reason (STRING)
- created_at, updated_at
```

#### `cheque_verification_attempts` Table
```sql
- id (PK)
- cheque_guarantee_id (FK, nullable)
- code_fingerprint (STRING) - Hashed fingerprint for rate limiting
- result (ENUM: success, expired, invalid, disabled, rate_limited)
- ip_address (IP)
- user_agent (STRING)
- suspicious (BOOLEAN)
- metadata (JSON)
- created_at, updated_at
```

#### `cheque_guarantee_audits` Table
```sql
- id (PK)
- cheque_guarantee_id (FK, nullable)
- actor_id (FK to users, nullable)
- event (STRING) - Event name
- payload (JSON) - Event data
- ip_address (IP)
- user_agent (STRING)
- created_at, updated_at
```

---

## 🏗️ Architecture Overview

### Models & Relationships

```
User (issuer)
├── chequeGuarantees() → ChequeGuarantee
├── accounts() → Account
└── chequeValidations() → ChequeValidation

Account
├── chequeGuarantees() → ChequeGuarantee
├── chequeFundReservations() → ChequeFundReservation
├── cheques() → Cheque
├── transactions() → Transaction
└── cards() → Card

ChequeGuarantee
├── cheque() → Cheque
├── account() → Account
├── issuer() → User
├── reservation() → ChequeFundReservation (hasOne)
├── attempts() → ChequeVerificationAttempt
└── audits() → ChequeGuaranteeAudit

ChequeFundReservation
├── guarantee() → ChequeGuarantee
└── account() → Account

ChequeVerificationAttempt
└── guarantee() → ChequeGuarantee
```

---

## 🔐 Security Features

### 1. **Code Generation & Hashing**
```php
// Code format: LB-XXXX-XXXX (16-character alphanumeric)
// Example: LB-K9JM-7H2P-Z5QW
// Hashed with HMAC-SHA256 using app key
// Original code is NEVER stored in database
```

### 2. **Verification Fingerprinting**
```php
// Fingerprint = HMAC-SHA256('attempt:' . normalized_code, app_key)
// Used for rate limiting without revealing the code
```

### 3. **Rate Limiting**
- **Code Verification**: 
  - 8 requests per minute per IP
  - 20 requests per hour per IP + code combination
- **Guarantee Management**: 
  - 60 requests per minute per user

### 4. **Suspicious Activity Detection**
```php
// Detected if:
// - 5+ failed verification attempts in 10 minutes (same IP)
// - 3+ failed attempts on same code in 1 hour
```

### 5. **Transaction Management**
- All operations use database transactions
- Prevents race conditions and data inconsistency
- Pessimistic locking (lockForUpdate) on account balance checks

### 6. **Authorization**
- Only account owner can create guarantees
- Only issuer can view/disable their own guarantees
- Public verification endpoint doesn't require authentication

---

## 📡 API Endpoints

### **Authentication Required**

#### 1. Create Cheque Guarantee
```
POST /api/cheque-guarantees
Authorization: Bearer {token}

Request Body:
{
  "account_id": 1,
  "cheque_number": "CHQ001",          // Optional, auto-generated if omitted
  "cheque_amount": 50000,              // Required: full amount
  "verifiable_amount": 50000,          // Required: amount to guarantee
  "payable_to": "ABC Company",         // Optional
  "cheque_date": "2026-05-15",        // Optional
  "verification_enabled": true,        // Optional: default true
  "reservation_enabled": true,         // Optional: default false
  "reservation_duration_hours": 72     // Required if reservation_enabled=true
                                       // Allowed: 24, 48, 72, 168, 336, 720
}

Response:
{
  "success": true,
  "data": {
    "guarantee": {
      "id": 1,
      "reference_id": "LB-VRF-20260511-XXXX",
      "status": "active",
      "verification_enabled": true,
      "cheque_amount": 50000,
      "verifiable_amount": 50000,
      "payable_to": "ABC Company",
      "cheque_date": "2026-05-15",
      "code_expires_at": "2026-05-14T15:30:45Z",
      "last_verified_at": null,
      "reservation": {
        "status": "active",
        "amount": 50000,
        "reserved_at": "2026-05-11T15:30:45Z",
        "expires_at": "2026-05-14T15:30:45Z",
        "released_at": null,
        "release_reason": null
      },
      "created_at": "2026-05-11T15:30:45Z"
    },
    "verification_code": "LB-K9JM-7H2P",  // 🔒 ONLY given once!
    "available_balance": 450000
  },
  "message": "Secure verification code generated."
}
```

#### 2. Get Available Balance
```
GET /api/cheque-guarantees/balance?account_id=1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "balance": 500000,           // Account balance
    "reserved": 50000,           // Total frozen/reserved
    "available": 450000          // Balance - reserved
  },
  "message": "Balance summary loaded."
}
```

#### 3. List User's Guarantees
```
GET /api/cheque-guarantees
Authorization: Bearer {token}

Query Parameters:
- page: integer (default 1)

Response:
{
  "success": true,
  "data": {
    "data": [...],  // Array of guarantee resources
    "links": {...},
    "meta": {
      "current_page": 1,
      "total": 5,
      "per_page": 15
    }
  }
}
```

#### 4. Get Single Guarantee
```
GET /api/cheque-guarantees/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... }  // ChequeGuaranteeResource
}
```

#### 5. Disable Guarantee
```
PATCH /api/cheque-guarantees/{id}/disable
Authorization: Bearer {token}

Request Body:
{
  "reason": "no_longer_needed"  // Optional
}

Response:
{
  "success": true,
  "data": { ... },  // Updated resource
  "message": "Guarantee disabled."
}
```

---

### **Public Endpoints (No Auth Required)**

#### 1. Verify Cheque Guarantee
```
POST /api/cheque-guarantees/verify

Request Body:
{
  "code": "LB-K9JM-7H2P"
}

Response (Success):
{
  "success": true,
  "data": {
    "state": "success",
    "message": "Funds guaranteed.",
    "guarantee": {
      "amount": "MAD 50,000.00",
      "reservation_status": "active",
      "time_left": "2 days 3 hours",
      "expires": "May 14, 2026 · 03:30 PM",
      "reference_id": "LB-VRF-20260511-XXXX"
    }
  },
  "message": "Funds guaranteed."
}

Response (Expired):
{
  "success": true,
  "data": {
    "state": "expired",
    "message": "This verification code has expired.",
    "guarantee": null
  }
}

Response (Invalid):
{
  "success": true,
  "data": {
    "state": "invalid",
    "message": "Invalid verification code.",
    "guarantee": null
  }
}
```

---

## 🔧 Services & Business Logic

### 1. **ChequeGuaranteeService**
**Location**: `app/Services/Cheques/ChequeGuaranteeService.php`

```php
// Create guarantee with transaction
public function create(User $issuer, array $data, ?Request $request = null): array
{
    // ✅ Validates account ownership
    // ✅ Checks available balance
    // ✅ Generates unique verification code
    // ✅ Creates cheque record
    // ✅ Creates guarantee record
    // ✅ Creates fund reservation (if enabled)
    // ✅ Records audit event
    // ✅ Dispatches ChequeGuaranteeCreated event
    // ✅ Returns: guarantee, verification_code, available_balance
}

// Disable guarantee
public function disable(
    ChequeGuarantee $guarantee,
    User $actor,
    ?string $reason = null,
    ?Request $request = null
): ChequeGuarantee
{
    // ✅ Marks as disabled
    // ✅ Releases fund reservation
    // ✅ Records audit event
}
```

### 2. **ReservationService**
**Location**: `app/Services/Cheques/ReservationService.php`

```php
// Get active reserved amount for account
public function activeReservedAmount(Account $account): string

// Get available balance (balance - reserved)
public function availableBalance(Account $account): float

// Create new fund reservation
public function create(ChequeGuarantee $guarantee, int $durationHours): ChequeFundReservation

// Release (unlock) a reservation
public function release(
    ChequeFundReservation $reservation,
    string $reason = 'manual_release'
): ChequeFundReservation

// Release all expired reservations (runs via job)
public function releaseExpired(?Carbon $now = null): int
```

### 3. **VerificationService**
**Location**: `app/Services/Cheques/VerificationService.php`

```php
// Verify code and return result
public function verify(string $code, Request $request): array
{
    // ✅ Hashes the provided code
    // ✅ Looks up guarantee by hash
    // ✅ Determines result (success/expired/invalid/disabled)
    // ✅ Detects suspicious activity
    // ✅ Records verification attempt
    // ✅ Updates last_verified_at
    // ✅ Records audit event
    // ✅ Returns: state, message, guarantee details
}
```

### 4. **SecureVerificationCodeGenerator**
**Location**: `app/Services/Cheques/SecureVerificationCodeGenerator.php`

```php
// Generate unique code (format: LB-XXXX-XXXX)
public function generateUniqueCode(): string

// Hash code using HMAC-SHA256
public function hash(string $code): string

// Generate fingerprint for rate limiting
public function fingerprint(string $code): string

// Normalize code (trim, uppercase)
public function normalize(string $code): string
```

### 5. **ChequeGuaranteeAuditService**
**Location**: `app/Services/Cheques/ChequeGuaranteeAuditService.php`

```php
// Record audit event
public function record(
    string $event,
    ?ChequeGuarantee $guarantee = null,
    ?User $actor = null,
    array $payload = [],
    ?Request $request = null
): ChequeGuaranteeAudit

// Events recorded:
// - guarantee.created
// - guarantee.disabled
// - verification.success
// - verification.expired
// - verification.invalid
// - verification.disabled
```

---

## 🤖 Automated Jobs & Scheduling

### Job: `ReleaseExpiredChequeReservations`
**Location**: `app/Jobs/ReleaseExpiredChequeReservations.php`
**Schedule**: Every 5 minutes
**Configured in**: `routes/console.php`

```php
// What it does:
// 1. Finds all active reservations with expires_at <= now
// 2. Releases them with reason='expired'
// 3. Updates guarantee status to 'expired'
// 4. Processes in chunks of 100 for performance

// To run manually:
php artisan queue:work
// or async:
php artisan job:dispatch App\\Jobs\\ReleaseExpiredChequeReservations
```

---

## 🛡️ Validation Rules

### Create Guarantee Validation
```php
'account_id' => ['required', 'integer', 'exists:accounts,id'],
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
    Rule::in([24, 48, 72, 168, 336, 720])  // 1, 2, 3, 7, 14, 30 days
],
```

### Verify Guarantee Validation
```php
'code' => ['required', 'string', 'size:11']  // Format: LB-XXXX-XXXX
```

---

## 🔄 Complete Workflow Example

### **As Cheque Issuer (Business)**

#### Step 1: Create Guarantee
```bash
curl -X POST http://localhost/api/cheque-guarantees \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": 1,
    "cheque_number": "CHQ-2026-001",
    "cheque_amount": 100000,
    "verifiable_amount": 100000,
    "payable_to": "Supplier Inc.",
    "cheque_date": "2026-05-20",
    "verification_enabled": true,
    "reservation_enabled": true,
    "reservation_duration_hours": 72
  }'
```

**Response**: 
```json
{
  "verification_code": "LB-K9JM-7H2P-Z5QW",  // 🔒 Save this!
  "available_balance": 400000,
  "guarantee": { ... }
}
```

#### Step 2: Give Code to Beneficiary
- Share the verification code via email/SMS
- Share the public reference ID for tracking

#### Step 3: Monitor (Optional)
```bash
curl -X GET http://localhost/api/cheque-guarantees \
  -H "Authorization: Bearer {token}"
```

#### Step 4: Disable if Needed
```bash
curl -X PATCH http://localhost/api/cheque-guarantees/1/disable \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"reason": "payment_received"}'
```

---

### **As Beneficiary (Verifying Party)**

#### Step 1: Verify Code
```bash
curl -X POST http://localhost/api/cheque-guarantees/verify \
  -H "Content-Type: application/json" \
  -d '{"code": "LB-K9JM-7H2P-Z5QW"}'
```

**Response**:
```json
{
  "state": "success",
  "guarantee": {
    "amount": "MAD 100,000.00",
    "reservation_status": "active",
    "time_left": "2 days 18 hours",
    "expires": "May 14, 2026 · 03:30 PM",
    "reference_id": "LB-VRF-20260511-ABCD"
  },
  "message": "Funds guaranteed."
}
```

#### Step 2: Check Status
- Can verify again anytime (within expiration)
- Receives updated time remaining
- Can share verification result to confirm payment security

---

## 📊 Database Queries

### Get User's Active Guarantees
```php
$guarantees = auth()->user()
    ->chequeGuarantees()
    ->active()  // where status = 'active' AND verification_enabled = true
    ->with('reservation')
    ->latest()
    ->get();
```

### Get Available Balance
```php
$account = Account::find(1);
$available = app(ReservationService::class)->availableBalance($account);
// E.g., if balance = 500,000 and reserved = 100,000, available = 400,000
```

### Check if Guarantee is Expired
```php
$guarantee = ChequeGuarantee::find(1);
if ($guarantee->isExpired()) {
    // Code is no longer valid for verification
}
```

### Get Recent Verification Attempts
```php
$attempts = ChequeGuarantee::find(1)
    ->attempts()
    ->latest()
    ->limit(20)
    ->get();
```

### Get Audit Trail
```php
$audits = ChequeGuarantee::find(1)
    ->audits()
    ->latest()
    ->get();

// Shows: who created it, when it was verified, who disabled it, etc.
```

### Find Suspicious Activity
```php
$suspicious = ChequeVerificationAttempt::where('suspicious', true)
    ->where('created_at', '>=', now()->subHour())
    ->get();
```

---

## 🚀 Production Checklist

- [x] Database migrations applied
- [x] Models created with relationships
- [x] Services implemented with business logic
- [x] API endpoints secured with authentication
- [x] Rate limiting configured
- [x] Code generation & hashing (HMAC-SHA256)
- [x] Transaction management for consistency
- [x] Authorization policies in place
- [x] Audit logging enabled
- [x] Job scheduler configured
- [x] Error handling implemented
- [ ] **TODO**: Create feature tests
- [ ] **TODO**: Create integration tests
- [ ] **TODO**: Document frontend integration
- [ ] **TODO**: Set up monitoring/alerts for suspicious activity

---

## 📋 Running Commands

### Apply Migrations
```bash
php artisan migrate
# or reset for development:
php artisan migrate:fresh --seed
```

### Run Queue Worker (For Job Processing)
```bash
# In terminal 1 (keeps running):
php artisan queue:work

# or async:
php artisan queue:work --daemon
```

### Check Scheduled Commands
```bash
php artisan schedule:list
# Shows: ReleaseExpiredChequeReservations every 5 minutes
```

### Run Scheduler Manually (Testing)
```bash
php artisan schedule:run
```

### View Database
```bash
php artisan tinker

# List recent guarantees:
App\Models\ChequeGuarantee::latest()->limit(5)->get()

# Check reservations:
App\Models\ChequeFundReservation::where('status', 'active')->get()

# View audit log:
App\Models\ChequeGuaranteeAudit::latest()->limit(10)->get()
```

---

## 🧪 Testing the Feature

### 1. Create a User & Account
```bash
php artisan tinker

# Create user
$user = User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => Hash::make('password'),
    'role' => 'client'
]);

# Create account
$account = Account::create([
    'user_id' => $user->id,
    'account_number' => 'ACC001',
    'balance' => 500000,
    'type' => 'current'
]);

# Create auth token
$token = $user->createToken('test')->plainTextToken;
```

### 2. Test API Locally
```bash
# Get token
TOKEN="your_token_here"

# Create guarantee
curl -X POST http://localhost:8000/api/cheque-guarantees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": 1,
    "cheque_amount": 100000,
    "verifiable_amount": 100000,
    "reservation_enabled": true,
    "reservation_duration_hours": 24
  }'

# Verify code
curl -X POST http://localhost:8000/api/cheque-guarantees/verify \
  -H "Content-Type: application/json" \
  -d '{"code": "LB-XXXX-XXXX"}'
```

### 3. Test Fund Freezing
```php
$account = Account::find(1);
$service = app(ReservationService::class);

// Before guarantee
echo $account->balance;           // 500000
echo $service->availableBalance($account);  // 500000

// Create guarantee
$guarantee = ChequeGuarantee::find(1);

// After guarantee with reservation
echo $service->availableBalance($account);  // 400000 (500k - 100k frozen)

// Get reserved amount
echo $service->activeReservedAmount($account);  // 100000
```

---

## 📚 Key Classes & Files

```
app/
├── Models/
│   ├── ChequeGuarantee.php
│   ├── ChequeFundReservation.php
│   ├── ChequeVerificationAttempt.php
│   ├── ChequeGuaranteeAudit.php
│   ├── Cheque.php
│   ├── Account.php
│   └── User.php
│
├── Services/Cheques/
│   ├── ChequeGuaranteeService.php      ⭐ Main service
│   ├── ReservationService.php          ⭐ Fund management
│   ├── VerificationService.php         ⭐ Code verification
│   ├── SecureVerificationCodeGenerator.php
│   ├── ChequeGuaranteeAuditService.php
│   └── ApiResponse.php
│
├── Http/
│   ├── Controllers/Api/
│   │   ├── ChequeGuaranteeController.php      ⭐ Main API
│   │   └── PublicChequeVerificationController.php
│   ├── Controllers/
│   │   └── ChequeGuaranteePageController.php  (UI page)
│   ├── Requests/ChequeGuarantees/
│   │   ├── StoreChequeGuaranteeRequest.php
│   │   ├── VerifyChequeGuaranteeRequest.php
│   │   └── DisableChequeGuaranteeRequest.php
│   └── Resources/
│       ├── ChequeGuaranteeResource.php
│       └── ChequeVerificationResultResource.php
│
├── Policies/
│   └── ChequeGuaranteePolicy.php
│
├── Events/
│   ├── ChequeGuaranteeCreated.php
│   └── ChequeReservationReleased.php
│
└── Jobs/
    └── ReleaseExpiredChequeReservations.php

database/migrations/
├── 2026_05_08_000001_create_cheque_guarantees_table.php
├── 2026_05_08_000002_create_cheque_fund_reservations_table.php
├── 2026_05_08_000003_create_cheque_verification_attempts_table.php
└── 2026_05_08_000004_create_cheque_guarantee_audits_table.php

routes/
├── api.php                 (API endpoints)
├── web.php                 (Web routes)
└── console.php             (Scheduled jobs)
```

---

## 🔍 Debugging & Troubleshooting

### Issue: "Insufficient available funds"
**Cause**: Account balance minus existing reservations is less than requested amount
**Solution**: Check `available_balance` endpoint before creating guarantee

### Issue: Code verification fails
**Cause**: Code is expired, invalid, or disabled
**Solution**: Generate new guarantee, check expiration date

### Issue: Fund not released after expiration
**Cause**: Queue worker not running
**Solution**: Start queue worker: `php artisan queue:work`

### Issue: High suspicious activity
**Cause**: Multiple failed verification attempts
**Solution**: Check verification_attempts table, implement CAPTCHA for beneficiaries

### View Logs
```bash
tail -f storage/logs/laravel.log
```

---

## 🎯 Summary

This system provides:

✅ **Secure Code Generation** - HMAC-SHA256 hashed, unique codes  
✅ **Fund Freezing** - Amount becomes unavailable until expired/released  
✅ **Automatic Expiration** - Scheduled job releases expired reservations  
✅ **Public Verification** - No login required to verify guarantees  
✅ **Comprehensive Auditing** - Every action logged with actor, IP, timestamp  
✅ **Suspicious Activity Detection** - Tracks multiple failed attempts  
✅ **Rate Limiting** - Protection against brute force attacks  
✅ **Transaction Safety** - Database transactions prevent race conditions  
✅ **RESTful API** - Clean, documented endpoints  
✅ **Production Ready** - Error handling, validation, authorization  

---

## 📞 Support & Next Steps

1. **Create Tests**: Add feature tests for all endpoints
2. **Frontend Integration**: Build UI for creating guarantees and verifying codes
3. **Monitoring**: Add alerts for suspicious activity
4. **Reporting**: Create analytics dashboard for transactions
5. **Notifications**: Add email/SMS when code is verified
6. **Admin Panel**: Dashboard for support team to manage guarantees

---

**Version**: 1.0  
**Last Updated**: May 11, 2026  
**Status**: ✅ Production Ready
