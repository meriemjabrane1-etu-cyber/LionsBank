import {
    Landmark,
    Wallet,
    PiggyBank,
    BadgeDollarSign,
    ArrowUpRight,
} from 'lucide-react';

import { summaryCards } from '@/data/dashboardData';
import type { LucideIcon } from 'lucide-react';

type Card = {
    title: string;
    value: string;
    description: string;
    icon: string;
    featured?: boolean;
};

const iconMap: Record<string, LucideIcon> = {
    Landmark,
    Wallet,
    PiggyBank,
    BadgeDollarSign,
};

export default function SummaryCards() {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card: Card) => {
                const Icon = iconMap[card.icon] || Landmark;

                return (
                    <div
                        key={card.title}
                        className={`group relative overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-500 hover:scale-[1.02] ${
                            card.featured
                                ? 'border-[rgb(28,212,132)]/30 bg-gradient-to-br from-[#062B29] to-[#041F1E] text-white shadow-[0_0_50px_rgba(28,212,132,0.15)]'
                                : 'border-slate-200 bg-white shadow-md hover:border-[rgb(28,212,132)]/30 dark:border-white/10 dark:bg-[#062B29]/50 dark:shadow-none'
                        }`}
                    >
                        {/* Background Glow for Featured */}
                        {card.featured && (
                            <div className="pointer-events-none absolute -top-12 -right-12 h-50 w-50 rounded-full bg-[rgb(28,212,132)]/10 blur-3xl" />
                        )}

                        {/* Lion Brand Mark for Featured */}
                        {card.featured && (
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src="/images/featured-card-bg.png"
                                    alt=""
                                    className="h-full w-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1bd382]/20 to-transparent mix-blend-overlay"></div>
                            </div>
                        )}

                        <div className="relative flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                                        card.featured
                                            ? 'bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_0_15px_rgba(28,212,132,0.3)]'
                                            : 'bg-[#1bd382]/10 text-[#1bd382]'
                                    }`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                {!card.featured && (
                                    <div className="text-[rgb(28,212,132)] opacity-0 transition-opacity group-hover:opacity-100">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <p
                                    className={`text-[10px] font-bold tracking-widest uppercase ${card.featured ? 'text-white/40' : 'text-slate-400 dark:text-white/40'}`}
                                >
                                    {card.title}
                                </p>
                                <h3
                                    className={`mt-1 text-3xl font-bold tracking-tight ${card.featured ? 'text-white' : 'text-slate-900 dark:text-white'}`}
                                >
                                    {card.value.split(' ')[0]}{' '}
                                    <span className="text-sm font-medium opacity-40">
                                        {card.value.split(' ')[1]}
                                    </span>
                                </h3>
                                <div className="mt-3 flex items-center gap-2">
                                    <span
                                        className={`text-xs font-medium ${card.featured ? 'text-white/60' : 'text-slate-500 dark:text-white/40'}`}
                                    >
                                        {card.description}
                                    </span>
                                    {card.featured && (
                                        <span className="rounded-full bg-[rgb(28,212,132)]/10 px-2 py-0.5 text-[8px] font-bold tracking-tighter text-[rgb(28,212,132)] uppercase">
                                            Principale
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
