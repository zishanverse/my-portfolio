"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { Brain, Code2, Rocket, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Content entrance
        gsap.fromTo(contentRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section 
            id="about"
            ref={containerRef} 
            className="py-32 w-full bg-transparent dark:bg-transparent relative overflow-hidden flex flex-col items-center justify-center"
        >
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                
                {/* Centered Content */}
                <div ref={contentRef} className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
                    
                    {/* Header */}
                    <div className="space-y-4 flex flex-col items-center">
                        <TextHighlight className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground uppercase">
                            Architecture & Engineering
                        </TextHighlight>
                        <p className="text-muted-foreground font-semibold text-sm md:text-base tracking-widest uppercase mt-4">
                            Production Backends · Multi-Agent AI · Real-Time Systems
                        </p>
                        <div className="w-16 h-1.5 bg-foreground/20 rounded-full mt-6" />
                    </div>

                    {/* Main Text */}
                    <div className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
                        <p>
                            I am a <span className="text-foreground font-bold">Backend and AI Systems Engineer</span> focused on building production multi-agent architectures, real-time Voice AI runtimes, and high-throughput vector search pipelines.
                        </p>
                        <p className="mt-4">
                            From deploying mission-critical government infrastructure at THDC India across 9 modules and 91 source files to engineering autonomous Voice AI telephony runtimes with sub-second interruption handling, I design software that is resilient, audited, and optimized for real-world production workloads.
                        </p>
                    </div>

                    {/* Core Pillars - Clean Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-8">
                        {[
                            { 
                                icon: Brain, 
                                title: "Multi-Agent Systems", 
                                desc: "LangGraph orchestration, BullMQ queues, and autonomous supervisor-critic loops."
                            },
                            { 
                                icon: Code2, 
                                title: "Voice AI & Telephony", 
                                desc: "Twilio streaming ASR, ElevenLabs neural TTS, and sub-second interruption handling."
                            },
                            { 
                                icon: Rocket, 
                                title: "Vector & RAG Memory", 
                                desc: "PostgreSQL + pgvector, Redis intent caching, and verified sub-150ms p95 latency."
                            },
                            { 
                                icon: Share2, 
                                title: "Production Backends", 
                                desc: "Node.js, TypeScript, Express, Fastify, multi-tier RBAC, and Docker deployments."
                            }
                        ].map((pillar, i) => (
                            <div 
                                key={i}
                                className="p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all group flex flex-col items-center text-center gap-4"
                            >
                                <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-foreground/5 transition-colors">
                                    <pillar.icon className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-foreground mb-2">{pillar.title}</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export { About };
