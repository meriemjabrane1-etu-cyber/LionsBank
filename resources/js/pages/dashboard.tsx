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
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                    Dernières transactions
                                </h3>

                                <div className="space-y-4 text-xl text-black">
                                    {[
                                        { name: "Amazon", amount: "-450 MAD" },
                                        { name: "Loyer", amount: "-3000 MAD" },
                                        { name: "Sara", amount: "+2500 MAD" },
                                    ].map((t, i) => (
                                        <div key={i} className="flex justify-between bg-slate-50 p-4 rounded-2xl text-emerald-800">
                                            <span>{t.name}</span>
                                            <span>{t.amount}</span>
                                        </div>
                                    ))}
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
