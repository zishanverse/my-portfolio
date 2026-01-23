"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useRef } from "react";
import { ProjectData } from "./ProjectCard";
import { Button } from "@/components/ui/Button";

interface ProjectModalProps {
    project: ProjectData;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate overlay
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

        // Animate modal content
        gsap.fromTo(
            modalRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
        );
        // Animate inner content
        gsap.fromTo(
            contentRef.current?.children || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
        );
    }, { scope: modalRef }); // Scope mainly for cleanup, though elements are mixed references

    const handleClose = () => {
        // Reverse animation before unmounting could be added here with a slight delay or AnimatePresence equivalent
        // For simplicity in this step, we just close.
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                <div className={`h-48 w-full bg-gradient-to-r ${project.imageColor} relative`}>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{project.title}</h2>
                    </div>
                </div>

                <div ref={contentRef} className="p-6 md:p-8 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-secondary rounded-md text-secondary-foreground text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert max-w-none text-muted-foreground">
                        <p className="text-lg leading-relaxed">{project.longDescription}</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h3>Key Features</h3>
                        <ul>
                            <li>Real-time data synchronization</li>
                            <li>Responsive design for all devices</li>
                            <li>High-performance rendering</li>
                        </ul>
                    </div>

                    <div className="flex gap-4 mt-8 pt-8 border-t border-border">
                        <Button onClick={() => window.open(project.link, '_blank')}>
                            View Live Project
                        </Button>
                        <Button variant="outline" onClick={() => window.open('#', '_blank')}>
                            View Code
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProjectModal };
