import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/register';
import { User, Mail, Lock } from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Karim Benslimane"
                                            className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Secure Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Confirm Identity</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-4 w-full bg-gradient-to-r from-[#1bd382] to-[#12a364] hover:brightness-110 text-[#071d1d] rounded-2xl h-14 font-bold text-lg shadow-[0_10px_25px_rgba(27,211,130,0.2)] transition-all duration-300 flex items-center justify-center gap-2" 
                                tabIndex={5} 
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Create Account <span className="text-xl">→</span>
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Register',
    description: 'Enter your details below to create your account',
};
