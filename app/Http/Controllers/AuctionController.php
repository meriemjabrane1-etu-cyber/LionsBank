<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auction;
use App\Models\Product;
use App\Models\Bid;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuctionController extends Controller
{
    protected function ensureEmployeeAccess(): void
    {
        abort_unless(auth()->user()?->role === 'employee', 403);
    }

    public function index()
    {
        $auctions = Auction::with('products')->get();
        return Inertia::render('Auctions', [
            'auctions' => $auctions
        ]);
    }

    public function employeeDashboard()
    {
        $this->ensureEmployeeAccess();

        $auctions = Auction::with(['products', 'bids.user'])
            ->withCount('bids')
            ->latest()
            ->get();

        return Inertia::render('employee/auctions', [
            'auctions' => $auctions,
            'stats' => [
                'total' => $auctions->count(),
                'active' => $auctions->where('status', 'active')->count(),
                'pending' => $auctions->where('status', 'pending')->count(),
                'finished' => $auctions->where('status', 'finished')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureEmployeeAccess();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'product_type' => 'required|string',
            'starting_price' => 'required|numeric',
            'end_date' => 'required|date|after:now',
        ]);

        Auction::create(array_merge($validated, [
            'status' => 'pending',
            'current_price' => $request->starting_price,
            'start_date' => now(),
        ]));

        return back()->with('success', 'Auction created successfully.');
    }

    public function toggleStatus(Auction $auction)
    {
        $this->ensureEmployeeAccess();

        $newStatus = $auction->status === 'active' ? 'pending' : 'active';
        $auction->update(['status' => $newStatus]);

        return back()->with('success', "Auction is now {$newStatus}.");
    }

    public function declareWinner(Auction $auction)
    {
        $this->ensureEmployeeAccess();

        $auction->update(['status' => 'finished']);

        return back()->with('success', 'Auction ended and winner declared.');
    }

    public function deleteAuction(Auction $auction)
    {
        $this->ensureEmployeeAccess();

        // Explicitly delete related records to avoid constraint issues
        $auction->bids()->delete();
        $auction->products()->delete();
        $auction->delete();

        return back()->with('success', 'Auction deleted successfully.');
    }

    public function addProduct(Request $request, Auction $auction)
    {
        $this->ensureEmployeeAccess();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'starting_bid' => 'required|numeric|min:0',
        ]);

        $imagePath = null;
        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('products', 'public');
            $imagePath = '/storage/' . $path;
        }

        $auction->products()->create([
            'name' => $validated['name'],
            'image_url' => $imagePath,
            'current_bid' => $validated['starting_bid'],
        ]);

        return back()->with('success', 'Item added to auction successfully.');
    }

    public function deleteProduct(Product $product)
    {
        $this->ensureEmployeeAccess();

        $product->delete();

        return back()->with('success', 'Item removed from auction.');
    }

    public function join(Auction $auction)
    {
        return back()->with('success', "You have joined the auction: {$auction->title}");
    }

    public function bid(Request $request, Product $product)
    {
        $request->validate([
            'amount' => 'required|numeric|gt:' . $product->current_bid,
        ]);

        $product->update([
            'current_bid' => $request->amount
        ]);

        // Create a record in the bids table
        Bid::create([
            'user_id' => Auth::id(),
            'auction_id' => $product->auction_id,
            'amount' => $request->amount,
        ]);

        return back()->with('success', "Bid placed successfully on {$product->name}!");
    }
}
