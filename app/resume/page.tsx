"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Download,
    MapPin,
    Mail,
    Phone,
    Linkedin,
    Globe,
    Cpu,
    Code,
    Briefcase,
    GraduationCap,
    Award,
    Terminal,
    Brain,
    Server
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Data ---

const contactInfo = {
    name: "Zishan Khan",
    title: "Backend & AI Engineer",
    location: "Indore, MP, India",
    phone: "+91 9174996768",
    email: "zishanverse@gmail.com",
    linkedin: "https://www.linkedin.com/in/zishan-khan-/",
    github: "https://github.com/zishanverse",
    website: "https://zishanverse.vercel.app",
};

const executiveSummary = "Backend and AI Systems Engineer with proven experience designing production-grade REST APIs on government infrastructure, event-driven multi-agent architectures, and real-time Voice AI telephony systems. Expert in Node.js, TypeScript, Next.js, and Python, with deep hands-on expertise in LangGraph, Twilio telephony, pgvector, Redis/BullMQ task queues, and Docker containerization. Winner of 2x Smart India Hackathon (SIH 2024 & 2025) and Nxtwave Mega Challenge.";

const highlights = [
    "Production REST API backend deployed on government infrastructure across 9 modules and 91 source files (THDC India)",
    "Real-time autonomous Voice AI & telephony platform with Twilio, streaming ASR, and ElevenLabs neural TTS",
    "Production RAG platform (Haanna) serving 200+ concurrent users with <150ms p95 latency (pgvector)",
    "National Winner — 2x Smart India Hackathon (SIH) 2024 & 2025 (Govt. of India)",
    "Winner — Nxtwave Mega Challenge (1st Prize among thousands of developers)",
    "Event-driven multi-agent runtimes with Redis/BullMQ, WebSockets, and pgvector semantic memory",
];

const technicalSkills = [
    { category: "ML & AI", skills: ["Advanced RAG", "Context Engineering", "LLM Evals", "AI Observability", "Guardrails & Safety", "LangGraph", "LangChain", "Multi-Agent Systems", "Vector Search (pgvector)", "HuggingFace Transformers", "Pydantic", "MLflow", "Weights & Biases", "PyTorch", "Scikit-learn", "TensorFlow", "NumPy", "Pandas", "Fine-tuning", "Deep Learning"] },
    { category: "Languages & Core", skills: ["Python", "TypeScript", "JavaScript", "SQL", "Context Engineering", "Agent Orchestration", "Prompt Engineering"] },
    { category: "Tools & Concepts", skills: ["Socket.io", "BullMQ", "Redis", "GSAP", "Three.js", "Spline", "JWT", "Jest", "REST APIs", "OAuth", "RBAC", "Streamlit", "MCP"] },
    { category: "Databases & Storage", skills: ["PostgreSQL", "pgvector", "MongoDB", "Redis", "SQLite", "Cloudflare R2"] },
    { category: "Frameworks & Libraries", skills: ["Next.js", "React", "Node.js", "Express", "FastAPI", "Transformers", "Prisma", "Tailwind CSS"] },
    { category: "DevOps & Infrastructure", skills: ["Docker", "GitHub Actions", "AWS S3", "Prometheus", "Grafana", "Vercel", "VPS Management", "CI/CD"] },
];

const softSkills = [
    "Problem Solving",
    "Team Leading",
    "Logical & Analytical Thinking",
    "Architecture Design",
    "Attention to Detail",
    "Debugging Mindset",
];

const experience = [
    {
        company: "THDC India Limited",
        role: "Backend Developer",
        period: "Sep 2025 - Present",
        description: [
            "Architected and deployed a production REST API backend in Node.js/TypeScript (Express) on government infrastructure, covering document lifecycle management across 9 modules and 91 source files.",
            "Designed a multi-tier RBAC system with role-gated state transitions, ownership enforcement, and full audit trails; maintained >80% Jest test coverage with GitHub Actions CI.",
            "Built document generation pipelines (DOCX + QR) with Cloudflare R2 artifact storage and tamper-proof public verification endpoints.",
        ],
    },
    {
        company: "Freelance Software Engineer",
        role: "Self-Employed (Remote)",
        period: "Jan 2026 - Present",
        description: [
            "Engineered Haanna, a production RAG chat platform serving 200+ concurrent users — sole engineer across Python AI pipeline, Node.js backend, infrastructure, and monitoring.",
            "Deployed a pgvector + LangChain RAG pipeline with persistent semantic memory and structured prompt assembly over REST API, sustaining <150ms p95 LLM inference latency.",
            "Built real-time messaging via Socket.io with Redis-backed BullMQ queues for async LLM task processing; integrated HuggingFace open-source models as live fallback inference layer.",
            "Monitored system health and LLM throughput with Prometheus, Grafana, and MLflow; deployed full stack via Docker on self-managed VPS.",
        ],
    },
    {
        company: "KKRF Group",
        role: "Full-Stack Developer",
        period: "Nov 2024 - Jan 2025",
        description: [
            "Built Next.js web applications with Three.js 3D components, GSAP animations, and Spline integrations; deployed to production with Lighthouse-optimized performance and SEO.",
            "Owned full project lifecycle across three concurrent client engagements — from architecture decisions through deployment.",
        ],
    },
    {
        company: "Bigbooster Technology",
        role: "Full-Stack Developer",
        period: "May 2024 - Jul 2024",
        description: [
            "Shipped full-stack SaaS features using Next.js, TypeScript, and AWS S3, handling frontend, backend, and deployment independently.",
            "Built reusable Tailwind CSS component library reducing UI development time across multiple product screens.",
        ],
    },
    {
        company: "Archway",
        role: "Technical Trainer",
        period: "Mar 2024 - Nov 2024",
        description: [
            "Delivered backend and web development workshops; mentored students through hands-on project-based learning.",
        ],
    },
    {
        company: "GDSC",
        role: "Web Development Team",
        period: "Aug 2023 - Aug 2024",
        description: [
            "Built and maintained event web pages for the campus developer community.",
        ],
    },
];

const projects = [
    {
        title: "Platform.voice – Autonomous Voice AI & Telephony Platform",
        period: "2026",
        description: "Engineered a real-time autonomous Voice AI platform integrating Twilio, streaming ASR, LangGraph multi-agent orchestration, and ElevenLabs neural TTS for human-like inbound and outbound calling. Built an event-driven runtime with Redis/BullMQ, WebSockets, PostgreSQL (pgvector), and persistent call state for campaigns, interruption handling, and RAG knowledge retrieval.",
        stack: "Node.js, TypeScript, Fastify, Twilio, ElevenLabs, Redis, BullMQ, PostgreSQL (pgvector), LangGraph, WebSockets",
    },
    {
        title: "Haannaa AI – Cognitive Companion & Production RAG Platform",
        period: "2026",
        description: "Engineered a production-grade AI companion platform using Cognitive Graph architecture (LangGraph) and Next.js, implementing multi-LLM fallback orchestration (Hugging Face, Azure OpenAI, Groq). Architected dual-vector Semantic Memory (RAG) using PostgreSQL with pgvector and Redis intent caching. Built a real-time Cognitive Loop pipeline via Ably WebSockets.",
        stack: "Next.js, TypeScript, Node.js, LangGraph, PostgreSQL (pgvector), Prisma, Redis, Ably, Docker, Prometheus, Grafana",
    },
    {
        title: "AI/ML Lab – Machine Learning Engineering Workspace",
        period: "2025",
        description: "Implemented supervised, unsupervised, and deep learning models in PyTorch with Weights & Biases experiment tracking (loss curves, sweeps, model comparisons). Integrated HuggingFace Transformers for open-source model inference and exposed model inference via FastAPI REST endpoints consumed by an interactive Next.js frontend with client-side 1D CNN telemetry classification.",
        stack: "Python, PyTorch, Scikit-learn, HuggingFace Transformers, FastAPI, Next.js, Weights & Biases, ONNX",
    },
    {
        title: "AI Learning Path Generator – Agentic System",
        period: "2024",
        description: "Engineered a production-grade AI learning platform using Next.js and LangChain.js to generate structured, day-wise learning paths with Zod-validated LLM outputs. Integrated Composio OAuth to write directly into users' YouTube (playlist creation), Google Drive (document upload), and Notion (page creation) with per-user credential isolation.",
        stack: "Next.js, TypeScript, LangChain.js, Gemini, Composio, Prisma, PostgreSQL, Tailwind CSS",
    },
];

const education = [
    {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "IPS Academy (IES), Indore",
        period: "2022 - 2026",
    },
];

// --- Components ---

const SectionTitle = ({ icon: Icon, children }: { icon: any, children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon size={20} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{children}</h2>
    </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground border border-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
        {children}
    </span>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("glass p-6 rounded-xl hover:bg-white/5 transition-colors", className)}>
        {children}
    </div>
);

// --- Page ---

export default function ResumePage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 lg:px-16 print:p-0 print:bg-white print:text-black">
            <motion.div
                className="max-w-5xl mx-auto space-y-12 print:space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Header */}
                <motion.header variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10 print:border-black/20">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">{contactInfo.name}</h1>
                        <p className="text-xl text-muted-foreground font-medium">{contactInfo.title}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground print:text-black">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> {contactInfo.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> {contactInfo.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> {contactInfo.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin size={16} />
                            <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                linkedin.com/in/zishan-khan-
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={16} />
                            <Link href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                zishanverse.vercel.app
                            </Link>
                        </div>
                    </div>
                    <a
                        href="https://drive.google.com/file/d/1r4-I_-UUYEqXXIdOjcLrCD6QkYsEnt8Y/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium print:hidden cursor-pointer shadow-sm"
                    >
                        <Download size={18} /> Download Resume
                    </a>
                </motion.header>

                {/* Executive Summary */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Brain}>Executive Summary</SectionTitle>
                    <p className="text-lg leading-relaxed text-muted-foreground print:text-black">
                        {executiveSummary}
                    </p>
                </motion.section>

                {/* Key Highlights */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Award}>Key Highlights</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {highlights.map((item, idx) => (
                            <Card key={idx} className="print:border print:border-black/10 print:bg-transparent">
                                <p className="font-medium text-foreground/90 print:text-black">{item}</p>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Technical Skills */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Code}>Technical Skills</SectionTitle>
                    <div className="grid grid-cols-1 gap-6">
                        {technicalSkills.map((cat, idx) => (
                            <div key={idx} className="space-y-3">
                                <h3 className="text-lg font-semibold text-primary">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, sIdx) => (
                                        <Badge key={sIdx}>{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Soft Skills */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Brain}>Soft Skills</SectionTitle>
                    <div className="flex flex-wrap gap-3">
                        {softSkills.map((skill, idx) => (
                            <Badge key={idx}>{skill}</Badge>
                        ))}
                    </div>
                </motion.section>

                {/* Work Experience */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Briefcase}>Work Experience</SectionTitle>
                    <div className="space-y-6">
                        {experience.map((job, idx) => (
                            <Card key={idx} className="print:break-inside-avoid print:bg-transparent print:border print:border-black/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-primary">{job.role}</h3>
                                    <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{job.period}</span>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-foreground">{job.company}</h4>
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground print:text-black">
                                    {job.description.map((point, pIdx) => (
                                        <li key={pIdx}>{point}</li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Projects */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Terminal}>Projects</SectionTitle>
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((project, idx) => (
                            <Card key={idx} className="print:break-inside-avoid print:bg-transparent print:border print:border-black/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                                    <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{project.period}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 leading-relaxed print:text-black">{project.description}</p>
                                <div className="pt-4 border-t border-white/5 print:border-black/10">
                                    <p className="text-sm font-semibold text-primary mb-2">Tech Stack:</p>
                                    <p className="text-sm text-foreground/80 print:text-black">{project.stack}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Volunteering */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Globe}>Volunteering Experience</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="print:bg-transparent print:border print:border-black/20">
                            <h3 className="text-lg font-bold text-primary mb-1">GDSC - Web Development</h3>
                            <p className="text-sm text-muted-foreground mb-3">Aug 2023 - Aug 2024</p>
                            <ul className="list-disc ml-5 text-sm text-muted-foreground/90 space-y-1 print:text-black">
                                <li>Managed web development for GDSC activities</li>
                                <li>Built and maintained responsive web pages</li>
                            </ul>
                        </Card>
                        <Card className="print:bg-transparent print:border print:border-black/20">
                            <h3 className="text-lg font-bold text-primary mb-1">Archway - Technical</h3>
                            <p className="text-sm text-muted-foreground mb-3">Mar 2024 - Nov 2024</p>
                            <ul className="list-disc ml-5 text-sm text-muted-foreground/90 space-y-1 print:text-black">
                                <li>Trained college students in blockchain</li>
                                <li>Conducted technical workshops</li>
                            </ul>
                        </Card>
                    </div>
                </motion.section>

                {/* Training & Certs & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-4">
                    {/* Education */}
                    <motion.section variants={itemVariants}>
                        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={idx} className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                    <h3 className="font-bold text-foreground">{edu.degree}</h3>
                                    <p className="text-sm text-primary">{edu.institution}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Certs & Awards */}
                    <motion.section variants={itemVariants}>
                        <SectionTitle icon={Award}>Awards & Certifications</SectionTitle>
                        <div className="space-y-4">
                            <div className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                <h3 className="font-bold text-primary mb-2">Awards</h3>
                                <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1 print:text-black">
                                    <li>WINNER - Smart India Hackathon (SIH) 2024 & 2025</li>
                                    <li>Nxtwave Mega challenge Winner - 1st Prize</li>
                                </ul>
                            </div>
                            <div className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                <h3 className="font-bold text-primary mb-2">Certifications</h3>
                                <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1 print:text-black">
                                    <li>Certified Agentic AI Developer</li>
                                    <li>Certified Full-Stack Developer</li>
                                    <li>Artificial Intelligence & Machine Learning (AI/ML) Course Completion Certificate</li>
                                    <li>Natural Language Processing (NLP) Course Completion Certificate</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>
                </div>

            </motion.div>
        </div>
    );
}
