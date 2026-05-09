// ─────────────────────────────────────────────
// LoadingState Component
// Generic loading skeleton and spinner states
// for async operations across all ChequeVerification
// screens. Supports skeleton cards and spinner modes.
// ─────────────────────────────────────────────

import React from 'react';

// ─────────────────────────────────────────────
// SkeletonLine
// Animated gray placeholder line
// ─────────────────────────────────────────────

const SkeletonLine = ({ width = 'w-full', height = 'h-3' }) => (
    <div className={`${width} ${height} rounded-full bg-slate-100 dark:bg-white/[0.06] animate-pulse`} />
);

// ─────────────────────────────────────────────
// SkeletonCard
// Shimmer-animated placeholder card
// ─────────────────────────────────────────────

const SkeletonCard = () => (
    <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-8 space-y-6 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.06] animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <SkeletonLine width="w-32" height="h-4" />
                <SkeletonLine width="w-20" height="h-2" />
            </div>
            <div className="w-16 h-6 rounded-full bg-slate-100 dark:bg-white/[0.06] animate-pulse" />
        </div>
        <SkeletonLine height="h-8" width="w-48" />
        <div className="space-y-4">
            <SkeletonLine />
            <SkeletonLine width="w-3/4" />
        </div>
    </div>
);

// ─────────────────────────────────────────────
// Spinner
// Circular spinner for inline loading states
// ─────────────────────────────────────────────

const Spinner = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin text-emerald-600 dark:text-[rgb(28,212,132)]"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.1" />
        <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
        />
    </svg>
);

// ─────────────────────────────────────────────
// LoadingState — Main Export
// Props:
//   variant  — 'skeleton' | 'spinner' | 'overlay'
//   count    — number of skeleton cards to render
//   message  — optional loading message text
// ─────────────────────────────────────────────

const LoadingState = ({ variant = 'skeleton', count = 2, message = 'Loading...' }) => {
    if (variant === 'spinner') {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-6 animate-in fade-in duration-500">
                <Spinner size={40} />
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">{message}</p>
            </div>
        );
    }

    if (variant === 'overlay') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-[#041F1E]/80 rounded-[2.5rem] z-20 backdrop-blur-md animate-in fade-in duration-300">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size={32} />
                    <p className="text-[10px] font-black text-slate-600 dark:text-white/40 uppercase tracking-[0.2em]">{message}</p>
                </div>
            </div>
        );
    }

    // Default: skeleton cards
    return (
        <div className="space-y-6">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export { Spinner };
export default LoadingState;
