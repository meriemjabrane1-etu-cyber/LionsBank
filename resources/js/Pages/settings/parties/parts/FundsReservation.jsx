// ─────────────────────────────────────────────
// FundsReservation Component
// The primary cheque issuance form. Handles:
//   - Cheque amount entry
//   - Beneficiary field
//   - Verification toggle + verifiable amount
//   - Reservation toggle + duration selection
//   - Secure code generation
// Emits form state upward via onChange callback
// ─────────────────────────────────────────────

import React, { useState, useCallback } from 'react';
import {
    DollarSign, User, Calendar, Eye, Lock, RefreshCw,
    Copy, Share2, ShieldCheck, Info, ChevronDown,
} from 'lucide-react';

// ─────────────────────────────────────────────
// BalanceStat
// Compact metric chip in the balance overview row
// ─────────────────────────────────────────────

const BalanceStat = ({ label, value, valueColor = 'text-green-400' }) => (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-base font-bold ${valueColor} tracking-tight`}>{value}</p>
    </div>
);

// ─────────────────────────────────────────────
// ToggleRow
// Labeled toggle switch row with description
// ─────────────────────────────────────────────

const ToggleRow = ({ icon: Icon, iconColor = 'text-green-400', label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-white/[0.05]">
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 flex items-center gap-2">
                <Icon size={15} className={iconColor} />
                {label}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative ml-4 w-11 h-6 rounded-full flex-shrink-0 transition-all duration-200 ${
                checked ? 'bg-green-500/20 border border-green-500/40' : 'bg-white/10 border border-white/10'
            }`}
        >
            <span
                className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                    checked
                        ? 'left-5 bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                        : 'left-0.5 bg-slate-500'
                }`}
            />
        </button>
    </div>
);

// ─────────────────────────────────────────────
// FormField
// Labeled text / number / date input wrapper
// ─────────────────────────────────────────────

const FormField = ({ label, icon: Icon, children }) => (
    <div className="mb-4">
        <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
            {Icon && <Icon size={12} />}
            {label}
        </label>
        {children}
    </div>
);

// ─────────────────────────────────────────────
// inputClass — shared Tailwind input styling
// ─────────────────────────────────────────────

const inputClass =
    'w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-sm font-medium placeholder-slate-600 outline-none focus:border-green-500/40 focus:bg-green-500/[0.04] focus:ring-2 focus:ring-green-500/10 transition-all';

// ─────────────────────────────────────────────
// RESERVATION_DURATIONS
// Available reservation period options
// ─────────────────────────────────────────────

const RESERVATION_DURATIONS = [
    { value: '24', label: '24 hours' },
    { value: '48', label: '48 hours' },
    { value: '72', label: '72 hours (3 days)' },
    { value: '168', label: '7 days' },
    { value: '336', label: '14 days' },
    { value: '720', label: '30 days' },
];

// ─────────────────────────────────────────────
// GeneratedCode
// Displays the secure code after generation
// ─────────────────────────────────────────────

const GeneratedCode = ({ code, onRegenerate }) => (
    <div className="mt-4 rounded-2xl border border-green-500/15 bg-green-500/[0.04] p-5 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-green-500/[0.06] pointer-events-none" />
        <p className="text-[10px] font-semibold text-green-500/70 uppercase tracking-widest mb-3">
            Verification Code
        </p>
        <div className="bg-black/30 border border-green-500/20 rounded-xl py-4 text-center font-mono text-2xl font-bold tracking-[0.4em] text-green-400">
            {code}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
            {[
                { icon: Copy, label: 'Copy' },
                { icon: Share2, label: 'Share' },
                { icon: RefreshCw, label: 'Regenerate', onClick: onRegenerate },
            ].map(({ icon: Icon, label, onClick }) => (
                <button
                    key={label}
                    onClick={onClick}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-green-500/15 bg-green-500/[0.08] text-green-400 text-xs font-semibold hover:bg-green-500/15 transition-colors"
                >
                    <Icon size={13} /> {label}
                </button>
            ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500">
            <Info size={11} className="inline mr-1" />
            Code expires with reservation period · Single-use per beneficiary
        </p>
    </div>
);

// ─────────────────────────────────────────────
// FundsReservation — Main Export
// ─────────────────────────────────────────────

const FundsReservation = ({ availableBalance = 84200, onChange, onGenerate }) => {
    const [form, setForm] = useState({
        chequeAmount: '25000',
        payableTo: '',
        chequeDate: new Date().toISOString().split('T')[0],
        verificationEnabled: true,
        verifiableAmount: '15000',
        reservationEnabled: true,
        reservationDuration: '72',
    });
    const [generatedCode, setGeneratedCode] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    // ─────────────────────────────────────────
    // updateField — partial state update helper
    // ─────────────────────────────────────────

    const updateField = useCallback((key, value) => {
        setForm((prev) => {
            const next = { ...prev, [key]: value };
            onChange?.(next);
            return next;
        });
    }, [onChange]);

    // ─────────────────────────────────────────
    // generateCode — requests a server-generated secure code
    // ─────────────────────────────────────────

    const generateCode = async () => {
        setError(null);
        setIsGenerating(true);

        try {
            const result = await onGenerate?.(form);
            setGeneratedCode(result?.verificationCode ?? null);
        } catch (e) {
            setError(e?.response?.data?.message || 'Unable to generate verification code.');
        } finally {
            setIsGenerating(false);
        }
    };

    const reservedAmt = Number(form.reservationEnabled ? form.verifiableAmount : 0);
    const reservedPct = availableBalance > 0 ? Math.min(100, Math.round((reservedAmt / availableBalance) * 100)) : 0;

    return (
        <div className="space-y-4">
            {/* Balance Overview */}
            <div className="grid grid-cols-3 gap-3">
                <BalanceStat label="Available" value={`MAD ${availableBalance.toLocaleString()}`} />
                <BalanceStat label="Reserved" value={`MAD ${reservedAmt.toLocaleString()}`} valueColor="text-amber-400" />
                <BalanceStat label="Net Free" value={`MAD ${(availableBalance - reservedAmt).toLocaleString()}`} />
            </div>

            {/* Main Form Card */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <FormField label="Cheque Amount (MAD)" icon={DollarSign}>
                    <input
                        type="number"
                        value={form.chequeAmount}
                        onChange={(e) => updateField('chequeAmount', e.target.value)}
                        placeholder="0.00"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Payable To" icon={User}>
                    <input
                        type="text"
                        value={form.payableTo}
                        onChange={(e) => updateField('payableTo', e.target.value)}
                        placeholder="Beneficiary name or entity"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Cheque Date" icon={Calendar}>
                    <input
                        type="date"
                        value={form.chequeDate}
                        onChange={(e) => updateField('chequeDate', e.target.value)}
                        className={inputClass}
                    />
                </FormField>

                {/* Divider */}
                <div className="h-px bg-white/[0.05] my-2" />

                {/* Verification Toggle */}
                <ToggleRow
                    icon={Eye}
                    label="Enable Verification"
                    description="Allow beneficiary to verify guaranteed funds"
                    checked={form.verificationEnabled}
                    onChange={(v) => updateField('verificationEnabled', v)}
                />

                {form.verificationEnabled && (
                    <div className="pt-3">
                        <FormField label="Verifiable Amount (MAD)" icon={Lock}>
                            <input
                                type="number"
                                value={form.verifiableAmount}
                                onChange={(e) => updateField('verifiableAmount', e.target.value)}
                                placeholder="0.00"
                                className={inputClass}
                            />
                        </FormField>

                        {/* Privacy Note */}
                        <div className="border-l-4 border-green-500 pl-3.5 py-1 bg-green-500/[0.04] rounded-r-xl mb-4">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <span className="text-green-400 font-semibold">Only the selected amount</span> will be verifiable by the beneficiary.
                                Your full account balance and remaining cheque amount remain private.
                            </p>
                        </div>
                    </div>
                )}

                {/* Reservation Toggle */}
                <ToggleRow
                    icon={Lock}
                    iconColor="text-blue-400"
                    label="Reserve Funds"
                    description="Freeze the verifiable amount for a defined period"
                    checked={form.reservationEnabled}
                    onChange={(v) => updateField('reservationEnabled', v)}
                />

                {form.reservationEnabled && (
                    <div className="pt-3 mb-2">
                        <FormField label="Reservation Duration" icon={Calendar}>
                            <div className="relative">
                                <select
                                    value={form.reservationDuration}
                                    onChange={(e) => updateField('reservationDuration', e.target.value)}
                                    className={`${inputClass} appearance-none pr-10`}
                                >
                                    {RESERVATION_DURATIONS.map((d) => (
                                        <option key={d.value} value={d.value} className="bg-[#0a2f2e]">
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </FormField>
                    </div>
                )}

                {/* Generate Button */}
                <button
                    onClick={generateCode}
                    disabled={isGenerating}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-[#041f1e] text-sm font-bold tracking-tight hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/20 active:translate-y-0 transition-all"
                >
                    <ShieldCheck size={16} />
                    {isGenerating ? 'Generating...' : 'Generate Secure Code'}
                </button>
                {error && (
                    <p className="mt-3 text-center text-xs font-semibold text-red-400">{error}</p>
                )}
            </div>

            {/* Generated Code Display */}
            {generatedCode && (
                <GeneratedCode code={generatedCode} onRegenerate={generateCode} />
            )}
        </div>
    );
};

export default FundsReservation;
