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
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600 dark:text-[rgb(28,212,132)]',
        label: 'Verification',
        sublabel: 'Beneficiary access',
        badgeColor: 'text-emerald-600 dark:text-[rgb(28,212,132)] border-emerald-500/20 bg-emerald-500/10',
        badgeLabel: 'Enabled',
        amountColor: 'text-emerald-700 dark:text-[rgb(28,212,132)]',
        cardBorder: 'border-slate-200 dark:border-white/[0.07]',
        cardBg: 'bg-white dark:bg-white/[0.03]',
    },
    disabled: {
        icon: EyeOff,
        iconBg: 'bg-slate-500/10',
        iconColor: 'text-slate-400',
        label: 'Verification',
        sublabel: 'Access disabled',
        badgeColor: 'text-slate-400 border-slate-500/20 bg-slate-500/10',
        badgeLabel: 'Disabled',
        amountColor: 'text-slate-500',
        cardBorder: 'border-slate-200 dark:border-white/[0.07]',
        cardBg: 'bg-white dark:bg-white/[0.03]',
    },
    used: {
        icon: ShieldCheck,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
        label: 'Verification',
        sublabel: 'Already verified',
        badgeColor: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10',
        badgeLabel: 'Used',
        amountColor: 'text-blue-600 dark:text-blue-400',
        cardBorder: 'border-slate-200 dark:border-white/[0.07]',
        cardBg: 'bg-white dark:bg-white/[0.03]',
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
        <div className={`rounded-[2.5rem] border ${cfg.cardBorder} ${cfg.cardBg} p-8 shadow-sm dark:shadow-none transition-all duration-500`}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center ${cfg.iconColor} flex-shrink-0 shadow-sm`}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{cfg.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">{cfg.sublabel}</p>
                    </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.badgeColor}`}>
                    {cfg.badgeLabel}
                </span>
            </div>

            {/* Verifiable Amount */}
            <p className={`text-3xl font-black tracking-tight mb-2 ${cfg.amountColor}`}>
                {verifiableAmount}
            </p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mb-6">Verified fund commitment</p>

            {/* Certification Badge */}
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.badgeColor} shadow-sm`}>
                <Award size={12} />
                {certifiedLabel}
            </span>

            {/* Optional Note */}
            {note && (
                <p className="mt-6 text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest leading-relaxed border-t border-slate-100 dark:border-white/5 pt-6">
                    {note}
                </p>
            )}
        </div>
    );
};

export default VerificationStatus;
