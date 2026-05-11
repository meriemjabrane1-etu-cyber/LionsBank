import { CheckCircle2, Copy } from 'lucide-react';

export default function SuccessReceipt({ trackingCode, onTrack }) {
    const copyCode = async () => {
        await navigator.clipboard?.writeText(trackingCode);
    };

    return (
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-950">Credit request submitted</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                LionsBank received your request and secured your private documents. Your file is now pending advisor review after automated AI checks.
            </p>
            <div className="mx-auto mt-6 max-w-md rounded-2xl bg-slate-950 p-5 text-white">
                <p className="text-xs font-black uppercase tracking-widest text-white/40">Tracking Code</p>
                <p className="mt-2 font-mono text-2xl font-black">{trackingCode}</p>
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 text-sm font-black text-slate-800 hover:bg-slate-50"
                >
                    <Copy className="h-4 w-4" />
                    Copy code
                </button>
                <button
                    type="button"
                    onClick={onTrack}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white hover:bg-emerald-600"
                >
                    Track status
                </button>
            </div>
        </div>
    );
}
