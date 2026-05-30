"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Cpu, Award, FileCode, CheckCircle2 } from "lucide-react";

interface NotebookItem {
    name: string;
    description: string;
    skills: string[];
    fileSize: string;
}

interface Milestone {
    title: string;
    tag: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    notebooks: NotebookItem[];
}

const MILESTONES: Milestone[] = [
    {
        title: "Phase 1: Foundations",
        tag: "NumPy & Pandas Core",
        description: "Vectorized arrays, multi-dimensional slicing, dataframe aggregates, and cleaning CSV data ingest pipelines.",
        color: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
        icon: <BookOpen className="w-5 h-5" />,
        notebooks: [
            { name: "Numpy Basics", description: "Array dimension reshaping, scalar broadcasting, and matrix dot products.", skills: ["Ndarray operations", "Broadcasting", "Linear Algebra"], fileSize: "73 KB" },
            { name: "Numpy Functions & Slicing", description: "Boolean masking, custom indexing filters, and mathematical vector functions.", skills: ["Mask filtering", "Mathematical vectors", "Conditional Indexing"], fileSize: "40 KB" },
            { name: "Pandas Basics and Series", description: "Index alignment, dictionary parsing, Series creation, and element indexing.", skills: ["Series structures", "Key indexing", "Element mapping"], fileSize: "42 KB" },
            { name: "Pandas Dataframes", description: "Subsetting, index resetting, group aggregates, multi-indices, and column updates.", skills: ["DataFrame slicing", "Groupby operations", "Multi-Index mapping"], fileSize: "570 KB" },
            { name: "Important Functions & CSVs", description: "Parsing heterogeneous data, missing values cleaning, and pandas export functions.", skills: ["CSV parsing", "NaN imputation", "Export pipelines"], fileSize: "458 KB" }
        ]
    },
    {
        title: "Phase 2: Classical ML",
        tag: "Predictive Classifiers & Regressors",
        description: "Diagnostic KNN models, California house price estimation, and marketplace delivery regression trees.",
        color: "from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400",
        icon: <FileCode className="w-5 h-5" />,
        notebooks: [
            { name: "Breast Cancer Diagnostic Classifier", description: "K-Nearest Neighbors distance metric tuning, classification boundaries, and ROC curves.", skills: ["KNN distance weights", "Precision-Recall plots", "Binary diagnostic score"], fileSize: "79 KB" },
            { name: "California Housing Estimator", description: "Predicting district housing values using multi-model regressors (KNN, SVM, Decision Trees).", skills: ["KNN housing regression", "RBF kernel SVR", "Decision splits"], fileSize: "47 KB" },
            { name: "Marketplace Food Delivery Capstone", description: "Tuning Ridge, Lasso, SVR, and Random Forest regression on 10,000+ transaction rows.", skills: ["Ridge/Lasso L1-L2 regularizations", "Outliers clean", "RMSE tuning"], fileSize: "1.3 MB" }
        ]
    },
    {
        title: "Phase 3: Statistical Analysis",
        tag: "Scientific Math & Distributions",
        description: "Binomial models, normal distribution bounds, hypothesis T-tests, ANOVA tests, and Chi-Square association rules.",
        color: "from-pink-500/20 to-pink-600/5 border-pink-500/30 text-pink-400",
        icon: <Award className="w-5 h-5" />,
        notebooks: [
            { name: "Binomial Distribution Modeling", description: "Factorials calculations and binomial probability density mapping for event success rates.", skills: ["PDF equations", "Combinatorics math", "Factorial ratios"], fileSize: "23 KB" },
            { name: "Normal Curve Distributions", description: "Standard normal scaling, Z-score probability intervals, and bell curve density sweeps.", skills: ["Z-score integration", "Confidence spans", "Bell curve sizing"], fileSize: "17 KB" },
            { name: "Hypothesis Testing (T-Test)", description: "Comparing class sample means, standard errors, and p-value rejection thresholds.", skills: ["Sample mean comparisons", "Alpha thresholds", "P-Value verification"], fileSize: "22 KB" },
            { name: "Chi-Square Test of Independence", description: "Contingency matrices, expected vs observed counts, and Pearson variance equations.", skills: ["Contingency matrices", "Pearson chi2 math", "Observed offsets"], fileSize: "37 KB" },
            { name: "ANOVA Variance Assessment", description: "F-statistic calculations, sum-of-squares intervals, and multiple group variance audits.", skills: ["F-Ratio math", "SS-Between/Within", "Multi-Group variances"], fileSize: "38 KB" }
        ]
    },
    {
        title: "Phase 4: Deep Learning",
        tag: "Sequential 1D CNNs",
        description: "1D Convolutional Neural Network telemetry classifier training and validation curves replayed in DL Studio.",
        color: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/30 text-indigo-400",
        icon: <Cpu className="w-5 h-5" />,
        notebooks: [
            { name: "1D CNN Telemetry Classifier", description: "1D Convolutional Neural Network training and validation curves on temporal data sequences.", skills: ["1D Conv layers", "MaxPooling", "Sigmoid squashing", "Loss curves"], fileSize: "115 KB" }
        ]
    },
    {
        title: "Phase 5: Advanced Analytics",
        tag: "Apriori Mining & Agentic AI",
        description: "Apriori forestry association rule mining, and CrewAI multi-agent game dev orchestration.",
        color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
        icon: <Cpu className="w-5 h-5" />,
        notebooks: [
            { name: "Apriori Association Rule Miner", description: "Mining frequent transactions itemsets to discover environmental deforestation dependencies.", skills: ["Apriori algorithm", "Support & Confidence", "Lift matrices"], fileSize: "112 KB" },
            { name: "CrewAI Multi-Agent Game Dev Studio", description: "Orchestrating Creative Game Designer, Senior Developer, and QA Reviewer to generate Pygame modules.", skills: ["Multi-Agent systems", "CrewAI orchestration", "Autogenous Python scripting"], fileSize: "529 KB" }
        ]
    }
];

export const LearningTimeline = () => {
    const [expandedMilestone, setExpandedMilestone] = useState<number | null>(4); // Open Phase 5 by default

    const toggleMilestone = (idx: number) => {
        setExpandedMilestone(expandedMilestone === idx ? null : idx);
    };

    return (
        <div className="space-y-4 max-w-4xl mx-auto select-none">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Jupyter Notebooks Timeline Tree (18 Projects)
                    </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-background font-mono text-[9px] text-muted-foreground">
                    total curriculum: 5 phases
                </span>
            </div>

            {MILESTONES.map((milestone, idx) => {
                const isOpen = expandedMilestone === idx;
                
                return (
                    <div
                        key={idx}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-muted backdrop-blur-md ${
                            isOpen ? "border-amber-500/20" : "border-border"
                        }`}
                    >
                        {/* Accordion Header */}
                        <div
                            onClick={() => toggleMilestone(idx)}
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/1 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded-xl bg-linear-to-br ${milestone.color} border`}>
                                    {milestone.icon}
                                </div>
                                <div className="text-left space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-xs sm:text-sm font-extrabold text-foreground tracking-wide">
                                            {milestone.title}
                                        </h4>
                                        <span className="px-2 py-0.5 bg-secondary border border-border rounded-md text-[9px] font-mono text-muted-foreground">
                                            {milestone.tag}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="text-muted-foreground">
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                        </div>

                        {/* Accordion Content */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="border-t border-border bg-card/10"
                                >
                                    <div className="p-5 space-y-4">
                                        {milestone.notebooks.map((nb, nIdx) => (
                                            <div
                                                key={nIdx}
                                                className="p-4 rounded-xl bg-background/40 border border-border hover:border-zinc-800 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                            >
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                        <h5 className="text-xs font-bold text-foreground tracking-wide">
                                                            {nb.name}.ipynb
                                                        </h5>
                                                        <span className="text-[9px] text-muted-foreground font-mono">({nb.fileSize})</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed font-medium max-w-xl">
                                                        {nb.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {nb.skills.map((skill, sIdx) => (
                                                            <span
                                                                key={sIdx}
                                                                className="px-2 py-0.5 rounded-sm bg-secondary text-[9px] font-mono text-muted-foreground"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center shrink-0">
                                                    <span className="px-3 py-1 bg-secondary border border-border hover:bg-secondary rounded-xl text-[10px] font-bold text-muted-foreground uppercase tracking-wide cursor-pointer transition-colors">
                                                        Source Code
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};
