import { Link, usePage } from "@inertiajs/react";
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
  Calendar,
  Building2,
  Gavel,
  LayoutDashboard,
  MapPin,
  Laptop
} from "lucide-react";
import { menuItems as clientMenuItems } from "@/data/dashboardData";
import type { LucideIcon } from "lucide-react";

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
  Calendar,
  Building2,
  Gavel,
  LayoutDashboard,
  MapPin,
  Laptop
};

export default function Sidebar() {
  const { auth, url } = usePage().props as any;
  const isEmployee = auth?.user?.role === 'employee';

  const employeeMenuItems = [
    { label: "Overview", icon: "LayoutDashboard", href: "/dashboard" },
    { label: "Appointments", icon: "Calendar", href: "/employee/appointments" },
    { label: "ATM Fleet", icon: "Laptop", href: "/employee/atms" },
    { label: "Agencies", icon: "Building2", href: "/employee/agencies" },
    { label: "Auctions", icon: "Gavel", href: "/employee/auctions" },
    { label: "History Log", icon: "Clock3", href: "/dashboard" },
  ];

  const menuItems = isEmployee ? employeeMenuItems : clientMenuItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#062B29] text-white shadow-2xl border-r border-white/5 z-50 hidden lg:block">
      <div className="flex h-full flex-col px-6 py-8">
        {/* Logo Section */}
        <div className="mb-10 flex items-center gap-4 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] shadow-[0_0_20px_rgba(28,212,132,0.15)] border border-[rgb(28,212,132)]/20">
            <span className="text-2xl">🦁</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">LionsBank</h1>
            <p className="text-[9px] uppercase font-black tracking-[0.2em] text-[rgb(28,212,132)]/50">
                {isEmployee ? 'Operational Control' : 'Elite Wealth Management'}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
          {menuItems.map((item: any) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = url === item.href || (item.href !== '/dashboard' && url.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-left transition-all duration-300 group ${
                  isActive
                    ? "bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_0_30px_rgba(28,212,132,0.25)]"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-[rgb(28,212,132)]"}`} />
                <span className={`text-sm font-bold tracking-wide ${isActive ? "text-[#041F1E]" : "text-inherit"}`}>{item.label}</span>
                {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-[#041F1E]/20 animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* Security / Identity Section */}
        <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 text-white/5 group-hover:scale-110 transition-transform duration-500">
             <ShieldCheck className="h-24 w-24" />
          </div>
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2 text-[rgb(28,212,132)]">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                Secured Session
                </span>
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed font-medium">
                Your connection is encrypted with RSA-4096. All operational data is live.
            </p>
            <button className="mt-5 w-full rounded-xl border border-white/10 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white hover:bg-white/5 transition-all">
                System Status
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="mt-6 pt-6 border-t border-white/5">
            <Link
            href="/logout"
            method="post"
            as="button"
            className="flex w-full items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold text-white/20 transition-all hover:text-rose-500 hover:bg-rose-500/5 group"
            >
            <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span>Terminate Session</span>
            </Link>
        </div>
      </div>
    </aside>
  );
}
