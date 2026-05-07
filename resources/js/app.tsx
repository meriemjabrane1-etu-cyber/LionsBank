import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import type { ComponentType } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import 'leaflet/dist/leaflet.css';
import '../css/app.css';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type PageModule = { default: ComponentType<any> };

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.{tsx,jsx}', {
            eager: true,
        }) as Record<string, PageModule>;

        return (
            (pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}.jsx`]) as PageModule
        );
    },

    setup({ el, App, props }) {
        if (!el) {
            return;
        }

        const root = createRoot(el as HTMLElement);

        root.render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>,
        );
    },

    progress: {
        color: '#0F9D8A',
    },

    layout: (name) => {
        switch (true) {
            case name === 'welcome':
            case name === 'Appointments':
            case name === 'Agencies':
            case name === 'Auctions':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },

    strictMode: true,
});

initializeTheme();