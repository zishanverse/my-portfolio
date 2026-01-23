"use client";

import { Button } from "@/components/ui/Button";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import Link from "next/link";

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-background w-full">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Get In Touch
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I&apos;m currently open to new opportunities and collaborations.
                        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/resume" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-8 rounded-full">
                                View Resume
                            </Button>
                        </Link>

                        <Link href="mailto:zishanverse@gmail.com" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 rounded-full">
                                zishanverse@gmail.com
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-12 flex items-center justify-center gap-6">
                        <Link
                            href="https://github.com/zishanverse/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            aria-label="GitHub Profile"
                        >
                            <Github className="w-6 h-6" />
                        </Link>

                        <Link
                            href="https://linkedin.com/in/zishan-khan-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="w-6 h-6" />
                        </Link>

                        <Link
                            href="https://leetcode.com/u/zishverse/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            aria-label="LeetCode Profile"
                        >
                            <Code className="w-6 h-6" />
                        </Link>

                        <Link
                            href="mailto:zishanverse@gmail.com"
                            className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            aria-label="Email Me"
                        >
                            <Mail className="w-6 h-6" />
                        </Link>
                    </div>

                    <footer className="pt-24 text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} jishan khan. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export { Contact };
