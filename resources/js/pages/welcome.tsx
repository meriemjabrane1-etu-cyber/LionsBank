import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import BankMaroc from './settings/parties/BankMaroc';
import bg_hero from '../../images/etienne-martin-2_K82gx9Uk8-unsplash.jpg';
import Techniques from './settings/parties/techniques';
import Blurpage from './settings/parties/Blurpage';
import { Info } from './settings/parties/info';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactSection from './settings/parties/demand';
import Publiction from './settings/parties/publictions';
import Footer from './settings/parties/footerLading';


export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* HERO */}
            <div
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bg_hero})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                {/* NAVBAR */}
                <header className="absolute top-0 left-0 w-full z-20">
                    <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-white">

                        {/* Logo */}
                        <h1 className="text-lg md:text-xl font-bold">LionsBanks</h1>

                        {/* Menu */}
                        <ul className="hidden md:flex space-x-8 text-sm">
                            <li><a href="#" className="hover:text-[#22C55E]">Réalisations</a></li>
                            <li><a href="#" className="hover:text-[#22C55E]">Expertises</a></li>
                            <li><a href="#" className="hover:text-[#22C55E]">Contact</a></li>
                        </ul>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className="bg-[#22C55E] px-3 md:px-4 py-2 rounded-md text-xs md:text-sm"
                                >
                                    Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login().url}
                                        className="text-white text-xs md:text-sm hover:text-[#22C55E]"
                                    >
                                        Log in
                                    </Link>

                                    {canRegister && (
                                        <Link
                                            href={register().url}
                                            className="bg-[#22C55E] px-4 md:px-6 lg:px-10 py-2 rounded-[5px] rounded-br-[15px] text-xs md:text-sm"
                                        >
                                            Register →
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* HERO CONTENT */}
                <div
                    className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center text-white"
                    data-aos="fade-right"
                >
                    <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">
                        Depuis 2003
                    </p>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
                        Financial expertise <br />
                        at the service of{" "}
                        <span className="text-[#22C55E]">Morocco</span>
                    </h1>

                    {/* Description */}
                    <p className="mt-4 md:mt-6 text-gray-300 max-w-2xl text-sm md:text-lg">
                        Depuis le Maroc, LionsBanks opère comme plateforme stratégique
                        de déploiement des expertises sur le continent africain,
                        au service des projets à haute exigence technique.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                        <a
                            href="#"
                            className="bg-[#22C55E] px-5 md:px-6 py-3 rounded-[5px] rounded-br-[15px] text-sm font-medium text-center"
                        >
                            Talk to our team →
                        </a>

                        <a
                            href="#"
                            className="border border-white/30 px-5 md:px-6 py-3 rounded-[5px] rounded-br-[15px] text-sm hover:bg-white/10 transition text-center"
                        >
                            Our achievements →
                        </a>
                    </div>

                    {/* Bottom badge */}
                    <div className="mt-10 md:mt-12">
                        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-4 md:px-6 py-3 rounded-full">
                            <span className="text-xl md:text-2xl font-bold">+1.1M</span>
                            <span className="text-xs md:text-sm text-gray-300">
                                Lions Bank serves active clients across Morocco.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <BankMaroc />
            <Techniques />
            <Blurpage />
            <Info />
            <ContactSection />
            <Publiction />
            <Footer />
        </>
    );
}