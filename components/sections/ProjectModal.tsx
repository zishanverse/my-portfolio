"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useRef } from "react";
import { ProjectData } from "./ProjectCard";
import { Button } from "@/components/ui/Button";

import Project3DBackground from "../3d/Project3DBackground";

interface ProjectModalProps {
    project: ProjectData;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Extract colors for 3D background based on project.imageColor
    // e.g., "from-blue-600 to-indigo-600"
    const isBlue = project.imageColor.includes("blue");
    const isPurple = project.imageColor.includes("purple") || project.imageColor.includes("pink");
    const isOrange = project.imageColor.includes("orange") || project.imageColor.includes("rose");
    const isEmerald = project.imageColor.includes("emerald") || project.imageColor.includes("teal");

    const colorPrimary = isBlue ? "#4f46e5" : isPurple ? "#a855f7" : isOrange ? "#f43f5e" : isEmerald ? "#10b981" : "#6366f1";
    const colorSecondary = isBlue ? "#3b82f6" : isPurple ? "#ec4899" : isOrange ? "#f59e0b" : isEmerald ? "#14b8a6" : "#a855f7";

    useGSAP(() => {
        // Animate overlay
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

        // Animate modal content
        gsap.fromTo(
            modalRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out", delay: 0.1 }
        );
        // Animate inner content
        gsap.fromTo(
            contentRef.current?.children || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3 }
        );
    }, { scope: modalRef });

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 sm:py-12">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            />

            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-4xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden max-h-full flex flex-col perspective-1000"
            >
                {/* 3D Background Scene */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Project3DBackground colorPrimary={colorPrimary} colorSecondary={colorSecondary} />
                </div>

                <div className={`h-40 md:h-56 w-full bg-gradient-to-r ${project.imageColor} relative z-10 overflow-hidden`}>
                    {/* Animated shine over header */}
                    <div className="absolute inset-0 bg-white/10 animate-shimmer-slide" />
                    
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 group z-50"
                    >
                        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                    
                    <div className="absolute bottom-10 left-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 uppercase tracking-widest">
                                Featured Project
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tight">
                            {project.title}
                        </h2>
                    </div>
                </div>

                <div ref={contentRef} className="p-8 md:p-12 overflow-y-auto relative z-10 flex-1 scrollbar-hide">
                    <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-zinc-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-xl leading-relaxed text-zinc-300/90 mb-12 font-medium">
                            {project.longDescription}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                                    The Challenge
                                </h3>
                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    {project.description} This project required handling high-complexity workloads while maintaining a seamless user experience and robust data integrity.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">Key Capabilities</h3>
                                <ul className="space-y-4 list-none p-0">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-4 text-zinc-300 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors group">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                                            <span className="text-lg font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-16 pt-10 border-t border-white/10">
                        <Button 
                            className="flex-1 py-8 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all"
                            onClick={() => window.open(project.link, '_blank')}
                        >
                            Explore Live Project
                        </Button>
                        {project.github && (
                            <Button 
                                variant="outline" 
                                className="flex-1 py-8 text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                                onClick={() => window.open(project.github, '_blank')}
                            >
                                {project.github === "#" ? "Request Access" : "View Source"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProjectModal };
