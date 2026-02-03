"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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
                        <div key={category.title} className="h-full">
                            <CardContainer className="inter-var">
                                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-indigo-400 dark:text-white"
                                    >
                                        {category.title}
                                    </CardItem>
                                    <CardItem
                                        as="div"
                                        translateZ="60"
                                        className="flex flex-wrap gap-2 mt-4"
                                    >
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-foreground/80 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </CardItem>
                                </CardBody>
                            </CardContainer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Skills };
