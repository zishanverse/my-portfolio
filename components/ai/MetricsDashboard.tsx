"use client";

import React from "react";
import { LineChart, BarChart2, CheckCircle2, ShieldAlert } from "lucide-react";

export const MetricsDashboard = () => {
    // Exact performance values from your Assignment 8 1D CNN evaluation
    const stats = [
        { label: "Overall Accuracy", value: "89.06%", desc: "Ratio of correct predictions over total validation set.", icon: CheckCircle2, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
        { label: "Precision Score", value: "89.33%", desc: "Proportion of positive risk calls that were true anomalies.", icon: LineChart, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
        { label: "Recall / Sensitivity", value: "85.90%", desc: "Percentage of actual pollution threats correctly identified.", icon: BarChart2, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
        { label: "F1 Performance", value: "87.58%", desc: "Weighted harmonic mean balancing precision and recall.", icon: ShieldAlert, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    ];

    return (
        <div className="flex flex-col gap-8 select-none">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="p-5 rounded-2xl bg-white/2 border border-border flex flex-col justify-between gap-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                                    <h5 className="text-2xl font-black text-foreground">{stat.value}</h5>
                                </div>
                                <div className={`p-2.5 rounded-xl border ${stat.color} shrink-0`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-normal font-medium opacity-85">
                                {stat.desc}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* ROC Curve & Performance Explainer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ROC AUC Plot */}
                <div className="p-5 rounded-2xl bg-card border border-border flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h6 className="text-xs font-extrabold uppercase text-muted-foreground tracking-wider">ROC-AUC Curve (Area Under Curve)</h6>
                        <span className="text-xs font-mono text-indigo-300 font-bold">AUC: 0.942</span>
                    </div>

                    <div className="relative h-60 w-full bg-muted border border-border rounded-xl p-4 overflow-hidden">
                        {/* Custom SVG ROC curve */}
                        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                            {/* Gridlines */}
                            {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
                                <g key={v}>
                                    {/* Horizontal gridlines */}
                                    <line x1="0" y1={200 - v * 200} x2="200" y2={200 - v * 200} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    <text x="3" y={200 - v * 200 + 10} fill="rgba(255,255,255,0.1)" fontSize="7" fontFamily="monospace">{v.toFixed(1)}</text>
                                    
                                    {/* Vertical gridlines */}
                                    <line x1={v * 200} y1="0" x2={v * 200} y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                </g>
                            ))}
                            
                            {/* Diagonal Random Guess baseline (y=x) */}
                            <line x1="0" y1="200" x2="200" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3,3" />

                            {/* CNN ROC Curve path */}
                            <path
                                d="M 0,200 C 0,50 30,0 200,0"
                                fill="none"
                                stroke="rgba(79, 70, 229, 0.8)"
                                strokeWidth="3"
                                className="transition-all duration-500"
                            />
                            
                            {/* Glowing ROC dot */}
                            <circle cx="20" cy="33" r="4" fill="#a855f7" className="animate-pulse shadow-md" />
                        </svg>
                        
                        {/* Axes Labels */}
                        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground uppercase">False Positive Rate</div>
                        <div className="absolute top-2 left-1 text-[8px] font-mono text-muted-foreground uppercase origin-left rotate-90 translate-x-1.5 translate-y-3">True Positive Rate</div>
                    </div>
                </div>

                {/* Explainer Block */}
                <div className="p-5 rounded-2xl bg-card border border-border flex flex-col gap-6 justify-center">
                    <h6 className="text-xs font-extrabold uppercase text-muted-foreground tracking-wider">Evaluation Diagnostics Methodology</h6>
                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">
                        <p>
                            To evaluate the model, the dataset was split into **80% training** and **20% validation** (random seed = 42). Metrics were measured using standard scikit-learn statistical classification matrices.
                        </p>
                        <p>
                            An **AUC of 0.942** indicates excellent class separability. SVR and classical regression trees were compared as baselines (F1 scores ranging from 0.78 to 0.81). The 1D CNN outperforms them by extracting localized sequence motifs from tabular arrays.
                        </p>
                        <p>
                            The confusion matrix and metric calculations are logged in the accompanying capstone research papers, showing high diagnostic robustness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
