import {
  Home,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Banknote,
  PiggyBank,
  ReceiptText,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Settings,
  CircleHelp,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { menuItems } from "@/data/dashboardData";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Banknote,
  PiggyBank,
  ReceiptText,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Settings,
  CircleHelp,
};

export default function Sidebar() {
  const { url } = usePage();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#043b3f] via-[#073c46] to-[#052f35] text-white shadow-2xl">
      <div className="flex h-full flex-col px-5 py-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
            <span className="text-2xl">🦁</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">LionsBank</h1>
            <p className="text-xs text-white/60">Premium Banking</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;

            const isActive =
              url === item.href || url.startsWith(item.href + "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-[#043b3f] shadow-lg"
                    : "text-white/75 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Security */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-teal-400/20 to-emerald-300/10 p-4 ring-1 ring-white/10">
          <div className="mb-3 flex items-center gap-2 text-teal-200">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold">
              Votre sécurité, notre priorité
            </span>
          </div>
          <p className="text-sm text-white/70">
            Vos données sont chiffrées et protégées 24h/24 et 7j/7.
          </p>
          <button className="mt-4 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
            En savoir plus
          </button>
        </div>

        {/* Logout */}
        <button className="mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white">
          <LogOut className="h-5 w-5" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
