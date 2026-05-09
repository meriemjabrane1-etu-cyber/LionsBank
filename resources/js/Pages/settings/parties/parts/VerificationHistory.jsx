// ─────────────────────────────────────────────
// VerificationHistory Component
// Renders a chronological log of all verification
// events for a cheque — successful verifications,
// failed attempts, code issuances, and system events.
// Designed for the Guarantee Status screen.
// ─────────────────────────────────────────────

import React from 'react';
import { ShieldCheck, ShieldX, Key, Settings, Clock } from 'lucide-react';

// ─────────────────────────────────────────────
// EVENT_TYPE_CONFIG
// Maps event type keys to display properties
// ─────────────────────────────────────────────

const EVENT_TYPE_CONFIG = {
    verified: {
        dotColor: 'bg-emerald-500',
        icon: ShieldCheck,
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600 dark:text-[rgb(28,212,132)]',
        badge: { label: 'Verified', cls: 'text-emerald-600 dark:text-[rgb(28,212,132)] border-emerald-500/20 bg-emerald-500/10' },
    },
    failed: {
        dotColor: 'bg-rose-500',
        icon: ShieldX,
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-500',
        badge: { label: 'Failed', cls: 'text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10' },
    },
    issued: {
        dotColor: 'bg-emerald-500',
        icon: Key,
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600 dark:text-[rgb(28,212,132)]',
        badge: { label: 'Issued', cls: 'text-emerald-600 dark:text-[rgb(28,212,132)] border-emerald-500/20 bg-emerald-500/10' },
    },
    system: {
        dotColor: 'bg-slate-400',
        icon: Settings,
        iconBg: 'bg-slate-500/10',
        iconColor: 'text-slate-500 dark:text-white/40',
        badge: { label: 'System', cls: 'text-slate-500 dark:text-white/40 border-slate-500/20 bg-slate-500/10' },
    },
    expired: {
        dotColor: 'bg-amber-500',
        icon: Clock,
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-500',
        badge: { label: 'Expired', cls: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10' },
    },
};

// ─────────────────────────────────────────────
// HistoryRow
// Single event entry in the verification log
// ─────────────────────────────────────────────

const HistoryRow = ({ event, isLast }) => {
    const cfg = EVENT_TYPE_CONFIG[event.type] || EVENT_TYPE_CONFIG.system;
    const Icon = cfg.icon;

    return (
        <div className={`flex items-start gap-4 py-5 ${!isLast ? 'border-b border-slate-100 dark:border-white/[0.05]' : ''}`}>
            {/* Timeline Dot */}
            <div className="flex flex-col items-center gap-0 flex-shrink-0 pt-2">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dotColor} shadow-[0_0_8px_rgba(16,185,129,0.2)]`} />
            </div>

            {/* Event Icon */}
            <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center ${cfg.iconColor} flex-shrink-0 shadow-sm`}>
                <Icon size={18} />
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{event.title}</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1.5">{event.time}</p>
                {event.ip && (
                    <p className="text-[10px] text-slate-400 dark:text-white/10 mt-1 font-mono">{event.ip}</p>
                )}
            </div>

            {/* Amount or Badge */}
            <div className="flex-shrink-0 text-right">
                {event.amount ? (
                    <span className="text-sm font-black text-emerald-600 dark:text-[rgb(28,212,132)]">{event.amount}</span>
                ) : (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.badge.cls}`}>
                        {cfg.badge.label}
                    </span>
                )}
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// VerificationHistory — Main Export
// Props:
//   events — array of event objects (see shape below)
//   maxVisible — max rows before "Show more" appears
//
// Event shape:
//   { id, type, title, time, ip?, amount? }
// ─────────────────────────────────────────────

const VerificationHistory = ({ events = [], maxVisible = 10 }) => {
    const [expanded, setExpanded] = React.useState(false);
    const visible = expanded ? events : events.slice(0, maxVisible);
    const hasMore = events.length > maxVisible;

    // ─────────────────────────────────────────
    // Default demo events when none are provided
    // ─────────────────────────────────────────

    const displayEvents = events.length > 0 ? visible : DEFAULT_EVENTS;

    return (
        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-8 shadow-sm dark:shadow-none transition-all duration-500">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
                    Verification History
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10 shadow-sm">
                    {events.length || DEFAULT_EVENTS.length} entries
                </span>
            </div>

            {/* Event List */}
            <div className="mt-4">
                {displayEvents.map((event, idx) => (
                    <HistoryRow
                        key={event.id}
                        event={event}
                        isLast={idx === displayEvents.length - 1}
                    />
                ))}
            </div>

            {/* Show More / Less Toggle */}
            {hasMore && (
                <button
                    onClick={() => setExpanded((p) => !p)}
                    className="mt-6 w-full py-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-[rgb(28,212,132)] border border-slate-100 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm active:scale-[0.99]"
                >
                    {expanded ? 'Show less' : `Show ${events.length - maxVisible} more`}
                </button>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// DEFAULT_EVENTS
// Fallback demo data for development / Storybook
// ─────────────────────────────────────────────

const DEFAULT_EVENTS = [
    {
        id: 1,
        type: 'verified',
        title: 'Verified successfully · Code LB-4F9K-2M7X',
        time: 'May 8, 2026 · 11:02 AM',
        ip: 'IP 41.140.xxx.xxx',
        amount: 'MAD 15,000',
    },
    {
        id: 2,
        type: 'issued',
        title: 'Verification code generated',
        time: 'May 8, 2026 · 10:35 AM',
    },
    {
        id: 3,
        type: 'failed',
        title: 'Failed attempt · Invalid code entered',
        time: 'May 8, 2026 · 10:18 AM',
        ip: 'IP 41.140.xxx.xxx',
    },
    {
        id: 4,
        type: 'system',
        title: 'Reservation created · 72h duration',
        time: 'May 8, 2026 · 10:15 AM',
    },
];

export default VerificationHistory;
