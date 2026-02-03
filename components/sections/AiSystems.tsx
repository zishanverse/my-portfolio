"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tabs } from "@/components/ui/tabs";
import AiChatDemo from "@/components/demos/AiChatDemo";
import AutomationDemos from "@/components/demos/AutomationDemos";
import { TextHighlight } from "@/components/ui/hero-highlight";

gsap.registerPlugin(ScrollTrigger);

const AiSystems = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !textRef.current) return;

        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: containerRef });

    const tabs = [
        {
            title: "AI Agent UI",
            value: "chat",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-indigo-700 to-violet-900">
                    <p className="mb-8 text-2xl">Interactive Agentic Interface</p>
                    <AiChatDemo />
                </div>
            ),
        },
        {
            title: "Automation & Workflows",
            value: "automation",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-indigo-900">
                    <p className="mb-8 text-2xl">Agentic Process Automation</p>
                    <AutomationDemos />
                </div>
            ),
        },
    ];

    return (
        <section ref={containerRef} className="py-24 w-full bg-background relative overflow-hidden flex flex-col items-center">

            <div ref={textRef} className="text-center space-y-4 mb-12 z-10 px-4">
                <TextHighlight className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    Next-Gen AI Systems
                </TextHighlight>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Exploring the frontier of Agentic AI, Large Language Models, and intelligent automation.
                    Switch tabs below to see my work in action.
                </p>
            </div>

            <div className="h-[40rem] md:h-[50rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-10 px-4">
                <Tabs tabs={tabs} />
            </div>

        </section>
    );
};

export { AiSystems };
