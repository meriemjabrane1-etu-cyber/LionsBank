import React, { useState } from "react";
import { FiZap, FiRefreshCw, FiServer, FiHome, FiGlobe, FiShield, FiArrowRight } from "react-icons/fi";

const techniques = [
    {
        id: 1,
        icon: <FiZap className="h-7 w-7 text-green-500" />,
        category: "Consulting Stratégique",
        title: "Fusions & Acquisitions",
        brief: "Accompagnement M&A pour PME et grandes entreprises.",
        detail: "Structuration complète des transactions, due diligence financière, valorisation d'actifs et négociation d'accords cross-border en Afrique et en Europe.",
        size: "large",
        accent: "#22C55E"
    },
    {
        id: 2,
        icon: <FiRefreshCw className="h-7 w-7 text-green-500" />,
        category: "Restructuration",
        title: "Restructuration Financière",
        brief: "Optimisation de la structure du capital.",
        detail: "Analyse de solvabilité, plans de redressement, refinancement de dette et renégociation d'accords créditeurs.",
        size: "normal",
        accent: "#16A34A"
    },
    {
        id: 3,
        icon: <FiServer className="h-7 w-7 text-green-500" />,
        category: "Tech Finance",
        title: "Infrastructure Tech",
        brief: "Financement de projets technologiques à grande échelle.",
        detail: "Structuration de financements pour data centers, réseaux 5G, projets IA et infrastructures cloud en Afrique.",
        size: "normal",
        accent: "#15803D"
    },
    {
        id: 4,
        icon: <FiHome className="h-7 w-7 text-green-500" />,
        category: "Banque Privée",
        title: "Gestion de Patrimoine",
        brief: "Services premium pour clients à haute valeur nette.",
        detail: "Portefeuilles personnalisés, investissements alternatifs, family office et planification successorale internationale.",
        size: "wide",
        accent: "#22C55E"
    },
    {
        id: 5,
        icon: <FiGlobe className="h-7 w-7 text-green-500" />,
        category: "Expansion",
        title: "Développement Continental",
        brief: "Stratégies d'entrée sur les marchés africains.",
        detail: "Études de marché, structuration de joint-ventures, compliance réglementaire et partenariats avec des institutions financières locales.",
        size: "normal",
        accent: "#4ADE80"
    },
    {
        id: 6,
        icon: <FiShield className="h-7 w-7 text-green-500" />,
        category: "Corporate Banking",
        title: "Banque d'Entreprise",
        brief: "Solutions financières pour grandes entreprises.",
        detail: "Lignes de crédit syndiquées, lettres de garantie internationales, trade finance et solutions de trésorerie d'entreprise.",
        size: "normal",
        accent: "#22C55E"
    },
];

function TechCard({ tech, isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`group relative bg-gray-50 dark:bg-white/[0.03] border rounded-2xl p-6 cursor-pointer transition-all duration-400 overflow-hidden
        ${isActive
                    ? "border-green-500 shadow-lg shadow-green-500/20 dark:shadow-green-500/10 bg-green-50 dark:bg-green-500/5"
                    : "border-gray-200 dark:border-white/10 hover:border-green-400/50 hover:dark:border-green-500/30"
                }
        ${tech.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
        ${tech.size === "wide" ? "md:col-span-2" : ""}
      `}
        >
            {/* Glow orb */}
            <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-opacity duration-300
          ${isActive ? "opacity-20" : "opacity-0 group-hover:opacity-10"}`}
                style={{ backgroundColor: tech.accent }}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{tech.icon}</span>
                    <span className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full
            ${isActive ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20" : "text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-white/5"}`}>
                        {tech.category}
                    </span>
                </div>

                <h3 className={`font-bold mb-2 transition-colors duration-200
          ${tech.size === "large" ? "text-2xl" : "text-lg"}
          ${isActive ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400"}`}>
                    {tech.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {isActive ? tech.detail : tech.brief}
                </p>

                {isActive && (
                    <div className="mt-4 flex items-center gap-2 text-green-500 text-sm font-medium">
                        <span>Voir les réalisations</span>
                        <FiArrowRight className="h-4 w-4" />
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            <div
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-500 to-transparent transition-all duration-500
          ${isActive ? "w-full" : "w-0 group-hover:w-1/2"}`}
            />
        </div>
    );
}

export default function Techniques() {
    const [activeId, setActiveId] = useState(null);

    return (
        <section id="expertises" className="py-24 bg-gray-50 dark:bg-[#020704] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #22C55E 1px, transparent 0)`,
                    backgroundSize: "40px 40px"
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-4 border border-green-500/30 px-3 py-1 rounded-full">
                        Nos Expertises
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Techniques <span className="text-green-500">&</span> Compétences
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Cliquez sur une carte pour découvrir le détail de nos expertises et les projets associés.
                    </p>
                </div>

                {/* Bento Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
                    data-aos="fade-up"
                    data-aos-delay="150"
                >
                    {techniques.map((tech) => (
                        <TechCard
                            key={tech.id}
                            tech={tech}
                            isActive={activeId === tech.id}
                            onClick={() => setActiveId(activeId === tech.id ? null : tech.id)}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
                    <a
                        href="#realisations"
                        className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                        style={{ borderRadius: "5px 5px 15px 5px" }}
                    >
                        <span>Voir toutes nos réalisations</span>
                        <FiArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
