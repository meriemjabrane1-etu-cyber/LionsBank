// ─────────────────────────────────────────────
// VerificationStatus Component
// Dashboard card showing the current state of
// an active cheque's verification — whether it's
// enabled, disabled, used, or pending.
// Used in the Guarantee Status screen.
// ─────────────────────────────────────────────

import React from 'react';
import { Eye, ShieldCheck, Award, EyeOff } from 'lucide-react';

// ─────────────────────────────────────────────
// STATUS_CONFIG
// Maps status keys to display configuration
// ─────────────────────────────────────────────

const STATUS_CONFIG = {
    enabled: {
        icon: Eye,
        iconBg: 'bg-green-500/12',
        iconColor: 'text-green-400',
        label: 'Verification',
        sublabel: 'Beneficiary access',
        badgeColor: 'text-green-400 border-green-500/20 bg-green-500/10',
        badgeLabel: 'Enabled',
        amountColor: 'text-green-400',
        cardBorder: 'border-white/[0.07]',
        cardBg: 'bg-white/[0.03]',
    },
    disabled: {
        icon: EyeOff,
        iconBg: 'bg-slate-500/12',
        iconColor: 'text-slate-400',
        label: 'Verification',
        sublabel: 'Access disabled',
        badgeColor: 'text-slate-400 border-slate-500/20 bg-slate-500/10',
        badgeLabel: 'Disabled',
        amountColor: 'text-slate-400',
        cardBorder: 'border-white/[0.07]',
        cardBg: 'bg-white/[0.03]',
    },
    used: {
        icon: ShieldCheck,
        iconBg: 'bg-blue-500/12',
        iconColor: 'text-blue-400',
        label: 'Verification',
        sublabel: 'Already verified',
        badgeColor: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
        badgeLabel: 'Used',
        amountColor: 'text-blue-400',
        cardBorder: 'border-white/[0.07]',
        cardBg: 'bg-white/[0.03]',
    },
};

// ─────────────────────────────────────────────
// VerificationStatus — Main Export
// ─────────────────────────────────────────────

const VerificationStatus = ({
    status = 'enabled',
    verifiableAmount = 'MAD 15,000',
    certifiedLabel = 'LionsBank Certified',
    note,
}) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.enabled;
    const Icon = cfg.icon;

    return (
        <div className={`rounded-2xl border ${cfg.cardBorder} ${cfg.cardBg} p-5`}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${cfg.iconBg} flex items-center justify-center ${cfg.iconColor} flex-shrink-0`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-200">{cfg.label}</p>
                        <p className="text-xs text-slate-500">{cfg.sublabel}</p>
                    </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.badgeColor}`}>
                    {cfg.badgeLabel}
                </span>
            </div>

            {/* Verifiable Amount */}
            <p className={`text-2xl font-bold tracking-tight mb-1.5 ${cfg.amountColor}`}>
                {verifiableAmount}
            </p>
            <p className="text-xs text-slate-500 mb-3">Verifiable by beneficiary</p>

            {/* Certification Badge */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.badgeColor}`}>
                <Award size={10} />
                {certifiedLabel}
            </span>

            {/* Optional Note */}
            {note && (
                <p className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-white/[0.05] pt-3">
                    {note}
                </p>
            )}
        </div>
    );
};

export default VerificationStatus;
