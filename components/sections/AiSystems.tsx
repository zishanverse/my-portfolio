"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NeuralCore from "../3d/NeuralCore";
import AiConversationalAgent from "../ai/AiConversationalAgent";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const AiSystems = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isAgentActive, setIsAgentActive] = useState(false);

    useGSAP(() => {
        if (!containerRef.current || !textRef.current) return;

        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 w-full bg-transparent dark:bg-transparent relative overflow-hidden flex flex-col items-center">
            {/* Background Neural Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
                <div className="w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div ref={textRef} className="text-center space-y-4 mb-20 z-10 px-4">
                <TextHighlight className="text-4xl md:text-6xl font-black tracking-tight text-foreground dark:text-white uppercase italic">
                    Agentic AI Ecosystem
                </TextHighlight>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium">
                    Experience the future of human-AI collaboration. Interact with my autonomous systems in real-time.
                </p>
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                {/* Left Side: Information & Integration */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-10"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-10 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Autonomous Operations</h3>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            My AI systems leverage agentic workflows, RAG, and multimodal models to automate complex decision-making processes. 
                            From predictive maintenance to interactive support, these agents operate at the edge of possibility.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "RAG Systems", value: "Vector-Embedded Memory" },
                            { label: "Agentic Flows", value: "Multi-Step Reasoners" },
                            { label: "Real-time AI", value: "ElevenLabs / WebRTC" },
                            { label: "Scalability", value: "Docker / Kubernetes" },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
                                <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-black mb-1">{stat.label}</p>
                                <p className="text-white font-bold">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <AiConversationalAgent onStatusChange={setIsAgentActive} />
                </motion.div>

                {/* Right Side: 3D Visualization */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center p-4"
                >
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] scale-150 active:scale-110 transition-transform duration-500" />
                    <NeuralCore active={isAgentActive} />
                    
                    {/* Floating Tech Labels */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 right-10 p-3 px-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full animate-bounce delay-100">
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">LangGraph</span>
                        </div>
                        <div className="absolute bottom-20 left-10 p-3 px-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full animate-bounce delay-500">
                            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">pgvector</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export { AiSystems };
