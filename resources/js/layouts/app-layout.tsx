import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import MobileBottomNav from '@/components/MobileBottomNav';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-[#F8FAFC] dark:bg-[#041F1E] flex flex-col lg:flex-row text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
                {/* Dark Mode Glows */}
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[rgb(28,212,132)]/5 dark:bg-[rgb(28,212,132)]/5 blur-[120px] rounded-full opacity-0 dark:opacity-100" />
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-cyan-500/5 blur-[100px] rounded-full opacity-0 dark:opacity-100" />
                
                {/* Light Mode Glows (More subtle/vibrant) */}
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-50/50 blur-[120px] rounded-full dark:opacity-0" />
                <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/50 blur-[100px] rounded-full dark:opacity-0" />
            </div>

            {/* Sidebar */}
            <Sidebar 
                isMobileOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)} 
            />

            {/* Mobile Header */}
            <div className="relative z-20 w-full lg:hidden shrink-0">
                <MobileHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
            </div>

            {/* Main */}
            <main className="lg:pl-72 flex-1 relative z-10 p-0 m-0 w-full max-w-none pb-24 lg:pb-0 overflow-y-auto overflow-x-hidden">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
        </div>
    );
}
