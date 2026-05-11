import { Search, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/axios';

export default function TrackingPanel({ recentRequests = [] }) {
    const [trackingCode, setTrackingCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const track = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await api.post('/credit-requests/track', {
                tracking_code: trackingCode,
            });
            setResult(response.data.request);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Unable to find this tracking code.');
        } finally {
            setLoading(false);
        }
    };

    const visibleRequests = result ? [result] : recentRequests;

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">Track a Credit Request</h2>
                        <p className="text-sm text-white/60">Use your secure LionsBank tracking code.</p>
                    </div>
                </div>

                <form onSubmit={track} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <input
                        value={trackingCode}
                        onChange={(event) => setTrackingCode(event.target.value.toUpperCase())}
                        placeholder="LB-CRD-2026-84F2K"
                        className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-emerald-300"
                    />
                    <button
                        type="submit"
                        disabled={loading || !trackingCode.trim()}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Search className="h-4 w-4" />
                        {loading ? 'Searching' : 'Search'}
                    </button>
                </form>

                {error && <div className="mt-4 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>}
            </div>

            <div className="space-y-3">
                {visibleRequests.length === 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                        No submitted credit requests yet.
                    </div>
                )}

                {visibleRequests.map((request) => (
                    <div key={request.trackingCode} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tracking Code</p>
                                <p className="mt-1 font-mono text-lg font-black text-slate-950">{request.trackingCode}</p>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                                {request.statusLabel}
                            </span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-2xl bg-slate-50 p-3">
                                <p className="text-xs text-slate-500">Amount</p>
                                <p className="font-black text-slate-950">{Number(request.amount).toLocaleString()} MAD</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-3">
                                <p className="text-xs text-slate-500">Duration</p>
                                <p className="font-black text-slate-950">{request.durationMonths} months</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {request.documents?.map((document) => (
                                <div key={document.type} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
                                    <span className="font-bold text-slate-700">{document.label}</span>
                                    <span className="font-black text-emerald-700">{document.confidence}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
