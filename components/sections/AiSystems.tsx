"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AiConversationalAgent from "../ai/AiConversationalAgent";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { useState } from "react";
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
    {
        icon: GitBranch,
        label: "Agentic Workflows",
        desc: "LangGraph · CrewAI · AutoGen",
        color: "from-indigo-500/20 to-indigo-500/5",
        border: "border-indigo-500/30",
        iconColor: "text-indigo-400",
        glow: "shadow-indigo-500/20",
    },
    {
        icon: Database,
        label: "RAG & Vector Memory",
        desc: "pgvector · Pinecone · Chroma",
        color: "from-violet-500/20 to-violet-500/5",
        border: "border-violet-500/30",
        iconColor: "text-violet-400",
        glow: "shadow-violet-500/20",
    },
    {
        icon: Brain,
        label: "LLM Orchestration",
        desc: "GPT-4 · Claude · Gemini · Qwen",
        color: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        iconColor: "text-purple-400",
        glow: "shadow-purple-500/20",
    },
    {
        icon: MessageSquare,
        label: "Multimodal AI",
        desc: "GPT-4o · Gemini 1.5 Pro · Claude",
        color: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/30",
        iconColor: "text-blue-400",
        glow: "shadow-blue-500/20",
    },
    {
        icon: Search,
        label: "Semantic Search",
        desc: "Embeddings · Hybrid Retrieval",
        color: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/30",
        iconColor: "text-cyan-400",
        glow: "shadow-cyan-500/20",
    },
    {
        icon: Workflow,
        label: "AI Automation",
        desc: "N8n · Make · Zapier + AI",
        color: "from-emerald-500/20 to-emerald-500/5",
        border: "border-emerald-500/30",
        iconColor: "text-emerald-400",
        glow: "shadow-emerald-500/20",
    },
    {
        icon: Layers,
        label: "Prompt Engineering",
        desc: "Chain-of-Thought · Few-shot · ReAct",
        color: "from-yellow-500/20 to-yellow-500/5",
        border: "border-yellow-500/30",
        iconColor: "text-yellow-400",
        glow: "shadow-yellow-500/20",
    },
    {
        icon: Network,
        label: "Multi-Agent Systems",
        desc: "Supervisor · Critic · Planner Agents",
        color: "from-rose-500/20 to-rose-500/5",
        border: "border-rose-500/30",
        iconColor: "text-rose-400",
        glow: "shadow-rose-500/20",
    },
    {
        icon: Shield,
        label: "AI Safety & Guardrails",
        desc: "Validation · Filtering · Monitoring",
        color: "from-orange-500/20 to-orange-500/5",
        border: "border-orange-500/30",
        iconColor: "text-orange-400",
        glow: "shadow-orange-500/20",
    },
    {
        icon: Cpu,
        label: "Model Fine-tuning",
        desc: "LoRA · QLoRA · PEFT",
        color: "from-pink-500/20 to-pink-500/5",
        border: "border-pink-500/30",
        iconColor: "text-pink-400",
        glow: "shadow-pink-500/20",
    },
    {
        icon: Bot,
        label: "Tool-Use & Function Calls",
        desc: "APIs · Code Exec · Web Search",
        color: "from-lime-500/20 to-lime-500/5",
        border: "border-lime-500/30",
        iconColor: "text-lime-400",
        glow: "shadow-lime-500/20",
    },
    {
        icon: Zap,
        label: "Real-time Inference",
        desc: "Streaming · SSE · WebSocket",
        color: "from-sky-500/20 to-sky-500/5",
        border: "border-sky-500/30",
        iconColor: "text-sky-400",
        glow: "shadow-sky-500/20",
    },
];

const SkillCard = ({ skill, index }: { skill: typeof aiSkills[0]; index: number }) => {
    const [hovered, setHovered] = useState(false);
    const Icon = skill.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${skill.color} border ${skill.border} backdrop-blur-sm cursor-default transition-all duration-300 ${hovered ? `shadow-lg ${skill.glow}` : ""} group overflow-hidden`}
        >
            {/* hover shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </div>

            <div className="flex items-start gap-3 relative z-10">
                <div className={`p-2 rounded-xl bg-zinc-900/60 flex-shrink-0 ${hovered ? "scale-110" : ""} transition-transform duration-200`}>
                    <Icon className={`w-4 h-4 ${skill.iconColor}`} />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-tight truncate">{skill.label}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{skill.desc}</p>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="w-[900px] h-[900px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse mx-auto" />
            </div>

            {/* Section Header */}
            <div ref={textRef} className="text-center space-y-4 mb-20 z-10 px-4">
                <TextHighlight className="text-4xl md:text-6xl font-black tracking-tight text-foreground dark:text-white uppercase italic">
                    Agentic AI Ecosystem
                </TextHighlight>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium">
                    Spanning the full AI stack — from conversational agents and multi-step workflows to RAG, fine-tuning, and real-time inference.
                </p>
            </div>

            {/* Main Two-Column Layout */}
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">

                {/* LEFT: Agent + Context */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8"
                >
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-10 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Autonomous Operations</h3>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            My AI systems leverage agentic workflows, RAG, and multimodal models to automate complex
                            decision-making processes. From appointment booking to AI companions with long-term memory —
                            these agents operate at the edge of possibility.
                        </p>
                    </div>

                    {/* Quick-stat pills */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "RAG Systems", value: "Vector-Embedded Memory" },
                            { label: "Agentic Flows", value: "Multi-Step Reasoners" },
                            { label: "Tools", value: "LangGraph · LangChain" },
                            { label: "Automation", value: "Make · N8N" },
                        ].map((stat, i) => (
                            <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-indigo-500/30 transition-all">
                                <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-black">{stat.label}</p>
                                <p className="text-white text-sm font-bold">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Voice Agent */}
                    <AiConversationalAgent onStatusChange={setIsAgentActive} />
                </motion.div>

                {/* RIGHT: AI Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col gap-5"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Full AI Stack</h3>
                            <p className="text-zinc-500 text-sm mt-0.5">Skills · Frameworks · Workflows</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                            <div className={`w-2 h-2 rounded-full ${isAgentActive ? "bg-green-400 animate-pulse" : "bg-indigo-500"}`} />
                            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest">
                                {isAgentActive ? "Agent Active" : `${aiSkills.length} Skills`}
                            </span>
                        </div>
                    </div>

                    {/* Skills masonry grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {aiSkills.map((skill, i) => (
                            <SkillCard key={i} skill={skill} index={i} />
                        ))}
                    </div>

                    {/* Bottom workflow banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-1 p-4 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-xl flex items-center gap-4"
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <Workflow className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">End-to-End AI Automation</p>
                            <p className="text-xs text-zinc-500 mt-0.5">
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
