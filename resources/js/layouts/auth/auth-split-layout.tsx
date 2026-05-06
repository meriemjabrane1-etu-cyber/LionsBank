import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { Apple, Chrome, Twitter } from 'lucide-react';

const carouselImages = [
    '/images/auth/vault.png',
    '/images/auctions/car.png',
    '/images/auctions/gold.png',
    '/images/auctions/villa.png',
];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#020617] items-center justify-center p-4 lg:p-6">
            <div className="flex w-full max-w-[1200px] h-[90vh] max-h-[850px] bg-[#0f172a] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 relative">
                
                {/* Left Side: Vertical Carousel */}
                <div className="hidden lg:block w-[45%] relative bg-[#071d1d] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0"
                        >
                            <img 
                                src={carouselImages[index]} 
                                alt="Carousel" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#1bd382]">
                                <span className="text-xl">🦁</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">LionsBank</span>
                        </div>

                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-[#1bd382]">Join the Community</span>
                            <h2 className="text-5xl font-bold leading-tight">Escape the<br/>Ordinary</h2>
                            <p className="text-lg text-white/60 max-w-[320px]">Create your account and start discovering the most beautiful assets in the world.</p>
                            
                            <div className="flex gap-2">
                                {carouselImages.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-[#1bd382]' : 'w-2 bg-white/30'}`} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="flex-1 flex flex-col p-8 lg:p-16 overflow-y-auto no-scrollbar bg-[#0f172a] text-white">
                    <div className="flex-1 flex flex-col justify-center max-w-[500px] mx-auto w-full">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-4xl font-bold mb-3">{title.toLowerCase().includes('register') ? 'Join the Adventure' : 'Welcome Back'}</h2>
                            <p className="text-slate-400 font-medium">Complete the details below to {title.toLowerCase().includes('register') ? 'create your account' : 'access your vault'}.</p>
                        </div>

                        <div className="flex justify-center lg:justify-start gap-12 mb-10">
                            <button className="text-white hover:text-[#1bd382] transition-colors"><Apple className="w-6 h-6" /></button>
                            <button className="text-white hover:text-[#1bd382] transition-colors"><Chrome className="w-6 h-6" /></button>
                            <button className="text-white hover:text-[#1bd382] transition-colors"><Twitter className="w-6 h-6" /></button>
                        </div>

                        <div className="relative mb-10 text-center">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <span className="relative bg-[#0f172a] px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">or {title.toLowerCase().includes('register') ? 'sign up' : 'log in'} manually</span>
                        </div>

                        {children}

                        <div className="mt-8 text-center text-sm font-medium text-slate-500">
                            {title.toLowerCase().includes('register') ? (
                                <>Already have an account? <Link href="/login" className="text-[#1bd382] hover:underline">Log in</Link></>
                            ) : (
                                <>Don't have an account? <Link href="/register" className="text-[#1bd382] hover:underline">Sign up</Link></>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
