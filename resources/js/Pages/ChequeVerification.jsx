// ─────────────────────────────────────────────
// ChequeVerification — Page Entry Point
// Inertia.js-compatible page component that
// assembles all sub-components into three
// tab-driven screens:
//
//   1. Cheque Creation (issuer workflow)
//   2. Beneficiary Verification (beneficiary flow)
//   3. Guarantee Status Dashboard
//
// All layout composition happens here.
// Business logic is kept minimal — delegated
// to parts components and future API integration.
// ─────────────────────────────────────────────

import React, { useState, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { FilePlus, Search, BarChart2 } from 'lucide-react';
import api from '@/lib/axios';

// ─────────────────────────────────────────────
// Parts Imports
// ─────────────────────────────────────────────

import Header           from './settings/parties/parts/Header';
import FundsReservation from './settings/parties/parts/FundsReservation';
import GuaranteeCard    from './settings/parties/parts/GuaranteeCard';
import VerificationForm from './settings/parties/parts/VerificationForm';
import VerificationStatus  from './settings/parties/parts/VerificationStatus';
import ExpirationCard   from './settings/parties/parts/ExpirationCard';
import VerificationHistory from './settings/parties/parts/VerificationHistory';
import SecurityBanner   from './settings/parties/parts/SecurityBanner';
import LoadingState     from './settings/parties/parts/LoadingState';
import EmptyState       from './settings/parties/parts/EmptyState';

// ─────────────────────────────────────────────
// TABS
// Navigation tab configuration
// ─────────────────────────────────────────────

const TABS = [
    { id: 'create',  label: 'Cheque Creation',         icon: FilePlus },
    { id: 'verify',  label: 'Beneficiary Verification', icon: Search   },
    { id: 'status',  label: 'Guarantee Status',         icon: BarChart2 },
];

// ─────────────────────────────────────────────
// DEFAULT_SUMMARY
// Initial state for the live summary card
// ─────────────────────────────────────────────

const DEFAULT_SUMMARY = {
    chequeAmount:     25000,
    verifiableAmount: 15000,
    privateAmount:    10000,
    reservationLabel: '72 hours',
    expiresLabel:     'May 11, 2026',
    netFree:          69200,
    reservedPct:      18,
    verifiablePct:    18,
};

// ─────────────────────────────────────────────
// computeSummary
// Derives summary values from raw form state
// ─────────────────────────────────────────────

const DURATION_LABELS = {
    '24': '24 hours', '48': '48 hours', '72': '72 hours',
    '168': '7 days', '336': '14 days', '720': '30 days',
};

const computeSummary = (form, availableBalance = 84200) => {
    const cheque  = parseFloat(form.chequeAmount)     || 0;
    const verify  = parseFloat(form.verifiableAmount) || 0;
    const dur     = form.reservationDuration || '72';
    const hours   = parseInt(dur, 10);
    const expires = new Date(Date.now() + hours * 3600 * 1000);
    const pct     = availableBalance > 0 ? Math.min(100, Math.round((verify / availableBalance) * 100)) : 0;

    return {
        chequeAmount:     cheque,
        verifiableAmount: verify,
        privateAmount:    Math.max(0, cheque - verify),
        reservationLabel: DURATION_LABELS[dur] || `${dur}h`,
        expiresLabel:     expires.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        netFree:          Math.max(0, availableBalance - verify),
        reservedPct:      pct,
        verifiablePct:    pct,
    };
};

// ─────────────────────────────────────────────
// TabBar
// Horizontal navigation between screens
// ─────────────────────────────────────────────

const TabBar = ({ activeTab, onChange }) => (
    <div className="flex gap-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm rounded-xl p-1 mb-8">
        {TABS.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                onClick={() => onChange(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === id
                        ? 'bg-[rgb(28,212,132)] text-[#041F1E] shadow-lg'
                        : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
            >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
            </button>
        ))}
    </div>
);

// ─────────────────────────────────────────────
// ScreenCreate — Cheque Issuance Screen
// Two-column: form on left, live summary on right
// ─────────────────────────────────────────────

const ScreenCreate = ({ summary, onFormChange, onGenerate, availableBalance }) => (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        {/* Left Column — Form */}
        <FundsReservation
            availableBalance={availableBalance}
            onChange={onFormChange}
            onGenerate={onGenerate}
        />

        {/* Right Column — Live Summary + Security */}
        <div className="space-y-0">
            <GuaranteeCard summary={summary} />
        </div>
    </div>
);

// ─────────────────────────────────────────────
// ScreenVerify — Beneficiary Verification Screen
// Centered single-column layout
// ─────────────────────────────────────────────

const ScreenVerify = ({ onVerify }) => (
    <div className="max-w-2xl mx-auto space-y-8">
        <SecurityBanner compact />
        <VerificationForm onVerify={onVerify} />
    </div>
);

// ─────────────────────────────────────────────
// ScreenStatus — Guarantee Dashboard Screen
// Status cards grid + history log
// ─────────────────────────────────────────────

const ScreenStatus = () => (
    <div className="space-y-8">
        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ExpirationCard
                totalSeconds={72 * 3600}
                initialRemaining={71 * 3600 + 42 * 60 + 18}
                amount="MAD 15,000"
                expiresLabel="May 11, 2026"
            />
            <div className="space-y-6">
                <VerificationStatus
                    status="enabled"
                    verifiableAmount="MAD 15,000"
                />
                <SecurityBanner compact />
            </div>
        </div>

        {/* History Log */}
        <VerificationHistory />
    </div>
);

// ─────────────────────────────────────────────
// ChequeVerification — Root Page Component
// Props injected by Inertia.js from the controller:
//   auth.user        — authenticated user object
//   availableBalance — issuer's spendable balance
//   chequeData       — active cheque record (or null)
//   historyEvents    — array of verification events
// ─────────────────────────────────────────────

const ChequeVerification = ({
    auth,
    accountId = null,
    availableBalance = 84200,
    chequeData = null,
    historyEvents = [],
}) => {
    const [activeTab, setActiveTab] = useState('create');
    const [summary, setSummary]     = useState(DEFAULT_SUMMARY);
    const [currentAvailableBalance, setCurrentAvailableBalance] = useState(availableBalance);

    // ─────────────────────────────────────────
    // handleFormChange
    // Recomputes the live summary whenever the
    // creation form state changes
    // ─────────────────────────────────────────

    const handleFormChange = useCallback((formState) => {
        setSummary(computeSummary(formState, currentAvailableBalance));
    }, [currentAvailableBalance]);

    const handleGenerate = useCallback(async (formState) => {
        const response = await api.post('/cheque-guarantees', {
            account_id: accountId,
            cheque_amount: formState.chequeAmount,
            payable_to: formState.payableTo,
            cheque_date: formState.chequeDate,
            verification_enabled: formState.verificationEnabled,
            verifiable_amount: formState.verifiableAmount,
            reservation_enabled: formState.reservationEnabled,
            reservation_duration_hours: Number(formState.reservationDuration),
        });

        const payload = response.data.data;

        if (typeof payload.available_balance === 'number') {
            setCurrentAvailableBalance(payload.available_balance);
        }

        return {
            verificationCode: payload.verification_code,
            guarantee: payload.guarantee,
        };
    }, [accountId]);

    // ─────────────────────────────────────────
    // handleVerify
    // Hook point for Inertia.js POST to backend
    // Returns result state string for UI feedback
    // ─────────────────────────────────────────

    const handleVerify = useCallback(async (code) => {
        const response = await api.post('/cheque-guarantees/verify', { code });
        const result = response.data.data;

        return {
            state: result.state,
            guarantee: result.guarantee ? {
                amount: result.guarantee.amount,
                timeLeft: result.guarantee.time_left,
                expires: result.guarantee.expires,
                referenceId: result.guarantee.reference_id,
            } : null,
        };
    }, []);

    return (
        <>
            {/* Inertia Head — sets page <title> */}
            <Head title="Cheque Verification & Funds Guarantee — LionsBank" />

            {/* Page Shell */}
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#041F1E] text-slate-900 dark:text-white transition-colors duration-500">
                {/* Top Navigation Bar */}
                <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#041F1E]/80 backdrop-blur-md">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 text-[rgb(28,212,132)] font-black text-xl tracking-tight">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[rgb(28,212,132)] to-emerald-600 flex items-center justify-center text-[#041F1E] font-black text-lg shadow-lg shadow-[rgb(28,212,132)]/20">
                            L
                        </div>
                        LionsBank
                    </div>

                    {/* User Info */}
                    {auth?.user && (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black leading-none">{auth.user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest mt-1">Authorized User</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[rgb(28,212,132)] font-black">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Page Content */}
                <main className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
                    <Header
                        title="Cheque Verification & Funds Guarantee"
                        subtitle="Issue verified cheques with fund reservation and beneficiary-facing guarantee codes."
                        breadcrumbs={['Dashboard', 'Cheques', 'Verification']}
                    />

                    <TabBar activeTab={activeTab} onChange={setActiveTab} />

                    {/* Screen Router */}
                    {activeTab === 'create' && (
                        <ScreenCreate
                            summary={summary}
                            onFormChange={handleFormChange}
                            onGenerate={handleGenerate}
                            availableBalance={currentAvailableBalance}
                        />
                    )}

                    {activeTab === 'verify' && (
                        <ScreenVerify onVerify={handleVerify} />
                    )}

                    {activeTab === 'status' && (
                        <ScreenStatus />
                    )}
                </main>
            </div>
        </>
    );
};

export default ChequeVerification;
