"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AiConversationalAgent from "../ai/AiConversationalAgent";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import {
    Brain,
    Workflow,
    Database,
    Zap,
    GitBranch,
    MessageSquare,
    Search,
    Layers,
    Bot,
    Network,
    Cpu,
    Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const aiSkills = [
    { icon: GitBranch, label: "Agentic Workflows", desc: "LangGraph · CrewAI" },
    { icon: Database, label: "RAG Memory", desc: "pgvector · Pinecone" },
    { icon: Brain, label: "LLM Orchestration", desc: "GPT-4 · Claude · Gemini" },
    { icon: MessageSquare, label: "Multimodal AI", desc: "Vision · Audio · Text" },
    { icon: Search, label: "Semantic Search", desc: "Hybrid Retrieval" },
    { icon: Workflow, label: "AI Automation", desc: "N8n · Make · Zapier" },
    { icon: Layers, label: "Prompt Engineering", desc: "Chain-of-Thought · ReAct" },
    { icon: Network, label: "Multi-Agent Systems", desc: "Supervisor · Critic" },
    { icon: Shield, label: "AI Safety", desc: "Validation · Guardrails" },
    { icon: Cpu, label: "Model Fine-tuning", desc: "LoRA · QLoRA" },
    { icon: Bot, label: "Tool-Use", desc: "APIs · Code Exec" },
    { icon: Zap, label: "Real-time Inference", desc: "Streaming · WebSockets" },
];

const SkillCard = ({ skill, index }: { skill: typeof aiSkills[0]; index: number }) => {
    const Icon = skill.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative p-4 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 flex flex-col gap-3"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted text-foreground/70 group-hover:text-foreground group-hover:bg-foreground/5 transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight truncate">{skill.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{skill.desc}</p>
                </div>
            </div>
        </motion.div>
    );
};

const AiSystems = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isAgentActive, setIsAgentActive] = useState(false);

    useGSAP(() => {
        if (!containerRef.current || !textRef.current) return;

        gsap.fromTo(textRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 w-full bg-transparent dark:bg-transparent relative overflow-hidden flex flex-col items-center">
            
            {/* Section Header */}
            <div ref={textRef} className="text-center space-y-4 mb-16 md:mb-24 z-10 px-4">
                <TextHighlight className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase">
                    Agentic Ecosystem
                </TextHighlight>
                <p className="text-muted-foreground font-medium text-sm tracking-widest uppercase mt-2">
                    Systems Architecture
                </p>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
                    Spanning the full AI stack — from conversational agents and multi-step workflows to RAG, fine-tuning, and real-time inference.
                </p>
            </div>

            {/* Main Two-Column Layout */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start relative z-10">

                {/* LEFT: Agent + Context */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-6 bg-foreground/20 rounded-full" />
                            <h3 className="text-2xl font-bold text-foreground tracking-tight">Autonomous Operations</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                            My AI systems leverage agentic workflows, RAG, and multimodal models to automate complex
                            decision-making processes. These agents operate effectively at the edge of possibility.
                        </p>
                    </div>

                    {/* Quick-stat pills - Clean style */}
                    <div className="grid grid-cols-2 gap-3 max-w-lg">
                        {[
                            { label: "Memory", value: "Vector RAG" },
                            { label: "Flows", value: "Multi-Step Logic" },
                            { label: "Tools", value: "LangGraph" },
                            { label: "Orchestration", value: "N8N & Make" },
                        ].map((stat, i) => (
                            <div key={i} className="px-4 py-3 rounded-xl bg-card border border-border flex flex-col justify-center">
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{stat.label}</p>
                                <p className="text-foreground text-sm font-semibold">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Voice Agent in a sleek card */}
                    <div className="rounded-2xl border border-border bg-card p-2 sm:p-4 max-w-lg">
                        <AiConversationalAgent onStatusChange={setIsAgentActive} />
                    </div>
                </motion.div>

                {/* RIGHT: AI Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col gap-6"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground tracking-tight">Full AI Stack</h3>
                            <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wider font-semibold">Skills & Frameworks</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card">
                            <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isAgentActive ? "bg-green-500" : "bg-foreground/30"}`} />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {isAgentActive ? "Agent Active" : `${aiSkills.length} Modules`}
                            </span>
                        </div>
                    </div>

                    {/* Clean Skills Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiSkills.map((skill, i) => (
                            <SkillCard key={i} skill={skill} index={i} />
                        ))}
                    </div>

                    {/* Bottom workflow banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-xl bg-muted/50 border border-border flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2"
                    >
                        <div className="p-3 rounded-lg bg-card border border-border shrink-0">
                            <Workflow className="w-5 h-5 text-foreground/70" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">End-to-End Automation</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Designing pipelines from data ingestion → reasoning → action → feedback loops
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export { AiSystems };
