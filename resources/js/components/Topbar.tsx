import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Bonjour, Karim
        </h2>
        <p className="mt-1 text-slate-500">Voici un aperçu de vos finances</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Rechercher..."
          />
        </div>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <Bell className="h-5 w-5 text-slate-700" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        <button className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-black/5">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500" />
          <span className="text-sm font-medium text-slate-800">Karim</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
