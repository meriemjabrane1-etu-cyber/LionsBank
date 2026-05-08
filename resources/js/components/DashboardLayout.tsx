// resources/js/Layouts/DashboardLayout.jsx
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

type DashboardLayoutProps = {
  title: string;
  active: string;
  children: ReactNode;
};

const menuItems = [
  'Tableau de bord',
  'Comptes',
  'Virements',
  'Cartes',
  'Prêts',
  'Épargne',
  'Paiements',
  'Investissements',
  'Historique',
  'Paramètres',
  'Aide & support',
];

export default function DashboardLayout({ title, active, children }: DashboardLayoutProps) {
  return (
    <>
      <Head title={title} />


      <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside className="hidden w-72 flex-col bg-linear-to-b from-[#06283D] to-[#0B3B4A] px-5 py-6 text-white lg:flex">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <span className="text-xl">🦁</span>
              </div>
              <div>
                <div className="text-xl font-bold">LionsBank</div>
                <div className="text-xs text-white/60">Banking dashboard</div>
              </div>
            </div>


            <nav className="space-y-2 text-sm">
              {menuItems.map((item) => (
                <div
                  key={item}
                  className={`flex items-center rounded-xl px-4 py-3 ${
                    item === active
                      ? 'bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-300/30'
                      : 'text-white/75 hover:bg-white/8'
                  }`}
                >
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </nav>


            <div className="mt-auto rounded-3xl bg-white/10 p-5 backdrop-blur">
              <div className="text-sm font-semibold">Votre sécurité, notre priorité</div>
              <p className="mt-2 text-xs leading-5 text-white/70">
                Vos opérations sont chiffrées et protégées 24h/24 et 7j/7.
              </p>
              <button className="mt-4 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                En savoir plus
              </button>
            </div>


            <button className="mt-6 flex items-center gap-2 px-2 py-3 text-sm text-white/80 hover:text-white">
              {/* <span>↩</span>
              <span>Se déconnecter</span> */}
            </button>
          </aside>


          {/* MAIN */}
          <main className="flex-1">
            <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
              <div className="flex items-center justify-between gap-4 px-6 py-4 lg:px-8">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                </div>


                <div className="flex items-center gap-4">
                  <div className="hidden w-72 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400 md:block">
                    Rechercher...
                  </div>
                  <div className="relative">
                    <span className="text-xl">🔔</span>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      2
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                      <span className="text-sm font-semibold">K</span>
                    </div>
                    <div className="hidden text-sm font-medium md:block">Karim</div>
                    <span className="text-slate-400">⌄</span>
                  </div>
                </div>
              </div>
            </header>


            <div className="px-6 py-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
