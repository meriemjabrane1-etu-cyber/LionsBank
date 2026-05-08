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
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5 dark:bg-green-500/10 dark:text-green-400">
            <Icon size={15} />
        </div>
        <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed mt-0.5">{description}</p>
        </div>
    </div>
);

// ─────────────────────────────────────────────
// SecurityBanner — Main Export
// ─────────────────────────────────────────────

const SecurityBanner = ({ compact = false }) => {
    if (compact) {
        return (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green-200 bg-green-50 dark:border-green-500/15 dark:bg-green-500/[0.04]">
                <ShieldCheck size={16} className="text-green-600 flex-shrink-0 dark:text-green-400" />
                <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                    This feature is protected by <span className="text-green-700 font-semibold dark:text-green-400">LionsBank bank-grade security</span>.
                    All fund movements are encrypted, logged, and audited.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-500/15 dark:bg-green-500/[0.03] dark:shadow-none">
            {/* Banner Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-500/12 dark:text-green-400">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Security & Guarantee Standards</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">LionsBank — Funds Protection Framework</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-green-700 border border-green-200 bg-green-100 dark:text-green-400 dark:border-green-500/20 dark:bg-green-500/10">
                    <ShieldCheck size={10} /> Active
                </span>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SECURITY_FEATURES.map((feat) => (
                    <FeatureItem key={feat.title} {...feat} />
                ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-5 pt-4 border-t border-green-200 text-xs text-slate-500 leading-relaxed dark:border-white/[0.05] dark:text-slate-500">
                LionsBank's Cheque Verification system does not disclose account balances, full cheque amounts,
                or any sensitive financial data to beneficiaries. Only the amount explicitly authorized by the issuer is shown.
            </div>
        </div>
    );
};

export default SecurityBanner;
