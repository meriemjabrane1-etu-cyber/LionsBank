import { CheckCircle2 } from 'lucide-react';

export default function StepIndicator({ steps, currentStep, onStepClick }) {
    return (
        <div className="grid gap-3 md:grid-cols-4">
            {steps.map((step, index) => {
                const active = currentStep === index;
                const complete = currentStep > index;

                return (
                    <button
                        key={step.title}
                        type="button"
                        onClick={() => onStepClick(index)}
                        className={`flex min-h-20 items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                            active
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-950 shadow-sm'
                                : complete
                                  ? 'border-emerald-100 bg-white text-slate-900'
                                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                    >
                        <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                complete ? 'bg-emerald-500 text-white' : active ? 'bg-emerald-600 text-white' : 'bg-slate-100'
                            }`}
                        >
                            {complete ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                        </span>
                        <span>
                            <span className="block text-sm font-black">{step.title}</span>
                            <span className="mt-1 block text-xs leading-4 opacity-70">{step.description}</span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
