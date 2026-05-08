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

const SummaryRow = ({ label, value, valueClass = 'text-slate-900 dark:text-slate-100 text-sm font-semibold', borderTop = false }) => (
    <div className={`flex items-center justify-between py-2.5 border-b border-slate-200/70 dark:border-white/[0.05] last:border-b-0 ${borderTop ? 'border-t border-green-200 dark:border-green-500/15 mt-1 pt-3' : ''}`}>
        <span className="text-xs text-slate-500 dark:text-slate-500">{label}</span>
        <span className={valueClass}>{value}</span>
    </div>
);

// ─────────────────────────────────────────────
// SecurityIndicator
// Single row showing a trust/security signal
// ─────────────────────────────────────────────

const SecurityIndicator = ({ icon: Icon, label, status }) => (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-green-200 bg-green-50 dark:border-green-500/10 dark:bg-green-500/[0.04]">
        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 dark:bg-green-500/10 dark:text-green-400">
            <Icon size={15} />
        </div>
        <span className="text-xs text-slate-600 flex-1 dark:text-slate-400">{label}</span>
        <span className="text-[10px] font-bold text-green-700 tracking-wide dark:text-green-400">{status}</span>
    </div>
);

// ─────────────────────────────────────────────
// AllocationBar
// Visual progress bar for fund allocation
// ─────────────────────────────────────────────

const AllocationBar = ({ label, percentage, colorClass = 'from-green-500 to-green-600', textColor = 'text-green-400' }) => (
    <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-500">{label}</span>
            <span className={textColor}>{percentage}%</span>
        </div>
        <div className="h-1.5 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
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
        <div className="space-y-4">
            {/* Live Summary */}
            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5 relative overflow-hidden shadow-sm dark:border-green-500/20 dark:bg-gradient-to-br dark:from-green-500/[0.07] dark:to-green-600/[0.03] dark:shadow-none">
                {/* Glow Orb */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-green-500/[0.06] pointer-events-none" />

                <p className="text-[11px] font-semibold text-green-500/70 uppercase tracking-widest mb-3">
                    Live Summary
                </p>

                <div className="divide-y divide-white/[0.05]">
                    <SummaryRow label="Cheque Amount" value={fmt(chequeAmount)} />
                    <SummaryRow label="Verifiable Amount" value={fmt(verifiableAmount)} valueClass="text-green-700 dark:text-green-400 text-sm font-semibold" />
                    <SummaryRow label="Private Amount" value={fmt(privateAmount)} />
                    <SummaryRow label="Reservation Period" value={reservationLabel} valueClass="text-amber-600 dark:text-amber-400 text-sm font-semibold" />
                    <SummaryRow label="Expires" value={expiresLabel} />
                    <SummaryRow
                        label="Post-Reservation Free"
                        value={fmt(netFree)}
                        valueClass="text-green-700 dark:text-green-400 text-base font-bold"
                        borderTop
                    />
                </div>
            </div>

            {/* Fund Allocation Bars */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">
                    Fund Allocation
                </p>
                <AllocationBar
                    label="Reserved"
                    percentage={reservedPct}
                    colorClass="from-amber-500 to-amber-600"
                    textColor="text-amber-600 dark:text-amber-400"
                />
                <AllocationBar
                    label="Verifiable"
                    percentage={verifiablePct}
                    colorClass="from-green-500 to-green-600"
                    textColor="text-green-700 dark:text-green-400"
                />
            </div>

            {/* Security Indicators */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">
                    Security Indicators
                </p>
                <div className="space-y-2">
                    <SecurityIndicator icon={ShieldCheck} label="Bank-grade encryption active" status="ACTIVE" />
                    <SecurityIndicator icon={Lock} label="Verification code hashed (SHA-256)" status="SECURED" />
                    <SecurityIndicator icon={EyeOff} label="Balance shielded from beneficiary" status="PRIVATE" />
                    <SecurityIndicator icon={Award} label="LionsBank Guarantee Certified" status="VERIFIED" />
                </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
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
        green: 'text-green-400 border-green-500/20 bg-green-500/10',
        blue: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
        amber: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${palette[color]}`}>
            <Icon size={10} />
            {label}
        </span>
    );
};

export default GuaranteeCard;
