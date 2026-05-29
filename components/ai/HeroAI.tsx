"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, ArrowDownRight } from "lucide-react";
import Link from "next/link";

const STATS = [
    { value: "5", label: "ML Systems Built" },
    { value: "3,892", label: "CNN Parameters" },
    { value: "<2ms", label: "Inference Latency" },
    { value: "42", label: "Association Rules" },
];

export const HeroAI = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 overflow-hidden border-b border-white/5"
        >
            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />
            {/* Single soft glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                {/* Label pill */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-zinc-400 tracking-widest uppercase"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI/ML Engineering Lab
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05]"
                >
                    Machine Learning
                    <br />
                    <span className="text-zinc-400">that runs in the browser.</span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                >
                    Real neural networks, trained in Python, exported and executing
                    client-side via TensorFlow.js — zero servers, sub-2ms latency.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <button
                        onClick={() => scrollTo("featured-system")}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-900 text-sm font-bold hover:bg-zinc-100 transition-colors"
                    >
                        Run Live Inference
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={() => scrollTo("experiments")}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-zinc-300 text-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                        View All Projects
                    </button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 mt-8"
                >
                    {STATS.map((s, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-center gap-1 py-5 px-4 bg-zinc-950"
                        >
                            <span className="text-2xl font-black text-white tabular-nums">{s.value}</span>
                            <span className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider text-center">{s.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll hint */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={() => scrollTo("featured-system")}
                    className="inline-flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors mt-4 cursor-pointer"
                >
                    <span className="text-[11px] font-semibold uppercase tracking-widest">Scroll</span>
                    <ArrowDownRight className="w-4 h-4 animate-bounce" />
                </motion.button>
            </div>
        </section>
    );
};
