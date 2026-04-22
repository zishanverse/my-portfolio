"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
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
    const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

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

    useEffect(() => {
        previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

        const modal = modalRef.current;
        if (!modal) return;

        const getFocusableElements = () => {
            return modal.querySelectorAll<HTMLElement>(
                'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
        };

        const focusableElements = getFocusableElements();
        focusableElements[0]?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                handleClose();
                return;
            }

            if (event.key !== "Tab") return;

            const elements = getFocusableElements();
            if (elements.length === 0) return;

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocusedElementRef.current?.focus();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 sm:py-12">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            />

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                className="relative z-10 w-full max-w-4xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden max-h-[92vh] sm:max-h-full flex flex-col perspective-1000"
            >
                {/* 3D Background Scene */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Project3DBackground colorPrimary={colorPrimary} colorSecondary={colorSecondary} />
                </div>

                <div className={`h-32 sm:h-40 md:h-56 w-full bg-linear-to-r ${project.imageColor} relative z-10 overflow-hidden`}>
                    {/* Animated shine over header */}
                    <div className="absolute inset-0 bg-white/10 animate-shimmer-slide" />
                    
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 group z-50"
                        aria-label="Close project details"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                    
                    <div className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 uppercase tracking-widest">
                                Featured Project
                            </span>
                        </div>
                        <h2 id="project-modal-title" className="text-2xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tight pr-12">
                            {project.title}
                        </h2>
                    </div>
                </div>

                <div ref={contentRef} className="p-4 sm:p-8 md:p-12 overflow-y-auto relative z-10 flex-1 scrollbar-hide">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 sm:px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-zinc-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-base sm:text-xl leading-relaxed text-zinc-300/90 mb-8 sm:mb-12 font-medium">
                            {project.longDescription}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                                    The Challenge
                                </h3>
                                <p className="text-zinc-400 leading-relaxed text-sm sm:text-lg">
                                    {project.description} This project required handling high-complexity workloads while maintaining a seamless user experience and robust data integrity.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Key Capabilities</h3>
                                <ul className="space-y-3 sm:space-y-4 list-none p-0">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 sm:gap-4 text-zinc-300 bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors group">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                                            <span className="text-sm sm:text-lg font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-white/10">
                        <Button 
                            className="flex-1 py-6 sm:py-8 text-base sm:text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all"
                            onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                        >
                            Explore Live Project
                        </Button>
                        {project.github && (
                            <Button 
                                variant="outline" 
                                className="flex-1 py-6 sm:py-8 text-base sm:text-lg font-bold rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                                onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
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
