"use client";

import { Bot, Workflow, Zap, Network, Sparkles } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const automationDemos = [
    {
        title: "Agentic AI Swarms",
        description: "Autonomous agents collaborating to solve complex, multi-step problems.",
        icon: <Bot className="w-10 h-10 text-cyan-400" />,
        bg: "bg-cyan-500/10 border-cyan-500/20",
        shadow: "dark:hover:shadow-cyan-500/[0.2]",
    },
    {
        title: "Make.com Workflows",
        description: "Advanced scenario automation integrating thousands of apps seamlessly.",
        icon: <Zap className="w-10 h-10 text-purple-500" />, // Zap fits Make's "fast/instant" vibe (or generic workflow)
        bg: "bg-purple-500/10 border-purple-500/20",
        shadow: "dark:hover:shadow-purple-500/[0.2]",
    },
    {
        title: "n8n Pipelines",
        description: "Self-hosted, node-based workflow automation for enterprise data control.",
        icon: <Network className="w-10 h-10 text-orange-500" />, // Network fits n8n node graph
        bg: "bg-orange-500/10 border-orange-500/20",
        shadow: "dark:hover:shadow-orange-500/[0.2]",
    },
    {
        title: "Intelligent RAG",
        description: "Connecting LLMs with your private data for context-aware automation.",
        icon: <Sparkles className="w-10 h-10 text-emerald-400" />,
        bg: "bg-emerald-500/10 border-emerald-500/20",
        shadow: "dark:hover:shadow-emerald-500/[0.2]",
    },
];

const AutomationDemos = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto h-[550px] overflow-y-auto p-4 custom-scrollbar">
            {automationDemos.map((demo) => (
                <div key={demo.title} className="h-full">
                    <CardContainer className="inter-var w-full h-full">
                        <CardBody className={`relative group/card bg-gray-50 dark:bg-black/80 backdrop-blur-md dark:border-white/[0.1] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col items-start gap-4 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-2xl ${demo.shadow}`}>

                            {/* Futuristic Header Pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-20 bg-gradient-to-bl from-white to-transparent rounded-tr-xl pointer-events-none" />

                            <CardItem translateZ="50" className={`w-16 h-16 rounded-xl flex items-center justify-center ${demo.bg}`}>
                                {demo.icon}
                            </CardItem>

                            <CardItem translateZ="60" className="text-xl font-bold text-neutral-800 dark:text-white mt-2">
                                {demo.title}
                            </CardItem>

                            <CardItem translateZ="40" className="text-sm text-neutral-500 dark:text-neutral-300 leading-relaxed">
                                {demo.description}
                            </CardItem>

                            {/* Decorative Tech Lines */}
                            <CardItem translateZ="30" className="w-full mt-4 flex gap-1 opacity-40">
                                <div className="h-1 w-1/3 bg-current rounded-full" />
                                <div className="h-1 w-1/6 bg-current rounded-full" />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </div>
            ))}
        </div>
    );
};

export default AutomationDemos;
