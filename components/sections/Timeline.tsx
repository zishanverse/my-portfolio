"use client";

import { motion } from "framer-motion";
import React from "react";

interface TimelineItem {
    year: string;
    title: string;
    company: string;
    description: string;
    type: "work" | "education";
}

const timelineData: TimelineItem[] = [
    {
        year: "Sep 2025 - Present",
        title: "Back End Developer",
        company: "THDC India Limited Official",
        description: "Built and deployed production-ready backend systems with blockchain integration using Hyperledger Fabric. Designed secure APIs and scalable architecture.",
        type: "work",
    },
    {
        year: "Nov 2024 - Jan 2025",
        title: "Full-stack Developer",
        company: "KKRF GROUP",
        description: "Built high-performance web apps with Next.js and 3D models. Deployed production-ready apps on Hostinger and utilized prompt engineering to accelerate development.",
        type: "work",
    },
    {
        year: "May 2024 - Jul 2024",
        title: "Full-stack Developer",
        company: "Bigbooster Technology",
        description: "Worked as an all-rounder (designing, frontend, backend, DevOps). Learned AWS S3, 3D integration, and handled full website development.",
        type: "work",
    },
    {
        year: "Jan 2023 - Sep 2023",
        title: "Frontend Developer",
        company: "YuvaCracy Foundation",
        description: "Lead frontend developer creating interactive UIs and developing the Contact-Us section.",
        type: "work",
    },
    {
        year: "2022 - 2026",
        title: "B Tech - CSE",
        company: "IPS Academy, Indore",
        description: "Pursuing Computer Science Engineering.",
        type: "education",
    },
];

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
    return (
        <div className={`flex flex-col md:flex-row gap-4 md:gap-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""} relative`}>
            {/* Center Line Dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-background -translate-x-1.5 md:-translate-x-2 mt-1.5 z-10" />

            {/* Content Spacer for Alternating Layout */}
            <div className="hidden md:block md:w-1/2" />

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`md:w-1/2 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
            >
                <div className="bg-card border border-border p-6 rounded-xl hover:border-indigo-500/30 transition-colors">
                    <span className="text-sm font-semibold text-indigo-400 block mb-2">{item.year}</span>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <h4 className="text-md font-medium text-muted-foreground mb-4">{item.company}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
            </motion.div>
        </div>
    );
};

const Timeline = () => {
    return (
        <section id="experience" className="py-24 bg-background w-full overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Experience & Education</h2>
                    <p className="text-muted-foreground mt-2 text-lg">My professional journey so far.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0.5 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2" />

                    <div className="flex flex-col gap-12">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Timeline };
