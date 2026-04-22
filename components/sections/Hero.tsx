"use client";

import { Button as MovingButton } from "@/components/ui/moving-border";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";



const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent dark:bg-transparent pt-16 sm:pt-20">
            <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-6 z-10">
                    <div className="space-y-2">
                        <h2 className="text-xl md:text-2xl font-medium text-indigo-500">Hello, I&apos;m</h2>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                            Zishan Khan
                        </h1>
                        <ContainerTextFlip
                            words={["Full-Stack Dev.", "AI Integration", "DevOps", "Agentic AI"]}
                            className="text-2xl sm:text-3xl md:text-5xl font-semibold text-muted-foreground"
                        />
                    </div>

                    <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 max-w-lg leading-relaxed">
                        Full-Stack Developer with strong expertise in Next.js, React, Node.js, and AI-powered development.
                        Experienced in building scalable web applications and integrating AI/ML solutions.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <MovingButton
                            borderRadius="1.75rem"
                            className="bg-background text-foreground border-neutral-200 dark:border-slate-800 w-full sm:w-auto"
                        >
                            <Link href="#projects" className="flex items-center justify-center gap-2 w-full px-2">
                                View Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </MovingButton>
                        <MovingButton
                            borderRadius="1.75rem"
                            className="bg-background text-foreground border-neutral-200 dark:border-slate-800 w-full sm:w-auto"
                        >
                            <Link href="/resume" className="flex items-center justify-center gap-2 w-full px-2">
                                <FileText className="w-4 h-4" />
                                Resume
                            </Link>
                        </MovingButton>
                    </div>
                </div>

                {/* 3D Scene / Profile Image Column */}
                <div className="relative w-full h-80 sm:h-95 md:h-full flex items-center justify-center lg:justify-end">
                    
                    {/* Placeholder for 3D Scene (Background) */}
                    <div className="hidden lg:block w-full h-full absolute inset-0 -z-10" />

                    {/* Premium Profile Image Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        whileHover={{ y: -10 }}
                        className="relative w-60 h-75 sm:w-70 sm:h-87.5 md:w-87.5 md:h-112.5 rounded-[2.5rem] p-3 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl group overflow-visible"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute -inset-4 bg-indigo-500/20 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500 -z-10" />
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                        
                        {/* The Image */}
                        <div className="relative w-full h-full rounded-4xl overflow-hidden border border-white/10">
                            <Image
                                src="/profile.jpg"
                                alt="Zishan Khan"
                                fill
                                sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 350px"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[0.2] hover:grayscale-0"
                            />
                            
                            {/* Inner Glass Overlay (Bottom) */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                                <p className="text-white font-bold text-lg tracking-tight">Zishan Khan</p>
                                <p className="text-zinc-200 text-xs font-medium uppercase tracking-widest">Creative Developer</p>
                            </div>
                        </div>

                        {/* Floating Interaction Badges */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl hidden sm:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">Available for Work</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-indigo-600/90 backdrop-blur-xl border border-white/20 shadow-xl hidden sm:block"
                        >
                            <span className="text-xs font-black text-white uppercase tracking-widest">3+ Years Exp.</span>
                        </motion.div>
                    </motion.div>

                    {/* Background Decorative Glow (Main) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-indigo-500/20 rounded-full blur-[100px] -z-20" />
                </div>
            </div>
        </section>
    );
};

export { Hero };
