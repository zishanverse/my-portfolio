"use client";

import { useRef } from "react";

const skills = [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Three.js / R3F",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "Framer Motion",
];

const About = () => {
    return (
        <section id="about" className="py-24 bg-background w-full">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Header */}
                    <div className="md:w-1/3">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sticky top-24">
                            About Me
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 space-y-8">
                        <div className="prose prose-invert prose-lg text-muted-foreground leading-relaxed">
                            <p>
                                I&apos;m a passionate developer with a keen eye for design and a drive for creating seamless digital experiences. With over 5 years of experience in the tech industry, I&apos;ve honed my skills in building scalable applications that not only function flawlessly but also look stunning.
                            </p>
                            <p>
                                My journey began with a curiosity for how things work on the web, which quickly evolved into a career specializing in modern frontend technologies. I believe in writing clean, maintainable code and prioritizing user accessibility and performance.
                            </p>
                            <p>
                                When I&apos;m not coding, you can find me exploring new 3D rendering techniques, contributing to open-source projects, or hiking the nearest trails to disconnect and recharge.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="pt-8">
                            <h3 className="text-xl font-semibold text-foreground mb-4">Technical Toolkit</h3>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                                {skills.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-neutral-300">
                                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { About };
