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
        dotColor: 'bg-green-400',
        icon: ShieldCheck,
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        badge: { label: 'Verified', cls: 'text-green-400 border-green-500/20 bg-green-500/10' },
    },
    failed: {
        dotColor: 'bg-red-400',
        icon: ShieldX,
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-400',
        badge: { label: 'Failed', cls: 'text-red-400 border-red-500/20 bg-red-500/10' },
    },
    issued: {
        dotColor: 'bg-green-400',
        icon: Key,
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        badge: { label: 'Issued', cls: 'text-green-400 border-green-500/20 bg-green-500/10' },
    },
    system: {
        dotColor: 'bg-slate-500',
        icon: Settings,
        iconBg: 'bg-slate-500/10',
        iconColor: 'text-slate-400',
        badge: { label: 'System', cls: 'text-slate-400 border-slate-500/20 bg-slate-500/10' },
    },
    expired: {
        dotColor: 'bg-amber-400',
        icon: Clock,
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        badge: { label: 'Expired', cls: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
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
        <div className={`flex items-start gap-3.5 py-3.5 ${!isLast ? 'border-b border-slate-200/70 dark:border-white/[0.05]' : ''}`}>
            {/* Timeline Dot */}
            <div className="flex flex-col items-center gap-0 flex-shrink-0 pt-1">
                <div className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
            </div>

            {/* Event Icon */}
            <div className={`w-8 h-8 rounded-lg ${cfg.iconBg} flex items-center justify-center ${cfg.iconColor} flex-shrink-0`}>
                <Icon size={14} />
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 leading-tight dark:text-slate-200">{event.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{event.time}</p>
                {event.ip && (
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono dark:text-slate-600">{event.ip}</p>
                )}
            </div>

            {/* Amount or Badge */}
            <div className="flex-shrink-0 text-right">
                {event.amount ? (
                    <span className="text-sm font-semibold text-green-400">{event.amount}</span>
                ) : (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.badge.cls}`}>
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
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                    Verification History
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border text-blue-400 border-blue-500/20 bg-blue-500/10">
                    {events.length || DEFAULT_EVENTS.length} entries
                </span>
            </div>

            {/* Event List */}
            <div className="mt-3">
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
                    className="mt-3 w-full py-2 text-xs font-semibold text-green-700 border border-green-200 rounded-xl bg-green-50 hover:bg-green-100 transition-colors dark:text-green-400 dark:border-green-500/15 dark:bg-green-500/[0.04] dark:hover:bg-green-500/[0.08]"
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
