// ─────────────────────────────────────────────
// ExpirationCard Component
// Displays the reservation countdown timer and
// expiration warning for an active cheque guarantee.
// Timer ticks in real time via useEffect interval.
// Shows warning state when expiry is within 1 hour.
// ─────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, AlertTriangle, Lock } from 'lucide-react';

// ─────────────────────────────────────────────
// CountdownUnit
// Styled box for hours / minutes / seconds
// ─────────────────────────────────────────────

const CountdownUnit = ({ value, unit, urgent = false }) => (
    <div className={`rounded-xl border px-4 py-3 text-center min-w-[60px] transition-colors ${
        urgent ? 'border-red-200 bg-red-50 dark:border-red-500/25 dark:bg-red-500/[0.06]' : 'border-green-200 bg-green-50 dark:border-green-500/15 dark:bg-black/30'
    }`}>
        <p className={`text-2xl font-bold font-mono tracking-tight ${urgent ? 'text-red-400' : 'text-green-400'}`}>
            {String(value).padStart(2, '0')}
        </p>
        <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-widest mt-0.5">{unit}</p>
    </div>
);

// ─────────────────────────────────────────────
// ReservedFundsCard
// Shows the amount and percentage of elapsed time
// ─────────────────────────────────────────────

const ReservedFundsCard = ({ amount, totalSeconds, elapsedSeconds }) => {
    const pct = totalSeconds > 0 ? Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100)) : 0;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 dark:bg-amber-500/12 dark:text-amber-400">
                        <Lock size={17} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Reserved Funds</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">Active freeze</p>
                    </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border text-amber-400 border-amber-500/20 bg-amber-500/10">
                    Active
                </span>
            </div>
            <p className="text-2xl font-bold text-amber-600 tracking-tight mb-1 dark:text-amber-400">{amount}</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mt-3 mb-2 dark:bg-white/[0.06]">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">{pct}% of reservation period elapsed</p>
        </div>
    );
};

// ─────────────────────────────────────────────
// ExpirationCard — Main Export
// Props:
//   totalSeconds     — total reservation duration in seconds
//   initialRemaining — seconds remaining at mount (default full)
//   amount           — reserved amount display string
//   expiresLabel     — human-readable expiry datetime
// ─────────────────────────────────────────────

const ExpirationCard = ({
    totalSeconds = 72 * 3600,
    initialRemaining = 71 * 3600 + 42 * 60 + 18,
    amount = 'MAD 15,000',
    expiresLabel = 'May 11, 2026',
}) => {
    const [secondsLeft, setSecondsLeft] = useState(initialRemaining);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    const elapsedSeconds = totalSeconds - secondsLeft;
    const isUrgent = secondsLeft < 3600; // under 1 hour
    const isExpired = secondsLeft === 0;

    return (
        <div className="space-y-4">
            {/* Reserved Funds Overview */}
            <ReservedFundsCard
                amount={amount}
                totalSeconds={totalSeconds}
                elapsedSeconds={elapsedSeconds}
            />

            {/* Countdown Timer */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none">
                <div className="flex items-center gap-2.5 mb-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isUrgent ? 'bg-red-100 text-red-500 dark:bg-red-500/12 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/12 dark:text-blue-400'
                    }`}>
                        <Clock size={17} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                            {isExpired ? 'Reservation Expired' : 'Time Remaining'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            {isExpired ? 'Funds have been unfrozen' : `Expires ${expiresLabel}`}
                        </p>
                    </div>
                </div>

                {isExpired ? (
                    <p className="text-center text-sm text-slate-500 py-3 dark:text-slate-400">Reservation period has ended.</p>
                ) : (
                    <div className="flex items-center justify-center gap-3 py-2">
                        <CountdownUnit value={hours} unit="hrs" urgent={isUrgent} />
                        <span className={`text-xl font-bold ${isUrgent ? 'text-red-400' : 'text-green-400'}`}>:</span>
                        <CountdownUnit value={minutes} unit="min" urgent={isUrgent} />
                        <span className={`text-xl font-bold ${isUrgent ? 'text-red-400' : 'text-green-400'}`}>:</span>
                        <CountdownUnit value={seconds} unit="sec" urgent={isUrgent} />
                    </div>
                )}
            </div>

            {/* Warning Banner */}
            {isUrgent && !isExpired && (
                <div className="flex gap-3 items-start rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 dark:bg-amber-500/10 dark:text-amber-400">
                        <AlertTriangle size={17} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-amber-400 mb-1">Expiration Warning</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                            Less than 1 hour remaining. The verification code will become invalid and funds will
                            unfreeze automatically at <span className="text-amber-400 font-semibold">{expiresLabel}</span>.
                        </p>
                    </div>
                </div>
            )}

            {/* Standard Expiration Warning */}
            {!isUrgent && !isExpired && (
                <div className="flex gap-3 items-start rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 dark:bg-amber-500/10 dark:text-amber-400">
                        <AlertTriangle size={17} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-amber-400 mb-1">Expiration Notice</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                            The reservation on <span className="text-amber-400 font-semibold">{amount}</span> will
                            expire in <span className="text-amber-400 font-semibold">{hours}h {minutes}m</span>.
                            Funds will automatically unfreeze and the verification code will become invalid.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpirationCard;
