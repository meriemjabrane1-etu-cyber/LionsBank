import { Head } from '@inertiajs/react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import SummaryCards from '@/components/SummaryCards';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#f4f7fb] flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main */}
                <main className="ml-72 w-full px-6 py-6 lg:px-8">
                    <div className="mx-auto max-w-[1600px] space-y-6">

                        <Topbar />
                        <SummaryCards />

                        <div className="grid gap-6 xl:grid-cols-3">

                            {/* Chart */}
                            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 xl:col-span-2">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Evolution du solde
                                </h3>

                                <div className="h-80 flex items-center justify-center text-slate-400">
                                    Chart (Recharts later)
                                </div>
                            </section>

                            {/* Transactions */}
                            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-slate-900">Dernières transactions</h3>
                                    <button className="text-sm font-medium text-teal-600">Voir tout</button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                        <div>
                                            <p className="font-medium text-slate-900">Amazon</p>
                                            <p className="text-sm text-slate-500">Achat en ligne</p>
                                        </div><span className="text-sm font-semibold text-rose-600">-450,00 MAD</span></div>
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                        <div><p className="font-medium text-slate-900">Loyer</p>
                                            <p className="text-sm text-slate-500">Virement émis</p></div>
                                        <span className="text-sm font-semibold text-rose-600">-3.000,00 MAD</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                        <div>
                                            <p className="font-medium text-slate-900">Sara</p>
                                            <p className="text-sm text-slate-500">Virement reçu</p>
                                        </div>
                                        <span className="text-sm font-semibold text-emerald-600">+2.500,00 MAD</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                                        <div>
                                            <p className="font-medium text-slate-900">Paiement carte</p>
                                            <p className="text-sm text-slate-500">Paiement par carte</p>
                                        </div>
                                        <span className="text-sm font-semibold text-rose-600">-150,00 MAD</span>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}


Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
