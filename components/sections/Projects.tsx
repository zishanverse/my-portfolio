"use client";

import { useState } from "react";
import { ProjectCard, ProjectData } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { AnimatePresence } from "framer-motion"; // Using AnimatePresence for conditional rendering logic, though animation is GSAP inside

const projectsData: ProjectData[] = [
    {
        id: "1",
        title: "Intelligent DCRM Diagnostics",
        description: "Real-time analytics engine processing telemetry data for automated fault detection.",
        longDescription: "Engineered a real-time analytics engine processing widely varying telemetry data. Reduced manual analysis time by replacing legacy workflows with automated, AI-driven fault detection and reporting pipelines.",
        tags: ["Next.js", "Python", "FastAPI", "Gemini LLM"],
        imageColor: "from-blue-600 to-indigo-600",
        link: "https://ai-based-dcrm-analysis.vercel.app/"
    },
    {
        id: "2",
        title: "adClickMagnet",
        description: "Comprehensive platform for digital marketing, SEO, and web development services.",
        longDescription: "Implemented adClickmagnet application. A one-stop platform for digital marketing, SEO, web dev, graphic design. Features include Preloader (3D model), SEO analyzer, and complex animations using GSAP and Three.js.",
        tags: ["Next.js", "Three.js", "Spline", "GSAP"],
        imageColor: "from-purple-500 to-pink-500",
        link: "https://adclickmagnet.com/"
    },
    {
        id: "3",
        title: "AI Learning Path Generator",
        description: "Agentic application generating personalized learning curriculums using MCP.",
        longDescription: "Developed an AI-powered agentic application that auto-generates personalized learning curriculums by orchestrating autonomous agents to aggregate video content, organize documents, and schedule tasks using the Model Context Protocol (MCP).",
        tags: ["Python", "LangChain", "MCP", "Agentic AI"],
        imageColor: "from-emerald-500 to-teal-500",
        link: "https://mcp-learning-path-generator-owktou3mrkax6fdj7bhpgg.streamlit.app/"
    },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    return (
        <section id="projects" className="py-24 bg-transparent dark:bg-transparent w-full">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Featured Projects</h2>
                    <p className="text-muted-foreground mt-2 text-lg">A selection of my recent work.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={setSelectedProject}
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
