<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RequestedUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Frande',
                'email' => 'frande@gmail.com',
                'password' => 'password',
                'account_number' => 'ACC-FRANDE-001',
                'balance' => 30000,
            ],
            [
                'name' => 'anasss',
                'email' => 'anass@gmail.com',
                'password' => 'password',
                'account_number' => 'ACC-ANASSS-001',
                'balance' => 30000,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'role' => 'client',
                    'email_verified_at' => now(),
                ]
            );

            $account = $user->accounts()
                ->where('type', 'current')
                ->first();

            if ($account) {
                $account->update([
                    'balance' => $userData['balance'],
                ]);

                continue;
            }

            Account::firstOrCreate(
                ['account_number' => $userData['account_number']],
                [
                    'user_id' => $user->id,
                    'balance' => $userData['balance'],
                    'type' => 'current',
                ]
            );
        }
    }
}
