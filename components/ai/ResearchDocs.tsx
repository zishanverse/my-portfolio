"use client";

import React from "react";
import { FileText, Download, ShieldCheck, Terminal, Award } from "lucide-react";

interface DocCard {
    title: string;
    description: string;
    fileSize: string;
    fileType: string;
    category: string;
    icon: React.ReactNode;
}

const DOCUMENTATION_ARCHIVES: DocCard[] = [
    {
        title: "Deep Learning Telemetry Classifier Thesis",
        description: "Academic report detailing the design, training schedules, and validation matrices of 1D CNN telemetry models.",
        fileSize: "2.4 MB",
        fileType: "PDF",
        category: "Deep Learning",
        icon: <FileText className="w-5 h-5 text-indigo-400" />
    },
    {
        title: "Clinical Cardiology Risk Factors Analysis",
        description: "Exploratory study analyzing blood pressure, max heart rates, and chest pain parameters in cardiology indicators.",
        fileSize: "1.8 MB",
        fileType: "PDF",
        category: "Exploratory Data Analysis",
        icon: <Award className="w-5 h-5 text-red-400" />
    },
    {
        title: "Multi-Agent Systems & Autogeny Blueprint",
        description: "Architectural blueprint mapping CrewAI designer, developer, and QA orchestration loops with Gemini Flash.",
        fileSize: "920 KB",
        fileType: "Markdown / PDF",
        category: "Agentic Systems",
        icon: <Terminal className="w-5 h-5 text-purple-400" />
    },
    {
        title: "Apriori Transactional Rules Catalog",
        description: "Support, lift, and confidence tables derived from mining deforestation indicators and environmental dependencies.",
        fileSize: "650 KB",
        fileType: "CSV / JSON",
        category: "Association Rules",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    }
];

export const ResearchDocs = () => {
    return (
        <div className="space-y-6 select-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Methodology & Research Archives
                    </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[9px] text-zinc-500">
                    4 resources available
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DOCUMENTATION_ARCHIVES.map((doc, idx) => (
                    <div
                        key={idx}
                        className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-zinc-800 transition-all flex flex-col justify-between gap-4 backdrop-blur-md relative overflow-hidden group"
                    >
                        {/* hover border glow */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-zinc-400 uppercase tracking-wide">
                                    {doc.category}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                    {doc.fileSize} | {doc.fileType}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 shrink-0 h-10 w-10 flex items-center justify-center">
                                    {doc.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs sm:text-sm font-extrabold text-foreground tracking-wide group-hover:text-white transition-colors">
                                        {doc.title}
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                        {doc.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-extrabold">
                                STATUS: ready
                            </span>
                            
                            <button className="px-3.5 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-zinc-300 uppercase tracking-wide cursor-pointer transition-colors flex items-center gap-1.5">
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
