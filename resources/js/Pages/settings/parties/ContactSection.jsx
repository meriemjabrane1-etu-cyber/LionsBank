import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiArrowRight } from "react-icons/fi";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Would use Inertia.post('/contact', form) in real app
        setSubmitted(true);
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-[#030a06] relative overflow-hidden">
            {/* Green orb */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Left info */}
                    <div className="lg:col-span-2" data-aos="fade-right">
                        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-4 border border-green-500/30 px-3 py-1 rounded-full">
                            Contact
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                            Parlons de votre{" "}
                            <span className="text-green-500">projet financier</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-10">
                            Nos experts sont disponibles du lundi au vendredi, de 9h à 18h (GMT+1).
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: <FiMapPin className="h-6 w-6 text-green-500" />, label: "Siège social", value: "123 Boulevard Hassan II, Casablanca 20000" },
                                { icon: <FiPhone className="h-6 w-6 text-green-500" />, label: "Téléphone", value: "+212 522 000 000" },
                                { icon: <FiMail className="h-6 w-6 text-green-500" />, label: "Email", value: "contact@lionsbank.ma" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-white/[0.03] rounded-xl border border-gray-100 dark:border-white/[0.05]">
                                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/10 text-green-500">{item.icon}</div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">{item.label}</div>
                                        <div className="text-gray-800 dark:text-gray-200 font-medium text-sm mt-0.5">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3" data-aos="fade-left" data-aos-delay="150">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-3xl">
                                <div className="text-5xl mb-4"><FiCheckCircle className="inline h-12 w-12 text-green-600" /></div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé !</h3>
                                <p className="text-gray-600 dark:text-gray-400">Notre équipe vous contactera dans les 24h.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-green-500 text-sm font-medium hover:underline"
                                >
                                    Envoyer un autre message
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-3xl p-8 space-y-5"
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Ahmed Benali"
                                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="ahmed@entreprise.ma"
                                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                                        Service souhaité
                                    </label>
                                    <select
                                        value={form.service}
                                        onChange={e => setForm({ ...form, service: e.target.value })}
                                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm"
                                    >
                                        <option value="">Sélectionner un service...</option>
                                        <option value="consulting">Consulting Stratégique</option>
                                        <option value="loan">Demande de Prêt</option>
                                        <option value="cheque">Vérification de Chèque</option>
                                        <option value="corporate">Banque Corporate</option>
                                        <option value="wealth">Gestion de Patrimoine</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        placeholder="Décrivez votre projet ou besoin financier..."
                                        className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors duration-200 text-sm resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 text-sm tracking-wide flex items-center justify-center gap-2"
                                    style={{ borderRadius: "8px 8px 16px 8px" }}
                                >
                                    <span>Envoyer le message</span>
                                    <FiArrowRight className="h-4 w-4" />
                                </button>

                                <p className="text-xs text-center text-gray-400 dark:text-gray-600">
                                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
