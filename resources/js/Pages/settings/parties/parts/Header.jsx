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
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-green-400 border border-green-500/20 bg-green-500/10">
        <Icon size={12} />
        <span>{label}</span>
    </div>
);

// ─────────────────────────────────────────────
// Header — Main Export
// ─────────────────────────────────────────────

const Header = ({ title, subtitle, breadcrumbs = [] }) => {
    return (
        <div className="mb-8">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <ChevronRight size={12} className="text-slate-600" />}
                            <span className={idx === breadcrumbs.length - 1 ? 'text-green-400 font-medium' : ''}>
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
            )}

            {/* Title Row */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
                    )}
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <SecurityBadge icon={ShieldCheck} label="Bank-Grade Secure" />
                    <SecurityBadge icon={Lock} label="SSL 256-bit" />
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="mt-5 h-px bg-gradient-to-r from-green-500/20 via-green-500/5 to-transparent" />
        </div>
    );
};

export default Header;
