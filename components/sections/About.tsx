"use client";

import { useRef } from "react";

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
                                Full-Stack Developer with strong expertise in Next.js, React, Node.js, and AI-powered development. Experienced in building scalable web applications, integrating AI/ML solutions, and deploying production systems.
                            </p>
                            <p>
                                Skilled in leveraging LLMs and prompt engineering to optimize workflows, improve code quality, and deliver intelligent, high-performance applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { About };
