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
    <div className={`${width} ${height} rounded-full bg-white/[0.06] animate-pulse`} />
);

// ─────────────────────────────────────────────
// SkeletonCard
// Shimmer-animated placeholder card
// ─────────────────────────────────────────────

const SkeletonCard = () => (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 space-y-4">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <SkeletonLine width="w-32" />
                <SkeletonLine width="w-20" height="h-2" />
            </div>
            <div className="w-16 h-5 rounded-full bg-white/[0.06] animate-pulse" />
        </div>
        <SkeletonLine height="h-6" width="w-40" />
        <SkeletonLine />
        <SkeletonLine width="w-3/4" />
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
        className="animate-spin text-green-400"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
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
            <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Spinner size={32} />
                <p className="text-sm text-slate-500">{message}</p>
            </div>
        );
    }

    if (variant === 'overlay') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-[#041f1e]/80 rounded-2xl z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                    <Spinner size={28} />
                    <p className="text-xs text-slate-400">{message}</p>
                </div>
            </div>
        );
    }

    // Default: skeleton cards
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export { Spinner };
export default LoadingState;
