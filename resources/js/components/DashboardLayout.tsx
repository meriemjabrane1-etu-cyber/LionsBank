import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SummaryCards from "./SummaryCards";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <Sidebar />

      <main className="ml-72 px-6 py-6 lg:px-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <Topbar />
          <SummaryCards />

          <div className="grid gap-6 xl:grid-cols-3">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 xl:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Evolution du solde
                  </h3>
                  <p className="text-sm text-slate-500">Tendance sur le mois de mai</p>
                </div>
              </div>
              <div className="h-80 rounded-2xl bg-slate-50/70 flex items-center justify-center text-slate-400">
                Chart area
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Dernières transactions
                </h3>
                <button className="text-sm font-medium text-teal-600">
                  Voir tout
                </button>
              </div>

              <div className="space-y-4">
                {[
                  ["Amazon", "Achat en ligne", "-450,00 MAD", "text-rose-600"],
                  ["Loyer", "Virement émis", "-3.000,00 MAD", "text-rose-600"],
                  ["Sara", "Virement reçu", "+2.500,00 MAD", "text-emerald-600"],
                  ["Paiement carte", "Paiement par carte", "-150,00 MAD", "text-rose-600"],
                ].map((t) => (
                  <div key={t[0]} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p className="font-medium text-slate-900">{t[0]}</p>
                      <p className="text-sm text-slate-500">{t[1]}</p>
                    </div>
                    <span className={`text-sm font-semibold ${t[3]}`}>{t[2]}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 
