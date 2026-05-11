# Cheque Guarantee System - Technical Specification & Architecture

## 📋 Table of Contents
1. System Architecture
2. Data Flow Diagrams
3. Class Hierarchy
4. Configuration Details
5. Performance Considerations
6. Deployment Guide

---

## 🏗️ System Architecture

### Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Inertia)                      │
│  ChequeVerification Page → ChequeGuaranteePageController    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    API Layer (Controllers)                   │
├──────────────────────────────────────────────────────────────┤
│ POST   /api/cheque-guarantees              → store()        │
│ GET    /api/cheque-guarantees              → index()        │
│ GET    /api/cheque-guarantees/:id          → show()         │
│ PATCH  /api/cheque-guarantees/:id/disable  → disable()      │
│ GET    /api/cheque-guarantees/balance      → balance()      │
│ POST   /api/cheque-guarantees/verify       → __invoke()     │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                    Service Layer (Business Logic)            │
├──────────────────────────────────────────────────────────────┤
│ ┌─ ChequeGuaranteeService                                   │
│ │  - create()  → creates cheque & guarantee                │
│ │  - disable() → disables & releases funds                 │
│ │                                                           │
│ ├─ ReservationService                                       │
│ │  - availableBalance()      → balance - reserved          │
│ │  - activeReservedAmount()  → frozen funds                │
│ │  - create()                → freeze amount               │
│ │  - release()               → unfreeze amount             │
│ │  - releaseExpired()        → auto-release on schedule    │
│ │                                                           │
│ ├─ VerificationService                                      │
│ │  - verify()  → verify code, return guarantee details     │
│ │                                                           │
│ ├─ SecureVerificationCodeGenerator                          │
│ │  - generateUniqueCode()  → LB-XXXX-XXXX                 │
│ │  - hash()                → HMAC-SHA256                   │
│ │  - fingerprint()         → rate limit tracking           │
│ │                                                           │
│ └─ ChequeGuaranteeAuditService                              │
│    - record() → log events with context                    │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                  Model Layer (Data Access)                   │
├──────────────────────────────────────────────────────────────┤
│ ┌─ ChequeGuarantee                                          │
│ │  Relations: cheque, account, issuer, reservation, etc.   │
│ │  Scopes: active()                                        │
│ │  Methods: isExpired()                                    │
│ │                                                           │
│ ├─ ChequeFundReservation                                    │
│ │  Relations: guarantee, account                           │
│ │  Scopes: active()                                        │
│ │                                                           │
│ ├─ ChequeVerificationAttempt                                │
│ │  Relations: guarantee                                    │
│ │  Used for: tracking & fraud detection                   │
│ │                                                           │
│ ├─ ChequeGuaranteeAudit                                     │
│ │  Relations: guarantee, actor                             │
│ │  Used for: audit trail & compliance                      │
│ │                                                           │
│ └─ Cheque, Account, User                                    │
│    (Supporting models with relationships)                   │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│                   Database Layer (SQLite/MySQL)              │
├──────────────────────────────────────────────────────────────┤
│ Tables:                                                      │
│ - cheque_guarantees          (Main guarantee data)          │
│ - cheque_fund_reservations   (Fund freeze tracking)         │
│ - cheque_verification_attempts (Verification logs)          │
│ - cheque_guarantee_audits    (Audit trail)                  │
│ - cheques                    (Cheque records)               │
│ - accounts                   (Account data)                 │
│ - users                      (User data)                    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  Scheduled Jobs (Queue)                      │
├──────────────────────────────────────────────────────────────┤
│ Every 5 minutes:                                             │
│ ReleaseExpiredChequeReservations                            │
│  → Finds expired reservations                              │
│  → Releases frozen funds                                   │
│  → Updates guarantee status                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagrams

### 1. Creating a Cheque Guarantee

```
User Form Submission
        ↓
StoreChequeGuaranteeRequest Validation
        ↓
ChequeGuaranteeController::store()
        ↓
ChequeGuaranteeService::create() [TRANSACTION BEGIN]
        ├─ Lock account for update (pessimistic lock)
        ├─ Check account ownership ✓
        ├─ Check balance vs reserved amount ✓
        ├─ Generate unique verification code
        │  └─ SecureVerificationCodeGenerator::generateUniqueCode()
        │     └─ Hash with HMAC-SHA256
        ├─ Create Cheque record
        ├─ Create ChequeGuarantee record
        ├─ Create ChequeFundReservation (if enabled)
        │  └─ Amount becomes unavailable
        ├─ Record audit event
        ├─ Dispatch ChequeGuaranteeCreated event
        └─ Return: guarantee, code, available_balance
                          [TRANSACTION COMMIT]
        ↓
ChequeGuaranteeResource (format response)
        ↓
ApiResponse::success() with 201 status
        ↓
Client receives: guarantee data + verification code
        ↓
Client stores verification code securely
        ↓
Client shares code with beneficiary
```

### 2. Verifying a Cheque Code

```
Beneficiary receives verification code
        ↓
Beneficiary visits verification page
        ↓
POST /api/cheque-guarantees/verify with code
        ↓
VerifyChequeGuaranteeRequest Validation
        ├─ Normalize code (trim, uppercase)
        └─ Regex validation (LB-XXXX-XXXX format)
        ↓
PublicChequeVerificationController (no auth required)
        ↓
VerificationService::verify() [TRANSACTION BEGIN]
        ├─ Hash the provided code
        ├─ Find guarantee by hash
        ├─ Determine result:
        │  ├─ if no guarantee → 'invalid'
        │  ├─ if not enabled → 'disabled'
        │  ├─ if code_expires_at < now() → 'expired'
        │  └─ else → 'success'
        ├─ Detect suspicious activity:
        │  ├─ Count IP failures in last 10 min
        │  └─ Count same-code failures in last hour
        ├─ Record ChequeVerificationAttempt
        │  └─ result, fingerprint, suspicious, IP, user_agent
        ├─ Record audit event (verification.{result})
        ├─ Update last_verified_at (if success)
        └─ Build response (public data only)
                          [TRANSACTION COMMIT]
        ↓
ChequeVerificationResultResource (format response)
        ↓
ApiResponse::success() with 200 status
        ↓
Client receives verification result
        ├─ If success: guarantee amount + expiration + reference
        └─ If failed: error message, no guarantee details
```

### 3. Automatic Fund Release (Scheduled)

```
Every 5 minutes:
ReleaseExpiredChequeReservations job triggers
        ↓
Queue worker picks up job
        ↓
ReservationService::releaseExpired()
        ├─ Find all ChequeFundReservations
        │  └─ where status = 'active'
        │  └─ AND expires_at <= now()
        ├─ Process in chunks of 100
        └─ For each reservation [TRANSACTION BEGIN]
            ├─ Update reservation status → 'expired'
            ├─ Set released_at = now()
            ├─ Set release_reason = 'expired'
            ├─ Update guarantee status → 'expired'
            └─ Record audit event: guarantee.expired
                              [TRANSACTION COMMIT]
        ↓
Funds become available again in account balance
        ↓
Queue job completes
```

---

## 🏛️ Class & Method Hierarchy

### ChequeGuaranteeService

```php
class ChequeGuaranteeService
{
    __construct(
        ReservationService $reservations,
        SecureVerificationCodeGenerator $codes,
        ChequeGuaranteeAuditService $audits
    )
    
    public function create(
        User $issuer,
        array $data,
        ?Request $request = null
    ): array
    {
        // 1. Validate account ownership
        // 2. Check available balance
        // 3. Generate unique code
        // 4. Create Cheque
        // 5. Create ChequeGuarantee
        // 6. Create Reservation (optional)
        // 7. Record audit
        // 8. Dispatch event
        // Return: [guarantee, verification_code, available_balance]
    }
    
    public function disable(
        ChequeGuarantee $guarantee,
        User $actor,
        ?string $reason = null,
        ?Request $request = null
    ): ChequeGuarantee
    {
        // 1. Lock guarantee for update
        // 2. Update status to 'disabled'
        // 3. Update verification_enabled to false
        // 4. Release reservation if exists
        // 5. Record audit event
        // Return: updated guarantee
    }
    
    private function newReference(): string
    {
        // Generate unique public reference: LB-VRF-YYYYMMDD-XXXX
    }
}
```

### ReservationService

```php
class ReservationService
{
    public function activeReservedAmount(Account $account): string
    {
        // Sum of all active reservations with expires_at > now
    }
    
    public function availableBalance(Account $account): float
    {
        // account.balance - activeReservedAmount()
    }
    
    public function create(
        ChequeGuarantee $guarantee,
        int $durationHours
    ): ChequeFundReservation
    {
        // Create new reservation
        // amount = guarantee.verifiable_amount
        // expires_at = now() + $durationHours
    }
    
    public function release(
        ChequeFundReservation $reservation,
        string $reason = 'manual_release'
    ): ChequeFundReservation
    {
        // Update reservation status
        // Set released_at = now()
        // Set release_reason = $reason
    }
    
    public function releaseExpired(
        ?Carbon $now = null
    ): int
    {
        // Find all active reservations with expires_at <= $now
        // Release each one with reason = 'expired'
        // Update guarantee status to 'expired'
        // Return count released
    }
}
```

### VerificationService

```php
class VerificationService
{
    __construct(
        SecureVerificationCodeGenerator $codes,
        ChequeGuaranteeAuditService $audits
    )
    
    public function verify(string $code, Request $request): array
    {
        // 1. Hash code
        // 2. Find guarantee by hash
        // 3. Determine result (success/expired/invalid/disabled)
        // 4. Detect suspicious activity
        // 5. Record attempt
        // 6. Record audit
        // 7. Update last_verified_at
        // Return: [state, message, guarantee]
    }
    
    private function determineResult(
        ?ChequeGuarantee $guarantee
    ): string
    {
        // Logic:
        // - if null → 'invalid'
        // - if not enabled → 'disabled'
        // - if expired → 'expired'
        // - else → 'success'
    }
    
    private function publicResponse(
        string $result,
        ?ChequeGuarantee $guarantee
    ): array
    {
        // Return safe public data
        // No sensitive info if failed
    }
    
    private function isSuspicious(
        string $fingerprint,
        Request $request
    ): bool
    {
        // Check:
        // - 5+ failed attempts from IP in 10 min
        // - 3+ failed attempts on same code in 1 hour
    }
}
```

### SecureVerificationCodeGenerator

```php
class SecureVerificationCodeGenerator
{
    private const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    
    public function generateUniqueCode(): string
    {
        // Loop until unique:
        // code = 'LB-' + segment() + '-' + segment()
        // segment = 4 random chars from ALPHABET
        // Example: 'LB-K9JM-7H2P'
    }
    
    public function hash(string $code): string
    {
        // HMAC-SHA256(normalize($code), app.key)
        // Database stores this, not original code
    }
    
    public function fingerprint(string $code): string
    {
        // HMAC-SHA256('attempt:' . normalize($code), app.key)
        // Used for rate limiting without revealing code
    }
    
    public function normalize(string $code): string
    {
        // trim($code).toUpperCase()
    }
    
    private function segment(): string
    {
        // 4 random characters from ALPHABET
    }
}
```

---

## ⚙️ Configuration Details

### Rate Limiting Configuration
**Location**: `app/Providers/AppServiceProvider.php`

```php
// Code verification limit
RateLimiter::for('cheque-verification', function (Request $request) {
    $code = strtoupper(trim((string) $request->input('code')));
    $fingerprint = hash_hmac('sha256', 'rate:'.$code, (string) config('app.key'));

    return [
        // 8 requests per minute per IP
        Limit::perMinute(8)->by($request->ip()),
        // 20 requests per hour per IP + code combo
        Limit::perHour(20)->by($request->ip().'|'.$fingerprint),
    ];
});

// Guarantee management limit
RateLimiter::for('cheque-guarantee-management', function (Request $request) {
    // 60 requests per minute per authenticated user
    return Limit::perMinute(60)->by((string) ($request->user()?->id ?: $request->ip()));
});
```

### Job Scheduling Configuration
**Location**: `routes/console.php`

```php
// Runs every 5 minutes (even if request queue is empty)
Schedule::job(new ReleaseExpiredChequeReservations)->everyFiveMinutes();

// Other schedule options:
// ->everyMinute()
// ->everyTwoMinutes()
// ->everyFiveMinutes()  ← USED
// ->everyTenMinutes()
// ->everyFifteenMinutes()
// ->everyThirtyMinutes()
// ->hourly()
// ->daily()
// ->weeklyOn(1)  // Monday
// ->monthlyOn(15)
// ->quarterly()
// ->yearly()

// Can also use cron expression:
// ->cron('*/5 * * * *')  // Every 5 minutes
```

### Authorization Policy
**Location**: `app/Policies/ChequeGuaranteePolicy.php`

```php
class ChequeGuaranteePolicy
{
    public function viewAny(User $user): bool
    {
        return true;  // All users can list (will be filtered by controller)
    }

    public function view(User $user, ChequeGuarantee $guarantee): bool
    {
        return $guarantee->issuer_id === $user->id;  // Only issuer can view
    }

    public function disable(User $user, ChequeGuarantee $guarantee): bool
    {
        return $guarantee->issuer_id === $user->id && $guarantee->status === 'active';
    }
}
```

### Validation Rules
**Location**: `app/Http/Requests/ChequeGuarantees/StoreChequeGuaranteeRequest.php`

```php
public function rules(): array
{
    return [
        'account_id' => ['required', 'integer', Rule::exists('accounts', 'id')],
        'cheque_number' => ['nullable', 'string', 'max:80'],
        'cheque_amount' => ['required', 'numeric', 'min:1', 'max:999999999999.99'],
        'payable_to' => ['nullable', 'string', 'max:160'],
        'cheque_date' => ['nullable', 'date'],
        'verification_enabled' => ['sometimes', 'boolean'],
        'verifiable_amount' => [
            'required_if:verification_enabled,true',
            'numeric',
            'min:1',
            'lte:cheque_amount'
        ],
        'reservation_enabled' => ['sometimes', 'boolean'],
        'reservation_duration_hours' => [
            'required_if:reservation_enabled,true',
            'integer',
            Rule::in([24, 48, 72, 168, 336, 720])  // 1, 2, 3, 7, 14, 30 days
        ],
    ];
}
```

---

## ⚡ Performance Considerations

### Database Indexing

```sql
-- In cheque_guarantees table
INDEX `cheque_guarantees_issuer_status` (issuer_id, status)
INDEX `cheque_guarantees_account_status` (account_id, status)
INDEX `cheque_guarantees_code_expires` (code_expires_at)

-- In cheque_verification_attempts table
INDEX `cheque_verification_attempts_ip_created` (ip_address, created_at)
INDEX `cheque_verification_attempts_result_created` (result, created_at)
INDEX `cheque_verification_attempts_suspicious_created` (suspicious, created_at)

-- In cheque_guarantee_audits table
INDEX `cheque_guarantee_audits_guarantee_created` (cheque_guarantee_id, created_at)
INDEX `cheque_guarantee_audits_actor_created` (actor_id, created_at)

-- In cheque_fund_reservations table
INDEX `cheque_fund_reservations_account_status` (account_id, status)
INDEX `cheque_fund_reservations_expires_at` (expires_at)  -- For releaseExpired()
```

### Query Optimization

```php
// ❌ Bad: N+1 query problem
$guarantees = ChequeGuarantee::all();
foreach ($guarantees as $guarantee) {
    echo $guarantee->reservation->amount;  // Extra query per loop
}

// ✅ Good: Eager loading
$guarantees = ChequeGuarantee::with('reservation')->get();
foreach ($guarantees as $guarantee) {
    echo $guarantee->reservation->amount;  // No extra queries
}

// ❌ Bad: Loading all attempts
$guarantee->attempts;  // Could be thousands

// ✅ Good: Paginate or limit
$attempts = $guarantee->attempts()->latest()->limit(50)->get();

// ❌ Bad: Slow aggregation
$total = ChequeFundReservation::where('account_id', 1)
    ->where('status', 'active')
    ->sum('amount');

// ✅ Good: Use database aggregation
$total = ChequeFundReservation::where('account_id', 1)
    ->active()  // Scoped
    ->sum('amount');
```

### Scaling Considerations

1. **Fund Reservations Processing**
   - Chunks of 100 records
   - Scales to millions of records
   - Uses query builder (no hydration overhead)

2. **Verification Attempts Logging**
   - High write volume
   - Consider: Separate table partitioning by date
   - Archive old data (>30 days)

3. **Code Lookups**
   - Single indexed query: `where verification_code_hash = ?`
   - O(1) performance regardless of table size

4. **Queue Processing**
   - Run multiple queue workers for parallel processing
   - Monitor queue depth
   - Consider: Redis driver for high throughput

---

## 🚀 Deployment Guide

### 1. Pre-Deployment Checklist

```bash
# Run tests
php artisan test

# Check code quality
./vendor/bin/pint

# Static analysis
./vendor/bin/phpstan analyse

# Security scanning
composer audit

# Database validation
php artisan migrate:status
```

### 2. Database Migrations

```bash
# In development
php artisan migrate --fresh --seed

# In production (careful!)
php artisan migrate --force

# Verify migrations
php artisan migrate:status
```

### 3. Queue Configuration

```bash
# .env
QUEUE_CONNECTION=database  # or redis, sync

# Run queue in production
# Option 1: Supervisor (recommended)
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/artisan queue:work --tries=3
autostart=true
autorestart=true
numprocs=4
redirect_stderr=true
stdout_logfile=/var/log/worker.log

# Option 2: Run with nohup
nohup php artisan queue:work --daemon &

# Option 3: Docker
docker run --rm app php artisan queue:work
```

### 4. Scheduler Setup

```bash
# Add to crontab
* * * * * cd /path/to/app && php artisan schedule:run >> /dev/null 2>&1

# Or use Docker cron service
# Or Kubernetes CronJob

# Verify it's running
php artisan schedule:list
```

### 5. Environment Variables

```bash
# .env production
APP_ENV=production
APP_DEBUG=false
QUEUE_CONNECTION=redis  # or database
CACHE_DRIVER=redis
SESSION_DRIVER=redis

# Database
DB_CONNECTION=mysql
DB_DATABASE=lions_bank_prod
DB_USERNAME=db_user
DB_PASSWORD=strong_password

# Mail (for notifications)
MAIL_DRIVER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_FROM_ADDRESS=noreply@lionsbank.com

# Rate limiting (Redis required for distributed systems)
RATE_LIMIT_DRIVER=redis
```

### 6. Monitoring

```php
// Add health check endpoint
Route::get('/health', function () {
    // Check database
    DB::connection()->getPdo();
    
    // Check queue
    Queue::size();
    
    // Check redis (if used)
    Cache::store('redis')->get('test');
    
    return response()->json(['status' => 'ok']);
});

// Monitor queue
php artisan queue:monitor
```

### 7. Backup Strategy

```bash
# Backup database before operations
mysqldump -u user -p database > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup code repository
git tag v1.0-release
git push origin --tags

# Backup configuration
tar czf config_backup_$(date +%Y%m%d).tar.gz .env storage/
```

---

## 📊 Monitoring & Alerts

### Key Metrics to Monitor

1. **Fund Reservation Health**
   ```sql
   SELECT COUNT(*) FROM cheque_fund_reservations WHERE status = 'active';
   SELECT SUM(amount) FROM cheque_fund_reservations WHERE status = 'active';
   ```

2. **Verification Activity**
   ```sql
   SELECT COUNT(*), result FROM cheque_verification_attempts 
   WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
   GROUP BY result;
   ```

3. **Suspicious Activity**
   ```sql
   SELECT COUNT(*) FROM cheque_verification_attempts 
   WHERE suspicious = true AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
   ```

4. **Queue Health**
   ```bash
   php artisan queue:failed  # List failed jobs
   php artisan queue:retry all  # Retry failed jobs
   ```

5. **Job Execution**
   ```bash
   tail -f storage/logs/laravel.log | grep ReleaseExpiredChequeReservations
   ```

---

## 🔒 Security Audit Checklist

- [x] Authentication required for user operations
- [x] Authorization policies enforced
- [x] Input validation on all endpoints
- [x] Rate limiting configured
- [x] SQL injection prevention (Eloquent ORM)
- [x] CSRF protection (Sanctum tokens)
- [x] Code hashing (HMAC-SHA256)
- [x] Transaction safety
- [x] Suspicious activity tracking
- [x] Audit logging enabled
- [ ] HTTPS enforcement in production
- [ ] API key rotation policy
- [ ] DDoS protection (WAF/CDN)
- [ ] Regular security audits
- [ ] Penetration testing

---

**Version**: 1.0  
**Last Updated**: May 11, 2026
