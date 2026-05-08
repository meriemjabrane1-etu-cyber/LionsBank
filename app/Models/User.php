<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\Account;
class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function accounts()
    {
        return $this->hasMany(Account::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function employeeAppointments()
    {
        return $this->hasMany(Appointment::class, 'employee_id');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function auctions()
    {
        return $this->belongsToMany(Auction::class)
            ->withPivot('invited')
            ->withTimestamps();
    }

    public function chequeValidations()
    {
        return $this->hasMany(ChequeValidation::class, 'checked_by');
    }

    public function chequeGuarantees()
    {
        return $this->hasMany(ChequeGuarantee::class, 'issuer_id');
    }
}
