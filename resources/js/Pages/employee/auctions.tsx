import { Head, useForm, router } from '@inertiajs/react';
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
    Package,
    Trash2
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
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);
    const [selectedAuctionForProduct, setSelectedAuctionForProduct] = useState<Auction | null>(null);
    const [selectedAuctionForItems, setSelectedAuctionForItems] = useState<Auction | null>(null);
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

    const productForm = useForm({
        name: '',
        image_url: '',
        starting_bid: '',
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

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAuctionForProduct) return;
        
        productForm.post(`/employee/auctions/${selectedAuctionForProduct.id}/products`, {
            onSuccess: () => {
                toast.success('Product added successfully');
                setIsProductModalOpen(false);
                productForm.reset();
            }
        });
    };

    const toggleStatus = (id: number) => {
        patch(`/employee/auctions/${id}/toggle`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Auction status updated'),
        });
    };

    const deleteProduct = (id: number) => {
        if (!confirm('Are you sure you want to remove this item?')) return;
        
        router.delete(`/employee/products/${id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Item removed'),
        });
    };

    const declareWinner = (id: number) => {
        patch(`/employee/auctions/${id}/winner`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Winner declared and auction closed'),
        });
    };

    const deleteAuction = (id: number) => {
        if (!confirm('Are you sure you want to delete this entire auction? This will remove all items and bids.')) return;
        
        router.delete(`/employee/auctions/${id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Auction deleted'),
        });
    };

    const breadcrumbs = [{ title: 'Employee Dashboard', href: '/employee/auctions' }];

    return (
        <>
            <Head title="Employee Dashboard - Auction Management" />

            <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#041F1E] p-6 lg:p-8 text-slate-900 dark:text-white transition-colors duration-500">
                <div className="mx-auto max-w-[1400px] space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Luxury Auctions
                            </h1>
                            <p className="mt-2 text-slate-500 dark:text-white/50">
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
                            <DialogContent className="bg-white dark:bg-[#062B29] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-md rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Create Auction</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreate} className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Auction Title</Label>
                                        <Input 
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. Luxury Real Estate #204"
                                        />
                                        {errors.title && <p className="text-rose-500 text-xs font-medium">{errors.title}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Asset Category</Label>
                                        <Input 
                                            value={data.product_type}
                                            onChange={e => setData('product_type', e.target.value)}
                                            className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. Property, Watch, Car"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Starting Price</Label>
                                            <Input 
                                                type="number"
                                                value={data.starting_price}
                                                onChange={e => setData('starting_price', e.target.value)}
                                                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                                placeholder="MAD"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">End Date</Label>
                                            <Input 
                                                type="datetime-local"
                                                value={data.end_date}
                                                onChange={e => setData('end_date', e.target.value)}
                                                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
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
                            { label: 'Upcoming', value: stats.pending, color: 'rgb(8, 145, 178)', icon: Clock },
                            { label: 'Finished', value: stats.finished, color: 'rgb(244, 63, 94)', icon: Trophy },
                            { label: 'Total Volume', value: stats.total, color: 'current', icon: TrendingUp },
                        ].map((stat, i) => (
                            <Card key={i} className={`bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-md overflow-hidden relative group hover:border-[rgb(28,212,132)]/30 transition-all duration-300 shadow-sm dark:shadow-none ${stat.glow ? 'dark:shadow-[0_0_30px_rgba(28,212,132,0.1)]' : ''}`}>
                                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                    <stat.icon className="h-12 w-12" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">{stat.label}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white" style={{ color: stat.color === 'current' ? undefined : (typeof stat.color === 'string' && stat.color.startsWith('rgb') ? stat.color : undefined) }}>
                                        {stat.value}
                                    </p>
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/30 font-bold">
                                        <ArrowUpRight className="h-3 w-3" />
                                        <span>Live Marketplace</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Search */}
                    <Card className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
                        <CardContent className="p-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/30 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                                <Input
                                    className="pl-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
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
                            <Card key={auction.id} className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-[rgb(28,212,132)]/30 transition-all group overflow-hidden flex flex-col shadow-sm dark:shadow-none">
                                <CardContent className="p-0 flex-1">
                                    {/* Mock Image */}
                                    <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#062B29] dark:to-[#041F1E] flex flex-col items-center justify-center border-b border-slate-200 dark:border-white/5 relative group-hover:scale-105 transition-transform duration-500">
                                        <Package className="h-16 w-16 text-slate-300 dark:text-white/10 mb-2" />
                                        <Badge className={`absolute top-4 left-4 uppercase text-[10px] tracking-widest font-black ${
                                            auction.status === 'active' ? 'bg-[rgb(28,212,132)] text-[#041F1E]' : 
                                            auction.status === 'finished' ? 'bg-rose-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white'
                                        }`}>
                                            {auction.status}
                                        </Badge>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => deleteAuction(auction.id)}
                                            className="absolute top-3 right-3 h-8 w-8 bg-black/20 backdrop-blur-md text-white/40 hover:text-rose-500 hover:bg-black/40 rounded-xl transition-all"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/60 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
                                            <Users className="h-3 w-3 text-emerald-600 dark:text-[rgb(28,212,132)]" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-white">{auction.bids_count} Participants</span>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-[rgb(28,212,132)] mb-1">{auction.product_type}</p>
                                            <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">{auction.title}</h3>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-1">Current Bid</p>
                                                <p className="text-2xl font-black text-slate-900 dark:text-white">
                                                    {Number(auction.current_price).toLocaleString()} <span className="text-xs text-slate-400 dark:text-white/40">MAD</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-slate-400 dark:text-white/40 mb-1 justify-end font-bold">
                                                    <Clock className="h-3 w-3" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Time Left</span>
                                                </div>
                                                <p className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                                                    {new Date(auction.end_date) > new Date() ? '14h 22m 05s' : 'Ended'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <Button 
                                                variant="ghost"
                                                onClick={() => {
                                                    setSelectedAuctionForItems(auction);
                                                    setIsItemsModalOpen(true);
                                                }}
                                                className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl h-10 text-slate-600 dark:text-white"
                                            >
                                                <Package className="mr-2 h-4 w-4" />
                                                Items
                                            </Button>

                                            <Button 
                                                variant="ghost"
                                                onClick={() => setSelectedAuctionBids(auction)}
                                                className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl h-10 text-slate-600 dark:text-white"
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
                                                <Button disabled className="bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 border border-slate-200 dark:border-white/5 font-bold uppercase tracking-widest text-xs rounded-xl h-10">
                                                    Finished
                                                </Button>
                                            )}
                                            
                                            <Button 
                                                variant="ghost"
                                                onClick={() => {
                                                    setSelectedAuctionForProduct(auction);
                                                    setIsProductModalOpen(true);
                                                }}
                                                className="col-span-2 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-xl h-10 transition-all mt-2"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Item
                                            </Button>
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
                <DialogContent className="bg-white dark:bg-[#062B29] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-md rounded-3xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Live Bidding History</DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-white/40 font-medium">{selectedAuctionBids?.title}</p>
                    </DialogHeader>
                    <div className="space-y-4 pt-4 max-h-[400px] overflow-y-auto">
                        {selectedAuctionBids?.bids?.map((bid, i) => (
                            <div key={bid.id} className={`flex items-center justify-between p-4 rounded-2xl border ${i === 0 ? 'bg-[rgb(28,212,132)]/10 border-[rgb(28,212,132)]/30' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold ${i === 0 ? 'bg-[rgb(28,212,132)] text-[#041F1E]' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/40'}`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{bid.user.name}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase font-bold tracking-widest">Confirmed Bid</p>
                                    </div>
                                </div>
                                <p className={`font-black ${i === 0 ? 'text-emerald-600 dark:text-[rgb(28,212,132)]' : 'text-slate-900 dark:text-white'}`}>
                                    {Number(bid.amount).toLocaleString()} MAD
                                </p>
                            </div>
                        ))}
                        {!selectedAuctionBids?.bids?.length && (
                            <div className="text-center py-10 text-slate-300 dark:text-white/20">
                                <Gavel className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">No bids yet</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            {/* Add Product Modal */}
            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogContent className="bg-white dark:bg-[#062B29] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Add New Item</DialogTitle>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{selectedAuctionForProduct?.title}</p>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct} className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Item Name</Label>
                            <Input 
                                value={productForm.data.name}
                                onChange={e => productForm.setData('name', e.target.value)}
                                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                placeholder="e.g. Diamond Rolex Oyster"
                            />
                            {productForm.errors.name && <p className="text-rose-500 text-xs font-medium">{productForm.errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Item Image</Label>
                            <Input 
                                type="file"
                                accept="image/*"
                                onChange={e => productForm.setData('image_url', e.target.files ? e.target.files[0] : null)}
                                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)] file:bg-[rgb(28,212,132)]/10 file:text-[rgb(28,212,132)] file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-3 file:font-bold file:cursor-pointer"
                            />
                            {productForm.errors.image_url && <p className="text-rose-500 text-xs font-medium">{productForm.errors.image_url}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-500 dark:text-white/60 font-bold uppercase text-[10px] tracking-widest">Starting Bid (USD)</Label>
                            <Input 
                                type="number"
                                value={productForm.data.starting_bid}
                                onChange={e => productForm.setData('starting_bid', e.target.value)}
                                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                placeholder="0.00"
                            />
                        </div>
                        <Button type="submit" disabled={productForm.processing} className="w-full bg-[rgb(28,212,132)] text-[#041F1E] font-bold h-12 rounded-xl">
                            Add to Catalog
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Items View Modal */}
            <Dialog open={isItemsModalOpen} onOpenChange={(open) => !open && setIsItemsModalOpen(null)}>
                <DialogContent className="bg-white dark:bg-[#062B29] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white max-w-lg rounded-3xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">Auction Catalog</DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-white/40 font-medium">{selectedAuctionForItems?.title}</p>
                    </DialogHeader>
                    <div className="space-y-4 pt-4 max-h-[500px] overflow-y-auto">
                        {selectedAuctionForItems?.products?.map((product) => (
                            <div key={product.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:border-[rgb(28,212,132)]/20 transition-all overflow-hidden w-full">
                                <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 flex-shrink-0">
                                    <img 
                                        src={product.image_url || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800'} 
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className="font-bold text-slate-900 dark:text-white truncate block w-full">{product.name}</p>
                                    <p className="text-[10px] text-[rgb(28,212,132)] font-black uppercase tracking-widest truncate block w-full">
                                        Current: {Number(product.current_bid).toLocaleString()} MAD
                                    </p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => deleteProduct(product.id)}
                                    className="h-10 w-10 text-rose-500 hover:text-white hover:bg-rose-500 rounded-xl transition-all flex-shrink-0 ml-auto"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                        {!selectedAuctionForItems?.products?.length && (
                            <div className="text-center py-10 text-slate-300 dark:text-white/20">
                                <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">Catalog is empty</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            </>
    );
}
