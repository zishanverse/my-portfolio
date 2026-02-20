"use client";

import React from "react";
import LogoLoop from "@/components/ui/LogoLoop";
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
    SiPython, SiHtml5, SiCss3, SiMongodb, SiRedis, SiPostgresql,
    SiPrisma, SiScikitlearn,
    SiVercel, SiHostinger, SiDocker
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa";

const techLogos = [
    { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="dark:text-white text-black" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPython className="text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
    { node: <SiHtml5 className="text-[#E34F26]" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 className="text-[#1572B6]" />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiRedis className="text-[#FF4438]" />, title: "Redis", href: "https://redis.io" },
    { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiPrisma className="dark:text-white text-black" />, title: "Prisma", href: "https://www.prisma.io" },
    { node: <SiScikitlearn className="text-[#F7931E]" />, title: "Scikit-learn", href: "https://scikit-learn.org" },
    { node: <FaAws className="text-[#FF9900]" />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <FaMicrosoft className="text-[#0078D4]" />, title: "Azure", href: "https://azure.microsoft.com" },
    { node: <SiVercel className="dark:text-white text-black" />, title: "Vercel", href: "https://vercel.com" },
    { node: <SiHostinger className="text-[#673DE6]" />, title: "Hostinger", href: "https://www.hostinger.com" },
    { node: <SiDocker className="text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
];

const softSkills = [
    "Problem Solving", "Team Leading", "Logical Thinking",
    "Adaptability", "Attention to Detail", "Agentic AI",
    "Prompt Engineering", "RAG", "CI/CD", "Communication"
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 w-full bg-transparent dark:bg-transparent relative overflow-hidden">
            {/* Background gradient blob */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white">Skills & Expertise</h2>
                    <p className="text-muted-foreground mt-2 text-lg">My creative and technical toolbox.</p>
                </div>

                <div className="space-y-12">
                    {/* Tech Stack Loop - Left */}
                    <div className="w-full overflow-hidden mask-gradient-x">
                        <LogoLoop
                            logos={techLogos.slice(0, Math.ceil(techLogos.length / 2))}
                            speed={100}
                            direction="left"
                            logoHeight={50}
                            gap={60}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="transparent"
                            ariaLabel="Tech Stack Row 1"
                        />
                    </div>

                    {/* Tech Stack Loop - Right */}
                    <div className="w-full overflow-hidden mask-gradient-x">
                        <LogoLoop
                            logos={techLogos.slice(Math.ceil(techLogos.length / 2))}
                            speed={100}
                            direction="right"
                            logoHeight={50}
                            gap={60}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="transparent"
                            ariaLabel="Tech Stack Row 2"
                        />
                    </div>

                    {/* Soft Skills & Concepts - Text Badges */}
                    <div className="w-full overflow-hidden pt-8">
                        <LogoLoop
                            logos={softSkills.map((skill) => ({
                                node: (
                                    <div className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap shadow-sm">
                                        {skill}
                                    </div>
                                )
                            }))}
                            speed={80}
                            direction="left"
                            logoHeight={40}
                            gap={40}
                            pauseOnHover
                            fadeOut
                            fadeOutColor="transparent"
                            renderItem={(item: any) => item.node}
                            ariaLabel="Soft Skills and Concepts"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Skills };
