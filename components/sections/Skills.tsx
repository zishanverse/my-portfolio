"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const skillCategories = [
    {
        title: "Languages & Frameworks",
        skills: ["Node.js", "TypeScript", "Next.js", "Python", "React", "HTML/CSS"],
    },
    {
        title: "Databases & AI",
        skills: ["MongoDB", "Redis", "PostgreSQL", "Prisma", "Agentic AI", "Prompt Engineering", "RAG", "Scikit-learn"],
    },
    {
        title: "DevOps & Cloud",
        skills: ["CI/CD", "AWS Basics", "Azure Basics", "Vercel", "Hostinger", "EC2", "Docker"],
    },
    {
        title: "Soft Skills",
        skills: ["Problem Solving", "Team Leading", "Logical Thinking", "Adaptability", "Attention to Detail"],
    },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative w-full h-full", className)}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full glass rounded-xl p-8 flex flex-col gap-4"
            >
                {children}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-24 w-full bg-background relative overflow-hidden">
            {/* Background gradient blob */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Skills & Expertise</h2>
                    <p className="text-muted-foreground mt-2 text-lg">My creative and technical toolbox.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="h-full min-h-[300pxPerspective]">
                            {/* Perspective container needed for 3D effect */}
                            <div style={{ perspective: "1000px" }} className="h-full">
                                <TiltCard>
                                    <h3 className="text-xl font-bold text-indigo-400">{category.title}</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-foreground/80 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </TiltCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Skills };
