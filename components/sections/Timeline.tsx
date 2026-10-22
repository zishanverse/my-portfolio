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
        title: "Backend Developer",
        company: "THDC India Limited",
        description: "Architected and deployed a production REST API backend in Node.js/TypeScript on government infrastructure across 9 modules and 91 source files. Designed multi-tier RBAC with audit trails (>80% Jest coverage via GitHub Actions CI) and Cloudflare R2 document pipelines.",
        type: "work",
    },
    {
        year: "Jan 2026 - Present",
        title: "Freelance Software Engineer",
        company: "Self-Employed (Remote)",
        description: "Engineered Haanna, a production RAG platform serving 200+ concurrent users with pgvector persistent memory (<150ms p95 latency), Socket.io real-time streaming, Redis-backed BullMQ queues, and Prometheus/Grafana monitoring.",
        type: "work",
    },
    {
        year: "Nov 2024 - Jan 2025",
        title: "Full-Stack Developer",
        company: "KKRF Group",
        description: "Built Next.js web applications with Three.js 3D components, GSAP animations, and Spline integrations. Owned full project lifecycle across three client engagements with Lighthouse-optimized performance and SEO.",
        type: "work",
    },
    {
        year: "May 2024 - Jul 2024",
        title: "Full-Stack Developer",
        company: "Bigbooster Technology",
        description: "Shipped full-stack SaaS features using Next.js, TypeScript, and AWS S3. Built a reusable Tailwind CSS component library that reduced UI development time across multiple production screens.",
        type: "work",
    },
    {
        year: "Mar 2024 - Nov 2024",
        title: "Technical Trainer",
        company: "Archway",
        description: "Delivered backend and web development workshops; mentored aspiring engineers through hands-on project-based learning.",
        type: "work",
    },
    {
        year: "2022 - 2026",
        title: "B.Tech in Computer Science & Engineering",
        company: "IPS Academy (IES), Indore",
        description: "Focusing on distributed systems, machine learning engineering, and scalable backend architecture.",
        type: "education",
    },
];

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
    return (
        <div className={`flex flex-col md:flex-row gap-4 md:gap-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""} relative`}>
            {/* Center Line Dot */}
            <div className="absolute left-0 md:left-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-indigo-500 border-4 border-background -translate-x-1.5 md:-translate-x-2 mt-2 z-10" />

            {/* Content Spacer for Alternating Layout */}
            <div className="hidden md:block md:w-1/2" />

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`md:w-1/2 ml-6 sm:ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
            >
                <div className="bg-card border border-border p-4 sm:p-6 rounded-xl hover:border-indigo-500/30 transition-colors">
                    <span className="text-sm font-semibold text-indigo-400 block mb-2">{item.year}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{item.title}</h3>
                    <h4 className="text-sm sm:text-md font-medium text-muted-foreground mb-3 sm:mb-4">{item.company}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
            </motion.div>
        </div>
    );
};

const Timeline = () => {
    return (
        <section id="experience" className="py-20 md:py-24 bg-transparent dark:bg-transparent w-full overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Experience & Education</h2>
                    <p className="text-muted-foreground mt-2 text-base sm:text-lg">My professional journey so far.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2" />

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
