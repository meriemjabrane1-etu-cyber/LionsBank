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
    <div className="flex gap-1 bg-white border border-slate-200 shadow-sm dark:bg-white/[0.04] dark:border-green-500/10 dark:shadow-none rounded-xl p-1 mb-8">
        {TABS.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                onClick={() => onChange(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === id
                        ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/25'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:hover:text-slate-300 dark:hover:bg-white/[0.04]'
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
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
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
    <div className="max-w-2xl mx-auto space-y-6">
        <SecurityBanner compact />
        <VerificationForm onVerify={onVerify} />
    </div>
);

// ─────────────────────────────────────────────
// ScreenStatus — Guarantee Dashboard Screen
// Status cards grid + history log
// ─────────────────────────────────────────────

const ScreenStatus = () => (
    <div className="space-y-5">
        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ExpirationCard
                totalSeconds={72 * 3600}
                initialRemaining={71 * 3600 + 42 * 60 + 18}
                amount="MAD 15,000"
                expiresLabel="May 11, 2026"
            />
            <div className="space-y-4">
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
            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#041f1e] dark:text-slate-100">
                {/* Top Navigation Bar */}
                <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-green-500/15 dark:bg-[#041f1e]/95">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 text-green-600 dark:text-green-400 font-bold text-lg tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-[#041f1e] font-black text-base">
                            L
                        </div>
                        LionsBank
                    </div>

                    {/* User Info */}
                    {auth?.user && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                            <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-700 font-bold text-[11px] dark:bg-green-500/15 dark:border-green-500/20 dark:text-green-400">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline">{auth.user.name}</span>
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
