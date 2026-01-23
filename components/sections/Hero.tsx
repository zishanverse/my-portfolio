"use client";

import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import the 3D scene to avoid SSR issues with R3F
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full md:h-[600px] flex items-center justify-center text-muted-foreground">Loading 3D Experience...</div>
});

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-6 z-10">
                    <div className="space-y-2">
                        <h2 className="text-xl md:text-2xl font-medium text-indigo-500">Hello, I&apos;m</h2>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                            Jishan Khan
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-semibold text-muted-foreground">
                            Software Engineer
                        </h2>
                    </div>

                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        Full-Stack Developer with strong expertise in Next.js, React, Node.js, and AI-powered development.
                        Experienced in building scalable web applications and integrating AI/ML solutions.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <Button size="lg" className="rounded-full group">
                            <Link href="#projects" className="flex items-center gap-2">
                                View Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full">
                            <Link href="/resume" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Resume
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 3D Scene */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <HeroScene />

                    {/* Decorative Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
                </div>
            </div>
        </section>
    );
};

export { Hero };
