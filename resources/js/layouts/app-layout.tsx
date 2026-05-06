import Sidebar from '@/components/Sidebar';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#041F1E] flex text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
            {/* Mesh Gradient Background (Dark Mode Only) */}
            <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[rgb(28,212,132)]/5 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-cyan-500/5 blur-[100px] rounded-full" />
                <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-[rgb(28,212,132)]/5 blur-[110px] rounded-full" />
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <main className="ml-72 min-h-screen relative z-10 w-full">
                {children}
            </main>
        </div>
    );
}
