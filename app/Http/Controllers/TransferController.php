<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransferController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Ensure user is authenticated and client role
        abort_unless($user && $user->role === 'client', 403);

        $accounts = $user->accounts()->latest()->get();
        
        // Get recent transactions that are transfers
        $recentTransfers = Transaction::with('account')
            ->whereHas('account', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->whereIn('type', ['transfer_out', 'transfer_in'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Virements', [
            'accounts' => $accounts,
            'recentTransfers' => $recentTransfers,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        abort_unless($user && $user->role === 'client', 403);

        $validated = $request->validate([
            'sender_account_id' => 'required|exists:accounts,id',
            'receiver_account_number' => 'required|string|exists:accounts,account_number',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
        ]);

        $senderAccount = Account::where('id', $validated['sender_account_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $receiverAccount = Account::where('account_number', $validated['receiver_account_number'])->firstOrFail();

        // Prevent transfer to the same account
        if ($senderAccount->id === $receiverAccount->id) {
            return back()->withErrors([
                'receiver_account_number' => 'You cannot transfer money to the same account.',
            ]);
        }

        // Check sufficient balance
        if ($senderAccount->balance < $validated['amount']) {
            return back()->withErrors([
                'amount' => 'Insufficient funds for this transfer.',
            ]);
        }

        try {
            DB::transaction(function () use ($senderAccount, $receiverAccount, $validated) {
                // Deduct from sender
                $senderAccount->balance -= $validated['amount'];
                $senderAccount->save();

                // Add to receiver
                $receiverAccount->balance += $validated['amount'];
                $receiverAccount->save();

                // Create sender transaction record
                Transaction::create([
                    'account_id' => $senderAccount->id,
                    'type' => 'transfer_out',
                    'amount' => -$validated['amount'],
                    'status' => 'completed',
                    'description' => 'To ' . $receiverAccount->account_number . ': ' . $validated['description'],
                ]);

                // Create receiver transaction record
                Transaction::create([
                    'account_id' => $receiverAccount->id,
                    'type' => 'transfer_in',
                    'amount' => $validated['amount'],
                    'status' => 'completed',
                    'description' => 'From ' . $senderAccount->account_number . ': ' . $validated['description'],
                ]);
            });

            return back()->with('success', 'Transfer completed successfully.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'An error occurred during the transfer. Please try again.',
            ]);
        }
    }
}
