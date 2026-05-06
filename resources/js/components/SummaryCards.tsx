import {
  Landmark,
  Wallet,
  PiggyBank,
  BadgeDollarSign,
  ArrowUpRight
} from "lucide-react";

import { summaryCards } from "@/data/dashboardData";
import type { LucideIcon } from "lucide-react";

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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card: Card) => {
        const Icon = iconMap[card.icon] || Landmark;

        return (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-[2rem] p-6 backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] ${
              card.featured
                ? "bg-gradient-to-br from-[#062B29] to-[#041F1E] border-[rgb(28,212,132)]/30 shadow-[0_0_40px_rgba(28,212,132,0.1)]"
                : "bg-white/5 border-white/10 hover:border-white/20"
            }`}
          >
            {/* Background Glow for Featured */}
            {card.featured && (
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[rgb(28,212,132)]/10 blur-3xl pointer-events-none" />
            )}

            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                    card.featured
                      ? "bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_0_15px_rgba(28,212,132,0.3)]"
                      : "bg-white/5 text-[rgb(28,212,132)]"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/20 group-hover:text-[rgb(28,212,132)] transition-colors" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {card.title}
                </p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-white">
                  {card.value.split(' ')[0]} <span className="text-sm font-medium text-white/40">{card.value.split(' ')[1]}</span>
                </h3>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-white/60 font-medium">{card.description}</span>
                    {card.featured && <span className="text-[8px] px-2 py-0.5 rounded-full bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] font-bold uppercase tracking-tighter">Verified</span>}
                </div>
              </div>
            </div>
            
            {/* Lion Brand Mark */}
            <div className="absolute -bottom-4 -right-4 text-7xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none grayscale">
               🦁
            </div>
          </div>
        );
      })}
    </div>
  );
}
