import { Head } from '@inertiajs/react';
import {
    BadgeCheck,
    Banknote,
    BriefcaseBusiness,
    Building2,
    CircleDollarSign,
    FileCheck2,
    FileText,
    Landmark,
    Loader2,
    LockKeyhole,
    ReceiptText,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import api from '@/lib/axios';
import DocumentUploadCard from './parts/DocumentUploadCard';
import StepIndicator from './parts/StepIndicator';
import SuccessReceipt from './parts/SuccessReceipt';
import TrackingPanel from './parts/TrackingPanel';

const steps = [
    { title: 'Profile', description: 'Applicant and income', icon: UserRound },
    { title: 'Credit', description: 'Amount and purpose', icon: Banknote },
    { title: 'Documents', description: 'AI document checks', icon: FileCheck2 },
    { title: 'Tracking', description: 'Request status', icon: ReceiptText },
];

const employmentLabels = {
    salaried: 'Salaried employee',
    self_employed: 'Self-employed',
    company_owner: 'Company owner',
};

const creditTypes = [
    { value: 'personal', label: 'Personal credit' },
    { value: 'auto', label: 'Auto credit' },
    { value: 'housing', label: 'Housing credit' },
    { value: 'business', label: 'Business credit' },
];

export default function CreditRequest({ documentCatalog = {}, recentRequests = [] }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState({
        full_name: '',
        cin_number: '',
        phone: '',
        email: '',
        employment_status: 'salaried',
        monthly_income: '',
        credit_type: 'personal',
        amount: '50000',
        duration_months: '48',
        purpose: 'Personal financing',
        notes: '',
    });
    const [files, setFiles] = useState({});
    const [verification, setVerification] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');

    const documents = useMemo(
        () =>
            Object.entries(documentCatalog).map(([key, value]) => ({
                key,
                ...value,
                required: value.required_for?.includes(form.employment_status),
            })),
        [documentCatalog, form.employment_status],
    );

    const requiredDocuments = documents.filter((d) => d.required);
    const validRequiredCount = requiredDocuments.filter((d) => verification[d.key]?.status === 'valid').length;
    const progress = requiredDocuments.length ? Math.round((validRequiredCount / requiredDocuments.length) * 100) : 0;

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (field === 'employment_status') {
            setVerification({});
            setFiles({});
        }
    };

    const verifyDocument = async (documentType, file) => {
        if (!file) {
            setFiles((prev) => ({ ...prev, [documentType]: null }));
            setVerification((prev) => ({ ...prev, [documentType]: null }));
            return;
        }
        setFiles((prev) => ({ ...prev, [documentType]: file }));
        setVerification((prev) => ({
            ...prev,
            [documentType]: { status: 'analyzing', summary: 'AI is analyzing this document.' },
        }));
        const payload = new FormData();
        payload.append('document_type', documentType);
        payload.append('employment_status', form.employment_status);
        payload.append('full_name', form.full_name);
        payload.append('cin_number', form.cin_number);
        payload.append('file', file);
        try {
            const response = await api.post('/credit-requests/verify-document', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setVerification((prev) => ({ ...prev, [documentType]: response.data }));
        } catch (error) {
            setVerification((prev) => ({
                ...prev,
                [documentType]: {
                    status: 'invalid',
                    summary: error.response?.data?.message || 'Document could not be verified.',
                    issues: Object.values(error.response?.data?.errors || {}).flat(),
                    recommendations: ['Upload a supported file and try again.'],
                },
            }));
        }
    };

    const canSubmit = useMemo(() => {
        const profileReady = form.full_name && form.cin_number && form.phone && form.email;
        const creditReady = Number(form.amount) >= 5000 && Number(form.duration_months) >= 6 && form.purpose;
        const documentsReady = requiredDocuments.every((d) => files[d.key] && verification[d.key]?.status === 'valid');
        const uploadedInvalid = documents.some((d) => files[d.key] && verification[d.key]?.status !== 'valid');
        return profileReady && creditReady && documentsReady && !uploadedInvalid && !submitting;
    }, [documents, files, form, requiredDocuments, submitting, verification]);

    const submitRequest = async () => {
        setSubmitError('');
        setSubmitting(true);
        const payload = new FormData();
        Object.entries(form).forEach(([key, value]) => payload.append(key, value ?? ''));
        Object.entries(files).forEach(([key, file]) => {
            if (file) payload.append(`documents[${key}]`, file);
        });
        try {
            const response = await api.post('/credit-requests', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTrackingCode(response.data.trackingCode);
            setCurrentStep(3);
        } catch (error) {
            const errors = error.response?.data?.errors;
            const firstError = errors ? Object.values(errors).flat()[0] : null;
            setSubmitError(firstError || error.response?.data?.message || 'Unable to submit the credit request.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Credit Request - LionsBank" />

            <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-950 dark:bg-[#071d1d] dark:text-slate-100 sm:px-6 lg:px-10">

                {/* ─── Hero ─── */}
                <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl sm:px-8 lg:px-10">
                    <div className="absolute inset-0 bg-[url('/images/security-bg.png')] bg-cover bg-center opacity-20 dark:opacity-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,211,130,0.18),transparent_40%)]" />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-200">
                                <Landmark className="h-4 w-4" />
                                LionsBank Credit Platform
                            </div>
                            <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                                Credit Request &amp; AI Document Verification
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                                Apply online, upload Moroccan banking documents separately, verify each file with AI, and receive a secure tracking code.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-8 w-8 text-emerald-300" />
                                <div>
                                    <p className="text-sm font-black">Secure private storage</p>
                                    <p className="mt-1 text-xs leading-5 text-white/55">
                                        Files are validated, stored on the private disk, and never exposed publicly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto mt-6 max-w-7xl space-y-6">
                    <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

                    {/* ─── Step 0: Profile ─── */}
                    {currentStep === 0 && (
                        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                                <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">
                                    <UserRound className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    Applicant profile
                                </h2>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <Input label="Full name" value={form.full_name} onChange={(v) => updateField('full_name', v)} />
                                    <Input label="CIN number" value={form.cin_number} onChange={(v) => updateField('cin_number', v)} />
                                    <Input label="Phone" value={form.phone} onChange={(v) => updateField('phone', v)} />
                                    <Input label="Email" type="email" value={form.email} onChange={(v) => updateField('email', v)} />
                                    <Input label="Monthly income (MAD)" type="number" value={form.monthly_income} onChange={(v) => updateField('monthly_income', v)} />
                                    <Select label="Employment status" value={form.employment_status} onChange={(v) => updateField('employment_status', v)} options={Object.entries(employmentLabels).map(([value, label]) => ({ value, label }))} />
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <PrimaryButton onClick={() => setCurrentStep(1)}>Continue</PrimaryButton>
                                </div>
                            </div>
                            <SideNotice icon={BriefcaseBusiness} title="Moroccan workflow" text="Required documents adapt automatically to salaried employees, self-employed clients, and company owners." />
                        </div>
                    )}

                    {/* ─── Step 1: Credit details ─── */}
                    {currentStep === 1 && (
                        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                                <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">
                                    <CircleDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    Credit details
                                </h2>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <Select label="Credit type" value={form.credit_type} onChange={(v) => updateField('credit_type', v)} options={creditTypes} />
                                    <Input label="Requested amount (MAD)" type="number" value={form.amount} onChange={(v) => updateField('amount', v)} />
                                    <Input label="Duration (months)" type="number" value={form.duration_months} onChange={(v) => updateField('duration_months', v)} />
                                    <Input label="Purpose" value={form.purpose} onChange={(v) => updateField('purpose', v)} />
                                    <label className="md:col-span-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Notes</span>
                                        <textarea
                                            value={form.notes}
                                            onChange={(e) => updateField('notes', e.target.value)}
                                            rows={4}
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800/80"
                                        />
                                    </label>
                                </div>
                                <div className="mt-6 flex flex-wrap justify-between gap-3">
                                    <SecondaryButton onClick={() => setCurrentStep(0)}>Back</SecondaryButton>
                                    <PrimaryButton onClick={() => setCurrentStep(2)}>Continue to documents</PrimaryButton>
                                </div>
                            </div>
                            <SideNotice icon={Building2} title="Financial analysis ready" text="After AI verification, an advisor can continue with debt ratio, guarantees, and branch review." />
                        </div>
                    )}

                    {/* ─── Step 2: Documents ─── */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">
                                            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            Documents for {employmentLabels[form.employment_status]}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            Upload every document in its own field. AI feedback appears immediately after each upload.
                                        </p>
                                    </div>
                                    <div className="min-w-56 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                            <span>Required valid</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                                            <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-2">
                                {documents.map((document) => (
                                    <DocumentUploadCard
                                        key={document.key}
                                        id={document.key}
                                        document={document}
                                        required={document.required}
                                        file={files[document.key]}
                                        result={verification[document.key]}
                                        onChange={verifyDocument}
                                    />
                                ))}
                            </div>

                            {submitError && (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                                    {submitError}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <LockKeyhole className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    Final submission is enabled only when all required uploaded documents are AI-valid.
                                </div>
                                <div className="flex gap-3">
                                    <SecondaryButton onClick={() => setCurrentStep(1)}>Back</SecondaryButton>
                                    <PrimaryButton onClick={submitRequest} disabled={!canSubmit}>
                                        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                        Submit request
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── Step 3: Tracking ─── */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            {trackingCode && <SuccessReceipt trackingCode={trackingCode} onTrack={() => setTrackingCode('')} />}
                            {!trackingCode && <TrackingPanel recentRequests={recentRequests} />}
                        </div>
                    )}

                    {/* ─── Feature footer ─── */}
                    <section className="grid gap-4 md:grid-cols-3">
                        {[
                            ['AI document verification', 'Detects blurry, invalid, expired, inconsistent, and incomplete files.'],
                            ['Separate upload fields', 'CIN, salary certificate, statements, residence proof, CNSS, tax and business documents.'],
                            ['Tracking lifecycle', 'Pending Review, Missing Documents, Accepted, Rejected, Under Financial Analysis, Approved.'],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                                <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <h3 className="mt-3 font-black text-slate-950 dark:text-slate-100">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
                            </div>
                        ))}
                    </section>
                </section>
            </main>
        </>
    );
}

function Input({ label, value, onChange, type = 'text' }) {
    return (
        <label>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-800/80"
            />
        </label>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <label>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-400 focus:bg-white dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800/80"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-800">
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

function PrimaryButton({ children, onClick, disabled = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 dark:hover:bg-emerald-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
        >
            {children}
        </button>
    );
}

function SecondaryButton({ children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
            {children}
        </button>
    );
}

function SideNotice({ icon: Icon, title, text }) {
    return (
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-emerald-300 dark:bg-emerald-400/10 dark:text-emerald-400">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-slate-100">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
        </aside>
    );
}
