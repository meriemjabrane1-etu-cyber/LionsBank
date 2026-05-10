"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Welcome;
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
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var fi_1 = require("react-icons/fi");
// Partes (sections)
var BankMaroc_1 = require("./settings/parties/BankMaroc");
var Techniques_1 = require("./settings/parties/Techniques");
var Blurpage_1 = require("./settings/parties/Blurpage");
var Info_1 = require("./settings/parties/Info");
var ContactSection_1 = require("./settings/parties/ContactSection");
var Publiction_1 = require("./settings/parties/Publiction");
var Footer_1 = require("./settings/Footer");
// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
function Navbar(_a) {
    var darkMode = _a.darkMode, toggleDarkMode = _a.toggleDarkMode;
    var auth = (0, react_2.usePage)().props.auth;
    var _b = (0, react_1.useState)(false), scrolled = _b[0], setScrolled = _b[1];
    var _c = (0, react_1.useState)(false), mobileOpen = _c[0], setMobileOpen = _c[1];
    (0, react_1.useEffect)(function () {
        var onScroll = function () { return setScrolled(window.scrollY > 40); };
        window.addEventListener("scroll", onScroll);
        return function () { return window.removeEventListener("scroll", onScroll); };
    }, []);
    var navLinks = [
        { href: "#realisations", label: "Réalisations" },
        { href: "#expertises", label: "Expertises" },
        { href: "#contact", label: "Contact" },
    ];
    return (<nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 ".concat(scrolled
            ? "bg-white/90 dark:bg-[#03150c]/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-gray-200/50 dark:border-white/10"
            : "bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow duration-300">
                            <fi_1.FiShield className="h-5 w-5 text-white"/>
                        </div>
                        <span className={"text-xl font-bold transition-colors duration-300 ".concat(scrolled ? "text-gray-900 dark:text-white" : "text-white")}>
                            LionsBank
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(function (link) { return (<a key={link.href} href={link.href} className={"text-sm font-medium transition-all duration-200 relative group ".concat(scrolled
                ? "text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
                : "text-white/80 hover:text-white")}>
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-500 group-hover:w-full transition-all duration-300"/>
                            </a>); })}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <button onClick={toggleDarkMode} className={"w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 border border-transparent ".concat(scrolled
            ? "bg-white/90 dark:bg-[#0b2d17]/90 text-gray-700 dark:text-slate-200 hover:text-green-500 dark:hover:text-green-300"
            : "bg-white/10 text-white hover:bg-white/20")} aria-label="Toggle dark mode">
                            {darkMode ? (<fi_1.FiSun className="h-5 w-5"/>) : (<fi_1.FiMoon className="h-5 w-5"/>)}
                        </button>

                        {/* Auth */}
                        <div className="hidden md:flex items-center gap-2">
                            {(auth === null || auth === void 0 ? void 0 : auth.user) ? (<react_2.Link href="/dashboard" className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30" style={{ borderRadius: "5px 5px 12px 5px" }}>
                                    Dashboard
                                </react_2.Link>) : (<>
                                    <react_2.Link href="/login" className={"text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 ".concat(scrolled
                ? "text-gray-700 dark:text-gray-300 hover:text-green-500"
                : "text-white/80 hover:text-white")}>
                                        Se connecter
                                    </react_2.Link>
                                    <react_2.Link href="/register" className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30" style={{ borderRadius: "5px 5px 12px 5px" }}>
                                        S'inscrire
                                    </react_2.Link>
                                </>)}
                        </div>

                        {/* Mobile hamburger */}
                        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={function () { return setMobileOpen(!mobileOpen); }} aria-label="Menu">
                            <span className={"block w-5 h-0.5 transition-all duration-300 ".concat(scrolled ? "bg-gray-900 dark:bg-white" : "bg-white", " ").concat(mobileOpen ? "rotate-45 translate-y-2" : "")}/>
                            <span className={"block w-5 h-0.5 transition-all duration-300 ".concat(scrolled ? "bg-gray-900 dark:bg-white" : "bg-white", " ").concat(mobileOpen ? "opacity-0" : "")}/>
                            <span className={"block w-5 h-0.5 transition-all duration-300 ".concat(scrolled ? "bg-gray-900 dark:bg-white" : "bg-white", " ").concat(mobileOpen ? "-rotate-45 -translate-y-2" : "")}/>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={"md:hidden overflow-hidden transition-all duration-400 ".concat(mobileOpen ? "max-h-96 pb-6" : "max-h-0")}>
                    <div className="flex flex-col gap-1 bg-white dark:bg-[#041F1E] rounded-2xl p-4 border border-gray-100 dark:border-white/10 shadow-xl">
                        {navLinks.map(function (link) { return (<a key={link.href} href={link.href} onClick={function () { return setMobileOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200">
                                {link.label}
                            </a>); })}
                        <div className="border-t border-gray-100 dark:border-white/10 pt-3 mt-2 flex flex-col gap-2">
                            {(auth === null || auth === void 0 ? void 0 : auth.user) ? (<react_2.Link href="/dashboard" className="bg-green-500 text-white text-center py-3 rounded-xl text-sm font-semibold">
                                    Dashboard
                                </react_2.Link>) : (<>
                                    <react_2.Link href="/login" className="text-gray-700 dark:text-gray-300 text-center py-3 rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10">
                                        Se connecter
                                    </react_2.Link>
                                    <react_2.Link href="/register" className="bg-green-500 text-white text-center py-3 rounded-xl text-sm font-semibold">
                                        S'inscrire
                                    </react_2.Link>
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </nav>);
}
// ─────────────────────────────────────────────
// Hero Section with ColorBends-inspired animated gradient background
// ─────────────────────────────────────────────
function HeroSection() {
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        var animId;
        var t = 0;
        var resize = function () {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);
        // Color Bends: flowing organic gradient blobs (ReactBits-inspired)
        var blobs = [
            { x: 0.2, y: 0.3, r: 0.5, color: "22,197,94", speed: 0.4, phase: 0 },
            { x: 0.8, y: 0.2, r: 0.4, color: "16,163,74", speed: 0.3, phase: 1.5 },
            { x: 0.5, y: 0.7, r: 0.55, color: "4,120,87", speed: 0.25, phase: 3 },
            { x: 0.1, y: 0.8, r: 0.3, color: "6,78,59", speed: 0.5, phase: 4.5 },
        ];
        function draw() {
            var w = canvas.width;
            var h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            // Dark base
            ctx.fillStyle = "#020f05";
            ctx.fillRect(0, 0, w, h);
            blobs.forEach(function (blob) {
                var cx = (blob.x + 0.15 * Math.sin(t * blob.speed + blob.phase)) * w;
                var cy = (blob.y + 0.1 * Math.cos(t * blob.speed * 0.7 + blob.phase)) * h;
                var r = blob.r * Math.max(w, h);
                var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                grad.addColorStop(0, "rgba(".concat(blob.color, ", 0.18)"));
                grad.addColorStop(0.5, "rgba(".concat(blob.color, ", 0.08)"));
                grad.addColorStop(1, "rgba(".concat(blob.color, ", 0)"));
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });
            t += 0.008;
            animId = requestAnimationFrame(draw);
        }
        draw();
        return function () {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);
    return (<section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated canvas background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"/>

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px"
        }}/>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Hero content */}
                    <div>
                        {/* Depuis 2003 badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8" data-aos="fade-down">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
                                Depuis 2003
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6" data-aos="fade-right" data-aos-delay="100">
                            Expertise financière
                            <br />
                            au service du{" "}
                            <span className="text-green-400 relative">
                                Maroc
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 6 Q50 0 100 6 Q150 12 200 6" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed" data-aos="fade-right" data-aos-delay="200">
                            LionsBank structure le financement de projets stratégiques à haute valeur technologique à travers le Maroc et l'Afrique, avec une approche institutionnelle de premier rang.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12" data-aos="fade-up" data-aos-delay="300">
                            <a href="#contact" className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-0.5" style={{ borderRadius: "5px 5px 15px 5px" }}>
                                <span>Parler à notre équipe</span>
                                <fi_1.FiArrowRight className="h-4 w-4"/>
                            </a>
                            <a href="#realisations" className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300" style={{ borderRadius: "5px 5px 15px 5px" }}>
                                <span>Nos réalisations</span>
                            </a>
                        </div>

                        {/* Stats badges */}
                        <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="400">
                            {[
            { value: "+1.1M", label: "Clients actifs" },
            { value: "47", label: "Agences" },
            { value: "12", label: "Pays africains" },
        ].map(function (stat, i) { return (<div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <span className="text-2xl font-bold text-green-400">{stat.value}</span>
                                    <span className="text-xs text-white/70 font-medium">{stat.label}</span>
                                </div>); })}
                        </div>
                    </div>

                    {/* Right: Feature cards */}
                    <div className="hidden lg:flex flex-col gap-4" data-aos="fade-left" data-aos-delay="200">
                        {[
            {
                icon: <fi_1.FiShield className="h-6 w-6 text-green-400"/>,
                title: "Vérification de chèques",
                desc: "Validez l'authenticité d'un chèque en quelques secondes.",
                href: "/cheque-verification"
            },
            {
                icon: <fi_1.FiCpu className="h-6 w-6 text-green-400"/>,
                title: "Agent IA Bancaire",
                desc: "Conseils financiers personnalisés, disponibles 24h/24.",
                href: "/ai-agent"
            },
            {
                icon: <fi_1.FiCreditCard className="h-6 w-6 text-green-400"/>,
                title: "Demande de prêt en ligne",
                desc: "Obtenez une décision de financement en 48h.",
                href: "/loan-request"
            },
            {
                icon: <fi_1.FiMapPin className="h-6 w-6 text-green-400"/>,
                title: "Carte des agences",
                desc: "Localisez l'agence LionsBank la plus proche.",
                href: "/map"
            },
        ].map(function (card, i) { return (<a key={i} href={card.href} className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 hover:border-green-500/50 hover:bg-white/15 rounded-2xl px-5 py-4 transition-all duration-300">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-green-400 transition-colors duration-200">
                                    {card.icon}
                                </span>
                                <div className="flex-1">
                                    <div className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors duration-200">
                                        {card.title}
                                    </div>
                                    <div className="text-white/60 text-xs mt-0.5">{card.desc}</div>
                                </div>
                                <fi_1.FiArrowRight className="h-4 w-4 text-white/40 group-hover:text-green-400 transition-colors duration-200"/>
                            </a>); })}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs tracking-widest uppercase">Découvrir</span>
                <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
                    <div className="w-1 h-2 bg-green-500 rounded-full animate-bounce"/>
                </div>
            </div>
        </section>);
}
// ─────────────────────────────────────────────
// Welcome Page
// ─────────────────────────────────────────────
function Welcome() {
    var _a = (0, react_1.useState)(true), darkMode = _a[0], setDarkMode = _a[1];
    (0, react_1.useEffect)(function () {
        var savedTheme = window.localStorage.getItem("lionsbank-theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
        }
        else if (savedTheme === "light") {
            setDarkMode(false);
        }
        else {
            setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        // Apply/remove dark class on <html>
        if (darkMode) {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
        window.localStorage.setItem("lionsbank-theme", darkMode ? "dark" : "light");
    }, [darkMode]);
    (0, react_1.useEffect)(function () {
        // Initialize AOS
        Promise.resolve().then(function () { return require("aos"); }).then(function (AOS) {
            AOS.default.init({
                duration: 700,
                easing: "ease-out-cubic",
                once: true,
                offset: 80,
            });
        });
    }, []);
    return (<>
            <react_2.Head title="LionsBank — Expertise Financière au Maroc"/>

            <div className={"min-h-screen font-[Instrument_Sans,sans-serif] bg-white text-slate-900 dark:bg-[#041F1E] dark:text-white transition-colors duration-300"}>

                {/* Google Fonts */}
                <style>{"\n          @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap');\n          * { font-family: 'Instrument Sans', sans-serif; }\n        "}</style>

                <Navbar darkMode={darkMode} toggleDarkMode={function () { return setDarkMode(!darkMode); }}/>
                <HeroSection />
                <BankMaroc_1.default />
                <Techniques_1.default />
                <Blurpage_1.default />
                <Info_1.default />
                <ContactSection_1.default />
                <Publiction_1.default />
                <Footer_1.default />
            </div>
        </>);
}
