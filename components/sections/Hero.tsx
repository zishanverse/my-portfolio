"use client";

import { Button } from "@/components/ui/Button";
import { Button as MovingButton } from "@/components/ui/moving-border";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";



const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-transparent pt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-6 z-10">
                    <div className="space-y-2">
                        <h2 className="text-xl md:text-2xl font-medium text-indigo-500">Hello, I&apos;m</h2>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                            Zishan Khan
                        </h1>
                        <ContainerTextFlip
                            words={["Full-Stack Dev.", "AI Integration", "DevOps", "Agentic AI"]}
                            className="text-3xl md:text-5xl font-semibold text-muted-foreground"
                        />
                    </div>

                    <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-lg leading-relaxed">
                        Full-Stack Developer with strong expertise in Next.js, React, Node.js, and AI-powered development.
                        Experienced in building scalable web applications and integrating AI/ML solutions.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <MovingButton
                            borderRadius="1.75rem"
                            className="bg-background text-foreground border-neutral-200 dark:border-slate-800"
                        >
                            <Link href="#projects" className="flex items-center gap-2">
                                View Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </MovingButton>
                        <MovingButton
                            borderRadius="1.75rem"
                            className="bg-background text-foreground border-neutral-200 dark:border-slate-800"
                        >
                            <Link href="/resume" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Resume
                            </Link>
                        </MovingButton>
                    </div>
                </div>

                {/* 3D Scene */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* Placeholder for 3D Scene (now global) */}
                    <div className="hidden lg:block w-full h-full" />

                    {/* Decorative Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
                </div>
            </div>
        </section>
    );
};

export { Hero };
