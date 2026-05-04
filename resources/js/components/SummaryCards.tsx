import {
  Landmark,
  Wallet,
  PiggyBank,
  BadgeDollarSign,
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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card: Card) => {
        const Icon = iconMap[card.icon] || Landmark; // fallback

        return (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-3xl p-5 shadow-sm ring-1 ring-black/5 ${
              card.featured
                ? "bg-gradient-to-br from-[#0d4f52] via-[#0f6b6e] to-[#123f4b] text-white"
                : "bg-white"
            }`}
          >
            {card.featured && (
              <div className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-10">
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute bottom-0 right-2 text-7xl font-black text-white/20">
                  🦁
                </div>
              </div>
            )}

            <div className="relative flex items-start justify-between">
              <div>
                <p
                  className={`text-sm ${
                    card.featured ? "text-white/80" : "text-slate-500"
                  }`}
                >
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {card.value}
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    card.featured ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  card.featured
                    ? "bg-white/10 text-white"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
