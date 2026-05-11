import { Link, usePage } from '@inertiajs/react';
import { Home, Wallet, ArrowLeftRight, CreditCard, Banknote } from 'lucide-react';

export default function MobileBottomNav() {
    const { url } = usePage();

    const navItems = [
        { label: 'Accueil', icon: Home, href: '/dashboard' },
        { label: 'Comptes', icon: Wallet, href: '/comptes' },
        { label: 'Virements', icon: ArrowLeftRight, href: '/virements', isAction: true },
        { label: 'Cartes', icon: CreditCard, href: '/cartes' },
        { label: 'Crédit', icon: Banknote, href: '/credit-request' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-around bg-[#041F1E] border-t border-white/5 lg:hidden px-2 pb-safe">
            {navItems.map((item) => {
                const isActive = url === item.href || (item.href !== '/dashboard' && !item.href.startsWith('#') && (url || '').startsWith(item.href));

                if (item.isAction) {
                    return (
                        <div key={item.label} className="relative -top-6 flex flex-col items-center">
                            <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(28,212,132)] text-[#041F1E] shadow-[0_8px_30px_rgba(28,212,132,0.3)] transition-transform active:scale-95">
                                <item.icon className="h-7 w-7" />
                            </button>
                            <span className="mt-2 text-[10px] font-bold text-slate-400">
                                {item.label}
                            </span>
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-1.5 w-16 transition-colors ${
                            isActive ? 'text-[rgb(28,212,132)]' : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <item.icon className="h-6 w-6" />
                        <span className="text-[10px] font-bold">
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
