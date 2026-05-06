import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Mail, Lock } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
}: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="your@email.com"
                                        className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center ml-1">
                                    <Label htmlFor="password"  className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-[10px] font-bold text-slate-500 hover:text-[#1bd382]"
                                            tabIndex={5}
                                        >
                                            Forgot?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#1bd382] transition-colors" />
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-14 rounded-2xl border-white/5 bg-white/5 focus:bg-white/10 focus:ring-0 focus:border-[#1bd382]/50 transition-all pl-12 text-white placeholder:text-slate-600"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 ml-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-white/10 bg-white/5 text-[#1bd382] focus:ring-[#1bd382]"
                                />
                                <Label htmlFor="remember" className="text-xs font-medium text-slate-500">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-gradient-to-r from-[#1bd382] to-[#12a364] hover:brightness-110 text-[#071d1d] rounded-2xl h-14 font-bold text-lg shadow-[0_10px_25px_rgba(27,211,130,0.2)] transition-all duration-300 flex items-center justify-center gap-2"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Access Vault <span className="text-xl">→</span>
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-6 text-center text-sm font-bold text-[#1bd382]">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in',
    description: 'Enter your email and password below to log in',
};
