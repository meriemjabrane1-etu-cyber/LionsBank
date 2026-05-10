import { Menu } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';
import NotificationCenter from './NotificationCenter';
import type { Auth } from '@/types';

export default function MobileHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const { props } = usePage();
    const auth = props.auth as Auth;
    
    const userName = auth?.user?.name?.split(' ')[0] || 'U';

    return (
        <header className="flex w-full items-center justify-between px-6 py-4 lg:hidden">
            <button 
                className="flex h-10 w-10 items-center justify-center text-slate-900 dark:text-white"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </button>

            <Link href="/dashboard" className="flex items-center justify-center">
                <img src="/images/logo-white.png" alt="LionsBank" className="h-8 w-auto mix-blend-screen" />
            </Link>

            <div className="flex items-center gap-4">
                <NotificationCenter />
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[rgb(28,212,132)] to-emerald-600 font-black text-[#041F1E] shadow-lg">
                    {userName.charAt(0)}
                </div>
            </div>
        </header>
    );
}
