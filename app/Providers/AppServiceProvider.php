<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureRateLimiting();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('cheque-verification', function (Request $request) {
            $code = strtoupper(trim((string) $request->input('code')));
            $fingerprint = hash_hmac('sha256', 'rate:'.$code, (string) config('app.key'));

            return [
                Limit::perMinute(8)->by($request->ip()),
                Limit::perHour(20)->by($request->ip().'|'.$fingerprint),
            ];
        });

        RateLimiter::for('cheque-guarantee-management', function (Request $request) {
            return Limit::perMinute(60)->by((string) ($request->user()?->id ?: $request->ip()));
        });

        RateLimiter::for('credit-request-management', function (Request $request) {
            return Limit::perMinute(40)->by((string) ($request->user()?->id ?: $request->ip()));
        });

        RateLimiter::for('credit-request-tracking', function (Request $request) {
            $code = strtoupper(trim((string) $request->input('tracking_code')));
            $fingerprint = hash_hmac('sha256', 'credit-track:'.$code, (string) config('app.key'));

            return [
                Limit::perMinute(10)->by($request->ip()),
                Limit::perHour(30)->by($request->ip().'|'.$fingerprint),
            ];
        });
    }
}
