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
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-white/[0.02] dark:shadow-none">

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 mb-4 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400">
                <Icon size={24} />
            </div>

            {/* Copy */}
            <h3 className="text-sm font-semibold text-slate-900 mb-1.5 dark:text-slate-200">
                {displayTitle}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed max-w-xs">
                {displayDesc}
            </p>

            {/* CTA */}
            {displayCta && onCta && (
                <button
                    onClick={onCta}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-[#041f1e] text-xs font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/20 transition-all"
                >
                    {displayCta}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
