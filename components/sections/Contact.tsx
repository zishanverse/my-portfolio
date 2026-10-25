"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Copy, Check, Mail, FileText, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa6";

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "zishanverse@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { name: "GitHub", href: "https://github.com/zishanverse/", icon: FaGithub },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/zishan-khan-/", icon: FaLinkedin },
        { name: "LeetCode", href: "https://leetcode.com/u/zishverse/", icon: FaCode },
    ];

    return (
        <section className="py-24 md:py-32 bg-transparent dark:bg-transparent w-full border-t border-border/40 dark:border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">


                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        Ready to Build Something <span className="text-indigo-500">Intelligent?</span>
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        Whether you need autonomous AI agents, enterprise RAG pipelines, or high-performance web applications — let&apos;s start the conversation.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-600/20">
                                Send a Message <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>

                        <button
                            onClick={handleCopyEmail}
                            className="w-full sm:w-auto px-6 py-3 rounded-full border border-border bg-card/80 hover:bg-muted text-foreground text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    <span className="text-emerald-500">Email Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 text-muted-foreground" />
                                    <span>Copy Email</span>
                                </>
                            )}
                        </button>

                        <Link href="/resume" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 rounded-full border-border hover:bg-muted gap-2">
                                <FileText className="w-4 h-4" />
                                View Resume
                            </Button>
                        </Link>
                    </div>

                    {/* Social Channels Row */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        {socials.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full border border-border bg-card/60 hover:bg-foreground/5 hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all"
                                    aria-label={social.name}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            );
                        })}
                    </div>

                    <footer className="pt-20 text-xs text-muted-foreground space-y-1">
                        <p>&copy; {new Date().getFullYear()} Zishan Khan. Designed for high performance & intelligence.</p>
                        <p className="text-[11px] text-muted-foreground/80">Indore, India · Remote & Global</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export { Contact };
