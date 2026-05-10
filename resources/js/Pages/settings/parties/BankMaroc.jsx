import { FiUsers, FiMapPin, FiTrendingUp, FiGlobe } from "react-icons/fi";
import ScrollVelocity from "@/components/ScrollVelocity";

const stats = [
    { value: "23+", label: "Année d'expertise", icon: <FiUsers className="h-7 w-7 text-green-500" /> },
    { value: "LionsBank", label: "Trusted banking solutions", icon: <FiMapPin className="h-7 w-7 text-green-500" /> },
    { value: "African", label: "continent", icon: <FiTrendingUp className="h-7 w-7 text-green-500" /> },
    { value: "Secure", label: "financial services", icon: <FiGlobe className="h-7 w-7 text-green-500" /> },
];

const infrastructureCards = [
    {
        title: "LionsBank",
        desc: "Trusted banking solutions for the financial needs of the African continent",
        tag: "Trusted banking",
    },
    {
        title: "Financial services",
        desc: "Secure and reliable financial services across the African continent.",
        tag: "African continent",
    },
    {
        title: "Service excellence",
        desc: "Large-scale projects requiring strong regulatory compliance, advanced financial expertise, and continuous service excellence.",
        tag: "Expertise",
    },
];

export default function BankMaroc() {
    return (
        <section
            id="realisations"
            className="py-24 relative overflow-hidden bg-white dark:bg-[#030a06]"
        >
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-16"
                    data-aos="fade-up">
                    <div className="lg:w-1/2">
                        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-4 border border-green-500/30 px-3 py-1 rounded-full">
                            Déploiement Afrique
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Structured engineering for the challenges of the{" "}
                            <span className="text-green-500">region</span>{" "}
                            across the African continent
                        </h2>
                    </div>
                    <div className="lg:w-1/2">
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            LionsBank delivers secure and reliable financial services across the African continent. We support large-scale projects requiring strong regulatory compliance, advanced financial expertise, and continuous service excellence.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent" />
                            <span className="text-green-500 text-sm font-medium">LionsBank</span>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-16" data-aos="fade-up">
                    <ScrollVelocity
                        texts={[
                            stats.map((stat, i) => (
                                <article
                                    key={i}
                                    className="group relative w-[220px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left transition-all duration-300 hover:border-green-500/50 hover:bg-green-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-green-500/5 sm:w-[260px]"
                                >
                                    <div className="mb-3 text-3xl">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-500 dark:text-white lg:text-4xl">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                    <div className="absolute right-6 bottom-0 left-6 h-px scale-x-0 bg-gradient-to-r from-transparent via-green-500/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                                </article>
                            )),
                        ]}
                        velocity={-34}
                        numCopies={4}
                        damping={45}
                        stiffness={320}
                        className="flex items-stretch gap-4 pr-4"
                    />
                </div>

                {/* Infrastructure Cards */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <ScrollVelocity
                        texts={[
                            infrastructureCards.map((card, i) => (
                                <article
                                    key={i}
                                    className="group relative h-full w-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left transition-all duration-300 hover:border-green-500/40 dark:border-white/10 dark:bg-white/[0.03] sm:w-[340px]"
                                >
                                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 transition-colors duration-300 group-hover:bg-green-500/10" />
                                    <span className="mb-3 block text-xs font-semibold tracking-widest text-green-500 uppercase">
                                        {card.tag}
                                    </span>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        {card.desc}
                                    </p>
                                </article>
                            )),
                        ]}
                        velocity={36}
                        numCopies={4}
                        damping={45}
                        stiffness={320}
                        className="flex items-stretch gap-6 pr-6"
                    />
                </div>
            </div>
        </section>
    );
}
