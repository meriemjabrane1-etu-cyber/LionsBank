import { AlertTriangle, CheckCircle2, Clock3, FileText, Loader2, UploadCloud, XCircle } from 'lucide-react';

const statusTheme = {
    idle: {
        icon: Clock3,
        text: 'Awaiting upload',
        className: 'bg-slate-100 text-slate-600',
    },
    analyzing: {
        icon: Loader2,
        text: 'AI verification',
        className: 'bg-amber-100 text-amber-700',
        spin: true,
    },
    valid: {
        icon: CheckCircle2,
        text: 'Verified',
        className: 'bg-emerald-100 text-emerald-700',
    },
    invalid: {
        icon: XCircle,
        text: 'Action needed',
        className: 'bg-rose-100 text-rose-700',
    },
    needs_review: {
        icon: AlertTriangle,
        text: 'Manual review',
        className: 'bg-orange-100 text-orange-700',
    },
};

export default function DocumentUploadCard({ id, document, required, file, result, error, onChange }) {
    const status = result?.status || (file ? 'analyzing' : 'idle');
    const theme = statusTheme[status] || statusTheme.idle;
    const StatusIcon = theme.icon;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <FileText className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-black text-slate-950">{document.label}</h3>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${required ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                {required ? 'Required' : 'Optional'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{document.description}</p>
                    </div>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${theme.className}`}>
                    <StatusIcon className={`h-3.5 w-3.5 ${theme.spin ? 'animate-spin' : ''}`} />
                    {theme.text}
                </span>
            </div>

            <label
                htmlFor={`document-${id}`}
                className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-emerald-300 hover:bg-emerald-50/60"
            >
                <UploadCloud className="h-7 w-7 text-slate-400" />
                <span className="mt-2 text-sm font-bold text-slate-800">
                    {file ? file.name : 'Upload a PDF or clear image'}
                </span>
                <span className="mt-1 text-xs text-slate-500">PDF, JPG, PNG, WEBP up to 8 MB</span>
                <input
                    id={`document-${id}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => onChange(id, event.target.files?.[0] || null)}
                />
            </label>

            {(result?.summary || error) && (
                <div className={`mt-4 rounded-2xl border p-4 text-sm ${status === 'valid' ? 'border-emerald-100 bg-emerald-50 text-emerald-900' : 'border-rose-100 bg-rose-50 text-rose-900'}`}>
                    <p className="font-bold">{error || result.summary}</p>
                    {result?.issues?.length > 0 && (
                        <ul className="mt-2 space-y-1 text-xs">
                            {result.issues.map((issue) => (
                                <li key={issue}>- {issue}</li>
                            ))}
                        </ul>
                    )}
                    {result?.recommendations?.length > 0 && (
                        <p className="mt-2 text-xs opacity-80">{result.recommendations[0]}</p>
                    )}
                </div>
            )}
        </div>
    );
}
