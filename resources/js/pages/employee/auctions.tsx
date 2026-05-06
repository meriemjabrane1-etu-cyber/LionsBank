import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';
import { 
    Gavel, 
    Trophy, 
    Users, 
    TrendingUp, 
    Clock, 
    Plus, 
    Play, 
    Square, 
    UserCheck,
    Activity,
    ArrowUpRight,
    Search,
    Eye,
    Package
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

interface Product {
    id: number;
    name: string;
    description: string;
}

interface Bid {
    id: number;
    amount: number;
    user: { name: string };
}

interface Auction {
    id: number;
    title: string;
    product_type: string;
    starting_price: number;
    current_price: number;
    status: 'pending' | 'active' | 'finished';
    end_date: string;
    bids_count: number;
    products: Product[];
    bids: Bid[];
}

interface Props {
    auctions: Auction[];
    stats: {
        total: number;
        active: number;
        pending: number;
        finished: number;
    };
}

export default function EmployeeAuctionsPage({ auctions, stats }: Props) {
    const [search, setSearch] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedAuctionBids, setSelectedAuctionBids] = useState<Auction | null>(null);

    const filteredAuctions = useMemo(() => {
        return auctions.filter((auction) => {
            const searchText = `${auction.title} ${auction.product_type}`.toLowerCase();
            return searchText.includes(search.toLowerCase());
        });
    }, [auctions, search]);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        title: '',
        product_type: '',
        starting_price: '',
        end_date: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/employee/auctions', {
            onSuccess: () => {
                toast.success('Auction created successfully');
                setIsCreateModalOpen(false);
                reset();
            }
        });
    };

    const toggleStatus = (id: number) => {
        patch(`/employee/auctions/${id}/toggle`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Auction status updated'),
        });
    };

    const declareWinner = (id: number) => {
        patch(`/employee/auctions/${id}/winner`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Winner declared and auction closed'),
        });
    };

    const breadcrumbs = [{ title: 'Employee Dashboard', href: '/employee/auctions' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Dashboard - Auction Management" />

            <div className="min-h-screen bg-[#041F1E] p-6 lg:p-8 text-white">
                <div className="mx-auto max-w-[1400px] space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                Luxury Auctions
                            </h1>
                            <p className="mt-2 text-white/50">
                                Manage high-end assets and monitor live bidding activities.
                            </p>
                        </div>
                        
                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-[rgb(28,212,132)] text-[#041F1E] hover:bg-[rgb(28,212,132)]/90 font-bold rounded-2xl px-6 h-12 shadow-[0_0_20px_rgba(28,212,132,0.2)] transition-all">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Launch New Auction
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#062B29] border-white/10 text-white max-w-md rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Create Auction</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreate} className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                        <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Auction Title</Label>
                                        <Input 
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. Luxury Real Estate #204"
                                        />
                                        {errors.title && <p className="text-rose-500 text-xs">{errors.title}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Asset Category</Label>
                                        <Input 
                                            value={data.product_type}
                                            onChange={e => setData('product_type', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. Property, Watch, Car"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Starting Price</Label>
                                            <Input 
                                                type="number"
                                                value={data.starting_price}
                                                onChange={e => setData('starting_price', e.target.value)}
                                                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                                placeholder="MAD"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white/60 font-bold uppercase text-[10px] tracking-widest">End Date</Label>
                                            <Input 
                                                type="datetime-local"
                                                value={data.end_date}
                                                onChange={e => setData('end_date', e.target.value)}
                                                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={processing} className="w-full bg-[rgb(28,212,132)] text-[#041F1E] font-bold h-12 rounded-xl">
                                        Create Auction
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Active Bids', value: stats.active, color: 'rgb(28,212,132)', icon: Gavel, glow: true },
                            { label: 'Upcoming', value: stats.pending, color: 'cyan-400', icon: Clock },
                            { label: 'Finished', value: stats.finished, color: 'rose-500', icon: Trophy },
                            { label: 'Total Volume', value: stats.total, color: 'white', icon: TrendingUp },
                        ].map((stat, i) => (
                            <Card key={i} className={`bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative group hover:border-[rgb(28,212,132)]/30 transition-all duration-300 ${stat.glow ? 'shadow-[0_0_30px_rgba(28,212,132,0.1)]' : ''}`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <stat.icon className="h-12 w-12" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold" style={{ color: stat.color === 'white' ? 'white' : stat.color }}>
                                        {stat.value}
                                    </p>
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-white/30">
                                        <ArrowUpRight className="h-3 w-3" />
                                        <span>Live Marketplace</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Search */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <CardContent className="p-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                                <Input
                                    className="pl-10 bg-white/5 border-white/10 focus-visible:ring-[rgb(28,212,132)] text-white placeholder:text-white/20"
                                    placeholder="Search auctions by title or asset type..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Auction Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAuctions.map((auction) => (
                            <Card key={auction.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all group overflow-hidden flex flex-col">
                                <CardContent className="p-0 flex-1">
                                    {/* Mock Image */}
                                    <div className="h-48 bg-gradient-to-br from-[#062B29] to-[#041F1E] flex flex-col items-center justify-center border-b border-white/5 relative group-hover:scale-105 transition-transform duration-500">
                                        <Package className="h-16 w-16 text-white/10 mb-2" />
                                        <Badge className={`absolute top-4 left-4 uppercase text-[10px] tracking-widest font-bold ${
                                            auction.status === 'active' ? 'bg-[rgb(28,212,132)] text-[#041F1E]' : 
                                            auction.status === 'finished' ? 'bg-rose-500 text-white' : 'bg-white/10 text-white'
                                        }`}>
                                            {auction.status}
                                        </Badge>
                                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                            <Users className="h-3 w-3 text-[rgb(28,212,132)]" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{auction.bids_count} Participants</span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-5">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[rgb(28,212,132)] mb-1">{auction.product_type}</p>
                                            <h3 className="text-xl font-bold leading-tight">{auction.title}</h3>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Current Bid</p>
                                                <p className="text-2xl font-bold text-white">
                                                    {Number(auction.current_price).toLocaleString()} <span className="text-xs text-white/40">MAD</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-white/40 mb-1 justify-end">
                                                    <Clock className="h-3 w-3" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Time Left</span>
                                                </div>
                                                <p className="text-xs font-bold text-cyan-400">
                                                    {new Date(auction.end_date) > new Date() ? '14h 22m 05s' : 'Ended'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <Button 
                                                variant="ghost"
                                                onClick={() => setSelectedAuctionBids(auction)}
                                                className="bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl h-10"
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                Bids
                                            </Button>
                                            
                                            {auction.status === 'active' ? (
                                                <Button 
                                                    onClick={() => toggleStatus(auction.id)}
                                                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white font-bold uppercase tracking-widest text-xs rounded-xl h-10 transition-all"
                                                >
                                                    <Square className="mr-2 h-4 w-4" />
                                                    Stop
                                                </Button>
                                            ) : auction.status === 'pending' ? (
                                                <Button 
                                                    onClick={() => toggleStatus(auction.id)}
                                                    className="bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] border border-[rgb(28,212,132)]/20 hover:bg-[rgb(28,212,132)] hover:text-[#041F1E] font-bold uppercase tracking-widest text-xs rounded-xl h-10 transition-all"
                                                >
                                                    <Play className="mr-2 h-4 w-4" />
                                                    Start
                                                </Button>
                                            ) : (
                                                <Button disabled className="bg-white/5 text-white/20 border border-white/5 font-bold uppercase tracking-widest text-xs rounded-xl h-10">
                                                    Finished
                                                </Button>
                                            )}
                                        </div>

                                        {auction.status === 'active' && (
                                            <Button 
                                                onClick={() => declareWinner(auction.id)}
                                                className="w-full bg-[rgb(28,212,132)] text-[#041F1E] font-bold uppercase tracking-widest text-xs rounded-xl h-11 shadow-[0_0_15px_rgba(28,212,132,0.1)] hover:shadow-[0_0_20px_rgba(28,212,132,0.3)] transition-all"
                                            >
                                                <UserCheck className="mr-2 h-5 w-5" />
                                                Declare Winner
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bids View Modal */}
            <Dialog open={!!selectedAuctionBids} onOpenChange={(open) => !open && setSelectedAuctionBids(null)}>
                <DialogContent className="bg-[#062B29] border-white/10 text-white max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Live Bidding History</DialogTitle>
                        <p className="text-sm text-white/40">{selectedAuctionBids?.title}</p>
                    </DialogHeader>
                    <div className="space-y-4 pt-4 max-h-[400px] overflow-y-auto">
                        {selectedAuctionBids?.bids?.map((bid, i) => (
                            <div key={bid.id} className={`flex items-center justify-between p-4 rounded-2xl border ${i === 0 ? 'bg-[rgb(28,212,132)]/10 border-[rgb(28,212,132)]/30' : 'bg-white/5 border-white/5'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold ${i === 0 ? 'bg-[rgb(28,212,132)] text-[#041F1E]' : 'bg-white/10 text-white/40'}`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{bid.user.name}</p>
                                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Confirmed Bid</p>
                                    </div>
                                </div>
                                <p className={`font-bold ${i === 0 ? 'text-[rgb(28,212,132)]' : 'text-white'}`}>
                                    {Number(bid.amount).toLocaleString()} MAD
                                </p>
                            </div>
                        ))}
                        {!selectedAuctionBids?.bids?.length && (
                            <div className="text-center py-10 text-white/20">
                                <Gavel className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">No bids yet</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
