"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ProjectCard, ProjectData } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const projectsData: ProjectData[] = [
    {
        id: "4",
        title: "Haanna – Production RAG Platform",
        description: "Production RAG companion platform serving 200+ concurrent users with pgvector persistent semantic memory and sub-150ms p95 latency.",
        longDescription: "Architected and deployed a production-grade AI platform using a Cognitive Graph architecture (LangGraph) and Next.js with multi-LLM fallback orchestration (Hugging Face, Azure OpenAI, Groq). Built dual-vector Semantic Memory (RAG) using PostgreSQL with pgvector and Redis intent caching, sustaining <150ms p95 inference latency. Containerized with Docker and monitored via Prometheus, Grafana, and MLflow.",
        features: [
            "Dual-vector Semantic Memory (pgvector + Redis intent caching)",
            "Multi-LLM fallback orchestration (Azure OpenAI, Groq, HuggingFace)",
            "Containerized full-stack deployment with Docker & Prometheus monitoring",
            "Sub-150ms p95 inference latency for 200+ concurrent users"
        ],
        tags: ["Next.js", "TypeScript", "LangGraph", "pgvector", "Docker", "Prometheus", "Redis"],
        imageColor: "from-orange-500 to-rose-600",
        link: "https://haannaa.com/",
        github: "https://github.com/zishanverse/haannaa-platform"
    },
    {
        id: "6",
        title: "Platform.voice – Autonomous Voice AI & Business Agents",
        description: "Real-time autonomous Voice AI telephony platform integrating Twilio, streaming ASR, LangGraph multi-agent orchestration, and ElevenLabs neural TTS.",
        longDescription: "Engineered an event-driven Voice AI and telephony runtime integrating Twilio, streaming speech recognition (ASR), LangGraph-based agent orchestration, and ElevenLabs neural TTS for human-like inbound and outbound calling. Built with Redis/BullMQ task queues, WebSockets, PostgreSQL with pgvector, and persistent call state machines supporting live interruption handling, concurrent dialing campaigns, and automated CRM lead qualification.",
        features: [
            "Autonomous inbound & outbound voice calling (Twilio + ElevenLabs)",
            "Event-driven multi-agent runtime with Redis/BullMQ & WebSockets",
            "Persistent call state machines with sub-second interruption handling",
            "RAG-based business knowledge retrieval & structured CRM lead extraction"
        ],
        tags: ["Node.js", "TypeScript", "Fastify", "Twilio", "ElevenLabs", "LangGraph", "Redis", "pgvector"],
        imageColor: "from-violet-600 to-indigo-600",
        link: "https://github.com/zishanverse/business-agents",
        github: "https://github.com/zishanverse/business-agents"
    },
    {
        id: "3",
        title: "AI Learning Path Generator – Agentic System",
        description: "Production agentic learning platform orchestrating Composio OAuth tools to auto-generate day-wise curriculums and write to external productivity suites.",
        longDescription: "Engineered a production-grade AI learning platform using Next.js and LangChain.js to generate structured, day-wise learning paths with Zod-validated LLM outputs. Integrated Composio OAuth to write directly into users' YouTube (playlist creation), Google Drive (document upload), and Notion (page creation) with per-user credential isolation.",
        features: [
            "Autonomous agent orchestration with Composio OAuth integration",
            "Direct write integrations for YouTube, Google Drive, and Notion",
            "Zod-validated streaming generation overcoming context window limits",
            "Persistent learning history using Prisma ORM with PostgreSQL"
        ],
        tags: ["Next.js", "LangChain.js", "Composio", "Gemini", "Prisma", "PostgreSQL"],
        imageColor: "from-emerald-500 to-teal-500",
        link: "https://mcp-learning-path-generator-owktou3mrkax6fdj7bhpgg.streamlit.app/",
        github: "https://github.com/zishanverse/mcp-learning-path-generator"
    },
    {
        id: "1",
        title: "Intelligent DCRM Diagnostics & Telemetry Pipeline",
        description: "Real-time analytics engine processing telemetry streams for automated fault detection and diagnostic reporting.",
        longDescription: "Engineered an automated diagnostic pipeline processing multi-sensor telemetry data. Replaced legacy manual analysis workflows with automated AI-driven fault detection and structured reporting pipelines for industrial equipment.",
        features: [
            "Real-time sensor telemetry processing",
            "Automated AI fault classification logic",
            "Scalable data reporting & alert pipelines",
            "Cross-platform diagnostic dashboard"
        ],
        tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Gemini LLM"],
        imageColor: "from-blue-600 to-indigo-600",
        link: "https://ai-based-dcrm-analysis.vercel.app/"
    },
    {
        id: "2",
        title: "adClickMagnet",
        description: "Interactive marketing and web engineering platform featuring 3D Spline experiences and high-performance GSAP animations.",
        longDescription: "Engineered a high-performance web platform for digital marketing, SEO analytics, and creative engineering. Built interactive 3D Spline preloaders, diagnostic SEO auditing tools, and smooth GSAP animation choreography.",
        features: [
            "Interactive 3D Spline experience",
            "In-built SEO diagnostic analyzer",
            "High-performance GSAP animation pipeline",
            "Lighthouse-optimized responsive design"
        ],
        tags: ["Next.js", "Three.js", "Spline", "GSAP", "Tailwind CSS"],
        imageColor: "from-purple-500 to-pink-500",
        link: "https://adclickmagnet.com/"
    },
];

const Projects = () => {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    return (
        <section id="projects" className="py-20 md:py-32 lg:py-48 bg-transparent dark:bg-transparent w-full relative overflow-hidden">


            <div className="container mx-auto px-4 sm:px-6 relative z-20">
                <div className="mb-12 md:mb-20 max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-foreground to-muted-foreground">
                        Featured Projects
                    </h2>
                    <div className="h-1.5 w-20 bg-indigo-500 rounded-full mb-6" />
                    <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                        A curation of my professional work and personal experiments, focusing on AI systems and high-performance web applications.
                    </p>
                </div>

                {/* AI Lab Featured Hero Spotlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-card p-6 sm:p-8 backdrop-blur-xl shadow-xl group hover:border-indigo-500/50 transition-all"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-indigo-500/15 transition-all" />
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                Flagship Engineering Demo
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                                Interactive AI / ML Workspace & Neural Lab
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Experience client-side deep learning in action: Run real-time 1D CNN telemetry classification, explore Apriori association graphs, and simulate epoch training directly in your browser.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {["Client-Side Inference", "1D CNN", "Apriori Graphs", "Training Replay", "REST API"].map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-card/80 border border-border text-foreground/80 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Link
                            href="/ai-lab"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all shrink-0 group-hover:scale-105"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Launch AI Lab
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={(p) => {
                                if (p.link?.startsWith("/")) {
                                    router.push(p.link);
                                } else {
                                    setSelectedProject(p);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export { Projects };
