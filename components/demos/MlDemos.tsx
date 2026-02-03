"use client";

import { Brain, ScanFace, Database, Cpu } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const demos = [
    {
        title: "Computer Vision",
        description: "Real-time object detection and facial recognition systems.",
        icon: <ScanFace className="w-8 h-8 text-indigo-500" />,
        bg: "bg-indigo-500/10",
    },
    {
        title: "NLP & LLMs",
        description: "Fine-tuning Large Language Models for specific domain tasks.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        bg: "bg-purple-500/10",
    },
    {
        title: "RAG Systems",
        description: "Retrieval-Augmented Generation for knowledge-base query.",
        icon: <Database className="w-8 h-8 text-emerald-500" />,
        bg: "bg-emerald-500/10",
    },
    {
        title: "Edge AI",
        description: "Optimized models running on low-power edge devices.",
        icon: <Cpu className="w-8 h-8 text-amber-500" />,
        bg: "bg-amber-500/10",
    },
];

const MlDemos = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto h-[500px] overflow-y-auto p-4">
            {demos.map((demo) => (
                <div key={demo.title} className="h-full">
                    <CardContainer className="inter-var w-full h-full">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-col items-start gap-4">
                            <CardItem translateZ="50" className="w-12 h-12 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                                {demo.icon}
                            </CardItem>
                            <CardItem translateZ="60" className="text-xl font-bold text-neutral-600 dark:text-white">
                                {demo.title}
                            </CardItem>
                            <CardItem translateZ="40" className="text-sm text-neutral-500 dark:text-neutral-300">
                                {demo.description}
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </div>
            ))}
        </div>
    );
};

export default MlDemos;
