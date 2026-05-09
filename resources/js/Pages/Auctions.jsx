import { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { 
    Gavel, 
    Clock, 
    ShieldCheck, 
    Lock, 
    Timer, 
    CheckCircle2, 
    TrendingUp, 
    Fingerprint,
    Unlock,
    Info,
    LayoutGrid,
    Search,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Hold to Confirm Button component inside the file to avoid separate imports
const HoldToConfirmButton = ({ onConfirm, label, duration = 1500 }) => {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let interval;
        if (isHolding && !isComplete) {
            interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / duration) * 100, 100);
                setProgress(newProgress);
                
                if (newProgress === 100) {
                    setIsComplete(true);
                    setIsHolding(false);
                    onConfirm();
                }
            }, 10);
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isHolding, startTime, duration, onConfirm, isComplete]);

    const handleStart = () => {
        setStartTime(Date.now());
        setIsHolding(true);
    };

    const handleEnd = () => {
        setIsHolding(false);
    };

    return (
        <button
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            className="relative w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden group transition-all active:scale-95"
        >
            <div 
                className="absolute inset-0 bg-emerald-500/20 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
            <div className="relative z-10 flex items-center justify-center gap-3 font-bold text-slate-900 dark:text-white">
                <Fingerprint className={`h-5 w-5 ${isHolding ? 'animate-pulse text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-white/40'}`} />
                <span>{isComplete ? 'DECRYPTED' : isHolding ? 'BIOMETRIC SCAN...' : label}</span>
            </div>
        </button>
    );
};

export default function Auctions() {
    const { auctions } = usePage().props;
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [authorizingAuction, setAuthorizingAuction] = useState(null);
    const [unlockedAuctions, setUnlockedAuctions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewAssets = (auction) => {
        if (auction.isVip && !unlockedAuctions.includes(auction.id)) {
            setAuthorizingAuction(auction);
        } else {
            setSelectedAuction(auction);
        }
    };

    const authorizeVipAccess = () => {
        if (authorizingAuction) {
            setUnlockedAuctions([...unlockedAuctions, authorizingAuction.id]);
            setSelectedAuction(authorizingAuction);
            setAuthorizingAuction(null);
        }
    };

    const handleBid = (productId, currentBid) => {
        router.post(`/auctions/product/${productId}/bid`, {
            amount: Number(currentBid) + 1000
        }, {
            preserveScroll: true
        });
    };

    const breadcrumbs = [{ title: 'Mazad Auctions', href: '/auctions' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mazad VIP Auctions - LionsBank" />

            <div className="min-h-screen ml-8 py-10 pr-10 pl-0 text-slate-900 dark:text-white relative transition-colors duration-500 m-0 w-full max-w-none">
                <div className="w-full space-y-12 relative z-10 m-0 p-0 max-w-none">
                    
                    {/* Hero Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] border-[rgb(28,212,132)]/20 px-3 py-1 font-black text-[10px] tracking-widest uppercase">
                                    Encrypted Network
                                </Badge>
                                <div className="h-1 w-12 bg-gradient-to-r from-[rgb(28,212,132)] to-transparent rounded-full" />
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                                MAZAD <span className="text-[rgb(28,212,132)]">VIP</span>
                            </h1>
                            <p className="text-slate-500 dark:text-white/40 max-w-xl text-lg font-medium">
                                Access the world's most exclusive assets through our secure, high-stakes bidding floor.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/20 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                                <Input 
                                    placeholder="Find Asset..."
                                    className="w-64 bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 pl-11 h-12 rounded-2xl focus:ring-[rgb(28,212,132)]/50 focus:border-[rgb(28,212,132)] text-slate-900 dark:text-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button className="h-12 w-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                                <LayoutGrid className="h-5 w-5 text-slate-400 dark:text-white/40" />
                            </Button>
                        </div>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Active Sessions', value: '08', icon: Activity, color: 'rgb(28,212,132)' },
                            { label: 'Network Value', value: '$45.2M', icon: TrendingUp, color: 'cyan-400' },
                            { label: 'Security Level', value: 'Ultra', icon: ShieldCheck, color: 'emerald-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/80 dark:bg-[#062B29]/40 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-[rgb(28,212,132)]/20 transition-all shadow-sm dark:shadow-none">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                                </div>
                                <div className="h-12 w-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-[rgb(28,212,132)] transition-colors">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Auction Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AnimatePresence>
                            {auctions.map((auction) => (
                                <motion.div
                                    key={auction.id}
                                    layout
                                    className="bg-white/80 dark:bg-[#062B29]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[40px] overflow-hidden group hover:border-[rgb(28,212,132)]/40 transition-all duration-500 shadow-2xl relative"
                                >
                                    {/* Glass Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[rgb(28,212,132)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="p-8 lg:p-10">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Badge className={`${
                                                        auction.status === 'active' ? 'bg-emerald-500 text-[#041F1E]' : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/60'
                                                    } uppercase text-[10px] tracking-widest font-black px-3 py-1 rounded-full border-none`}>
                                                        {auction.status === 'active' && <span className="mr-2 inline-block w-1.5 h-1.5 bg-[#041F1E] rounded-full animate-ping" />}
                                                        {auction.status}
                                                    </Badge>
                                                    {auction.isVip && (
                                                        <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-500 uppercase text-[10px] tracking-widest font-black px-3 py-1 rounded-full bg-amber-500/5">
                                                            <Lock className="w-3 h-3 mr-1.5" />
                                                            VIP
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-[rgb(28,212,132)] transition-colors">{auction.title}</h3>
                                            </div>
                                            <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <Gavel className="h-7 w-7 text-slate-300 dark:text-white/20 group-hover:text-[rgb(28,212,132)] transition-colors" />
                                            </div>
                                        </div>
                                        <p className="text-slate-500 dark:text-white/40 leading-relaxed mb-8 text-lg">{auction.description}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="bg-slate-50 dark:bg-black/20 p-5 rounded-3xl border border-slate-100 dark:border-white/5 group-hover:border-[rgb(28,212,132)]/10 transition-colors">
                                                <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">
                                                    <Timer className="w-3 h-3 text-[rgb(28,212,132)]" />
                                                    Time Remaining
                                                </div>
                                                <div className="text-2xl font-black text-slate-900 dark:text-white">{auction.timeRemaining ?? 'Scheduled'}</div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-black/20 p-5 rounded-3xl border border-slate-100 dark:border-white/5 group-hover:border-[rgb(28,212,132)]/10 transition-colors">
                                                <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">
                                                    <TrendingUp className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                                                    Active Bids
                                                </div>
                                                <div className="text-2xl font-black text-slate-900 dark:text-white">{auction.products.length} Items</div>
                                            </div>
                                        </div>

                                        <Button 
                                            onClick={() => handleViewAssets(auction)}
                                            className={`w-full h-16 rounded-3xl font-black uppercase tracking-widest text-xs gap-3 transition-all duration-500 ${
                                                unlockedAuctions.includes(auction.id) || !auction.isVip
                                                ? "bg-[rgb(28,212,132)] text-[#041F1E] hover:bg-slate-900 dark:hover:bg-white shadow-[0_0_30px_rgba(28,212,132,0.15)]"
                                                : "bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                        >
                                            {unlockedAuctions.includes(auction.id) || !auction.isVip ? (
                                                <>
                                                    <Unlock className="w-4 h-4" />
                                                    Explore Portfolio
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-4 h-4" />
                                                    Authorize Floor Access
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Selected Auction Detail Floor Modal */}
                    <Dialog open={!!selectedAuction} onOpenChange={(open) => !open && setSelectedAuction(null)}>
                        <DialogContent className="!max-w-6xl w-full h-[85vh] bg-white/95 dark:bg-[#062B29]/95 backdrop-blur-3xl border-slate-200 dark:border-white/10 rounded-[50px] p-0 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-full bg-[rgb(28,212,132)]/[0.02] pointer-events-none" />
                            
                            {/* Modal Header */}
                            <div className="p-10 pb-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-[rgb(28,212,132)]/10 rounded-2xl flex items-center justify-center border border-[rgb(28,212,132)]/30">
                                        <LayoutGrid className="h-8 w-8 text-[rgb(28,212,132)]" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Active Floor Portfolio</DialogTitle>
                                        <p className="text-slate-400 dark:text-white/30 text-xs font-bold uppercase tracking-[0.2em] mt-1">Listing items for {selectedAuction?.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                                        {selectedAuction?.products.length} Items Listed
                                    </Badge>
                                </div>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-10 relative z-10 custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                                    {selectedAuction?.products.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            className="relative bg-white dark:bg-[#072422]/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/[0.08] rounded-[40px] p-6 group transition-all duration-500 hover:border-[rgb(28,212,132)]/40 hover:shadow-[0_30px_60px_-15px_rgba(28,212,132,0.2)] flex flex-col h-full overflow-hidden"
                                        >
                                            <div className="absolute -inset-px bg-gradient-to-br from-[rgb(28,212,132)]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[40px] transition-opacity duration-500 pointer-events-none" />
                                            
                                            <div className="relative aspect-square rounded-[30px] overflow-hidden mb-7 flex-shrink-0 shadow-2xl shadow-black/20">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity duration-500" />
                                                <img 
                                                    src={product.image_url || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800'} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                />
                                                <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                                                    <Badge className="bg-black/40 backdrop-blur-md text-[rgb(28,212,132)] border border-[rgb(28,212,132)]/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                                        LOT #{product.id}
                                                    </Badge>
                                                </div>
                                            </div>
                                            
                                            <div className="relative z-20 flex-1 flex flex-col">
                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6 leading-tight group-hover:text-[rgb(28,212,132)] transition-colors duration-300">
                                                    {product.name}
                                                </h4>
                                                
                                                <div className="mt-auto space-y-5">
                                                    <div className="relative overflow-hidden bg-slate-50 dark:bg-black/40 border border-slate-200/50 dark:border-white/[0.05] rounded-[24px] p-5 group-hover:border-[rgb(28,212,132)]/20 transition-all duration-500">
                                                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-700">
                                                            <TrendingUp className="h-10 w-10 text-[rgb(28,212,132)]" />
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 dark:text-white/30 font-black uppercase tracking-[0.2em] mb-2">Current Valuation</div>
                                                        <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                                                            <span className="text-sm font-bold text-[rgb(28,212,132)]">$</span>
                                                            {Number(product.current_bid).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    
                                                    <Button 
                                                        onClick={() => handleBid(product.id, product.current_bid)}
                                                        disabled={selectedAuction.status !== 'active'}
                                                        className="w-full h-16 bg-[rgb(28,212,132)] text-[#041F1E] hover:bg-[#15b06d] disabled:bg-slate-800 disabled:text-white/20 border-0 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(28,212,132,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(28,212,132,0.5)] active:scale-95"
                                                    >
                                                        Submit Bid
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                
                {/* Security Authorization Overlay */}
                <AnimatePresence>
                    {authorizingAuction && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                                onClick={() => setAuthorizingAuction(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                className="relative w-full max-w-lg bg-white dark:bg-[#062B29] border border-slate-200 dark:border-white/10 rounded-[50px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[rgb(28,212,132)]/10 rounded-full blur-[100px] pointer-events-none" />
                                
                                <div className="text-center mb-10 relative z-10">
                                    <div className="w-24 h-24 bg-[rgb(28,212,132)]/10 border border-[rgb(28,212,132)]/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(28,212,132,0.2)]">
                                        <ShieldCheck className="w-10 h-10 text-[rgb(28,212,132)]" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Security Escrow Authorization</h2>
                                    <p className="text-slate-500 dark:text-white/40 text-lg leading-relaxed px-4 font-medium">
                                        This is a restricted floor. A <span className="text-[rgb(28,212,132)] font-bold">{authorizingAuction.accessFee} MAD</span> security hold is required for entry.
                                    </p>
                                </div>

                                <div className="bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 rounded-3xl p-6 mb-10 relative z-10">
                                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-white/5 pb-4">
                                        <span className="text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest text-[10px]">Hold Amount</span>
                                        <span className="font-black text-[rgb(28,212,132)] text-2xl">{authorizingAuction.accessFee} MAD</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-white/50 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-[rgb(28,212,132)]" />
                                        <span>Fully refundable if no purchases are finalized.</span>
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <HoldToConfirmButton 
                                        onConfirm={authorizeVipAccess} 
                                        label={`Authorize ${authorizingAuction.accessFee} MAD Hold`}
                                    />
                                    <Button 
                                        variant="ghost"
                                        onClick={() => setAuthorizingAuction(null)}
                                        className="w-full text-white/20 hover:text-white hover:bg-transparent font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        Abort Request
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
