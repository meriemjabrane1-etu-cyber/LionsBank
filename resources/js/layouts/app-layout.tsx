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
        <div className="min-h-screen bg-[#041F1E] flex text-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <main className="ml-72 w-full flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
