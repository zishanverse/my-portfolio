"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

// Define Achievement Type locally or import if shared
export interface AchievementData {
    title: string;
    organization: string;
    date: string;
    image: string;
    description: string;
    descriptionLong?: string;
    tags: string[];
    link?: string;
}

interface AchievementModalProps {
    achievement: AchievementData;
    onClose: () => void;
}

const AchievementModal = ({ achievement, onClose }: AchievementModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

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
    }, { scope: modalRef });

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
                onClose();
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
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="achievement-modal-title"
                className="relative z-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 id="achievement-modal-title" className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{achievement.title}</h2>
                        <p className="text-zinc-300 font-medium">{achievement.organization}</p>
                    </div>
                </div>

                <div ref={contentRef} className="p-6 md:p-8 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {achievement.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert max-w-none text-zinc-400">
                        <p className="text-lg leading-relaxed">{achievement.descriptionLong || achievement.description}</p>
                    </div>

                    <div className="flex gap-4 mt-8 pt-8 border-t border-zinc-800 justify-end">
                        {achievement.link && (
                            <Button onClick={() => window.open(achievement.link, '_blank', 'noopener,noreferrer')}>
                                View Post
                            </Button>
                        )}
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AchievementModal };
