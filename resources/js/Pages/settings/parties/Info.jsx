import React from "react";
import { FiDollarSign, FiUsers, FiCpu, FiTarget, FiAward, FiCheckCircle } from "react-icons/fi";

const pillars = [
    {
        icon: <FiDollarSign className="h-8 w-8 text-green-500" />,
        title: "Fondée en 2003",
        desc: "Deux décennies de stabilité financière et de croissance constante au service de l'économie marocaine."
    },
    {
        icon: <FiUsers className="h-8 w-8 text-green-500" />,
        title: "Partenariats Stratégiques",
        desc: "Alliances avec les plus grandes institutions financières mondiales — FMI, Banque Mondiale, Afreximbank."
    },
    {
        icon: <FiCpu className="h-8 w-8 text-green-500" />,
        title: "Innovation Continue",
        desc: "Centre R&D dédié à l'application de l'IA, du ML et de la blockchain dans les services bancaires."
    },
    {
        icon: <FiTarget className="h-8 w-8 text-green-500" />,
        title: "Finance Durable",
        desc: "Engagement fort en faveur de la finance verte et des critères ESG dans chaque décision d'investissement."
    },
];

export default function Info() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-[#020704] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top: Split layout */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
                    <div data-aos="fade-right">
                        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-4 border border-green-500/30 px-3 py-1 rounded-full">
                            À Propos
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                            Bâtir la finance de demain,{" "}
                            <span className="text-green-500">aujourd'hui</span>
                        </h2>

                        {/* Visual timeline */}
                        <div className="space-y-6 mt-8">
                            {[
                                { year: "2003", event: "Création de LionsBank à Casablanca" },
                                { year: "2010", event: "Expansion vers l'Afrique subsaharienne" },
                                { year: "2017", event: "Lancement de la plateforme bancaire digitale" },
                                { year: "2022", event: "1 million de clients actifs franchis" },
                                { year: "2024", event: "Intégration IA et services bancaires prédictifs" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 items-start group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-all duration-300">
                                            <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-white transition-colors duration-300" />
                                        </div>
                                        {i < 4 && <div className="w-px h-6 bg-green-500/20 mt-1" />}
                                    </div>
                                    <div className="pb-2">
                                        <span className="text-xs font-bold text-green-500 tracking-widest">{item.year}</span>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Mission statement + visual */}
                    <div data-aos="fade-left" data-aos-delay="150">
                        <div className="relative bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 mb-8">
                            <div className="absolute top-4 right-4 text-6xl opacity-10"><FiAward className="h-20 w-20 text-green-500" /></div>
                            <p className="text-2xl font-light text-gray-800 dark:text-gray-200 leading-relaxed italic">
                                "Notre mission est de démocratiser l'accès aux services financiers haut de gamme pour les entreprises africaines, en combinant rigueur institutionnelle et innovation technologique."
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                                    MK
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-sm">Mohamed Khalil</div>
                                    <div className="text-xs text-gray-500">PDG, LionsBank</div>
                                </div>
                            </div>
                        </div>

                        {/* Compliance badges */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "ISO 27001 Certifié",
                                "PCI DSS Level 1",
                                "Bank Al-Maghrib Agréé",
                                "GDPR Conforme"
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3">
                                    <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pillars grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {pillars.map((pillar, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
                        >
                            <div className="text-3xl mb-4">{pillar.icon}</div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
