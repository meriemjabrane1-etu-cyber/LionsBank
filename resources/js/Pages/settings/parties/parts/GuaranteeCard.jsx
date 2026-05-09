// ─────────────────────────────────────────────
// GuaranteeCard Component
// Displays the live financial summary preview
// alongside the cheque creation form. Updates
// reactively as the issuer fills the form.
// ─────────────────────────────────────────────

import React from 'react';
import { ShieldCheck, Lock, EyeOff, Award, Clock } from 'lucide-react';

// ─────────────────────────────────────────────
// SummaryRow
// Single labeled row inside the summary card
// ─────────────────────────────────────────────

const SummaryRow = ({ label, value, valueClass = 'text-slate-900 dark:text-white text-sm font-bold', borderTop = false }) => (
    <div className={`flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/[0.05] last:border-b-0 ${borderTop ? 'border-t-2 border-emerald-500/20 dark:border-emerald-500/15 mt-2 pt-4' : ''}`}>
        <span className="text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">{label}</span>
        <span className={valueClass}>{value}</span>
    </div>
);

// ─────────────────────────────────────────────
// SecurityIndicator
// Single row showing a trust/security signal
// ─────────────────────────────────────────────

const SecurityIndicator = ({ icon: Icon, label, status }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 dark:border-white/5 dark:bg-white/[0.02] hover:border-emerald-500/20 transition-colors">
        <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-[rgb(28,212,132)] flex-shrink-0 shadow-sm">
            <Icon size={16} />
        </div>
        <span className="text-xs font-bold text-slate-600 dark:text-white/60 flex-1">{label}</span>
        <span className="text-[10px] font-black text-emerald-600 dark:text-[rgb(28,212,132)] tracking-widest uppercase">{status}</span>
    </div>
);

// ─────────────────────────────────────────────
// AllocationBar
// Visual progress bar for fund allocation
// ─────────────────────────────────────────────

const AllocationBar = ({ label, percentage, colorClass = 'from-emerald-500 to-emerald-600', textColor = 'text-emerald-600 dark:text-[rgb(28,212,132)]' }) => (
    <div className="mb-5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
            <span className="text-slate-400 dark:text-white/30">{label}</span>
            <span className={textColor}>{percentage}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden shadow-inner">
            <div
                className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

// ─────────────────────────────────────────────
// GuaranteeCard — Main Export
// ─────────────────────────────────────────────

const GuaranteeCard = ({ summary }) => {
    const {
        chequeAmount = 0,
        verifiableAmount = 0,
        privateAmount = 0,
        reservationLabel = '—',
        expiresLabel = '—',
        netFree = 0,
        reservedPct = 0,
        verifiablePct = 0,
    } = summary;

    const fmt = (n) =>
        'MAD ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="space-y-6">
            {/* Live Summary */}
            <div className="rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-br from-white to-emerald-50 p-8 relative overflow-hidden shadow-xl shadow-emerald-500/5 dark:border-emerald-500/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] dark:shadow-none">
                {/* Glow Orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/[0.05] pointer-events-none" />

                <p className="text-[10px] font-black text-emerald-600 dark:text-[rgb(28,212,132)] uppercase tracking-[0.2em] mb-6">
                    Live Preview Summary
                </p>

                <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    <SummaryRow label="Cheque Amount" value={fmt(chequeAmount)} />
                    <SummaryRow label="Verifiable Amount" value={fmt(verifiableAmount)} valueClass="text-emerald-600 dark:text-[rgb(28,212,132)] text-sm font-black" />
                    <SummaryRow label="Private Amount" value={fmt(privateAmount)} />
                    <SummaryRow label="Reservation Period" value={reservationLabel} valueClass="text-amber-500 text-sm font-black" />
                    <SummaryRow label="Expires" value={expiresLabel} />
                    <SummaryRow
                        label="Net Spendable Post-Issuance"
                        value={fmt(netFree)}
                        valueClass="text-emerald-700 dark:text-[rgb(28,212,132)] text-xl font-black"
                        borderTop
                    />
                </div>
            </div>

            {/* Fund Allocation Bars */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-6">
                    Liquidity Allocation
                </p>
                <AllocationBar
                    label="Reserved Liquidity"
                    percentage={reservedPct}
                    colorClass="from-amber-400 to-amber-600"
                    textColor="text-amber-500"
                />
                <AllocationBar
                    label="Verifiable Exposure"
                    percentage={verifiablePct}
                    colorClass="from-emerald-400 to-emerald-600"
                    textColor="text-emerald-600 dark:text-[rgb(28,212,132)]"
                />
            </div>

            {/* Security Indicators */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-6">
                    Security Protocols
                </p>
                <div className="space-y-3">
                    <SecurityIndicator icon={ShieldCheck} label="Bank-grade encryption active" status="ACTIVE" />
                    <SecurityIndicator icon={Lock} label="Verification code hashed (SHA-256)" status="SECURED" />
                    <SecurityIndicator icon={EyeOff} label="Balance shielded from beneficiary" status="PRIVATE" />
                    <SecurityIndicator icon={Award} label="LionsBank Guarantee Certified" status="VERIFIED" />
                </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
                <Chip icon={ShieldCheck} label="Guarantee Active" color="green" />
                <Chip icon={Lock} label="Encrypted" color="blue" />
                <Chip icon={Clock} label={`${reservationLabel} Reserved`} color="amber" />
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// Chip — small status badge
// ─────────────────────────────────────────────

const Chip = ({ icon: Icon, label, color }) => {
    const palette = {
        green: 'text-emerald-600 dark:text-[rgb(28,212,132)] border-emerald-500/20 bg-emerald-500/10',
        blue: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10',
        amber: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10',
    };
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${palette[color]} shadow-sm`}>
            <Icon size={12} />
            {label}
        </span>
    );
};

export default GuaranteeCard;
