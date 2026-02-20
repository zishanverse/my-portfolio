"use client";

import { Button } from "@/components/ui/Button";
import Dock from "@/components/ui/Dock";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import Link from "next/link";

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-background dark:bg-transparent w-full">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white">
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

                    <div className="pt-12 flex items-center justify-center w-full">
                        <Dock
                            items={[
                                {
                                    icon: <Github className="w-8 h-8 dark:text-white text-neutral-200" />,
                                    label: 'GitHub',
                                    onClick: () => window.open('https://github.com/zishanverse/', '_blank')
                                },
                                {
                                    icon: <Linkedin className="w-8 h-8 dark:text-white text-neutral-200" />,
                                    label: 'LinkedIn',
                                    onClick: () => window.open('https://linkedin.com/in/zishan-khan-', '_blank')
                                },
                                {
                                    icon: <Code className="w-8 h-8 dark:text-white text-neutral-200" />,
                                    label: 'LeetCode',
                                    onClick: () => window.open('https://leetcode.com/u/zishverse/', '_blank')
                                },
                                {
                                    icon: <Mail className="w-8 h-8 dark:text-white text-neutral-200" />,
                                    label: 'Email',
                                    onClick: () => window.location.href = 'mailto:zishanverse@gmail.com'
                                },
                            ]}
                            panelHeight={88}
                            baseItemSize={70}
                            magnification={90}
                        />
                    </div>

                    <footer className="pt-24 text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Zishan Khan. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export { Contact };
