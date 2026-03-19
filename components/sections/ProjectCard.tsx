"use client";

import { ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    tags: string[];
    link?: string;
    github?: string;
    imageColor: string; // Placeholder for image
}

interface ProjectCardProps {
    project: ProjectData;
    onClick: (project: ProjectData) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smoothing springs
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Transform values for tilt
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Handle mouse move
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calculate relative position (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative h-[450px] w-full cursor-pointer perspective-1000"
        >
            {/* Outer Container for Glassmorphism & Shadow */}
            <div className="absolute inset-0 bg-white/[0.03] dark:bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] shadow-2xl">
                
                {/* Mouse-following Glow Effect */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: useTransform(
                            [mouseXSpring, mouseYSpring],
                            ([latestX, latestY]) => 
                                `radial-gradient(600px circle at ${(Number(latestX) + 0.5) * 100}% ${(Number(latestY) + 0.5) * 100}%, rgba(99, 102, 241, 0.15), transparent 40%)`
                        )
                    }}
                />

                {/* Decorative Pattern / Lighting */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.imageColor} opacity-[0.05] group-hover:opacity-20 rounded-bl-full -mr-24 -mt-24 transition-all duration-700 blur-3xl`} />

                {/* Content Section */}
                <div 
                    className="relative z-10 flex flex-col h-full p-8 md:p-10 justify-between"
                    style={{ transform: "translateZ(50px)" }} // Pop out content
                >
                    <div>
                        <div className="flex items-start justify-between">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-indigo-400 transition-colors duration-300">
                                {project.title}
                            </h3>
                            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-300">
                                <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>

                        <p className="mt-6 text-muted-foreground text-lg leading-relaxed line-clamp-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-white/5 border border-white/5 rounded-full text-zinc-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span>View Case Study</span>
                            <div className="w-10 h-px bg-indigo-500/50" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export { ProjectCard };
