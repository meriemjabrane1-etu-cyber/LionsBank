import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

function GlobePulse() {
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark"),
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationId;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const dots = Array.from({ length: 80 }, () => ({
            lat: (Math.random() - 0.5) * Math.PI,
            lng: Math.random() * Math.PI * 2,
            size: Math.random() * 2 + 0.5,
            pulse: Math.random() * Math.PI * 2,
            active: Math.random() > 0.6,
        }));

        const connections = [];
        for (let i = 0; i < 20; i++) {
            connections.push({
                from: Math.floor(Math.random() * dots.length),
                to: Math.floor(Math.random() * dots.length),
                progress: Math.random(),
                speed: 0.003 + Math.random() * 0.005,
            });
        }

        function project(lat, lng, radius, cx, cy) {
            const x = cx + radius * Math.cos(lat) * Math.sin(lng + time * 0.2);
            const y = cy + radius * Math.sin(lat);
            const z = Math.cos(lat) * Math.cos(lng + time * 0.2);
            return { x, y, z };
        }

        function draw() {
            const palette = isDarkMode
                ? {
                    fillInner: "rgba(34, 197, 94, 0.08)",
                    fillOuter: "rgba(34, 197, 94, 0.02)",
                    outline: "rgba(34, 197, 94, 0.15)",
                    grid: "rgba(34, 197, 94, 0.08)",
                    inactiveDot: "rgba(134, 239, 172,",
                    activeDot: "rgba(34, 197, 94,",
                    pulseDot: "rgba(74, 222, 128, 0.8)",
                    activeGlow: 0.05,
                    inactiveAlpha: 0.4,
                    activeAlpha: 0.9,
                    lineWidth: 0.5,
                }
                : {
                    fillInner: "rgba(34, 197, 94, 0.2)",
                    fillOuter: "rgba(22, 163, 74, 0.08)",
                    outline: "rgba(22, 163, 74, 0.36)",
                    grid: "rgba(22, 163, 74, 0.24)",
                    inactiveDot: "rgba(74, 222, 128,",
                    activeDot: "rgba(22, 163, 74,",
                    pulseDot: "rgba(21, 128, 61, 0.95)",
                    activeGlow: 0.14,
                    inactiveAlpha: 0.72,
                    activeAlpha: 1,
                    lineWidth: 0.8,
                };
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const radius = Math.min(w, h) * 0.35;

            ctx.clearRect(0, 0, w, h);

            // Globe outline
            const gradient = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, 0, cx, cy, radius);
            gradient.addColorStop(0, palette.fillInner);
            gradient.addColorStop(1, palette.fillOuter);
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = palette.outline;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Latitude/Longitude lines
            for (let lat = -60; lat <= 60; lat += 30) {
                ctx.beginPath();
                const latRad = (lat * Math.PI) / 180;
                let first = true;
                for (let lng = 0; lng <= 360; lng += 5) {
                    const lngRad = (lng * Math.PI) / 180;
                    const p = project(latRad, lngRad, radius, cx, cy);
                    if (p.z < 0) { first = true; continue; }
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.strokeStyle = palette.grid;
                ctx.lineWidth = palette.lineWidth;
                ctx.stroke();
            }

            for (let lng = 0; lng < 360; lng += 30) {
                ctx.beginPath();
                const lngRad = (lng * Math.PI) / 180;
                let first = true;
                for (let lat = -90; lat <= 90; lat += 5) {
                    const latRad = (lat * Math.PI) / 180;
                    const p = project(latRad, lngRad, radius, cx, cy);
                    if (p.z < 0) { first = true; continue; }
                    if (first) { ctx.moveTo(p.x, p.y); first = false; }
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.strokeStyle = palette.grid;
                ctx.lineWidth = palette.lineWidth;
                ctx.stroke();
            }

            // Dots
            dots.forEach((dot) => {
                const p = project(dot.lat, dot.lng, radius, cx, cy);
                if (p.z < 0) return;
                const alpha = (p.z + 1) / 2;
                const pulseScale = dot.active ? 1 + 0.3 * Math.sin(time * 3 + dot.pulse) : 1;
                const size = dot.size * pulseScale * alpha;

                if (dot.active) {
                    // Glow ring
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(34, 197, 94, ${palette.activeGlow * alpha})`;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = dot.active
                    ? `${palette.activeDot} ${palette.activeAlpha * alpha})`
                    : `${palette.inactiveDot} ${palette.inactiveAlpha * alpha})`;
                ctx.fill();
            });

            // Connection arcs
            connections.forEach((conn) => {
                conn.progress += conn.speed;
                if (conn.progress > 1) conn.progress = 0;

                const from = dots[conn.from];
                const to = dots[conn.to];
                const fp = project(from.lat, from.lng, radius, cx, cy);
                const tp = project(to.lat, to.lng, radius, cx, cy);

                if (fp.z < 0 || tp.z < 0) return;

                const prog = conn.progress;
                const mx = fp.x + (tp.x - fp.x) * prog;
                const my = fp.y + (tp.y - fp.y) * prog;

                ctx.beginPath();
                ctx.arc(mx, my, 2, 0, Math.PI * 2);
                ctx.fillStyle = palette.pulseDot;
                ctx.fill();
            });

            time += 0.005;
            animationId = requestAnimationFrame(draw);
        }

        draw();
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: "block" }}
        />
    );
}

export default function Blurpage() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-[#030a06]">
            {/* Blurred background orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-400/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Globe Canvas */}
                    <div
                        className="relative h-[400px] lg:h-[500px] order-2 lg:order-1"
                        data-aos="fade-right"
                    >
                        <GlobePulse />
                        {/* Overlay badge */}
                        <div className="absolute bottom-8 left-8 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-2xl px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    Transactions en temps réel
                                </span>
                            </div>
                            <div className="mt-1 text-2xl font-bold text-green-500">+2,840</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">opérations aujourd'hui</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2" data-aos="fade-left">
                        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-green-500 mb-4 border border-green-500/30 px-3 py-1 rounded-full">
                            Portée Globale
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Un réseau financier{" "}
                            <span className="text-green-500">panafricain</span>{" "}
                            connecté
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            LionsBank orchestre des flux financiers transfrontaliers en temps réel, reliant 12 marchés africains à travers une infrastructure technique de pointe.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { label: "Traitement instantané", desc: "Transactions validées en moins de 3 secondes." },
                                { label: "Sécurité renforcée", desc: "Chiffrement AES-256 et authentification biométrique." },
                                { label: "Conformité réglementaire", desc: "Agréé par Bank Al-Maghrib et 8 régulateurs africains." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/[0.06] hover:border-green-500/30 transition-colors duration-200">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                                        <FiCheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{item.label}</div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-3 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white px-8 py-4 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 font-medium"
                            style={{ borderRadius: "5px 5px 15px 5px" }}
                        >
                            <span>En savoir plus</span>
                            <FiArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
