import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { Search, Gavel, Clock, MoreHorizontal, Box, TrendingUp, CheckCircle2, Lock, Eye, Zap, Flame, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { HoldToConfirmButton } from '@/components/ui/hold-to-confirm-button';

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
    isVip?: boolean;
    accessFee?: number;
    liveViewers?: number;
}

export default function AuctionsPage({ auctions: initialAuctions }: { auctions: Auction[] }) {
    const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
    const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
    const [search, setSearch] = useState('');
    const [unlockedVips, setUnlockedVips] = useState<number[]>([]);
    const [authorizingAuction, setAuthorizingAuction] = useState<Auction | null>(null);

    // Enhance auctions with VIP mocked data
    const auctions = useMemo(() => {
        return initialAuctions.map((auction, index) => ({
            ...auction,
            isVip: index % 3 === 0, // Make every 3rd auction VIP for demo
            accessFee: 5000 + (index * 1000), // Randomish fee
            liveViewers: Math.floor(Math.random() * 50) + 10,
        }));
    }, [initialAuctions]);

    // Mock Flash Auction (grab the first live one or just one of them)
    const flashAuction = useMemo(() => auctions.find(a => a.status === 'live'), [auctions]);
    const [flashTime, setFlashTime] = useState(200); // 15 mins

    useEffect(() => {
        const timer = setInterval(() => setFlashTime(prev => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const filteredAuctions = auctions.filter(auction => {
        if (auction.id === flashAuction?.id) return false; // Hide flash from normal grid
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
        const amount = currentBid + 1000;
        router.post(`/auctions/product/${productId}/bid`, { amount }, {
            onSuccess: () => toast.success('Bid placed successfully!', {
                style: { background: '#0F3433', color: '#fff', border: '1px solid #1bd382' }
            }),
        });
    };

    const authorizeVipAccess = () => {
        if (!authorizingAuction) return;
        setUnlockedVips(prev => [...prev, authorizingAuction.id]);
        toast.success(`${authorizingAuction.accessFee} MAD Locked in Escrow. Access Granted.`, {
            style: { background: '#0F3433', color: '#fff', border: '1px solid #1bd382' }
        });
        setTimeout(() => setAuthorizingAuction(null), 1000); // Close modal after delay
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

                    {/* FLASH AUCTION SECTION */}
                    {flashAuction && filter !== 'ended' && search === '' && (
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-[#1bd382] fill-[#1bd382] animate-pulse" />
                                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Flash Liquidation</h2>
                            </div>
                            <div className="relative bg-gradient-to-r from-[#1bd382]/20 to-[#0b2827]/60 rounded-[32px] border border-[#1bd382]/30 overflow-hidden shadow-[0_0_40px_rgba(27,211,130,0.1)] p-1">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                                <div className="flex flex-col md:flex-row items-center gap-8 p-6 relative z-10">
                                    <div className="w-full md:w-1/3 aspect-[4/3] rounded-[24px] overflow-hidden relative">
                                        <img 
                                            src={flashAuction.products[0]?.image_url || '/images/auctions/fallback.png'} 
                                            alt={flashAuction.title} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => { e.currentTarget.src = '/images/auctions/fallback.png'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#061818] to-transparent opacity-80" />
                                        <div className="absolute bottom-4 left-4">
                                            <Badge className="bg-[#1bd382] text-[#061818] border-none font-bold text-lg px-4 py-1 animate-pulse">
                                                {formatTime(flashTime)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-[#1bd382] border-[#1bd382]/30 bg-[#1bd382]/10"><Flame className="w-3 h-3 mr-1"/> HOT ASSET</Badge>
                                            <div className="flex items-center gap-1.5 text-[#9CA3AF] text-sm font-semibold bg-[#061818] px-3 py-1 rounded-full border border-[#1a4f4d]">
                                                <Eye className="w-4 h-4 text-[#1bd382]" />
                                                <span>{flashAuction.liveViewers! * 3} Viewers Active</span>
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white">{flashAuction.title}</h3>
                                        <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xl">{flashAuction.description}</p>
                                        
                                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-end">
                                            <div>
                                                <span className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">Liquidate Now Price</span>
                                                <div className="text-3xl font-bold text-[#1bd382] mt-1">
                                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flashAuction.current_price * 1.5)}
                                                </div>
                                            </div>
                                            <Button 
                                                onClick={() => handleJoin(flashAuction.id)}
                                                className="bg-[#1bd382] hover:bg-white text-[#061818] rounded-xl h-14 px-8 font-bold text-lg shadow-[0_0_20px_rgba(27,211,130,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300"
                                            >
                                                Authorize Hostile Takeover
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 mb-6">
                        <Box className="w-5 h-5 text-[#1bd382]" />
                        <h2 className="text-xl font-bold text-white tracking-widest uppercase">Premium Assets</h2>
                    </div>

                    {/* Auction Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredAuctions.map((auction) => {
                                const isVipLocked = auction.isVip && !unlockedVips.includes(auction.id);
                                return (
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
                                                src={auction.products[0]?.image_url || '/images/auctions/fallback.png'} 
                                                alt={auction.title}
                                                onError={(e) => { e.currentTarget.src = '/images/auctions/fallback.png'; }}
                                                className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isVipLocked ? 'blur-xl scale-110 grayscale opacity-40' : 'group-hover:scale-105'}`}
                                            />
                                            
                                            {/* VIP Lock Overlay */}
                                            {isVipLocked && (
                                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center border border-[#1a4f4d] mb-2 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                                                        <Lock className="w-5 h-5 text-[#9CA3AF]" />
                                                    </div>
                                                    <span className="text-white font-bold tracking-widest text-sm uppercase">Classified Asset</span>
                                                </div>
                                            )}

                                            <div className="absolute top-4 left-4 flex gap-2 z-30">
                                                <Badge className={`${getStatusStyle(auction.status)} border font-bold px-3 py-1 rounded-full backdrop-blur-md tracking-wide`}>
                                                    {auction.status.toUpperCase()}
                                                </Badge>
                                                {!isVipLocked && (
                                                    <Badge variant="outline" className="bg-[#061818]/60 backdrop-blur-md text-white border-[#1a4f4d] font-bold">
                                                        {auction.product_type.toUpperCase()}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Live Users Metric */}
                                            {auction.status === 'live' && (
                                                <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 text-xs font-semibold bg-[#1bd382]/20 text-[#1bd382] border border-[#1bd382]/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                                                    <Eye className="w-3 h-3" />
                                                    <span>{auction.liveViewers}</span>
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="p-6 pb-2 relative z-20">
                                            <h3 className="text-xl font-bold text-white line-clamp-1 tracking-wide group-hover:text-[#1bd382] transition-colors">
                                                {isVipLocked ? 'RESTRICTED VIP ASSET' : auction.title}
                                            </h3>
                                            <p className="text-[#9CA3AF] text-sm line-clamp-2 mt-2 leading-relaxed">
                                                {isVipLocked ? 'This asset is protected under LionsBank Escrow regulations. Authorize proof of funds to decrypt details and view bidding floor.' : auction.description}
                                            </p>
                                        </CardHeader>

                                        <CardContent className="p-6 pt-2">
                                            <div className="flex items-center justify-between py-4 border-b border-[#1a4f4d]/50">
                                                <div className={isVipLocked ? 'blur-sm select-none' : ''}>
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
                                            {isVipLocked ? (
                                                <Button 
                                                    onClick={() => setAuthorizingAuction(auction)}
                                                    className="w-full bg-[#061818] border border-[#1a4f4d] hover:border-[#1bd382] text-white hover:text-[#1bd382] rounded-xl h-12 font-bold transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(27,211,130,0.15)]"
                                                >
                                                    <Fingerprint className="w-5 h-5 mr-2" />
                                                    Decrypt Asset
                                                </Button>
                                            ) : (
                                                <>
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
                                                </>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                                );
                            })}
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
                                                    src={product.image_url || '/images/auctions/fallback.png'} 
                                                    alt={product.name}
                                                    onError={(e) => { e.currentTarget.src = '/images/auctions/fallback.png'; }}
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
                
                {/* Security Deposit / Access Pass Modal */}
                <AnimatePresence>
                    {authorizingAuction && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                                onClick={() => setAuthorizingAuction(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-md bg-[#0b2827] border border-[#1a4f4d] rounded-[32px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1bd382]/10 rounded-full blur-[80px] pointer-events-none" />
                                
                                <div className="text-center mb-8 relative z-10">
                                    <div className="w-20 h-20 bg-[#1bd382]/10 border border-[#1bd382]/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(27,211,130,0.2)]">
                                        <Lock className="w-8 h-8 text-[#1bd382]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Security Escrow Required</h2>
                                    <p className="text-[#9CA3AF] text-sm">
                                        This is a Class A restricted asset. To enter the bidding floor, you must lock a security deposit.
                                    </p>
                                </div>

                                <div className="bg-[#061818] border border-[#1a4f4d] rounded-2xl p-5 mb-8 relative z-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-[#9CA3AF]">Escrow Amount</span>
                                        <span className="font-bold text-[#1bd382] text-xl">{authorizingAuction.accessFee} MAD</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                                        <CheckCircle2 className="w-4 h-4 text-[#1bd382]" />
                                        <span>Fully refundable if auction is lost.</span>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <HoldToConfirmButton 
                                        onConfirm={authorizeVipAccess} 
                                        label={`Lock ${authorizingAuction.accessFee} MAD`}
                                        duration={2000}
                                    />
                                    <Button 
                                        variant="ghost"
                                        onClick={() => setAuthorizingAuction(null)}
                                        className="w-full mt-4 text-[#9CA3AF] hover:text-white hover:bg-transparent font-medium"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AppLayout>
    );
}
