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
    <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-500/20 dark:bg-green-500/[0.04]">

        <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-500/15 dark:text-green-400">
                <ShieldCheck size={20} />
            </div>

            <div className="flex-1">
                <p className="text-sm font-bold text-green-400">Funds Guaranteed</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">Verified by LionsBank</p>
            </div>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-green-400 border border-green-500/20 bg-green-500/10">
                 <Shield size={10} /> Certified 
            </span>
        </div>

        <div className="space-y-0 divide-y divide-slate-200/70 dark:divide-white/[0.05]">
            <ResultRow label="Guaranteed Amount" value={data.amount} valueClass="text-green-700 dark:text-green-400 text-base font-bold" />
            <ResultRow label="Reservation Status" value={<StatusPill color="blue" label={`Active · ${data.timeLeft}`} />} />
            <ResultRow label="Reservation Expires" value={data.expires} />
            <ResultRow label="Verification Status" value={<StatusPill color="green" label="Authenticated" />} />
            <ResultRow label="Reference ID" value={<span className="font-mono text-xs text-slate-500 dark:text-slate-400">{data.referenceId}</span>} />
        </div>

        <div className="mt-4 px-3 py-2.5 rounded-lg bg-white text-xs text-slate-500 flex items-center gap-2 dark:bg-white/[0.03] dark:text-slate-500">
            <Info size={13} className="text-green-600 flex-shrink-0 dark:text-green-400" />
            Account balance and full cheque amount are not disclosed for your privacy.
        </div>
    </div>
);

// ─────────────────────────────────────────────
// ResultExpired
// ─────────────────────────────────────────────

const ResultExpired = () => (
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-500/20 dark:bg-amber-500/[0.04]">

        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <ClockAlert size={24} />
        </div>

        <p className="text-sm font-bold text-amber-400 mb-1.5">
            Verification Expired
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            This reservation period has elapsed. Contact the cheque issuer to generate a new code.
        </p>

        <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/15 transition-colors">
            <ExternalLink size={12} /> Request New Code
        </button>
    </div>
);

// ─────────────────────────────────────────────
// ResultInvalid
// ─────────────────────────────────────────────

const ResultInvalid = () => (
    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-500/20 dark:bg-red-500/[0.04]">

        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mx-auto mb-3">
            <ShieldX size={24} />
        </div>

        <p className="text-sm font-bold text-red-400 mb-1.5">
            Invalid Verification Code
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            This code does not match any active cheque. Verify the code with the issuer and try again.
        </p>

        <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/15 transition-colors">
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
        green: 'text-green-400 border-green-500/20 bg-green-500/10',
        blue: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
        amber: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
        red: 'text-red-400 border-red-500/20 bg-red-500/10',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${palette[color] || palette.green}`}>
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

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">

                <div className="text-center mb-7">
                    <div className="w-16 h-16 rounded-2xl border-2 border-green-200 bg-green-50 flex items-center justify-center text-green-600 mx-auto mb-4 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                        <Shield size={30} />
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Funds Verification Portal
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Secure · Private · Bank-Certified
                    </p>
                </div>

                <div className="mb-5">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2 dark:text-slate-400">
                        Verification Code
                    </label>

                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. LB-4F9K-2M7X"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-lg font-mono tracking-[0.15em] text-center placeholder-slate-400 outline-none focus:border-green-500/40 focus:bg-green-50 focus:ring-2 focus:ring-green-500/10 transition-all dark:bg-white/[0.05] dark:border-white/10 dark:text-slate-100 dark:placeholder-slate-600 dark:focus:bg-green-500/[0.04]"
                    />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!code.trim() || isLoading || isVerifying}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-[#041f1e] text-sm font-bold"
                >
                    <ShieldCheck size={16} />
                    {isLoading || isVerifying ? 'Verifying...' : 'Verify Now'}
                </button>

                {resultState === RESULT_STATE.SUCCESS && resultData && <ResultSuccess data={resultData} />}
                {resultState === RESULT_STATE.EXPIRED && <ResultExpired />}
                {resultState === RESULT_STATE.INVALID && <ResultInvalid />}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02] dark:shadow-none">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                    LionsBank only shows verified data authorized by issuer.
                </p>
            </div>

        </div>
    );
};

export { RESULT_STATE };
export default VerificationForm;
