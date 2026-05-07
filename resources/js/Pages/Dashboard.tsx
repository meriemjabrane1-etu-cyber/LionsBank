// import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import Chatbot from './settings/parties/chatbot';
import { MdWavingHand } from 'react-icons/md';

import {
    TrendingUp,
    ArrowUpRight,
    DollarSign,
    Zap,
    ArrowRight,
    Plus,
    Clock,
    ChevronRight,
    PieChart,
    ArrowDownLeft,
    Search,
    Bell,
    Wallet,
    CreditCard,
    PiggyBank,
    BadgeDollarSign,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SummaryCards from '@/components/SummaryCards';
import NotificationCenter from '@/components/NotificationCenter';

type DashboardProps = {
    auth: {
        user: {
            name: string;
        };
    };
};

export default function Dashboard({ auth }: DashboardProps) {
    const userName = auth.user.name.split(' ')[0];

    const transactions = [
        {
            id: 1,
            type: 'Virement reçu de Sara',
            date: "Aujourd'hui, 10:30",
            amount: '+2.500,00',
            color: 'emerald',
        },
        {
            id: 2,
            type: 'Achat en ligne - Amazon',
            date: 'Hier, 16:45',
            amount: '-450,00',
            color: 'amber',
        },
        {
            id: 3,
            type: 'Virement émis - Loyer',
            date: '10 Mai 2024, 09:15',
            amount: '-3.000,00',
            color: 'blue',
        },
        {
            id: 4,
            type: 'Virement reçu de Anas',
            date: '09 Mai 2024, 14:20',
            amount: '+1.200,00',
            color: 'emerald',
        },
        {
            id: 5,
            type: 'Paiement par carte',
            date: '08 Mai 2024, 18:30',
            amount: '-150,00',
            color: 'indigo',
        },
    ];

    const actions = [
        { label: 'Virement', icon: Zap, color: 'emerald' },
        { label: 'Paiement', icon: CreditCard, color: 'blue' },
        { label: 'Recharger', icon: DollarSign, color: 'emerald' },
        { label: 'Demande de prêt', icon: Wallet, color: 'purple' },
        { label: 'Autres', icon: Plus, color: 'slate' },
    ];

    return (
        <>
            {/* // <AppLayout breadcrumbs={[{ title: 'Tableau de bord', href: '/dashboard' }]}> */}
            <Head title="Tableau de bord - LionsBank" />

            <div className="relative m-0 ml-5 min-h-screen w-full max-w-none py-10 pr-10 pl-0 text-slate-900 transition-colors duration-500 dark:text-white">
                <div className="m-0 w-full max-w-none space-y-12 p-0">
                    {/* Top Bar with Profile (Internal) */}
                    <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <h1 className="flex items-center gap-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                Bonjour, {userName}{' '}
                                <span className="animate-bounce">
                                    <MdWavingHand className='text-lime-200' />
                                </span>
                            </h1>
                            <p className="mt-1 font-medium text-slate-500 dark:text-white/40">
                                Voici un aperçu de vos finances
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="group relative hidden lg:block">
                                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[rgb(28,212,132)]/50 dark:text-white/20" />
                                <input
                                    placeholder="Rechercher..."
                                    className="h-12 w-64 rounded-2xl border border-slate-200 bg-white pr-4 pl-11 text-sm shadow-sm transition-all outline-none focus:border-[rgb(28,212,132)]/50 dark:border-white/5 dark:bg-[#062B29]/50 dark:shadow-none"
                                />
                            </div>
                            <NotificationCenter />
                            <div className="flex items-center gap-3 pl-2">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[rgb(28,212,132)] to-emerald-600 font-black text-[#041F1E] shadow-lg">
                                    {userName.charAt(0)}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm leading-none font-black text-slate-900 dark:text-white">
                                        {auth.user.name}
                                    </p>
                                    <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-white/20">
                                        Client Elite
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Summary Cards */}
                    <SummaryCards />

                    {/* Middle Grid */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Chart Section */}
                        <div className="space-y-8 lg:col-span-2">
                            <Card className="overflow-hidden rounded-[2.5rem] border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#062B29]/50 dark:shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-8 dark:border-white/5">
                                    <div>
                                        <CardTitle className="text-xl font-black text-slate-900 dark:text-white">
                                            Évolution du solde
                                        </CardTitle>
                                        <p className="mt-1 text-xs font-bold tracking-widest text-slate-400 uppercase dark:text-white/20">
                                            Analyse des flux mensuels
                                        </p>
                                    </div>
                                    <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold tracking-widest text-slate-500 uppercase outline-none dark:border-white/10 dark:bg-[#041F1E] dark:text-white/40">
                                        <option>Ce mois-ci</option>
                                        <option>Dernier trimestre</option>
                                    </select>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="relative h-70">
                                        {/* Area Chart Mockup */}
                                        <svg className="h-full w-full overflow-visible">
                                            <defs>
                                                <linearGradient
                                                    id="gradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="rgb(28,212,132)"
                                                        stopOpacity="0.2"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="rgb(28,212,132)"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,200 Q100,180 200,120 T400,100 T600,60 T800,80 L800,280 L0,280 Z"
                                                fill="url(#gradient)"
                                                className="transition-all duration-1000"
                                            />
                                            <path
                                                d="M0,200 Q100,180 200,120 T400,100 T600,60 T800,80"
                                                fill="none"
                                                stroke="rgb(28,212,132)"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                            />
                                            <circle
                                                cx="800"
                                                cy="80"
                                                r="6"
                                                fill="rgb(28,212,132)"
                                                className="shadow-lg"
                                            />
                                            <foreignObject
                                                x="720"
                                                y="30"
                                                width="100"
                                                height="40"
                                            >
                                                <div className="rounded-lg border border-[rgb(28,212,132)]/30 bg-[#041F1E] px-2 py-1 text-[10px] font-bold whitespace-nowrap text-[rgb(28,212,132)] shadow-xl">
                                                    32.450,00 MAD
                                                </div>
                                            </foreignObject>
                                        </svg>

                                        <div className="absolute bottom-0 left-0 mt-4 flex w-full justify-between text-[10px] font-bold tracking-widest text-slate-300 uppercase dark:text-white/10">
                                            <span>1 Mai</span>
                                            <span>5 Mai</span>
                                            <span>10 Mai</span>
                                            <span>15 Mai</span>
                                            <span>20 Mai</span>
                                            <span>25 Mai</span>
                                            <span>31 Mai</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <div>
                                <h3 className="mb-6 text-xl font-black text-slate-900 dark:text-white">
                                    Actions rapides
                                </h3>
                                <div className="grid grid-cols-5 gap-4">
                                    {actions.map((action, i) => (
                                        <button
                                            key={i}
                                            className="group flex flex-col items-center gap-3"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all group-hover:scale-110 group-hover:border-[rgb(28,212,132)]/50 dark:border-white/5 dark:bg-[#062B29]/50 dark:shadow-none">
                                                <action.icon className="h-6 w-6 text-slate-400 transition-colors group-hover:text-[rgb(28,212,132)]" />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-white/40">
                                                {action.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Promo Banner */}
                            <div className="group relative h-48 overflow-hidden rounded-[2.5rem]">
                                <img
                                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200"
                                    className="absolute inset-0 h-full w-full object-cover brightness-[0.3] grayscale transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-[#041F1E] to-transparent" />
                                <div className="relative flex h-full max-w-lg flex-col justify-center p-10">
                                    <h3 className="mb-2 text-2xl font-black text-white">
                                        La banque qui innove pour votre avenir
                                    </h3>
                                    <p className="mb-6 text-sm font-medium text-white/60">
                                        Découvrez nos solutions digitales
                                        pensées pour simplifier votre quotidien.
                                    </p>
                                    <button className="w-fit rounded-xl bg-[rgb(28,212,132)] px-6 py-2.5 text-xs font-black tracking-widest text-[#041F1E] uppercase transition-all hover:bg-white">
                                        Découvrir nos services
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Transactions & Budget) */}
                        <div className="space-y-8">
                            <Card className="h-fit overflow-hidden rounded-[2.5rem] border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#062B29]/50 dark:shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between p-8">
                                    <CardTitle className="text-xl font-black text-slate-900 dark:text-white">
                                        Dernières transactions
                                    </CardTitle>
                                    <button className="text-[10px] font-bold tracking-widest text-[rgb(28,212,132)] uppercase hover:underline">
                                        Voir tout
                                    </button>
                                </CardHeader>
                                <CardContent className="space-y-6 p-0 px-8 pb-8">
                                    {transactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="group flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${tx.color}-500/10 text-${tx.color}-500`}
                                                >
                                                    <Zap className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="line-clamp-1 text-sm font-black text-slate-900 dark:text-white">
                                                        {tx.type}
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] font-bold tracking-wide text-slate-400 uppercase dark:text-white/20">
                                                        {tx.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}
                                            >
                                                {tx.amount}{' '}
                                                <span className="text-[10px] opacity-40">
                                                    MAD
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                    <button className="group flex w-full items-center justify-center gap-2 border-t border-slate-100 pt-4 text-[10px] font-black tracking-[0.2em] text-[rgb(28,212,132)] uppercase dark:border-white/5">
                                        Voir toutes les transactions{' '}
                                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </CardContent>
                            </Card>

                            {/* Budget Section */}
                            <Card className="h-fit overflow-hidden rounded-[2.5rem] border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#062B29]/50 dark:shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between p-8">
                                    <CardTitle className="text-xl font-black text-slate-900 dark:text-white">
                                        Répartition des dépenses
                                    </CardTitle>
                                    <select className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-[8px] font-bold tracking-widest text-slate-500 uppercase outline-none dark:border-white/10 dark:bg-[#041F1E] dark:text-white/40">
                                        <option>Ce mois-ci</option>
                                    </select>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center p-8 pt-0">
                                    <div className="relative mb-8 h-48 w-48">
                                        <svg className="h-full w-full -rotate-90">
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="24"
                                                className="text-slate-100 dark:text-white/5"
                                            />
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="rgb(28,212,132)"
                                                strokeWidth="24"
                                                strokeDasharray="502"
                                                strokeDashoffset="100"
                                                strokeLinecap="round"
                                                className="shadow-lg"
                                            />
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                fill="none"
                                                stroke="rgb(59, 130, 246)"
                                                strokeWidth="24"
                                                strokeDasharray="502"
                                                strokeDashoffset="400"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                                65%
                                            </span>
                                            <span className="text-[8px] font-bold tracking-widest text-slate-400 uppercase dark:text-white/20">
                                                Utilisé
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-4">
                                        {[
                                            {
                                                label: 'Logement',
                                                percent: '40%',
                                                amount: '-1.200,00',
                                                color: 'bg-emerald-500',
                                            },
                                            {
                                                label: 'Alimentation',
                                                percent: '25%',
                                                amount: '-750,00',
                                                color: 'bg-blue-500',
                                            },
                                            {
                                                label: 'Transport',
                                                percent: '15%',
                                                amount: '-450,00',
                                                color: 'bg-amber-500',
                                            },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${item.color}`}
                                                    />
                                                    <span className="text-xs font-bold text-slate-600 dark:text-white/60">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/20">
                                                        {item.percent}
                                                    </span>
                                                    <span className="text-xs font-black text-slate-900 dark:text-white">
                                                        {item.amount}{' '}
                                                        <span className="text-[8px] opacity-40">
                                                            MAD
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-150 dark:border-sidebar-border">
                 
                </div>
            </div>
        </>
        // </AppLayout>
    );
}
