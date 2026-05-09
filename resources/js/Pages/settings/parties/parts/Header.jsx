// ─────────────────────────────────────────────
// Header Component
// Displays page title, breadcrumb, and security
// status badges for the LionsBank dashboard
// ─────────────────────────────────────────────

import React from 'react';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────
// Security Badge
// Reusable inline trust indicator pill
// ─────────────────────────────────────────────

const SecurityBadge = ({ icon: Icon, label }) => (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-[rgb(28,212,132)] border border-emerald-500/20 bg-emerald-500/10 shadow-sm dark:shadow-none">
        <Icon size={12} />
        <span>{label}</span>
    </div>
);

// ─────────────────────────────────────────────
// Header — Main Export
// ─────────────────────────────────────────────

const Header = ({ title, subtitle, breadcrumbs = [] }) => {
    return (
        <div className="mb-10">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 mb-4">
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <ChevronRight size={10} className="text-slate-300 dark:text-white/10" />}
                            <span className={idx === breadcrumbs.length - 1 ? 'text-[rgb(28,212,132)]' : ''}>
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
            )}

            {/* Title Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-base font-medium text-slate-500 dark:text-white/40 mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <SecurityBadge icon={ShieldCheck} label="Bank-Grade" />
                    <SecurityBadge icon={Lock} label="Encrypted" />
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="mt-8 h-px bg-slate-200 dark:bg-white/5" />
        </div>
    );
};

export default Header;
