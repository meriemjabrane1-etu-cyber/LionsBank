import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { 
    CheckCircle2, 
    Clock3, 
    Search, 
    XCircle, 
    UserPlus, 
    Calendar, 
    User, 
    Briefcase,
    Activity,
    ArrowUpRight,
    Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type AppointmentStatus = 'pending' | 'approved' | 'rejected';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Appointment {
    id: number;
    service_type: string;
    date: string;
    status: AppointmentStatus;
    user: User | null;
    employee: User | null;
}

interface Props {
    appointments: Appointment[];
    stats: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
}

export default function EmployeeAppointmentsPage({ appointments, stats }: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            const matchesStatus =
                statusFilter === 'all' || appointment.status === statusFilter;

            const searchText = `${appointment.service_type} ${appointment.user?.name ?? ''} ${appointment.user?.email ?? ''}`.toLowerCase();
            const matchesSearch = searchText.includes(search.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [appointments, search, statusFilter]);

    const actOnAppointment = (id: number, action: 'approve' | 'reject' | 'assign') => {
        router.patch(`/appointments/${id}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                const messages = {
                    approve: 'Appointment approved successfully.',
                    reject: 'Appointment rejected successfully.',
                    assign: 'Appointment assigned to you.',
                };
                toast.success(messages[action]);
            },
        });
    };

    const breadcrumbs = [{ title: 'Employee Dashboard', href: '/employee/appointments' }];

    // Mock activity feed for demo purposes
    const activities = [
        { id: 1, user: 'Ahmed', action: 'approved an appointment', time: '2 mins ago' },
        { id: 2, user: 'System', action: 'ATM cash refilled', time: '15 mins ago' },
        { id: 3, user: 'Sarah', action: 'New bid placed on Auction #42', time: '1 hour ago' },
        { id: 4, user: 'Karim', action: 'assigned themselves to a meeting', time: '3 hours ago' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Dashboard - Appointments" />

            <div className="min-h-screen bg-[#041F1E] p-6 lg:p-8 text-white">
                <div className="mx-auto max-w-[1400px] space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                RDV Management
                            </h1>
                            <p className="mt-2 text-white/50">
                                Oversee and manage client appointments with high precision.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="h-10 w-10 rounded-xl bg-[rgb(28,212,132)]/20 flex items-center justify-center text-[rgb(28,212,132)]">
                                <Activity className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Live System Status</p>
                                <p className="text-sm font-semibold text-[rgb(28,212,132)]">Operational</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total RDV', value: stats.total, color: 'white', icon: Calendar },
                            { label: 'Pending Approval', value: stats.pending, color: 'rgb(28,212,132)', icon: Clock3, glow: true },
                            { label: 'Confirmed', value: stats.approved, color: 'cyan-400', icon: CheckCircle2 },
                            { label: 'Declined', value: stats.rejected, color: 'rose-500', icon: XCircle },
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
                                        <span>Updated just now</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Filters */}
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                <CardContent className="p-4">
                                    <div className="flex flex-col gap-4 md:flex-row">
                                        <div className="relative flex-1 group">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-[rgb(28,212,132)] transition-colors" />
                                            <Input
                                                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-[rgb(28,212,132)] text-white placeholder:text-white/20"
                                                placeholder="Search client, service, or status..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                                            {(['all', 'pending', 'approved', 'rejected'] as const).map((value) => (
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

                            {/* Appointments List */}
                            <div className="grid gap-4">
                                {filteredAppointments.map((appointment) => (
                                    <Card key={appointment.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all group overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="flex flex-col md:flex-row">
                                                {/* Left: Client Info */}
                                                <div className="p-6 flex flex-1 items-center gap-4 border-b md:border-b-0 md:border-r border-white/5">
                                                    <div className="relative">
                                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[rgb(28,212,132)] to-emerald-600 flex items-center justify-center text-xl font-bold shadow-lg">
                                                            {appointment.user?.name.charAt(0)}
                                                        </div>
                                                        <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-[#041F1E] flex items-center justify-center text-[8px] ${
                                                            appointment.status === 'pending' ? 'bg-amber-500' : 
                                                            appointment.status === 'approved' ? 'bg-[rgb(28,212,132)]' : 'bg-rose-500'
                                                        }`}>
                                                            {appointment.status === 'approved' && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-white group-hover:text-[rgb(28,212,132)] transition-colors">
                                                            {appointment.service_type}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <User className="h-3 w-3 text-white/30" />
                                                            <span className="text-sm text-white/60">{appointment.user?.name ?? 'Unknown'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <Calendar className="h-3 w-3 text-white/30" />
                                                            <span className="text-sm text-white/40">{new Date(appointment.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Actions */}
                                                <div className="p-6 flex flex-col justify-center items-end gap-3 bg-black/5 min-w-[200px]">
                                                    <Badge className={`uppercase text-[10px] tracking-widest font-bold px-3 py-1 ${
                                                        appointment.status === 'pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/20' : 
                                                        appointment.status === 'approved' ? 'bg-[rgb(28,212,132)]/20 text-[rgb(28,212,132)] border-[rgb(28,212,132)]/20' : 
                                                        'bg-rose-500/20 text-rose-500 border-rose-500/20'
                                                    }`} variant="outline">
                                                        {appointment.status}
                                                    </Badge>
                                                    
                                                    <div className="flex gap-2 mt-2">
                                                        {appointment.status === 'pending' && (
                                                            <>
                                                                <Button 
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-9 w-9 rounded-xl border border-white/10 hover:bg-[rgb(28,212,132)] hover:text-[#041F1E] transition-all"
                                                                    onClick={() => actOnAppointment(appointment.id, 'approve')}
                                                                    title="Approve"
                                                                >
                                                                    <CheckCircle2 className="h-4 w-4" />
                                                                </Button>
                                                                <Button 
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-9 w-9 rounded-xl border border-white/10 hover:bg-rose-500 hover:text-white transition-all"
                                                                    onClick={() => actOnAppointment(appointment.id, 'reject')}
                                                                    title="Reject"
                                                                >
                                                                    <XCircle className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                        {!appointment.employee && appointment.status === 'pending' && (
                                                            <Button 
                                                                size="sm"
                                                                className="h-9 gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/5 transition-all"
                                                                onClick={() => actOnAppointment(appointment.id, 'assign')}
                                                            >
                                                                <UserPlus className="h-4 w-4 text-[rgb(28,212,132)]" />
                                                                <span className="text-xs font-bold uppercase tracking-wider">Assign Me</span>
                                                            </Button>
                                                        )}
                                                        {appointment.employee && (
                                                            <div className="flex items-center gap-2 text-white/40">
                                                                <Briefcase className="h-3 w-3" />
                                                                <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[100px]">Assigned: {appointment.employee.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {filteredAppointments.length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-white/30">
                                        <Clock3 className="h-12 w-12 mb-4 opacity-20" />
                                        <p className="font-bold uppercase tracking-widest text-sm">No Appointments Found</p>
                                        <p className="text-xs mt-1">Try adjusting your filters or search query.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar: Activity Feed */}
                        <div className="lg:col-span-4 space-y-6">
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md sticky top-8">
                                <CardHeader className="border-b border-white/5">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-[rgb(28,212,132)]" />
                                        Live Activity Feed
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/5">
                                        {activities.map((activity) => (
                                            <div key={activity.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="flex gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-[rgb(28,212,132)] mt-1.5 shadow-[0_0_8px_rgba(28,212,132,0.5)]" />
                                                    <div>
                                                        <p className="text-xs text-white/80">
                                                            <span className="font-bold text-white group-hover:text-[rgb(28,212,132)] transition-colors">{activity.user}</span> {activity.action}
                                                        </p>
                                                        <p className="text-[10px] text-white/30 mt-1 uppercase font-bold tracking-tighter">
                                                            {activity.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4">
                                        <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-wider text-[rgb(28,212,132)] hover:bg-[rgb(28,212,132)]/10">
                                            View Full History
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-[rgb(28,212,132)]/20 to-transparent border-white/10 p-6 relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <Briefcase className="h-32 w-32" />
                                </div>
                                <h4 className="font-bold text-lg leading-tight">Need help with complex cases?</h4>
                                <p className="text-sm text-white/60 mt-2">Access our specialized support channel for banking employees.</p>
                                <Button className="mt-4 bg-white text-[#041F1E] hover:bg-white/90 font-bold rounded-xl text-xs uppercase tracking-wider">
                                    Contact Support
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
