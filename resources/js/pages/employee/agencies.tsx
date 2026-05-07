import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { 
    Building2, 
    MapPin, 
    Clock, 
    Plus, 
    Edit, 
    Power,
    Activity,
    ArrowUpRight,
    Search,
    X,
    CheckCircle2
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

interface Agency {
    id: number;
    name: string;
    address: string;
    status: 'open' | 'closed';
    working_hours: string | null;
    atms_count: number;
}

interface Props {
    agencies: Agency[];
    stats: {
        total: number;
        open: number;
        closed: number;
    };
}

export default function EmployeeAgenciesPage({ agencies, stats }: Props) {
    const [search, setSearch] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

    const filteredAgencies = useMemo(() => {
        return agencies.filter((agency) => {
            const searchText = `${agency.name} ${agency.address}`.toLowerCase();
            return searchText.includes(search.toLowerCase());
        });
    }, [agencies, search]);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: '',
        address: '',
        working_hours: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAgency) {
            patch(`/employee/agencies/${editingAgency.id}`, {
                onSuccess: () => {
                    toast.success('Agency updated successfully');
                    setEditingAgency(null);
                    reset();
                }
            });
        } else {
            post('/employee/agencies', {
                onSuccess: () => {
                    toast.success('Agency created successfully');
                    setIsCreateModalOpen(false);
                    reset();
                }
            });
        }
    };

    const toggleStatus = (id: number) => {
        patch(`/employee/agencies/${id}/toggle-status`, {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Agency status toggled'),
        });
    };

    const breadcrumbs = [{ title: 'Employee Dashboard', href: '/employee/agencies' }];

    return (
        <>
            <Head title="Employee Dashboard - Agency Management" />

            <div className="min-h-screen bg-[#041F1E] p-6 lg:p-8 text-white">
                <div className="mx-auto max-w-[1400px] space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                Agency Management
                            </h1>
                            <p className="mt-2 text-white/50">
                                Oversee branch operations and physical location details.
                            </p>
                        </div>
                        
                        <Dialog open={isCreateModalOpen || !!editingAgency} onOpenChange={(open) => {
                            if (!open) {
                                setIsCreateModalOpen(false);
                                setEditingAgency(null);
                                reset();
                            }
                        }}>
                            <DialogTrigger asChild>
                                <Button 
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="bg-[rgb(28,212,132)] text-[#041F1E] hover:bg-[rgb(28,212,132)]/90 font-bold rounded-2xl px-6 h-12 shadow-[0_0_20px_rgba(28,212,132,0.2)] transition-all"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add New Agency
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#062B29] border-white/10 text-white max-w-md rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-[rgb(28,212,132)]">
                                        {editingAgency ? 'Edit Agency' : 'Create New Agency'}
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Agency Name</Label>
                                        <Input 
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. LionsBank Casablanca"
                                        />
                                        {errors.name && <p className="text-rose-500 text-xs">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Address</Label>
                                        <Input 
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. 123 Finance St."
                                        />
                                        {errors.address && <p className="text-rose-500 text-xs">{errors.address}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hours" className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Working Hours</Label>
                                        <Input 
                                            id="hours"
                                            value={data.working_hours}
                                            onChange={e => setData('working_hours', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[rgb(28,212,132)]"
                                            placeholder="e.g. 09:00 - 17:00"
                                        />
                                        {errors.working_hours && <p className="text-rose-500 text-xs">{errors.working_hours}</p>}
                                    </div>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-[rgb(28,212,132)] text-[#041F1E] font-bold h-12 rounded-xl"
                                    >
                                        {editingAgency ? 'Update Agency' : 'Create Agency'}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
                        {[
                            { label: 'Total Branches', value: stats.total, color: 'white', icon: Building2 },
                            { label: 'Currently Open', value: stats.open, color: 'rgb(28,212,132)', icon: CheckCircle2, glow: true },
                            { label: 'Closed Branches', value: stats.closed, color: 'rose-500', icon: Power },
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
                                        <span>Active Network</span>
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
                                    placeholder="Search by agency name or address..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Agency Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAgencies.map((agency) => (
                            <Card key={agency.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all group overflow-hidden">
                                <CardContent className="p-0">
                                    {/* Agency Image Mockup */}
                                    <div className="h-40 bg-gradient-to-br from-[#062B29] to-[#041F1E] flex items-center justify-center border-b border-white/5 relative">
                                        <Building2 className="h-16 w-16 text-white/10" />
                                        <Badge className={`absolute top-4 right-4 uppercase text-[10px] tracking-widest font-bold ${
                                            agency.status === 'open' ? 'bg-[rgb(28,212,132)] text-[#041F1E]' : 'bg-rose-500 text-white'
                                        }`}>
                                            {agency.status}
                                        </Badge>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-[rgb(28,212,132)] transition-colors">{agency.name}</h3>
                                            <div className="flex items-center gap-2 mt-1 text-white/40 text-sm">
                                                <MapPin className="h-4 w-4" />
                                                <span>{agency.address}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center py-4 border-y border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-[rgb(28,212,132)]" />
                                                <span className="text-sm text-white/80 font-semibold">{agency.working_hours || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
                                                <Activity className="h-3 w-3 text-cyan-400" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{agency.atms_count} ATMs</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button 
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditingAgency(agency);
                                                    setData({
                                                        name: agency.name,
                                                        address: agency.address,
                                                        working_hours: agency.working_hours || '',
                                                    });
                                                }}
                                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl h-10"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                            <Button 
                                                onClick={() => toggleStatus(agency.id)}
                                                className={`flex-1 font-bold uppercase tracking-widest text-xs rounded-xl h-10 ${
                                                    agency.status === 'open' 
                                                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white' 
                                                    : 'bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] border border-[rgb(28,212,132)]/20 hover:bg-[rgb(28,212,132)] hover:text-[#041F1E]'
                                                } transition-all`}
                                            >
                                                <Power className="mr-2 h-4 w-4" />
                                                {agency.status === 'open' ? 'Close' : 'Open'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredAgencies.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-white/30">
                                <Building2 className="h-12 w-12 mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">No Agencies Found</p>
                                <p className="text-xs mt-1">Try adding a new branch or adjusting your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </>
    );
}
