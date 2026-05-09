// ─────────────────────────────────────────────
// VerificationForm Component
// Beneficiary-facing form to enter a verification
// code and retrieve guaranteed fund status.
// Does NOT expose any sensitive account data.
// ─────────────────────────────────────────────


import React, { useState } from 'react';
import {
    Shield,
    ShieldCheck,
    ClockAlert,
    ShieldX,
    Info,
    ExternalLink
} from 'lucide-react';

// ─────────────────────────────────────────────
// Result States Enum
// ─────────────────────────────────────────────

const RESULT_STATE = {
    IDLE: 'idle',
    SUCCESS: 'success',
    EXPIRED: 'expired',
    INVALID: 'invalid',
    DISABLED: 'disabled',
};

// ─────────────────────────────────────────────
// ResultSuccess
// Displays guaranteed amount and reservation info
// ─────────────────────────────────────────────

const ResultSuccess = ({ data }) => (
    <div className="mt-8 rounded-[2.5rem] border-2 border-emerald-500/20 bg-emerald-500/[0.03] p-8 animate-in fade-in zoom-in duration-500">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-emerald-600 dark:text-[rgb(28,212,132)] shadow-lg shadow-emerald-500/10">
                <ShieldCheck size={24} />
            </div>

            <div className="flex-1">
                <p className="text-sm font-black text-emerald-600 dark:text-[rgb(28,212,132)] uppercase tracking-widest">Funds Guaranteed</p>
                <p className="text-xs font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">Verified by LionsBank</p>
            </div>

            <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-[rgb(28,212,132)] border border-emerald-500/20 bg-emerald-500/10">
                 <Shield size={12} /> Certified 
            </span>
        </div>

        <div className="space-y-0 divide-y divide-slate-100 dark:divide-white/[0.05]">
            <ResultRow label="Guaranteed Amount" value={data.amount} valueClass="text-emerald-700 dark:text-[rgb(28,212,132)] text-2xl font-black" />
            <ResultRow label="Reservation Status" value={<StatusPill color="blue" label={`Active · ${data.timeLeft}`} />} />
            <ResultRow label="Reservation Expires" value={data.expires} />
            <ResultRow label="Verification Status" value={<StatusPill color="green" label="Authenticated" />} />
            <ResultRow label="Reference ID" value={<span className="font-mono text-xs font-bold text-slate-500 dark:text-white/40">{data.referenceId}</span>} />
        </div>

        <div className="mt-6 px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest flex items-center gap-3">
            <Info size={14} className="text-emerald-500 flex-shrink-0" />
            Privacy Shield Active: Only guaranteed amounts are visible.
        </div>
    </div>
);

// ─────────────────────────────────────────────
// ResultExpired
// ─────────────────────────────────────────────

const ResultExpired = () => (
    <div className="mt-8 rounded-[2.5rem] border-2 border-amber-500/20 bg-amber-500/[0.03] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-amber-500 mx-auto mb-4 shadow-lg shadow-amber-500/10">
            <ClockAlert size={28} />
        </div>

        <p className="text-sm font-black text-amber-500 uppercase tracking-widest mb-2">
            Verification Expired
        </p>

        <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed max-w-xs mx-auto">
            This reservation period has elapsed. Contact the cheque issuer to generate a new code.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 transition-all active:scale-95">
            <ExternalLink size={14} /> Request New Code
        </button>
    </div>
);

// ─────────────────────────────────────────────
// ResultInvalid
// ─────────────────────────────────────────────

const ResultInvalid = () => (
    <div className="mt-8 rounded-[2.5rem] border-2 border-rose-500/20 bg-rose-500/[0.03] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-rose-500 mx-auto mb-4 shadow-lg shadow-rose-500/10">
            <ShieldX size={28} />
        </div>

        <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-2">
            Invalid Code
        </p>

        <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed max-w-xs mx-auto">
            This code does not match any active cheque. Verify the code with the issuer and try again.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition-all active:scale-95">
            Contact Issuer
        </button>
    </div>
);

// ─────────────────────────────────────────────
// ResultRow
// ─────────────────────────────────────────────

const ResultRow = ({ label, value, valueClass = 'text-slate-900 dark:text-slate-100 text-sm font-semibold' }) => (
    <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500 dark:text-slate-500">{label}</span>
        <span className={valueClass}>{value}</span>
    </div>
);

// ─────────────────────────────────────────────
// StatusPill
// ─────────────────────────────────────────────

const StatusPill = ({ color, label }) => {
    const palette = {
        green: 'text-emerald-600 dark:text-[rgb(28,212,132)] border-emerald-500/20 bg-emerald-500/10',
        blue: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10',
        amber: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10',
        red: 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10',
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${palette[color] || palette.green}`}>
            {label}
        </span>
    );
};

// ─────────────────────────────────────────────
// VerificationForm
// ─────────────────────────────────────────────

const VerificationForm = ({ onVerify, isLoading = false }) => {
    const [code, setCode] = useState('');
    const [resultState, setResultState] = useState(RESULT_STATE.IDLE);
    const [resultData, setResultData] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
        if (!code.trim()) return;
        setIsVerifying(true);

        try {
            const result = onVerify ? await onVerify(code) : { state: RESULT_STATE.INVALID };
            setResultState(result?.state || RESULT_STATE.INVALID);
            setResultData(result?.guarantee || null);
        } catch (e) {
            setResultState(e?.response?.status === 429 ? RESULT_STATE.INVALID : RESULT_STATE.INVALID);
            setResultData(null);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleVerify();
    };

    return (
        <div className="max-w-lg mx-auto">

            <div className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none transition-all duration-500">

                <div className="text-center mb-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 dark:from-white/10 dark:to-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-[rgb(28,212,132)] mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                        <Shield size={36} className="animate-pulse" />
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Verification Portal
                    </h2>

                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-2">
                        Bank-Grade Secure Protocol
                    </p>
                </div>

                <div className="mb-8">
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3 text-center">
                        Secure Verification Code
                    </label>

                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyDown}
                        placeholder="LB-XXXX-XXXX"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-slate-900 dark:text-white text-2xl font-mono font-black tracking-[0.2em] text-center placeholder:text-slate-300 dark:placeholder:text-white/10 outline-none focus:border-[rgb(28,212,132)]/50 focus:bg-white dark:focus:bg-white/[0.05] focus:ring-8 focus:ring-[rgb(28,212,132)]/5 transition-all shadow-inner"
                    />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!code.trim() || isLoading || isVerifying}
                    className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-gradient-to-r from-[rgb(28,212,132)] to-emerald-600 text-[#041F1E] text-sm font-black uppercase tracking-widest shadow-lg shadow-[rgb(28,212,132)]/20 hover:translate-y-[-2px] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    <ShieldCheck size={18} />
                    {isLoading || isVerifying ? 'Authenticating...' : 'Verify Cheque Guarantee'}
                </button>

                {resultState === RESULT_STATE.SUCCESS && resultData && <ResultSuccess data={resultData} />}
                {resultState === RESULT_STATE.EXPIRED && <ResultExpired />}
                {resultState === RESULT_STATE.INVALID && <ResultInvalid />}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 shadow-sm dark:shadow-none text-center">
                <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest leading-relaxed">
                    System Notice: LionsBank only displays verifiable fund commitments authorized by the issuer. Full balance details remain encrypted.
                </p>
            </div>

        </div>
    );
};

export { RESULT_STATE };
export default VerificationForm;
