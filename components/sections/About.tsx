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
                            Code & Cognition
                        </TextHighlight>
                        <p className="text-muted-foreground font-semibold text-sm md:text-base tracking-widest uppercase mt-4">
                            Bridging Software Engineering and AI
                        </p>
                        <div className="w-16 h-1.5 bg-foreground/20 rounded-full mt-6" />
                    </div>

                    {/* Main Text */}
                    <div className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
                        <p>
                            I am an <span className="text-foreground font-bold">AI Engineer and Full-Stack Developer</span> specialized in building intelligent applications powered by RAG pipelines, LLM integrations, and scalable backend systems. 
                        </p>
                        <p className="mt-4">
                            From architecting high-performance Next.js platforms to developing proactive AI workflows, vector-memory systems, and automation-driven experiences, I bridge the gap between human intent and production-grade AI execution.
                        </p>
                    </div>

                    {/* Core Pillars - Clean Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-8">
                        {[
                            { 
                                icon: Brain, 
                                title: "AI Native", 
                                desc: "LLMs, RAG, and Agentic workflows integrated seamlessly."
                            },
                            { 
                                icon: Code2, 
                                title: "Modern Stack", 
                                desc: "TypeScript, Next.js, and high-performance system design."
                            },
                            { 
                                icon: Rocket, 
                                title: "Scalable", 
                                desc: "Cloud-native deployments and optimized data pipelines."
                            },
                            { 
                                icon: Share2, 
                                title: "Connected", 
                                desc: "Building intuitive integrations and real-time experiences."
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
