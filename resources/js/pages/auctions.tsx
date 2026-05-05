import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Gavel, Clock, MoreHorizontal, Box, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

interface Product {
    id: number;
    name: string;
    image_url: string;
    current_bid: number;
    auction_id: number;
}

interface Auction {
    id: number;
    title: string;
    product_type: 'car' | 'gold' | 'house' | 'other';
    description: string;
    start_date: string;
    end_date: string;
    starting_price: number;
    current_price: number;
    status: 'live' | 'upcoming' | 'ended';
    products: Product[];
}

export default function AuctionsPage({ auctions }: { auctions: Auction[] }) {
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
    const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
    const [search, setSearch] = useState('');

    const filteredAuctions = auctions.filter(auction => {
        const matchesFilter = filter === 'all' || auction.status === filter;
        const matchesSearch = auction.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'live': return 'bg-[#1bd382]/10 text-[#1bd382] border-[#1bd382]/30';
            case 'upcoming': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            case 'ended': return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
        }
    };

    const handleJoin = (auctionId: number) => {
        router.post(`/auctions/${auctionId}/join`, {}, {
            onSuccess: () => toast.success('Successfully joined the auction!', {
                style: { background: '#0F3433', color: '#fff', border: '1px solid #1bd382' }
            }),
        });
    };

    const handleBid = (productId: number, currentBid: number) => {
        const amount = currentBid + 1000; // Simulate bid
        router.post(`/auctions/product/${productId}/bid`, { amount }, {
            onSuccess: () => toast.success('Bid placed successfully!', {
                style: { background: '#0F3433', color: '#fff', border: '1px solid #1bd382' }
            }),
        });
    };

    const breadcrumbs = [{ title: 'Auctions', href: '/auctions' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Auctions / Mazad - LionsBank" />
            
            <div className="min-h-screen bg-[#071d1d] pb-20 text-white selection:bg-[#1bd382]/30 relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1bd382]/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#1bd382]/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Header Section */}
                <div className="bg-[#0b2827]/80 backdrop-blur-xl border-b border-[#1a4f4d] pt-8 pb-12 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                    Auctions / <span className="text-[#1bd382] drop-shadow-[0_0_10px_rgba(27,211,130,0.5)]">Mazad</span>
                                </h1>
                                <p className="text-[#9CA3AF] mt-2 text-lg font-light">Explore premium live auctions and place secure bids.</p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative w-full sm:w-80">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                                    <Input 
                                        placeholder="Search premium assets..." 
                                        className="pl-10 bg-[#061818] border-[#1a4f4d] text-white placeholder:text-[#6B7280] focus-visible:ring-[#1bd382]/50 focus-visible:border-[#1bd382] rounded-xl h-11"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="flex bg-[#061818] p-1 rounded-xl border border-[#1a4f4d]">
                                    {(['all', 'live', 'upcoming', 'ended'] as const).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                                                filter === f 
                                                ? 'bg-[#1bd382] text-[#061818] shadow-[0_0_10px_rgba(27,211,130,0.5)]' 
                                                : 'text-[#9CA3AF] hover:text-white'
                                            }`}
                                        >
                                            {f.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
                    {/* Auction Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredAuctions.map((auction) => (
                                <motion.div
                                    key={auction.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className={`group bg-[#0b2827]/60 backdrop-blur-sm border-[#1a4f4d] rounded-[24px] overflow-hidden hover:border-[#1bd382]/50 hover:shadow-[0_8px_30px_rgba(27,211,130,0.15)] transition-all duration-300 ${selectedAuction?.id === auction.id ? 'ring-2 ring-[#1bd382] shadow-[0_0_20px_rgba(27,211,130,0.2)]' : ''}`}>
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2827] via-transparent to-transparent z-10 opacity-80" />
                                            <img 
                                                src={auction.products[0]?.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'} 
                                                alt={auction.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute top-4 left-4 flex gap-2 z-20">
                                                <Badge className={`${getStatusStyle(auction.status)} border font-bold px-3 py-1 rounded-full backdrop-blur-md tracking-wide`}>
                                                    {auction.status.toUpperCase()}
                                                </Badge>
                                                <Badge variant="outline" className="bg-[#061818]/60 backdrop-blur-md text-white border-[#1a4f4d] font-bold">
                                                    {auction.product_type.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardHeader className="p-6 pb-2 relative z-20">
                                            <h3 className="text-xl font-bold text-white line-clamp-1 tracking-wide group-hover:text-[#1bd382] transition-colors">{auction.title}</h3>
                                            <p className="text-[#9CA3AF] text-sm line-clamp-2 mt-2 leading-relaxed">{auction.description}</p>
                                        </CardHeader>

                                        <CardContent className="p-6 pt-2">
                                            <div className="flex items-center justify-between py-4 border-b border-[#1a4f4d]/50">
                                                <div>
                                                    <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">Current Valuation</span>
                                                    <div className="text-2xl font-bold text-white mt-1">
                                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(auction.current_price)}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">Time Remaining</span>
                                                    <div className="flex items-center gap-1.5 text-white font-semibold mt-1 bg-[#061818] px-3 py-1 rounded-lg border border-[#1a4f4d]">
                                                        <Clock className="w-4 h-4 text-[#1bd382] animate-pulse" />
                                                        <span>2d 14h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-6 pt-0 gap-3">
                                            <Button 
                                                onClick={() => handleJoin(auction.id)}
                                                disabled={auction.status !== 'live'}
                                                className="flex-1 bg-[#1bd382] hover:bg-white text-[#061818] rounded-xl h-12 font-bold shadow-[0_0_15px_rgba(27,211,130,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                                            >
                                                <Gavel className="w-5 h-5 mr-2" />
                                                Join Auction
                                            </Button>
                                            <Button 
                                                variant="outline"
                                                onClick={() => setSelectedAuction(selectedAuction?.id === auction.id ? null : auction)}
                                                className="border-[#1a4f4d] bg-[#061818] hover:bg-[#1bd382]/10 hover:border-[#1bd382] text-white hover:text-[#1bd382] rounded-xl h-12 px-4 transition-colors"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Products Section (Appears on click) */}
                    <AnimatePresence>
                        {selectedAuction && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-16 bg-[#0b2827]/80 backdrop-blur-xl rounded-[32px] p-8 border border-[#1bd382]/30 shadow-[0_10px_50px_rgba(27,211,130,0.1)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1bd382]/10 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1a4f4d] relative z-10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-1.5 bg-[#1bd382]/20 rounded-md border border-[#1bd382]/30">
                                                <Box className="w-4 h-4 text-[#1bd382]" />
                                            </div>
                                            <span className="text-[#1bd382] text-xs font-bold uppercase tracking-widest">Auction Portfolio</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-wide">Assets in "{selectedAuction.title}"</h2>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => setSelectedAuction(null)}
                                        className="text-[#9CA3AF] hover:text-white hover:bg-[#061818] rounded-xl"
                                    >
                                        Close Section
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                    {selectedAuction.products.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            whileHover={{ y: -5 }}
                                            className="bg-[#061818] border border-[#1a4f4d] rounded-[20px] p-4 group transition-all duration-300 hover:border-[#1bd382]/50 hover:shadow-[0_8px_30px_rgba(27,211,130,0.1)]"
                                        >
                                            <div className="aspect-[4/3] rounded-[16px] overflow-hidden mb-4 relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#061818] to-transparent opacity-60 z-10" />
                                                <img 
                                                    src={product.image_url} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <h4 className="font-bold text-white mb-4 line-clamp-1 group-hover:text-[#1bd382] transition-colors">{product.name}</h4>
                                            
                                            <div className="bg-[#0b2827] p-3 rounded-[16px] border border-[#1a4f4d] mb-5">
                                                <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mb-1">Current Bid</div>
                                                <div className="text-lg font-bold text-[#1bd382]">
                                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.current_bid)}
                                                </div>
                                            </div>

                                            <Button 
                                                onClick={() => handleBid(product.id, product.current_bid)}
                                                disabled={selectedAuction.status !== 'live'}
                                                className="w-full bg-transparent border border-[#1bd382]/50 text-[#1bd382] hover:bg-[#1bd382] hover:text-[#061818] hover:shadow-[0_0_20px_rgba(27,211,130,0.4)] rounded-xl font-bold h-11 transition-all duration-300"
                                            >
                                                Place Bid
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}
