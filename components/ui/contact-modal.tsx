"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ContactModalProps {
    onClose: () => void;
}

const ContactModal = ({ onClose }: ContactModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [submissionMessage, setSubmissionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useGSAP(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
            modalRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
        );
        gsap.fromTo(
            contentRef.current?.children || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
        );
    }, { scope: modalRef });

    const [isLoading, setIsLoading] = useState(false);

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

    const validateForm = () => {
        const nextErrors: { name?: string; email?: string; message?: string } = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!formData.message.trim()) {
            nextErrors.message = "Project details are required.";
        }

        setFormErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmissionMessage({ type: "error", text: "Please fix the highlighted fields and try again." });
            return;
        }

        setIsLoading(true);
        setSubmissionMessage(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: formData.message.trim(),
                }),
            });

            if (response.ok) {
                setSubmissionMessage({ type: "success", text: "Message sent successfully. Thank you!" });
                setFormData({ name: "", email: "", message: "" });
                setFormErrors({});
            } else {
                const data = await response.json();
                setSubmissionMessage({ type: "error", text: data.details || "Failed to send message. Please try again." });
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmissionMessage({ type: "error", text: "Something went wrong. Please try again later." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                className="relative z-10 w-full max-w-lg bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="p-6 border-b border-neutral-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
                    <h2 id="contact-modal-title" className="text-xl font-bold text-neutral-900 dark:text-white">Let's Work Together</h2>
                    <button
                        onClick={onClose}
                        className="p-2 min-h-11 min-w-11 hover:bg-neutral-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        aria-label="Close contact form"
                    >
                        <X className="w-5 h-5 text-neutral-500 dark:text-zinc-400" />
                    </button>
                </div>

                <div ref={contentRef} className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {submissionMessage && (
                            <div
                                role="status"
                                aria-live="polite"
                                className={`rounded-xl px-4 py-3 text-sm ${submissionMessage.type === "success"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                                    : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300"
                                    }`}
                            >
                                {submissionMessage.text}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="contact-name" className="text-sm font-medium text-neutral-700 dark:text-zinc-300">Your Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                required
                                autoComplete="name"
                                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    if (formErrors.name) {
                                        setFormErrors((prev) => ({ ...prev, name: undefined }));
                                    }
                                }}
                            />
                            {formErrors.name && <p className="text-xs text-rose-600 dark:text-rose-400">{formErrors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contact-email" className="text-sm font-medium text-neutral-700 dark:text-zinc-300">Email Address</label>
                            <input
                                id="contact-email"
                                type="email"
                                required
                                autoComplete="email"
                                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (formErrors.email) {
                                        setFormErrors((prev) => ({ ...prev, email: undefined }));
                                    }
                                }}
                            />
                            {formErrors.email && <p className="text-xs text-rose-600 dark:text-rose-400">{formErrors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contact-message" className="text-sm font-medium text-neutral-700 dark:text-zinc-300">Project Details</label>
                            <textarea
                                id="contact-message"
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none dark:text-white"
                                placeholder="Tell me about your project, timeline, and budget..."
                                value={formData.message}
                                onChange={(e) => {
                                    setFormData({ ...formData, message: e.target.value });
                                    if (formErrors.message) {
                                        setFormErrors((prev) => ({ ...prev, message: undefined }));
                                    }
                                }}
                            />
                            {formErrors.message && <p className="text-xs text-rose-600 dark:text-rose-400">{formErrors.message}</p>}
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose} className="min-h-11">
                                Cancel
                            </Button>
                            <Button type="submit" className="gap-2 min-h-11" disabled={isLoading}>
                                {isLoading ? null : <Send className="w-4 h-4" />}
                                {isLoading ? "Sending..." : "Send Proposal"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export { ContactModal };
