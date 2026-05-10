import React from "react";
import { FiTwitter, FiLinkedin, FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
    const year = new Date().getFullYear();

    const links = {
        "Services": ["Prêts en ligne", "Vérification chèques", "Agent IA", "Carte bancaire", "Virements"],
        "Entreprise": ["À propos", "Carrières", "Presse", "Partenaires", "Réalisations"],
        "Support": ["FAQ", "Nous contacter", "Agences", "Réclamations", "Sécurité"],
    };

    return (
        <footer className="bg-green-700 dark:bg-green-950 border-t border-green-500/30 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <a href="/" className="mb-5 inline-flex items-center">
                            <img
                                src="/images/logo-white.png"
                                alt="LionsBank"
                                className="h-20 w-auto"
                            />
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            La banque de référence pour les entreprises et particuliers exigeants au Maroc et en Afrique.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: <FiTwitter className="h-5 w-5" />, href: "#" },
                                { icon: <FiLinkedin className="h-5 w-5" />, href: "#" },
                                { icon: <FiFacebook className="h-5 w-5" />, href: "#" },
                                { icon: <FiYoutube className="h-5 w-5" />, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href}
                                    className="w-9 h-9 bg-white/5 hover:bg-green-500 border border-white/10 hover:border-green-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">{title}</h4>
                            <ul className="space-y-2.5">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {year} LionsBank S.A. — Tous droits réservés. Agréé par Bank Al-Maghrib.
                    </p>
                    <div className="flex gap-5">
                        {["Politique de confidentialité", "CGU", "Mentions légales"].map((item) => (
                            <a key={item} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
