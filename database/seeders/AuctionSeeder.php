<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Auction;
use App\Models\Product;
use Carbon\Carbon;

class AuctionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Live Auction: Luxury Cars
        $carAuction = Auction::create([
            'title' => 'Executive Fleet Liquidation',
            'product_type' => 'car',
            'description' => 'A selection of high-end executive vehicles from the LionsBank corporate fleet.',
            'start_date' => Carbon::now()->subDays(1),
            'end_date' => Carbon::now()->addDays(3),
            'starting_price' => 150000.00,
            'current_price' => 165000.00,
            'status' => 'live',
        ]);

        Product::create([
            'name' => 'Mercedes-Benz S-Class 2023',
            'image_url' => '/images/auctions/car.png',
            'current_bid' => 85000.00,
            'auction_id' => $carAuction->id,
        ]);

        Product::create([
            'name' => 'BMW 7 Series 2024',
            'image_url' => '/images/auctions/car.png',
            'current_bid' => 80000.00,
            'auction_id' => $carAuction->id,
        ]);

        // 2. Upcoming Auction: Gold & Precious Metals
        $goldAuction = Auction::create([
            'title' => 'Premium Gold Bullion Event',
            'product_type' => 'gold',
            'description' => 'Direct auction of certified gold bars and precious metal reserves.',
            'start_date' => Carbon::now()->addDays(2),
            'end_date' => Carbon::now()->addDays(5),
            'starting_price' => 500000.00,
            'current_price' => 500000.00,
            'status' => 'upcoming',
        ]);

        Product::create([
            'name' => '1kg Gold Bar 999.9',
            'image_url' => '/images/auctions/gold.png',
            'current_bid' => 65000.00,
            'auction_id' => $goldAuction->id,
        ]);

        // 3. Ended Auction: Real Estate
        $houseAuction = Auction::create([
            'title' => 'Coastal Property Portfolio',
            'product_type' => 'house',
            'description' => 'Foreclosed luxury coastal properties offered at competitive starting prices.',
            'start_date' => Carbon::now()->subDays(10),
            'end_date' => Carbon::now()->subDays(2),
            'starting_price' => 1200000.00,
            'current_price' => 1450000.00,
            'status' => 'ended',
        ]);

        Product::create([
            'name' => 'Modern Beachfront Villa',
            'image_url' => '/images/auctions/villa.png',
            'current_bid' => 1450000.00,
            'auction_id' => $houseAuction->id,
        ]);
    }
}
