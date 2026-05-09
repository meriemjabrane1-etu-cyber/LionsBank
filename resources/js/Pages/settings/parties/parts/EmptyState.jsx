// ─────────────────────────────────────────────
// EmptyState Component
// Displayed when a data list (verification history,
// active guarantees, etc.) contains no records.
// Communicates context clearly and provides a CTA.
// ─────────────────────────────────────────────

import React from 'react';
import {
    FileSearch,
    ShieldOff,
    TimerOff,
    FolderOpen
} from 'lucide-react';

// ─────────────────────────────────────────────
// EMPTY_VARIANTS
// Pre-defined empty state configurations
// ─────────────────────────────────────────────

const EMPTY_VARIANTS = {
    history: {
        icon: FileSearch,
        title: 'No verification history',
        description:
            'Verification events will appear here once a beneficiary uses a code.',
        ctaLabel: null,
    },

    guarantee: {
        icon: ShieldOff,
        title: 'No active guarantee',
        description:
            'Enable verification when issuing a cheque to create an active guarantee record.',
        ctaLabel: 'Issue a Cheque',
    },

    expired: {
        icon: TimerOff,
        title: 'No active reservations',
        description:
            'All reservation periods have elapsed. Issue a new cheque to create one.',
        ctaLabel: 'Issue a Cheque',
    },

    generic: {
        icon: FolderOpen,
        title: 'Nothing here yet',
        description: 'No records to display at this time.',
        ctaLabel: null,
    },
};

// ─────────────────────────────────────────────
// EmptyState — Main Export
// Props:
//   variant  — key from EMPTY_VARIANTS
//   title    — override default title
//   description — override default description
//   ctaLabel — override default CTA button text
//   onCta    — callback for CTA button click
// ─────────────────────────────────────────────

const EmptyState = ({
    variant = 'generic',
    title,
    description,
    ctaLabel,
    onCta,
}) => {
    const config = EMPTY_VARIANTS[variant] || EMPTY_VARIANTS.generic;

    const Icon = config.icon;

    const displayTitle = title || config.title;
    const displayDesc = description || config.description;

    const displayCta =
        ctaLabel !== undefined
            ? ctaLabel
            : config.ctaLabel;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-[2.5rem] border border-slate-200 bg-white shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none transition-all duration-500">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/[0.05] border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/20 mb-6 shadow-sm">
                <Icon size={28} />
            </div>

            {/* Copy */}
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">
                {displayTitle}
            </h3>

            <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed max-w-[240px] mx-auto">
                {displayDesc}
            </p>

            {/* CTA */}
            {displayCta && onCta && (
                <button
                    onClick={onCta}
                    className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-[rgb(28,212,132)] to-emerald-600 text-[#041F1E] text-[10px] font-black uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[rgb(28,212,132)]/20 active:scale-[0.98] transition-all"
                >
                    {displayCta}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
