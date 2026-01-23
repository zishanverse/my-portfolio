"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Download,
    MapPin,
    Mail,
    Phone,
    Linkedin,
    Globe,
    Cpu,
    Code,
    Briefcase,
    GraduationCap,
    Award,
    Terminal,
    Brain,
    Server
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Data ---

const contactInfo = {
    name: "Jishan Khan",
    title: "Software Engineer",
    location: "Indore, MP",
    phone: "+919174996768",
    email: "zishanverse@gmail.com",
    linkedin: "https://linkedin.com/in/zishan-khan-",
};

const executiveSummary = "Full-Stack Developer with strong expertise in Next.js, React, Node.js, and AI-powered development. Experienced in building scalable web applications, integrating AI/ML solutions, and deploying production systems. Skilled in leveraging LLMs and prompt engineering to optimize workflows, improve code quality, and deliver intelligent, high-performance applications.";

const highlights = [
    "Full-stack development with Next.js, React, Node.js, REST APIs",
    "AI/ML integration with Python, Scikit-learn, LLMs",
    "Prompt engineering using ChatGPT and Claude AI",
    "Advanced UI with 3D models and animations",
    "Deployment & hosting of production apps",
];

const technicalSkills = [
    { category: "Languages & Frameworks", skills: ["Node.js", "TypeScript", "Next.js", "Python", "React"] },
    { category: "Databases & Caching", skills: ["MongoDB", "Redis", "PostgreSQL", "Prisma"] },
    { category: "AI & ML", skills: ["Agentic AI", "Prompt Engineering", "RAG", "Scikit-learn", "NumPy", "Pandas"] },
    { category: "DevOps & Cloud", skills: ["CI/CD (GitHub/GitLab)", "AWS", "Azure (Basics)", "Vercel", "Hostinger", "EC2"] },
];

const softSkills = [
    "Problem Solving",
    "Team Leading",
    "Logical & Analytical Thinking",
    "Adaptability",
    "Attention to Detail",
    "Debugging Mindset",
];

const experience = [
    {
        company: "THDC India Limited Official",
        role: "Back End Developer",
        period: "Sep 2025 - Present",
        description: [
            "Built and deployed production-ready backend systems with blockchain integration using Hyperledger Fabric, focusing on scalable architecture, secure APIs, and clean code practices.",
            "Designed and handled secure backend APIs.",
        ],
    },
    {
        company: "KKRF GROUP",
        role: "Full-stack Developer",
        period: "Nov 2024 - Jan 2025",
        description: [
            "Focused on building high-performance, visually engaging web applications using Next.js, advanced 3D models, and heavy animations.",
            "Responsible for deploying production-ready applications on Hostinger, ensuring scalability, security, and optimized performance.",
            "Worked and handled multiple projects.",
            "Learned prompt engineering to accelerate development, improve code quality, and enhance problem-solving workflows.",
        ],
    },
    {
        company: "Bigbooster Technology",
        role: "Full-stack Developer",
        period: "May 2024 - Jul 2024",
        description: [
            "Worked as an all-rounder (designing, frontend, backend, DevOps) to build projects for a SaaS company.",
            "Learned AWS S3 Bucket, 3D component integration, Next.js, TypeScript, TailwindCSS.",
            "Handled full website development.",
        ],
    },
    {
        company: "YuvaCracy Foundation",
        role: "Frontend Developer",
        period: "Jan 2023 - Sep 2023",
        description: [
            "Frontend team member for creating interactive UI.",
            "Developed Contact-Us section of YuvaCracy Website.",
            "Worked as lead on frontend dev.",
        ],
    },
];

const projects = [
    {
        title: "Intelligent DCRM Diagnostics & Predictive Maintenance System",
        period: "2025 - Present",
        description: "Engineered a real-time analytics engine processing widely varying telemetry data. Reduced manual analysis time by replacing legacy workflows with automated, AI-driven fault detection and reporting pipelines.",
        stack: "Next.js, React Query, Python, FastAPI, PostgreSQL, Prisma, LLMs (Gemini), REST APIs",
    },
    {
        title: "adClickMagnet",
        period: "2025",
        description: "Implemented adClickmagnet application. A one-stop platform for digital marketing, SEO, web dev, and graphic design. Implemented pages like Preloader (3d model), Home, service pages, about-us, career, case-studies, blog, SEO analyzer, etc. Integrated 3D models and trending animations.",
        stack: "Next.js, TypeScript, CSS, Tailwind CSS, AWS S3, Spline, Three.js, MongoDB, GSAP, Framer Motion, Aceternity UI, NextUI",
    },
    {
        title: "AI-Powered Learning Path Generator (MCP)",
        period: "2024",
        description: "Developed an AI-powered agentic application that auto-generates personalized learning curriculums by orchestrating autonomous agents to aggregate video content, organize documents, and schedule tasks using the Model Context Protocol (MCP).",
        stack: "Python, LangChain, LangGraph, MCP, AI Models (Gemini, Claude, Mistral), Hugging Face, Streamlit, Composio",
    },
];

const education = [
    {
        degree: "B Tech - Computer Science Engineering (CSE)",
        institution: "IPS Academy, Institute of Engineering and Science, Indore",
        period: "2022 - 2026",
    },
    {
        degree: "Intermediate Other (89.6%)",
        institution: "Maa Narmada Academy School, Dhamnod",
        period: "2019 - 2021",
    },
    {
        degree: "Secondary School Of Certificate (88.0%)",
        institution: "Shahid Bhagat Singh Convent School, Dharampuri",
        period: "2018 - 2019",
    },
];

// --- Components ---

const SectionTitle = ({ icon: Icon, children }: { icon: any, children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon size={20} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{children}</h2>
    </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground border border-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
        {children}
    </span>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("glass p-6 rounded-xl hover:bg-white/5 transition-colors", className)}>
        {children}
    </div>
);

// --- Page ---

export default function ResumePage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 lg:px-16 print:p-0 print:bg-white print:text-black">
            <motion.div
                className="max-w-5xl mx-auto space-y-12 print:space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Header */}
                <motion.header variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10 print:border-black/20">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">{contactInfo.name}</h1>
                        <p className="text-xl text-muted-foreground font-medium">{contactInfo.title}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground print:text-black">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> {contactInfo.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> {contactInfo.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> {contactInfo.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin size={16} />
                            <Link href={contactInfo.linkedin} target="_blank" className="hover:text-primary transition-colors">
                                linkedin.com/in/zishan-khan-
                            </Link>
                        </div>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium print:hidden"
                    >
                        <Download size={18} /> Download PDF
                    </button>
                </motion.header>

                {/* Executive Summary */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Brain}>Executive Summary</SectionTitle>
                    <p className="text-lg leading-relaxed text-muted-foreground print:text-black">
                        {executiveSummary}
                    </p>
                </motion.section>

                {/* Key Highlights */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Award}>Key Highlights</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {highlights.map((item, idx) => (
                            <Card key={idx} className="print:border print:border-black/10 print:bg-transparent">
                                <p className="font-medium text-foreground/90 print:text-black">{item}</p>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Technical Skills */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Code}>Technical Skills</SectionTitle>
                    <div className="grid grid-cols-1 gap-6">
                        {technicalSkills.map((cat, idx) => (
                            <div key={idx} className="space-y-3">
                                <h3 className="text-lg font-semibold text-primary">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, sIdx) => (
                                        <Badge key={sIdx}>{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Soft Skills */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Brain}>Soft Skills</SectionTitle>
                    <div className="flex flex-wrap gap-3">
                        {softSkills.map((skill, idx) => (
                            <Badge key={idx}>{skill}</Badge>
                        ))}
                    </div>
                </motion.section>

                {/* Work Experience */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Briefcase}>Work Experience</SectionTitle>
                    <div className="space-y-6">
                        {experience.map((job, idx) => (
                            <Card key={idx} className="print:break-inside-avoid print:bg-transparent print:border print:border-black/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-primary">{job.role}</h3>
                                    <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{job.period}</span>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-foreground">{job.company}</h4>
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground print:text-black">
                                    {job.description.map((point, pIdx) => (
                                        <li key={pIdx}>{point}</li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Projects */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Terminal}>Projects</SectionTitle>
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((project, idx) => (
                            <Card key={idx} className="print:break-inside-avoid print:bg-transparent print:border print:border-black/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                                    <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{project.period}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 leading-relaxed print:text-black">{project.description}</p>
                                <div className="pt-4 border-t border-white/5 print:border-black/10">
                                    <p className="text-sm font-semibold text-primary mb-2">Tech Stack:</p>
                                    <p className="text-sm text-foreground/80 print:text-black">{project.stack}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.section>

                {/* Volunteering */}
                <motion.section variants={itemVariants}>
                    <SectionTitle icon={Globe}>Volunteering Experience</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="print:bg-transparent print:border print:border-black/20">
                            <h3 className="text-lg font-bold text-primary mb-1">GDSC - Web Development</h3>
                            <p className="text-sm text-muted-foreground mb-3">Aug 2023 - Aug 2024</p>
                            <ul className="list-disc ml-5 text-sm text-muted-foreground/90 space-y-1 print:text-black">
                                <li>Managed web development for GDSC activities</li>
                                <li>Built and maintained responsive web pages</li>
                            </ul>
                        </Card>
                        <Card className="print:bg-transparent print:border print:border-black/20">
                            <h3 className="text-lg font-bold text-primary mb-1">Archway - Technical</h3>
                            <p className="text-sm text-muted-foreground mb-3">Mar 2024 - Nov 2024</p>
                            <ul className="list-disc ml-5 text-sm text-muted-foreground/90 space-y-1 print:text-black">
                                <li>Trained college students in blockchain</li>
                                <li>Conducted technical workshops</li>
                            </ul>
                        </Card>
                    </div>
                </motion.section>

                {/* Training & Certs & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-4">
                    {/* Education */}
                    <motion.section variants={itemVariants}>
                        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={idx} className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                    <h3 className="font-bold text-foreground">{edu.degree}</h3>
                                    <p className="text-sm text-primary">{edu.institution}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Certs & Awards */}
                    <motion.section variants={itemVariants}>
                        <SectionTitle icon={Award}>Awards & Certifications</SectionTitle>
                        <div className="space-y-4">
                            <div className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                <h3 className="font-bold text-primary mb-2">Awards</h3>
                                <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1 print:text-black">
                                    <li>WINNER - Smart India Hackathon (SIH) 2024 & 2025</li>
                                    <li>Nxtwave Mega challenge Winner - 1st Prize</li>
                                </ul>
                            </div>
                            <div className="glass p-4 rounded-xl print:bg-transparent print:border print:border-black/20">
                                <h3 className="font-bold text-primary mb-2">Certifications</h3>
                                <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1 print:text-black">
                                    <li>Certified Agentic AI developer</li>
                                    <li>Certified Full-stack Developer</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>
                </div>

            </motion.div>
        </div>
    );
}
