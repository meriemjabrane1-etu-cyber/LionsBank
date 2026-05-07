import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-[#071d1d] text-white overflow-hidden selection:bg-[#1bd382]/30">
            {/* Background Glow Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1bd382]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1bd382]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="w-full max-w-md relative z-10">
                <div className="flex flex-col items-center gap-6 mb-8">
                    <Link
                        href={home()}
                        className="flex flex-col items-center gap-2 font-medium group"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1bd382]/10 border border-[#1bd382]/20 shadow-[0_0_15px_rgba(27,211,130,0.15)] group-hover:shadow-[0_0_25px_rgba(27,211,130,0.3)] transition-all duration-300">
                            <AppLogoIcon className="size-8 text-[#1bd382]" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
                        <p className="text-center text-sm text-[#9CA3AF] max-w-sm">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="bg-[#0b2827]/80 backdrop-blur-xl border border-[#1a4f4d] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5),_0_0_30px_rgba(27,211,130,0.05)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
