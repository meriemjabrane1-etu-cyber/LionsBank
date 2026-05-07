import { Search, ChevronDown } from "lucide-react";
import { usePage } from "@inertiajs/react";
import NotificationCenter from "./NotificationCenter";

export default function Topbar() {
  const { auth } = usePage().props as any;
  const userName = auth?.user?.name || "Client";

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between py-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, <span className="text-[rgb(28,212,132)]">{userName}</span>
        </h2>
        <p className="mt-1 text-white/40 font-medium">Here's your financial overview for today.</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-[rgb(28,212,132)] animate-pulse shadow-[0_0_8px_rgba(28,212,132,0.5)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Live Market Active</span>
        </div>

        <div className="hidden md:flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-[rgb(28,212,132)]/50 transition-all group">
          <Search className="h-5 w-5 text-white/30 group-focus-within:text-[rgb(28,212,132)]" />
          <input
            className="w-48 bg-transparent text-sm outline-none placeholder:text-white/20 text-white"
            placeholder="Quick search..."
          />
        </div>

        <NotificationCenter />

        <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-1.5 border border-white/10 hover:border-white/20 transition-all group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[rgb(28,212,132)] to-emerald-600 flex items-center justify-center text-[#041F1E] font-bold shadow-lg group-hover:scale-105 transition-transform">
            {userName.charAt(0)}
          </div>
          <span className="text-sm font-bold text-white pr-2">{userName}</span>
          <ChevronDown className="h-4 w-4 text-white/30 mr-1" />
        </button>
      </div>
    </div>
  );
}
