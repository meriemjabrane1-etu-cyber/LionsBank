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

const BalanceStat = ({ label, value, valueColor = 'text-emerald-600 dark:text-[rgb(28,212,132)]' }) => (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-4 shadow-sm dark:shadow-none">
        <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-lg font-black ${valueColor} tracking-tight`}>{value}</p>
    </div>
);

// ─────────────────────────────────────────────
// ToggleRow
// Labeled toggle switch row with description
// ─────────────────────────────────────────────

const ToggleRow = ({ icon: Icon, iconColor = 'text-emerald-600 dark:text-[rgb(28,212,132)]', label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-white/[0.05]">
        <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Icon size={15} className={iconColor} />
                {label}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-white/40 mt-1">{description}</p>
        </div>
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative ml-4 w-12 h-6 rounded-full flex-shrink-0 transition-all duration-300 ${
                checked ? 'bg-[rgb(28,212,132)] shadow-lg shadow-[rgb(28,212,132)]/20' : 'bg-slate-200 dark:bg-white/10'
            }`}
        >
            <span
                className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    checked
                        ? 'left-7 bg-[#041F1E]'
                        : 'left-1 bg-white'
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
    <div className="mb-6">
        <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-2.5">
            {Icon && <Icon size={12} className="text-slate-300 dark:text-white/20" />}
            {label}
        </label>
        {children}
    </div>
);

// ─────────────────────────────────────────────
// inputClass — shared Tailwind input styling
// ─────────────────────────────────────────────

const inputClass =
    'w-full bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-[rgb(28,212,132)]/50 focus:bg-white dark:focus:bg-white/[0.08] focus:ring-4 focus:ring-[rgb(28,212,132)]/5 transition-all';

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

const errorMessage = (e) => {
    const data = e?.response?.data;

    if (data?.errors) {
        return Object.values(data.errors).flat().join(' ');
    }

    return data?.message || 'Unable to generate verification code.';
};

// ─────────────────────────────────────────────
// GeneratedCode
// Displays the secure code after generation
// ─────────────────────────────────────────────

const GeneratedCode = ({ code, onRegenerate }) => (
    <div className="mt-6 rounded-3xl border-2 border-emerald-500/20 bg-emerald-500/[0.03] p-6 relative overflow-hidden shadow-xl shadow-emerald-500/5">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/[0.05] pointer-events-none" />
        <p className="text-[10px] font-bold text-emerald-600 dark:text-[rgb(28,212,132)] uppercase tracking-[0.2em] mb-4 text-center">
            Secure Verification Code
        </p>
        <div className="bg-white dark:bg-black/30 border border-emerald-500/20 rounded-2xl py-6 text-center font-mono text-3xl font-black tracking-[0.4em] text-slate-900 dark:text-[rgb(28,212,132)] shadow-inner">
            {code}
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6">
            {[
                { icon: Copy, label: 'Copy' },
                { icon: Share2, label: 'Share' },
                { icon: RefreshCw, label: 'Regen', onClick: onRegenerate },
            ].map(({ icon: Icon, label, onClick }) => (
                <button
                    key={label}
                    onClick={onClick}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95"
                >
                    <Icon size={14} /> {label}
                </button>
            ))}
        </div>
        <p className="mt-4 text-center text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest leading-relaxed">
            <Info size={11} className="inline mr-1 text-emerald-500" />
            Code expires with reservation · single-use only
        </p>
    </div>
);

// ─────────────────────────────────────────────
// FundsReservation — Main Export
// ─────────────────────────────────────────────

const FundsReservation = ({ availableBalance = 0, onChange, onGenerate }) => {
    const [form, setForm] = useState({
        chequeAmount: '',
        payableTo: '',
        chequeDate: new Date().toISOString().split('T')[0],
        verificationEnabled: true,
        verifiableAmount: '',
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
            setError(errorMessage(e));
        } finally {
            setIsGenerating(false);
        }
    };

    const reservedAmt = Number(form.reservationEnabled ? form.verifiableAmount : 0) || 0;
    const netFree = Math.max(0, Number(availableBalance || 0) - reservedAmt);

    return (
        <div className="space-y-6">
            {/* Balance Overview */}
            <div className="grid grid-cols-3 gap-4">
                <BalanceStat label="Available" value={`MAD ${Number(availableBalance || 0).toLocaleString()}`} />
                <BalanceStat label="Reserved" value={`MAD ${reservedAmt.toLocaleString()}`} valueColor="text-amber-500" />
                <BalanceStat label="Net Free" value={`MAD ${netFree.toLocaleString()}`} />
            </div>

            {/* Main Form Card */}
            <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] p-8 shadow-sm dark:shadow-none">
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
                <div className="h-px bg-slate-100 dark:bg-white/[0.05] my-6" />

                {/* Verification Toggle */}
                <ToggleRow
                    icon={Eye}
                    label="Enable Verification"
                    description="Allow beneficiary to verify guaranteed funds"
                    checked={form.verificationEnabled}
                    onChange={(v) => updateField('verificationEnabled', v)}
                />

                {form.verificationEnabled && (
                    <div className="pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
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
                        <div className="border-l-4 border-[rgb(28,212,132)] pl-4 py-2 bg-[rgb(28,212,132)]/5 rounded-r-2xl mb-6">
                            <p className="text-xs font-medium text-slate-500 dark:text-white/40 leading-relaxed">
                                <span className="text-emerald-600 dark:text-[rgb(28,212,132)] font-bold">Privacy Shield:</span> Only the selected amount is verifiable. Your total balance remains private.
                            </p>
                        </div>
                    </div>
                )}

                {/* Reservation Toggle */}
                <ToggleRow
                    icon={Lock}
                    iconColor="text-blue-500"
                    label="Reserve Funds"
                    description="Freeze the verifiable amount for a defined period"
                    checked={form.reservationEnabled}
                    onChange={(v) => updateField('reservationEnabled', v)}
                />

                {form.reservationEnabled && (
                    <div className="pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <FormField label="Reservation Duration" icon={Calendar}>
                            <div className="relative">
                                <select
                                    value={form.reservationDuration}
                                    onChange={(e) => updateField('reservationDuration', e.target.value)}
                                    className={`${inputClass} appearance-none pr-10`}
                                >
                                    {RESERVATION_DURATIONS.map((d) => (
                                        <option key={d.value} value={d.value} className="bg-white dark:bg-[#062B29] text-slate-900 dark:text-white font-bold">
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 pointer-events-none" />
                            </div>
                        </FormField>
                    </div>
                )}

                {/* Generate Button */}
                <button
                    onClick={generateCode}
                    disabled={isGenerating}
                    className="mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[rgb(28,212,132)] to-emerald-600 text-[#041F1E] text-sm font-black uppercase tracking-widest hover:translate-x-0.5 hover:shadow-xl hover:shadow-[rgb(28,212,132)]/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                    <ShieldCheck size={18} />
                    {isGenerating ? 'Processing...' : 'Generate Secure Code'}
                </button>
                {error && (
                    <p className="mt-4 text-center text-[10px] font-bold text-rose-500 uppercase tracking-widest">{error}</p>
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
