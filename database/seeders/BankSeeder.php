<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\Card;
use App\Models\Cheque;
use App\Models\ChequeValidation;
use App\Models\Agency;
use App\Models\Atm;
use App\Models\Appointment;
use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Support\Facades\Hash;

class BankSeeder extends Seeder
{
    public function run(): void
    {
        // 👤 USERS
        $client = User::create([
            'name' => 'Ahmed',
            'email' => 'ahmed@test.com',
            'password' => Hash::make('password1'),
            'role' => 'client',
            'phone' => '0600000000'
        ]);

        $client2 = User::create([
            'name' => 'Omar',
            'email' => 'omar@test.com',
            'password' => Hash::make('password2'),
            'role' => 'client',
            'phone' => '0611111111'
        ]);

        $employee = User::create([
            'name' => 'Employee',
            'email' => 'employee@test.com',
            'password' => Hash::make('password123'),
            'role' => 'employee'
        ]);
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password012'),
            'role' => 'admin',
            'phone' => '0622222222'
        ]);

        // 💰 ACCOUNTS
        $acc1 = Account::create([
            'user_id' => $client->id,
            'account_number' => 'ACC001',
            'balance' => 10000,
            'type' => 'current'
        ]);

        $acc2 = Account::create([
            'user_id' => $client2->id,
            'account_number' => 'ACC002',
            'balance' => 5000,
            'type' => 'current'
        ]);

        // 💳 CARDS
        Card::create([
            'account_id' => $acc1->id,
            'card_number' => '1111222233334444',
            'type' => 'visa',
            'status' => 'active',
            'limit_amount' => 5000
        ]);

        Card::create([
            'account_id' => $acc2->id,
            'card_number' => '5555666677778888',
            'type' => 'visa',
            'status' => 'active',
            'limit_amount' => 3000
        ]);

        // 📊 TRANSACTIONS
        Transaction::create([
            'account_id' => $acc1->id,
            'type' => 'deposit',
            'amount' => 10000,
            'status' => 'completed',
            'description' => 'Initial deposit'
        ]);

        Transaction::create([
            'account_id' => $acc2->id,
            'type' => 'deposit',
            'amount' => 5000,
            'status' => 'completed',
            'description' => 'Initial deposit'
        ]);

        // 🧾 CHEQUES
        $cheque = Cheque::create([
            'account_id' => $acc1->id,
            'cheque_number' => 'CHQ001',
            'amount' => 1500,
            'status' => 'valid',
            'issued_at' => now()
        ]);

        // 🔍 CHEQUE VALIDATION
        ChequeValidation::create([
            'cheque_id' => $cheque->id,
            'checked_by' => $client->id,
            'result' => 'valid'
        ]);

        // 🏦 AGENCIES
        $agency = Agency::create([
            'name' => 'Casablanca Center',
            'address' => 'Casablanca',
            'latitude' => 33.5731,
            'longitude' => -7.5898
        ]);

        // 🏧 ATMS
        Atm::create([
            'agency_id' => $agency->id,
            'name' => 'ATM 1',
            'status' => 'active',
            'cash_available' => 100
        ]);

        Atm::create([
            'agency_id' => $agency->id,
            'name' => 'ATM 2',
            'status' => 'active',
            'cash_available' => 50
        ]);

        // 📅 APPOINTMENTS
        Appointment::create([
            'user_id' => $client->id,
            'employee_id' => $employee->id,
            'service_type' => 'Card issue',
            'date' => now()->addDays(2),
            'status' => 'pending'
        ]);

        // 🦁 AUCTIONS
        $auction = Auction::create([
            'title' => 'Luxury Car',
            'product_type' => 'car',
            'description' => 'BMW 2024',
            'start_date' => now(),
            'end_date' => now()->addDays(5),
            'starting_price' => 50000,
            'current_price' => 50000,
            'status' => 'active'
        ]);

        // 🔗 INVITE USER TO AUCTION
        $auction->users()->attach($client->id, ['invited' => true]);

        // 💰 BIDS
        Bid::create([
            'user_id' => $client->id,
            'auction_id' => $auction->id,
            'amount' => 52000
        ]);
    }
}
