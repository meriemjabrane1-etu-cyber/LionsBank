// ─────────────────────────────────────────────
// SecurityBanner Component
// Communicates trust signals and banking security
// guarantees to the user. Can be displayed at
// the top of any screen requiring security context.
// Supports compact and full display modes.
// ─────────────────────────────────────────────

import React from 'react';
import { ShieldCheck, Lock, Fingerprint, Server } from 'lucide-react';

// ─────────────────────────────────────────────
// SECURITY_FEATURES
// Static list of trust signals displayed on the banner
// ─────────────────────────────────────────────

const SECURITY_FEATURES = [
    {
        icon: ShieldCheck,
        title: 'Bank-Grade Encryption',
        description: 'All data transmitted over AES-256 secured channels.',
    },
    {
        icon: Lock,
        title: 'SHA-256 Hashed Codes',
        description: 'Verification codes are cryptographically hashed, never stored raw.',
    },
    {
        icon: Fingerprint,
        title: 'Privacy-First Architecture',
        description: 'Beneficiaries only see explicitly authorized amounts.',
    },
    {
        icon: Server,
        title: 'Audited & Certified',
        description: 'LionsBank guarantee system audited to ISO 27001 standards.',
    },
];

// ─────────────────────────────────────────────
// FeatureItem
// Single trust signal row inside the banner
// ─────────────────────────────────────────────

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-[rgb(28,212,132)] flex-shrink-0 shadow-sm">
            <Icon size={18} />
        </div>
        <div className="min-w-0 pt-0.5">
            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-white/40 leading-relaxed mt-1">{description}</p>
        </div>
    </div>
);

// ─────────────────────────────────────────────
// SecurityBanner — Main Export
// ─────────────────────────────────────────────

const SecurityBanner = ({ compact = false }) => {
    if (compact) {
        return (
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/[0.03] animate-in fade-in duration-500">
                <ShieldCheck size={20} className="text-emerald-600 dark:text-[rgb(28,212,132)] flex-shrink-0" />
                <p className="text-xs font-medium text-slate-600 dark:text-white/60 leading-relaxed">
                    This session is protected by <span className="text-emerald-600 dark:text-[rgb(28,212,132)] font-black">LionsBank Bank-Grade Security</span>.
                    All fund movements are end-to-end encrypted and audited.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-[2.5rem] border border-emerald-500/20 bg-white dark:bg-white/[0.03] p-10 shadow-sm dark:shadow-none transition-all duration-500">
            {/* Banner Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-[rgb(28,212,132)] flex-shrink-0 shadow-lg shadow-emerald-500/10">
                    <ShieldCheck size={32} />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Security & Guarantee Standards</h3>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-2">LionsBank — Funds Protection Framework</p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-[rgb(28,212,132)] border border-emerald-500/20 bg-emerald-500/10 shadow-sm">
                    <ShieldCheck size={12} /> System Active
                </span>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {SECURITY_FEATURES.map((feat) => (
                    <FeatureItem key={feat.title} {...feat} />
                ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                System Disclosure: LionsBank's Cheque Verification system does not disclose account balances, full cheque amounts,
                or any sensitive financial data to beneficiaries. Only the amount explicitly authorized by the issuer is shown.
            </div>
        </div>
    );
};

export default SecurityBanner;
