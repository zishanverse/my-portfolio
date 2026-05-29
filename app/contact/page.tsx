"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/zishanverse/",
        username: "@zishanverse",
        color: "hover:text-white hover:border-white/20 hover:bg-white/5",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://linkedin.com/in/zishan-khan-",
        username: "Zishan Khan",
        color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10",
    },
    {
        name: "LeetCode",
        icon: Code,
        url: "https://leetcode.com/u/zishverse/",
        username: "zishverse",
        color: "hover:text-[#FFA116] hover:border-[#FFA116]/30 hover:bg-[#FFA116]/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:zishanverse@gmail.com",
        username: "zishanverse@gmail.com",
        color: "hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-400/10",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [submissionMessage, setSubmissionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const nextErrors: { name?: string; email?: string; message?: string } = {};

        if (!formData.name.trim()) nextErrors.name = "Name is required.";
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!formData.message.trim()) nextErrors.message = "Project details are required.";

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
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            console.error("Error:", error);
            setSubmissionMessage({ type: "error", text: "Something went wrong. Please try again later." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 selection:bg-indigo-500/30">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-indigo-500/10 to-transparent pointer-events-none -z-10 blur-3xl" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                        Let's work <span className="text-zinc-500">together.</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl font-medium">
                        I'm currently open for new opportunities. Whether you have a specific project in mind, 
                        or just want to explore possibilities, feel free to reach out.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Form Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <Send className="w-5 h-5 text-indigo-400" />
                                Send a Message
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {submissionMessage && (
                                    <div
                                        className={`rounded-xl px-4 py-3 text-sm font-medium border ${
                                            submissionMessage.type === "success"
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                        }`}
                                    >
                                        {submissionMessage.text}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-zinc-300">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none text-white placeholder:text-zinc-600"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                                if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                                            }}
                                        />
                                        {formErrors.name && <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-zinc-300">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none text-white placeholder:text-zinc-600"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                                            }}
                                        />
                                        {formErrors.email && <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-zinc-300">Project Details</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none resize-none text-white placeholder:text-zinc-600"
                                        placeholder="Tell me about your project, timeline, or just say hi..."
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({ ...formData, message: e.target.value });
                                            if (formErrors.message) setFormErrors((prev) => ({ ...prev, message: undefined }));
                                        }}
                                    />
                                    {formErrors.message && <p className="text-xs text-rose-400 mt-1">{formErrors.message}</p>}
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full sm:w-auto px-8 py-6 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    {isLoading ? "Sending..." : "Send Proposal"}
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Socials Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl h-full flex flex-col">
                            <h2 className="text-xl font-bold mb-8">Direct Connections</h2>
                            
                            <div className="flex flex-col gap-3 flex-1">
                                {SOCIAL_LINKS.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 ${link.color}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{link.name}</span>
                                                    <span className="text-xs text-zinc-500 font-mono mt-0.5">{link.username}</span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-current group-hover:-rotate-45 transition-all duration-300" />
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Based in India. Available for remote work worldwide. 
                                    Typical response time is within 24 hours.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
