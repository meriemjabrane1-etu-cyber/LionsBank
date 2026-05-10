import React from "react";
import { FiBarChart2, FiGlobe, FiCpu, FiArrowRight } from "react-icons/fi";

const articles = [
    {
        tag: "Rapport Annuel",
        date: "15 Jan 2024",
        title: "Bilan financier 2023 : Une année de croissance record",
        excerpt: "LionsBank enregistre une hausse de 23% de son portefeuille de financements, portée par l'expansion en Afrique de l'Ouest.",
        readTime: "8 min",
        icon: <FiBarChart2 className="h-10 w-10 text-green-500" />
    },
    {
        tag: "Analyse Marché",
        date: "02 Mar 2024",
        title: "L'essor de la fintech en Afrique : Opportunités et défis réglementaires",
        excerpt: "Le continent africain connaît une révolution bancaire sans précédent, portée par l'adoption mobile et des politiques favorables.",
        readTime: "12 min",
        icon: <FiGlobe className="h-10 w-10 text-green-500" />
    },
    {
        tag: "Innovation",
        date: "20 Avr 2024",
        title: "LionsBank lance son agent IA pour le conseil financier personnalisé",
        excerpt: "Notre nouveau chatbot bancaire combine NLP avancé et données financières temps réel pour offrir des recommandations précises.",
        readTime: "5 min",
        icon: <FiCpu className="h-10 w-10 text-green-500" />
    },
];

export default function Publiction() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-[#020704] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
                    data-aos="fade-up">
                    <div>
                        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-3 border border-green-500/30 px-3 py-1 rounded-full">
                            Publications
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Insights & <span className="text-green-500">Analyses</span>
                        </h2>
                    </div>
                    <a
                        href="#"
                        className="text-green-500 hover:text-green-400 font-medium text-sm flex items-center gap-2 transition-colors duration-200 whitespace-nowrap"
                    >
                        Voir toutes les publications
                        <FiArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <article
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 120}
                            className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-400 cursor-pointer"
                        >
                            {/* Card Header */}
                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 dark:from-green-500/5 dark:to-transparent p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-center h-36">
                                <span className="text-5xl">{article.icon}</span>
                                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-300" />
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-green-500 uppercase tracking-wider bg-green-500/10 px-2 py-1 rounded-full">
                                        {article.tag}
                                    </span>
                                    <span className="text-xs text-gray-400">{article.date}</span>
                                </div>

                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-green-500 transition-colors duration-200">
                                    {article.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                                    <span className="text-xs text-gray-400">⏱ {article.readTime} de lecture</span>
                                    <span className="text-green-500 text-xs font-medium group-hover:gap-2 flex items-center gap-1 transition-all duration-200">
                                        Lire l'article <FiArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
