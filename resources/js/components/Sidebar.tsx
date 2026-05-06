import { Link, router, usePage } from "@inertiajs/react";
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

import { menuItems as defaultMenuItems } from "@/data/dashboardData";
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
  const { props, url } = usePage() as any;
  const { auth } = props;
  const isEmployee = auth?.user?.role === 'employee';

  const employeeMenuItems = [
    { label: "Overview", icon: "LayoutDashboard", href: "/dashboard", active: url === "/dashboard" },
    { label: "Appointments", icon: "Calendar", href: "/employee/appointments", active: url.startsWith("/employee/appointments") },
    { label: "ATM Status", icon: "Laptop", href: "/employee/atms", active: url.startsWith("/employee/atms") },
    { label: "Agencies", icon: "Building2", href: "/employee/agencies", active: url.startsWith("/employee/agencies") },
    { label: "Auctions", icon: "Gavel", href: "/employee/auctions", active: url.startsWith("/employee/auctions") },
    { label: "History", icon: "Clock3", href: "/history", active: false },
  ];

  const menuItems = isEmployee ? employeeMenuItems : defaultMenuItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#062B29] text-white shadow-2xl border-r border-white/5 z-50">
      <div className="flex h-full flex-col px-5 py-6">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgb(28,212,132)]/10 text-[rgb(28,212,132)] shadow-[0_0_15px_rgba(28,212,132,0.2)]">
            <span className="text-2xl">🦁</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">LionsBank</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[rgb(28,212,132)]/60">
                {isEmployee ? 'Staff Portal' : 'Premium Banking'}
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item: any) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = item.active;
            
            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 group ${
                  isActive
                    ? "bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_0_25px_rgba(28,212,132,0.3)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                <span className="text-sm font-bold tracking-wide">{item.label}</span>
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#041F1E]" />}
              </Link>
            );
          })}
        </nav>

        {/* Security */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[rgb(28,212,132)]/10 to-transparent p-5 border border-white/5">
          <div className="mb-3 flex items-center gap-2 text-[rgb(28,212,132)]">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Secure Access
            </span>
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed">
            Authorized personnel only. All actions are logged and encrypted.
          </p>
          <button className="mt-4 w-full rounded-xl border border-white/10 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-white/5">
            Security Protocol
          </button>
        </div>

        {/* Logout */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="mt-5 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/40 transition-colors hover:text-rose-500"
        >
          <LogOut className="h-5 w-5" />
          Se déconnecter
        </Link>
      </div>
    </aside>
  );
}
