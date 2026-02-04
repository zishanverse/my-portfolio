"use client";

import { useRef } from "react";
import { HeroHighlight, TextHighlight } from "@/components/ui/hero-highlight";

const About = () => {
    return (
        <HeroHighlight containerClassName="py-24 bg-background dark:bg-transparent w-full h-auto min-h-[50vh]">
            <div className="container mx-auto px-6 relative z-30">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Header */}
                    <div className="md:w-1/3">
                        <TextHighlight className="text-3xl font-bold tracking-tight text-foreground dark:text-white sticky top-24">
                            About Me
                        </TextHighlight>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 space-y-8">
                        <div className="prose prose-invert prose-lg text-muted-foreground dark:text-gray-200 leading-relaxed">
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
        </HeroHighlight>
    );
};

export { About };
