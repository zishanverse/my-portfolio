"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import AboutVisual from "../3d/AboutVisual";
import { Brain, Code2, Rocket, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Content entrance
        gsap.fromTo(contentRef.current,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            }
        );

        // Visual entrance
        gsap.fromTo(visualRef.current,
            { x: 100, opacity: 0, scale: 0.8 },
            {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.75)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section 
            id="about"
            ref={containerRef} 
            className="py-32 w-full bg-white dark:bg-black/20 relative overflow-hidden transition-colors duration-500"
        >
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Side: Content */}
                    <div ref={contentRef} className="space-y-10 order-2 lg:order-1">
                        <div className="space-y-4">
                            <TextHighlight className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase italic">
                                The Fusion of Code & Cognition
                            </TextHighlight>
                            <div className="w-20 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                        </div>

                        <div className="space-y-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                            <p>
                                I am a <span className="text-zinc-900 dark:text-white font-bold">Full-Stack Architect</span> specialized in the synergy between complex web systems and generative intelligence. 
                                My mission is to build applications that don't just function, but <span className="italic text-indigo-600 dark:text-indigo-400 font-bold">think</span>.
                            </p>
                            <p>
                                From architecting high-performance Next.js interfaces to orchestrating multi-agent systems via LangGraph, 
                                I bridge the gap between human requirements and autonomous AI reasoning.
                            </p>
                        </div>

                        {/* Core Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { 
                                    icon: Brain, 
                                    title: "AI First", 
                                    desc: "Integrating LLMs, RAG, and Agentic workflows into production.",
                                    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                                },
                                { 
                                    icon: Code2, 
                                    title: "Clean Stack", 
                                    desc: "Modern TypeScript, Next.js, and high-performance backends.",
                                    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                },
                                { 
                                    icon: Rocket, 
                                    title: "Scalable", 
                                    desc: "Cloud-native deployments and optimized data pipelines.",
                                    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                },
                                { 
                                    icon: Share2, 
                                    title: "Connected", 
                                    desc: "Building seamless integrations and real-time experiences.",
                                    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                }
                            ].map((pillar, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-indigo-500/50 transition-all group"
                                >
                                    <div className={`p-3 rounded-lg w-fit ${pillar.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <pillar.icon size={24} />
                                    </div>
                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{pillar.title}</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">{pillar.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: 3D Visual */}
                    <div ref={visualRef} className="order-1 lg:order-2 flex justify-center items-center relative">
                        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-pulse scale-75 lg:scale-100" />
                        <div className="relative z-10 w-full max-w-md lg:max-w-xl">
                            <AboutVisual />
                        </div>
                        
                        {/* Floating Labels */}
                        <div className="absolute top-10 right-0 sm:right-10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-3 px-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl animate-bounce delay-100">
                            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Innovation</span>
                        </div>
                        <div className="absolute bottom-10 left-0 sm:left-10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-3 px-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl animate-bounce delay-500">
                            <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">Efficiency</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export { About };
