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
    <div className={`rounded-2xl border px-6 py-4 text-center min-w-[80px] transition-all duration-500 shadow-sm dark:shadow-none ${
        urgent ? 'border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]' : 'border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03]'
    }`}>
        <p className={`text-3xl font-black font-mono tracking-tighter ${urgent ? 'text-rose-500' : 'text-emerald-600 dark:text-[rgb(28,212,132)]'}`}>
            {String(value).padStart(2, '0')}
        </p>
        <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mt-1">{unit}</p>
    </div>
);

// ─────────────────────────────────────────────
// ReservedFundsCard
// Shows the amount and percentage of elapsed time
// ─────────────────────────────────────────────

const ReservedFundsCard = ({ amount, totalSeconds, elapsedSeconds }) => {
    const pct = totalSeconds > 0 ? Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100)) : 0;

    return (
        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-8 shadow-sm dark:shadow-none transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0 shadow-sm">
                        <Lock size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Reserved Funds</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">Active Liquidity Freeze</p>
                    </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border text-amber-500 border-amber-500/20 bg-amber-500/10">
                    Active
                </span>
            </div>
            <p className="text-4xl font-black text-amber-500 tracking-tight mb-6">{amount}</p>
            <div className="h-2.5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000 ease-out shadow-lg shadow-amber-500/20"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">{pct}% of reservation period elapsed</p>
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
    totalSeconds = 0,
    initialRemaining = 0,
    amount = 'MAD 0.00',
    expiresLabel = '—',
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
        <div className="space-y-6">
            {/* Reserved Funds Overview */}
            <ReservedFundsCard
                amount={amount}
                totalSeconds={totalSeconds}
                elapsedSeconds={elapsedSeconds}
            />

            {/* Countdown Timer */}
            <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-8 shadow-sm dark:shadow-none transition-all duration-500">
                <div className="flex items-center gap-3 mb-8">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        isUrgent ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
                            {isExpired ? 'Reservation Expired' : 'Time Remaining'}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">
                            {isExpired ? 'Funds have been unfrozen' : `Scheduled Expiry: ${expiresLabel}`}
                        </p>
                    </div>
                </div>

                {isExpired ? (
                    <div className="py-6 text-center">
                        <p className="text-xs font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">Reservation period has ended.</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4 py-2">
                        <CountdownUnit value={hours} unit="hrs" urgent={isUrgent} />
                        <span className={`text-2xl font-black ${isUrgent ? 'text-rose-500' : 'text-slate-200 dark:text-white/10'}`}>:</span>
                        <CountdownUnit value={minutes} unit="min" urgent={isUrgent} />
                        <span className={`text-2xl font-black ${isUrgent ? 'text-rose-500' : 'text-slate-200 dark:text-white/10'}`}>:</span>
                        <CountdownUnit value={seconds} unit="sec" urgent={isUrgent} />
                    </div>
                )}
            </div>

            {/* Warning Banner */}
            <div className={`flex gap-4 items-start rounded-[2rem] border-2 p-6 transition-all duration-500 ${
                isUrgent && !isExpired 
                    ? 'border-rose-500/20 bg-rose-500/[0.03]' 
                    : 'border-amber-500/20 bg-amber-500/[0.03]'
            }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    isUrgent && !isExpired 
                        ? 'bg-white dark:bg-white/10 text-rose-500 shadow-rose-500/10' 
                        : 'bg-white dark:bg-white/10 text-amber-500 shadow-amber-500/10'
                }`}>
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <p className={`text-xs font-black uppercase tracking-widest mb-2 ${
                        isUrgent && !isExpired ? 'text-rose-500' : 'text-amber-500'
                    }`}>
                        {isUrgent && !isExpired ? 'Critical Expiration Warning' : 'Expiration Notice'}
                    </p>
                    <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed">
                        {isUrgent && !isExpired ? (
                            <>
                                Less than 1 hour remaining. The verification code will become invalid and funds will
                                unfreeze automatically at <span className="text-rose-500 font-bold">{expiresLabel}</span>.
                            </>
                        ) : (
                            <>
                                The reservation on <span className="text-amber-500 font-bold">{amount}</span> will
                                expire in <span className="text-amber-500 font-bold">{hours}h {minutes}m</span>.
                                Funds will automatically unfreeze and the verification code will become invalid.
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpirationCard;
