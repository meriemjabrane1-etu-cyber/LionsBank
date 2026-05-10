// import { Head, Link, usePage } from '@inertiajs/react';
// import { dashboard, login, register } from '@/routes';
// import BankMaroc from './settings/parties/BankMaroc';
// import bg_hero from '../../images/etienne-martin-2_K82gx9Uk8-unsplash.jpg';
// import Techniques from './settings/parties/techniques';
// import Blurpage from './settings/parties/Blurpage';
// import { Info } from './settings/parties/info';
// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ContactSection from './settings/parties/demand';
// import Publiction from './settings/parties/publictions';
// import Footer from './settings/parties/footerLading';


// export default function Welcome({
//     canRegister = true,
// }: {
//     canRegister?: boolean;
// }) {
//     const { auth } = usePage().props;

//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: true
//         });
//     }, []);

//     return (
//         <>
//             <Head title="Welcome">
//                 <link rel="preconnect" href="https://fonts.bunny.net" />
//                 <link
//                     href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
//                     rel="stylesheet"
//                 />
//             </Head>

//             {/* HERO */}
//             <div
//                 className="relative h-screen bg-cover bg-center"
//                 style={{ backgroundImage: `url(${bg_hero})` }}
//             >
//                 <div className="absolute inset-0 bg-black/60"></div>

//                 {/* NAVBAR */}
//                 <header className="absolute top-0 left-0 w-full z-20">
//                     <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-white">

//                         {/* Logo */}
//                         <h1 className="text-lg md:text-xl font-bold">LionsBanks</h1>

//                         {/* Menu */}
//                         <ul className="hidden md:flex space-x-8 text-sm">
//                             <li><a href="#" className="hover:text-[#22C55E]">Réalisations</a></li>
//                             <li><a href="#" className="hover:text-[#22C55E]">Expertises</a></li>
//                             <li><a href="#" className="hover:text-[#22C55E]">Contact</a></li>
//                         </ul>

//                         {/* Auth Buttons */}
//                         <div className="flex items-center gap-2 md:gap-3">
//                             {auth.user ? (
//                                 <Link
//                                     href={dashboard()}
//                                     className="bg-[#22C55E] px-3 md:px-4 py-2 rounded-[5px] rounded-br-[10px] text-xs md:text-sm"
//                                 >
//                                     Dashboard →
//                                 </Link>
//                             ) : (
//                                 <>
//                                     <Link
//                                         href={login().url}
//                                         className="text-white text-xs md:text-sm hover:text-[#22C55E]"
//                                     >
//                                         Log in
//                                     </Link>

//                                     {canRegister && (
//                                         <Link
//                                             href={register().url}
//                                             className="bg-[#22C55E] px-4 md:px-6 lg:px-10 py-2 rounded-[5px] rounded-br-[15px] text-xs md:text-sm"
//                                         >
//                                             Register →
//                                         </Link>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </nav>
//                 </header>

//                 {/* HERO CONTENT */}
//                 <div
//                     className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center text-white"
//                     data-aos="fade-right"
//                 >
//                     <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">
//                         Depuis 2003
//                     </p>

//                     {/* Title */}
//                     <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
//                         Financial expertise <br />
//                         at the service of{" "}
//                         <span className="text-[#22C55E]">Morocco</span>
//                     </h1>

//                     {/* Description */}
//                     <p className="mt-4 md:mt-6 text-gray-300 max-w-2xl text-sm md:text-lg">
//                         Depuis le Maroc, LionsBanks opère comme plateforme stratégique
//                         de déploiement des expertises sur le continent africain,
//                         au service des projets à haute exigence technique.
//                     </p>

//                     {/* Buttons */}
//                     <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
//                         <a
//                             href="#"
//                             className="bg-[#22C55E] px-5 md:px-6 py-3 rounded-[5px] rounded-br-[15px] text-sm font-medium text-center"
//                         >
//                             Talk to our team →
//                         </a>

//                         <a
//                             href="#"
//                             className="border border-white/30 px-5 md:px-6 py-3 rounded-[5px] rounded-br-[15px] text-sm hover:bg-white/10 transition text-center"
//                         >
//                             Our achievements →
//                         </a>
//                     </div>

//                     {/* Bottom badge */}
//                     <div className="mt-10 md:mt-12">
//                         <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-4 md:px-6 py-3 rounded-full">
//                             <span className="text-xl md:text-2xl font-bold">+1.1M</span>
//                             <span className="text-xs md:text-sm text-gray-300">
//                                 Lions Bank serves active clients across Morocco.
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <BankMaroc />
//             <Techniques />
//             <Blurpage />
//             <Info />
//             <ContactSection />
//             <Publiction />
//             <Footer />
//         </>
//     );
// }



import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { FiArrowRight, FiCreditCard, FiCpu, FiMapPin, FiMoon, FiShield, FiSun } from "react-icons/fi";
import { useAppearance } from "@/hooks/use-appearance";
import DarkVeil from "@/components/DarkVeil";

// Partes (sections)
import BankMaroc from "./settings/parties/BankMaroc";
import Techniques from "./settings/parties/Techniques";
import Blurpage from "./settings/parties/Blurpage";
import Info from "./settings/parties/Info";
import ContactSection from "./settings/parties/ContactSection";
import Publiction from "./settings/parties/Publiction";
import Footer from "./settings/Footer";

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "#realisations", label: "Réalisations" },
        { href: "#expertises", label: "Expertises" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/90 dark:bg-[#03150c]/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-gray-200/50 dark:border-white/10"
                    : "bg-transparent"
                }`}

        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <img
                            src="/images/logo-white.png"
                            alt="LionsBank"
                            className="h-16 w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-200 relative group ${scrolled
                                        ? "text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                                        : isDarkMode
                                            ? "text-white/80 hover:text-white"
                                            : "text-gray-700 hover:text-green-600"
                                    }`}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 border border-transparent ${scrolled
                                    ? "bg-white/90 dark:bg-[#0b2d17]/90 text-gray-700 dark:text-slate-200 hover:text-green-500 dark:hover:text-green-300"
                                    : isDarkMode
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : "bg-white/80 text-gray-800 shadow-sm shadow-green-900/5 hover:bg-white"
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <FiSun className="h-5 w-5" />
                            ) : (
                                <FiMoon className="h-5 w-5" />
                            )}
                        </button>

                        {/* Auth */}
                        <div className="hidden md:flex items-center gap-2">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 rounded-[5px_5px_12px_5px]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${scrolled
                                                ? "text-gray-700 dark:text-gray-300 hover:text-green-500"
                                                : isDarkMode
                                                    ? "text-white/80 hover:text-white"
                                                    : "text-gray-700 hover:text-green-600"
                                            }`}
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                                        style={{ borderRadius: "5px 5px 12px 5px" }}
                                    >
                                        S'inscrire
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >
                            <span className={`block w-5 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-900 dark:bg-white" : isDarkMode ? "bg-white" : "bg-gray-900"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-5 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-900 dark:bg-white" : isDarkMode ? "bg-white" : "bg-gray-900"} ${mobileOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-5 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-900 dark:bg-white" : isDarkMode ? "bg-white" : "bg-gray-900"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
                    <div className="flex flex-col gap-1 bg-white dark:bg-[#041F1E] rounded-2xl p-4 border border-gray-100 dark:border-white/10 shadow-xl">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="border-t border-gray-100 dark:border-white/10 pt-3 mt-2 flex flex-col gap-2">
                            {auth?.user ? (
                                <Link href="/dashboard" className="bg-green-500 text-white text-center py-3 rounded-xl text-sm font-semibold">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-700 dark:text-gray-300 text-center py-3 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10">
                                        Se connecter
                                    </Link>
                                    <Link href="/register" className="bg-green-500 text-white text-center py-3 rounded-xl text-sm font-semibold">
                                        S'inscrire
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ─────────────────────────────────────────────
// Hero Section with DarkVeil background
// ─────────────────────────────────────────────
function HeroSection({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#020704]">
            {/* DarkVeil background */}
            <div className={`absolute inset-0 ${isDarkMode ? "opacity-100" : "opacity-35"}`}>
                <DarkVeil
                    hueShift={isDarkMode ? 120 : 85}
                    noiseIntensity={isDarkMode ? 0.05 : 0.02}
                    scanlineIntensity={isDarkMode ? 0.1 : 0.03}
                    speed={2.3}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/75 dark:bg-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(15,157,138,0.14),transparent_28%)] dark:bg-none" />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] noise-pattern" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Hero content */}
                    <div>
                        {/* Depuis 2003 badge */}
                        <div
                            className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-green-500/20 dark:border-white/20 rounded-full px-4 py-2 mb-8 shadow-sm shadow-green-900/5 dark:shadow-none"
                            data-aos="fade-down"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-700 dark:text-white/80">
                                Depuis 2003
                            </span>
                        </div>

                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-950 dark:text-white leading-tight mb-6"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            Expertise financière
                            <br />
                            au service du{" "}
                            <span className="text-green-600 dark:text-green-400 relative">
                                Maroc
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 6 Q50 0 100 6 Q150 12 200 6" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                </svg>
                            </span>
                        </h1>

                        <p
                            className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed"
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            LionsBank structure le financement de projets stratégiques à haute valeur technologique à travers le Maroc et l'Afrique, avec une approche institutionnelle de premier rang.
                        </p>

                        {/* CTA buttons */}
                        <div
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-0.5 rounded-[5px_5px_15px_5px]"
                            >
                                <span>Parler à notre équipe</span>
                                <FiArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#realisations"
                                className="inline-flex items-center justify-center gap-3 bg-white/70 dark:bg-transparent border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white font-semibold px-8 py-4 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 rounded-[5px_5px_15px_5px]"
                            >
                                <span>Nos réalisations</span>
                            </a>
                        </div>

                        {/* Stats badges */}
                        <div
                            className="flex flex-wrap gap-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            {[
                                { value: "+1.1M", label: "Clients actifs" },
                                { value: "47", label: "Agences" },
                                { value: "12", label: "Pays africains" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-white/75 dark:bg-white/10 backdrop-blur-md border border-green-500/15 dark:border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm shadow-green-900/5 dark:shadow-none"
                                >
                                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stat.value}</span>
                                    <span className="text-xs text-gray-600 dark:text-white/70 font-medium">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Feature cards */}
                    <div
                        className="hidden lg:flex flex-col gap-4"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        {[
                            {
                                icon: <FiShield className="h-6 w-6 text-green-500 dark:text-green-400" />,
                                title: "Vérification de chèques",
                                desc: "Validez l'authenticité d'un chèque en quelques secondes.",
                                href: "/cheque-verification"
                            },
                            {
                                icon: <FiCpu className="h-6 w-6 text-green-500 dark:text-green-400" />,
                                title: "Agent IA Bancaire",
                                desc: "Conseils financiers personnalisés, disponibles 24h/24.",
                                href: "/ai-agent"
                            },
                            {
                                icon: <FiCreditCard className="h-6 w-6 text-green-500 dark:text-green-400" />,
                                title: "Demande de prêt en ligne",
                                desc: "Obtenez une décision de financement en 48h.",
                                href: "/loan-request"
                            },
                            {
                                icon: <FiMapPin className="h-6 w-6 text-green-500 dark:text-green-400" />,
                                title: "Carte des agences",
                                desc: "Localisez l'agence LionsBank la plus proche.",
                                href: "/map"
                            },
                        ].map((card, i) => (
                            <a
                                key={i}
                                href={card.href}
                                className="group flex items-center gap-4 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-green-500/15 dark:border-white/15 hover:border-green-500/50 hover:bg-white dark:hover:bg-white/15 rounded-2xl px-5 py-4 transition-all duration-300 shadow-sm shadow-green-900/5 dark:shadow-none"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 dark:bg-white/10 text-green-500 dark:text-green-400 transition-colors duration-200">
                                    {card.icon}
                                </span>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-950 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                                        {card.title}
                                    </div>
                                    <div className="text-gray-500 dark:text-white/60 text-xs mt-0.5">{card.desc}</div>
                                </div>
                                <FiArrowRight className="h-4 w-4 text-gray-400 dark:text-white/40 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-200" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 dark:text-white/40">
                <span className="text-xs tracking-widest uppercase">Découvrir</span>
                <div className="w-5 h-8 border border-gray-300 dark:border-white/20 rounded-full flex items-start justify-center pt-1.5">
                    <div className="w-1 h-2 bg-green-500 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────
// Welcome Page
// ─────────────────────────────────────────────
export default function Welcome() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDarkMode = resolvedAppearance === "dark";

    useEffect(() => {
        // Initialize AOS
        import("aos").then((AOS) => {
            AOS.default.init({
                duration: 700,
                easing: "ease-out-cubic",
                once: true,
                offset: 80,
            });
        });
    }, []);

    return (
        <>
            <Head title="LionsBank — Expertise Financière au Maroc" />

            <div className={`min-h-screen font-[Instrument_Sans,sans-serif] bg-white text-slate-900 dark:bg-[#041F1E] dark:text-white transition-colors duration-300`}>

                {/* Google Fonts */}
                <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
          * { font-family: 'Instrument Sans', sans-serif; }
          .noise-pattern {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 256px 256px;
          }
        `}</style>

                <Navbar isDarkMode={isDarkMode} toggleTheme={() => updateAppearance(isDarkMode ? "light" : "dark")} />
                <HeroSection isDarkMode={isDarkMode} />
                <BankMaroc />
                <Techniques />
                <Blurpage />
                <Info />
                <ContactSection />
                <Publiction />
                <Footer />
            </div>
        </>
    );
}
