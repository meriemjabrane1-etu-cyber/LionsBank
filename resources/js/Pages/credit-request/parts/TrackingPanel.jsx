import {
    BadgeCheck,
    Banknote,
    CalendarClock,
    CheckCircle2,
    CircleDotDashed,
    Clock3,
    FileCheck2,
    LockKeyhole,
    Search,
    ShieldCheck,
    Sparkles,
    TimerReset,
} from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/axios';

const timelineSteps = [
    {
        label: 'Documents Uploaded',
        description: 'All required banking files received',
        icon: FileCheck2,
        state: 'done',
    },
    {
        label: 'AI Verification',
        description: 'Automated document checks completed',
        icon: Sparkles,
        state: 'done',
    },
    {
        label: 'Financial Review',
        description: 'Credit risk and eligibility analysis',
        icon: CircleDotDashed,
        state: 'current',
    },
    {
        label: 'Final Decision',
        description: 'Approval result and next steps',
        icon: BadgeCheck,
        state: 'pending',
    },
];

const formatDate = (value) => {
    if (!value) {
        return 'Today';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
};

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
        <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">
                <div className="relative p-5 sm:p-6 lg:p-7">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.20),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0),rgba(15,118,110,0.20))]" />
                    <div className="relative grid gap-5 lg:grid-cols-[1fr_520px] lg:items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black">Track a Credit Request</h2>
                                <p className="mt-1 text-sm leading-5 text-white/60">Use your secure LionsBank tracking code to follow review progress.</p>
                            </div>
                        </div>

                        <form onSubmit={track} className="flex flex-col gap-3 sm:flex-row">
                            <input
                                value={trackingCode}
                                onChange={(event) => setTrackingCode(event.target.value.toUpperCase())}
                                placeholder="LB-CRD-2026-84F2K"
                                className="h-12 min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 font-mono text-sm font-black text-white outline-none transition placeholder:font-sans placeholder:text-white/35 focus:border-emerald-300 focus:bg-white/15"
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
                    </div>

                    {error && (
                        <div className="relative mt-4 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm font-bold text-rose-100">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-5">
                {visibleRequests.length === 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                            <Banknote className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-lg font-black text-slate-950">No active credit tracking yet</h3>
                        <p className="mt-2 leading-6">Submit a request or search with a LionsBank tracking code to see the full review timeline.</p>
                    </div>
                )}

                {visibleRequests.map((request) => (
                    <StatusReviewCard key={request.trackingCode} request={request} />
                ))}
            </div>
        </div>
    );
}

function StatusReviewCard({ request }) {
    return (
        <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0),rgba(15,118,110,0.26))]" />
                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-amber-100">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                            </span>
                            Under Review / Processing
                        </div>
                        <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                            Your credit request is currently under financial review.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                            Our banking team is analyzing your submitted documents. AI verification completed successfully, and final approval may take 24-72 hours.
                        </p>
                    </div>

                    <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur lg:w-auto lg:min-w-72">
                        <p className="text-xs font-black uppercase tracking-widest text-white/45">Tracking Code</p>
                        <p className="mt-2 break-all font-mono text-lg font-black sm:text-xl">{request.trackingCode}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[1fr_340px]">
                <div className="space-y-6">
                    <div className="grid gap-3 md:grid-cols-3">
                        <MetricCard icon={ShieldCheck} label="Current status" value="Processing" tone="emerald" />
                        <MetricCard icon={CalendarClock} label="Submitted" value={formatDate(request.submittedAt)} />
                        <MetricCard icon={TimerReset} label="Estimated review" value="24-72 hours" />
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Review Progress</p>
                                <p className="mt-1 text-sm font-bold text-slate-800">Financial review is in progress</p>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-700">
                                <Clock3 className="h-3.5 w-3.5" />
                                Active review
                            </span>
                        </div>
                        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full w-[68%] animate-pulse rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 shadow-[0_0_18px_rgba(16,185,129,0.35)]" />
                        </div>
                        <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            <span>Received</span>
                            <span>68%</span>
                            <span>Decision</span>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Request Timeline</p>
                                <p className="mt-1 text-sm font-bold text-slate-800">Financial review is the active stage</p>
                            </div>
                            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500 sm:inline-flex">
                                3 of 4
                            </span>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-4">
                            {timelineSteps.map((step) => (
                                <TimelineStep key={step.label} step={step} />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <LockKeyhole className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-950">Review activity</h3>
                            <p className="text-xs text-slate-500">Secure LionsBank workflow</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[
                            'AI verification completed successfully.',
                            'Documents queued for financial scoring.',
                            'Banking advisor review currently active.',
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">Amount</p>
                            <p className="break-words font-black text-slate-950">{Number(request.amount).toLocaleString()} MAD</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">Duration</p>
                            <p className="font-black text-slate-950">{request.durationMonths} months</p>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
}

function MetricCard({ icon: Icon, label, value, tone = 'slate' }) {
    const toneClass = tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600';

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}>
                <Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
        </div>
    );
}

function TimelineStep({ step }) {
    const Icon = step.icon;
    const isDone = step.state === 'done';
    const isCurrent = step.state === 'current';

    return (
        <div className={`rounded-2xl border p-4 transition-all ${
            isCurrent
                ? 'border-amber-200 bg-amber-50 shadow-sm shadow-amber-100'
                : isDone
                  ? 'border-emerald-100 bg-emerald-50/70'
                  : 'border-slate-200 bg-slate-50'
        }`}>
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-amber-100 text-amber-700 ring-4 ring-amber-100/70'
                          : 'bg-slate-100 text-slate-400'
                }`}
            >
                <Icon className={`h-5 w-5 ${isCurrent ? 'animate-spin' : ''}`} />
            </div>
            <h4 className="mt-4 text-sm font-black text-slate-950">{step.label}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-500">{step.description}</p>
            <span
                className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                    isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : isCurrent
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-500'
                }`}
            >
                {isDone ? 'Done' : isCurrent ? 'Current' : 'Pending'}
            </span>
        </div>
    );
}
