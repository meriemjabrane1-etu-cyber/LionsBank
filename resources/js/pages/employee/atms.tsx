import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { 
    Activity, 
    AlertTriangle, 
    CheckCircle, 
    HardDrive, 
    RefreshCw, 
    Settings, 
    Search,
    MapPin,
    ArrowUpRight,
    Wifi,
    WifiOff
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Agency {
    id: number;
    name: string;
    address: string;
}

interface Atm {
    id: number;
    name: string;
    status: 'active' | 'empty' | 'maintenance';
    cash_available: number;
    agency: Agency | null;
}

interface Props {
    atms: Atm[];
    stats: {
        total: number;
        active: number;
        empty: number;
        maintenance: number;
    };
}

export default function EmployeeAtmsPage({ atms, stats }: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Atm['status']>('all');

    const filteredAtms = useMemo(() => {
        return atms.filter((atm) => {
            const matchesStatus = statusFilter === 'all' || atm.status === statusFilter;
            const searchText = `${atm.name} ${atm.agency?.name ?? ''} ${atm.agency?.address ?? ''}`.toLowerCase();
            const matchesSearch = searchText.includes(search.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [atms, search, statusFilter]);

    const updateStatus = (id: number, status: Atm['status']) => {
        router.patch(`/atms/${id}/update-status`, { status }, {
            preserveScroll: true,
            onSuccess: () => toast.success(`ATM status updated to ${status}`),
        });
    };

    const refillAtm = (id: number) => {
        router.patch(`/atms/${id}/refill`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('ATM refilled and activated'),
        });
    };

    const breadcrumbs = [{ title: 'Employee Dashboard', href: '/employee/atms' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Dashboard - ATM Management" />

            <div className="min-h-screen bg-[#041F1E] p-6 lg:p-8 text-white">
                <div className="mx-auto max-w-[1400px] space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                ATM Management
                            </h1>
                            <p className="mt-2 text-white/50">
                                Monitor cash levels and operational status across the network.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Active Alerts</p>
                                <p className="text-sm font-semibold text-orange-500">{stats.empty} ATMs Empty</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total Fleet', value: stats.total, color: 'white', icon: HardDrive },
                            { label: 'Online', value: stats.active, color: 'rgb(28,212,132)', icon: CheckCircle, glow: true },
                            { label: 'Out of Cash', value: stats.empty, color: 'rose-500', icon: AlertTriangle },
                            { label: 'In Maintenance', value: stats.maintenance, color: 'cyan-400', icon: Settings },
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
                                        <span>System Live</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Filters & Search */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                                    <Input
                                        className="pl-10 bg-white/5 border-white/10 focus-visible:ring-[rgb(28,212,132)] text-white placeholder:text-white/20"
                                        placeholder="Search ATM name, location, or agency..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                                    {(['all', 'active', 'empty', 'maintenance'] as const).map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => setStatusFilter(value)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                                statusFilter === value 
                                                    ? 'bg-[rgb(28,212,132)] text-[#041F1E] shadow-lg' 
                                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ATM Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAtms.map((atm) => (
                            <Card key={atm.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all group overflow-hidden">
                                <CardContent className="p-6 space-y-6">
                                    {/* ATM Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[rgb(28,212,132)] group-hover:bg-[rgb(28,212,132)] group-hover:text-[#041F1E] transition-all">
                                                <HardDrive className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{atm.name}</h3>
                                                <div className="flex items-center gap-1 text-white/40 text-xs">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{atm.agency?.name ?? 'Independent'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge className={`uppercase text-[10px] tracking-widest font-bold px-2 py-0.5 ${
                                            atm.status === 'active' ? 'bg-[rgb(28,212,132)]/20 text-[rgb(28,212,132)] border-[rgb(28,212,132)]/20' : 
                                            atm.status === 'empty' ? 'bg-rose-500/20 text-rose-500 border-rose-500/20 animate-pulse' : 
                                            'bg-cyan-500/20 text-cyan-500 border-cyan-500/20'
                                        }`} variant="outline">
                                            {atm.status}
                                        </Badge>
                                    </div>

                                    {/* Cash Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className="text-white/40">Cash Availability</span>
                                            <span className={atm.cash_available < 20 ? 'text-rose-500' : 'text-[rgb(28,212,132)]'}>
                                                {atm.cash_available}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${
                                                    atm.cash_available < 20 ? 'bg-rose-500' : 'bg-[rgb(28,212,132)]'
                                                }`}
                                                style={{ width: `${atm.cash_available}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-2">
                                        <Button 
                                            onClick={() => refillAtm(atm.id)}
                                            className="flex-1 bg-white/10 hover:bg-[rgb(28,212,132)] hover:text-[#041F1E] border border-white/5 transition-all gap-2 rounded-xl h-10 font-bold uppercase tracking-wider text-xs"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                            Refill Cash
                                        </Button>
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-10 w-10 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10">
                                                    <Settings className="h-4 w-4 text-white/60" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-[#062B29] border-white/10 text-white">
                                                <DropdownMenuItem onClick={() => updateStatus(atm.id, 'active')} className="focus:bg-white/10">
                                                    <CheckCircle className="mr-2 h-4 w-4 text-[rgb(28,212,132)]" />
                                                    Set Active
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(atm.id, 'maintenance')} className="focus:bg-white/10">
                                                    <Settings className="mr-2 h-4 w-4 text-cyan-500" />
                                                    Maintenance Mode
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(atm.id, 'empty')} className="focus:bg-white/10 text-rose-500">
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Mark as Empty
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* System Status Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] uppercase font-bold tracking-widest text-white/20">
                                        <div className="flex items-center gap-1.5">
                                            {atm.status === 'active' ? <Wifi className="h-3 w-3 text-[rgb(28,212,132)]" /> : <WifiOff className="h-3 w-3" />}
                                            <span>System Online</span>
                                        </div>
                                        <span>ID: #{atm.id.toString().padStart(4, '0')}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredAtms.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-white/30">
                                <HardDrive className="h-12 w-12 mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">No ATMs Found</p>
                                <p className="text-xs mt-1">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
