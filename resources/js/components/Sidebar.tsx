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
  const { props, url } = usePage();
  const { auth } = props as any;
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
        <div className="mb-12 flex items-center px-0">
          <Link href="/dashboard" className="block w-full scale-110 origin-left">
            <img src="/images/logo-dark.png" alt="LionsBank" className="h-20 w-auto dark:hidden mix-blend-multiply" />
            <img src="/images/logo-white.png" alt="LionsBank" className="h-20 w-auto hidden dark:block mix-blend-screen" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
          {menuItems.map((item: any) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = url === item.href || (item.href !== '/dashboard' && (url || '').startsWith(item.href));
            
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
        <div className="mt-auto mb-6 rounded-[2rem] p-6 relative overflow-hidden group shadow-2xl transition-all duration-500">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
              <img src="/images/security-bg.png" alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041F1E]/90 to-transparent opacity-80"></div>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-white mb-1">Votre sécurité,</h4>
            <h4 className="text-xs font-bold text-white mb-3">notre priorité</h4>
            <p className="text-[10px] text-white/60 leading-relaxed font-medium mb-4">
                Vos données sont chiffrées et protégées 24h/24 et 7j/7.
            </p>
            <button className="w-full rounded-xl bg-white/10 border border-white/10 py-2.5 text-[10px] font-bold text-white hover:bg-white/20 transition-all backdrop-blur-md">
                En savoir plus
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="pt-4 border-t border-white/5">
            <Link
            href="/logout"
            method="post"
            as="button"
            className="flex w-full items-center gap-3 rounded-2xl px-5 py-2 text-sm font-bold text-white/40 transition-all hover:text-white group"
            >
            <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span>Se déconnecter</span>
            </Link>
        </div>
      </div>
    </aside>
  );
}
