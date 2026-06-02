"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectCard, ProjectData } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { AnimatePresence } from "framer-motion";

const projectsData: ProjectData[] = [
    {
        id: "5",
        title: "Interactive AI/ML Lab",
        description: "High-fidelity interactive machine learning workspace showcasing Deep Learning telemetry classification (1D CNN), Association Rules (Apriori graph networks), and curriculum timelines.",
        longDescription: "An interactive, browser-based AI/ML engineering environment converting Python Jupyter notebook algorithms into client-side JS runtime models. Features real training metric replays, D3-style SVG rule graphs, active input sliders, and software engineering API endpoints.",
        features: [
            "Real client-side 1D CNN inference",
            "Interactive SVG force-directed node graphs",
            "Saved metrics epoch playback simulator",
            "Production REST API integration (/api/predict)"
        ],
        tags: ["Next.js", "ONNX Web", "Apriori Mining", "TensorFlow.js", "SVG Graphs"],
        imageColor: "from-emerald-500 to-indigo-600",
        link: "/ai-lab",
        github: "https://github.com/zishanverse/my-portfolio/tree/main/aiml%20course"
    },
    {
        id: "4",
        title: "Haanna - AI-Powered RAG Platform",
        description: "Production-ready AI chat platform with RAG-based persistent memory using pgvector and structured prompt assembly.",
        longDescription: "Built production-ready AI chat platform with RAG-based persistent memory using pgvector and structured prompt assembly. Containerized full-stack architecture using Docker with Prometheus & Grafana monitoring to track LLM latency.",
        features: [
            "RAG-based persistent memory (pgvector)",
            "Structured prompt assembly engine",
            "Dockerized full-stack architecture",
            "Prometheus & Grafana latency tracking"
        ],
        tags: ["Next.js", "pgvector", "PostgreSQL", "Docker", "Prometheus", "Grafana", "LLM", "RAG", "LangGraph"],
        imageColor: "from-orange-500 to-rose-600",
        link: "https://haannaa.com/",
        github: "#" // Request private access
    },
    {
        id: "1",
        title: "Intelligent DCRM Diagnostics",
        description: "Real-time analytics engine processing telemetry data for automated fault detection.",
        longDescription: "Engineered a real-time analytics engine processing widely varying telemetry data. Reduced manual analysis time by replacing legacy workflows with automated, AI-driven fault detection and reporting pipelines.",
        features: [
            "Real-time telemetry data processing",
            "Automated AI fault detection logic",
            "Scalable data reporting pipelines",
            "Cross-platform diagnostic dashboard"
        ],
        tags: ["Next.js", "Python", "FastAPI", "Gemini LLM"],
        imageColor: "from-blue-600 to-indigo-600",
        link: "https://ai-based-dcrm-analysis.vercel.app/"
    },
    {
        id: "2",
        title: "adClickMagnet",
        description: "Comprehensive platform for digital marketing, SEO, and web development services.",
        longDescription: "Implemented adClickmagnet application. A one-stop platform for digital marketing, SEO, web dev, graphic design. Features include Preloader (3D model), SEO analyzer, and complex animations using GSAP and Three.js.",
        features: [
            "Interactive 3D Spline preloader",
            "In-built SEO diagnostic analyzer",
            "High-performance GSAP animations",
            "Full-service marketing dashboard"
        ],
        tags: ["Next.js", "Three.js", "Spline", "GSAP"],
        imageColor: "from-purple-500 to-pink-500",
        link: "https://adclickmagnet.com/"
    },
    {
        id: "3",
        title: "AI Learning Path Generator",
        description: "Agentic application generating personalized learning curriculums using MCP.",
        longDescription: "Developed an AI-powered agentic application that auto-generates personalized learning curriculums by orchestrating autonomous agents to aggregate video content, organize documents, and schedule tasks using the Model Context Protocol (MCP).",
        features: [
            "Autonomous agent orchestration (MCP)",
            "Dynamic video content aggregation",
            "Personalized learning path logic",
            "Integrated task scheduling system"
        ],
        tags: ["Python", "LangChain", "MCP", "Agentic AI"],
        imageColor: "from-emerald-500 to-teal-500",
        link: "https://mcp-learning-path-generator-owktou3mrkax6fdj7bhpgg.streamlit.app/"
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
