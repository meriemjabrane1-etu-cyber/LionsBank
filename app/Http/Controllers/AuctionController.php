<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Auction;
use App\Models\Product;
use Inertia\Inertia;

class AuctionController extends Controller
{
    public function index()
    {
        $auctions = Auction::with('products')->get();
        return Inertia::render('auctions', [
            'auctions' => $auctions
        ]);
    }

    public function join(Auction $auction)
    {
        // Simulate joining (no real logic for now as per request)
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

        return back()->with('success', "Bid placed successfully on {$product->name}!");
    }
}
