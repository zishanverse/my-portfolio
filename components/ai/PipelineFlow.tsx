"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Database, 
    Filter, 
    Sliders, 
    Brain, 
    BarChart, 
    Share2, 
    Cpu, 
    ChevronRight 
} from "lucide-react";

interface PipelineNode {
    id: string;
    title: string;
    description: string;
    subtext: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    glowingColor: string;
}

const PIPELINE_NODES: PipelineNode[] = [
    {
        id: "dataset",
        title: "1. Dataset Ingest",
        description: "Fetch environmental indices, housing records, and clinical cardiology vectors.",
        subtext: "Inputs: 10,000+ data rows, CSV arrays",
        icon: <Database className="w-4 h-4" />,
        color: "text-blue-400 bg-blue-500/10",
        borderColor: "border-blue-500/30",
        glowingColor: "rgba(96, 165, 250, 0.2)"
    },
    {
        id: "preprocess",
        title: "2. Preprocessing",
        description: "Null sweeps, missing inputs imputation, nominal features encodings.",
        subtext: "Tools: Pandas DataFrames, OneHotEncoder",
        icon: <Filter className="w-4 h-4" />,
        color: "text-indigo-400 bg-indigo-500/10",
        borderColor: "border-indigo-500/30",
        glowingColor: "rgba(99, 102, 241, 0.2)"
    },
    {
        id: "feature",
        title: "3. Feature Tuning",
        description: "Standardize scale sweeps and median-threshold risk boundaries.",
        subtext: "Scale: MinMaxScaler, column filtering",
        icon: <Sliders className="w-4 h-4" />,
        color: "text-purple-400 bg-purple-500/10",
        borderColor: "border-purple-500/30",
        glowingColor: "rgba(168, 85, 247, 0.2)"
    },
    {
        id: "train",
        title: "4. Model Training",
        description: "Weights matrices dot product cycles on Google Colab or classical training.",
        subtext: "Cycles: Forward-backprop, KNN/SVR",
        icon: <Brain className="w-4 h-4" />,
        color: "text-pink-400 bg-pink-500/10",
        borderColor: "border-pink-500/30",
        glowingColor: "rgba(244, 63, 94, 0.2)"
    },
    {
        id: "evaluation",
        title: "5. Evaluation",
        description: "Auditing validation confusion matrix scores and ROC curves.",
        subtext: "Metrics: Precision, Recall, F1, Loss curves",
        icon: <BarChart className="w-4 h-4" />,
        color: "text-amber-400 bg-amber-500/10",
        borderColor: "border-amber-500/30",
        glowingColor: "rgba(245, 158, 11, 0.2)"
    },
    {
        id: "deployment",
        title: "6. Deployment",
        description: "Bundle compiled static weight binary shards and JSON histories.",
        subtext: "Target: Vercel serverless, public folder",
        icon: <Share2 className="w-4 h-4" />,
        color: "text-teal-400 bg-teal-500/10",
        borderColor: "border-teal-500/30",
        glowingColor: "rgba(20, 184, 166, 0.2)"
    },
    {
        id: "inference",
        title: "7. Client Inference",
        description: "Instant feedforward predictions executing directly in React via TF.js.",
        subtext: "Latency: <2ms client CPU/WebGL execution",
        icon: <Cpu className="w-4 h-4" />,
        color: "text-emerald-400 bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        glowingColor: "rgba(16, 185, 129, 0.2)"
    }
];

export const PipelineFlow = () => {
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-6 select-none">
            {/* Visual scrolling flow map container */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/5 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Share2 className="w-40 h-40 text-blue-400 animate-pulse" />
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-blue-400" />
                        <span className="font-bold uppercase tracking-wider text-zinc-400">
                            7-Stage ML Pipeline Lifecycle
                        </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[9px]">
                        scroll activated flowchart
                    </span>
                </div>

                {/* Nodes Timeline list wrapper */}
                <div className="flex flex-col xl:flex-row items-center justify-between gap-3 relative xl:overflow-x-auto no-visible-scrollbar py-2">
                    {PIPELINE_NODES.map((node, idx) => {
                        const isHovered = hoveredNodeId === node.id;
                        
                        return (
                            <React.Fragment key={node.id}>
                                <motion.div
                                    onMouseEnter={() => setHoveredNodeId(node.id)}
                                    onMouseLeave={() => setHoveredNodeId(null)}
                                    className={`w-full xl:w-44 p-4 rounded-xl border transition-all duration-300 bg-black/40 backdrop-blur-xs cursor-default relative overflow-hidden shrink-0 ${
                                        isHovered 
                                            ? `${node.borderColor} ring-1 ring-white/10 scale-[1.03]` 
                                            : "border-white/5 opacity-80"
                                    }`}
                                    style={{
                                        boxShadow: isHovered ? `0 0 25px ${node.glowingColor}` : "none"
                                    }}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                                >
                                    {/* Shimmer reflection */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-1000" />

                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${node.color} border border-white/5 shrink-0`}>
                                            {node.icon}
                                        </div>
                                        <h5 className="text-[11px] font-extrabold text-foreground tracking-wide truncate max-w-[100px]">
                                            {node.title}
                                        </h5>
                                    </div>

                                    <p className="mt-2 text-[10px] text-zinc-400 leading-relaxed font-medium min-h-[40px]">
                                        {node.description}
                                    </p>

                                    <div className="mt-3 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500 truncate">
                                        {node.subtext}
                                    </div>
                                </motion.div>

                                {idx < PIPELINE_NODES.length - 1 && (
                                    <div className="hidden xl:flex items-center shrink-0 w-6 justify-center relative">
                                        <ChevronRight className="w-4 h-4 text-zinc-700 animate-pulse" />
                                        {/* Animated Neon Packet Line */}
                                        <div className="absolute w-6 h-[1.5px] bg-linear-to-r from-indigo-500 to-purple-500 left-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-30">
                                            <motion.div
                                                className="w-1.5 h-full bg-white blur-[1px]"
                                                animate={{ x: ["-15px", "30px"] }}
                                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Pipeline Stage Status Inspector */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/5 min-h-[90px] flex items-center">
                {hoveredNodeId ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1 w-full"
                    >
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            Pipeline Stage Description
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                            {hoveredNodeId === "dataset" && "Dataset collection handles raw telemetry gathering from CSV files. It reads 15 input columns representing features like CO2 index, waste, and energy consumption."}
                            {hoveredNodeId === "preprocess" && "Preprocessing sweeps rows with null values and encodes chest pain nominal factors. This cleans standard features before scaling routines."}
                            {hoveredNodeId === "feature" && "Feature Engineering scales inputs between 0 and 1 using MinMaxScaler and PCA columns reductions to balance backprop evaluations."}
                            {hoveredNodeId === "train" && "Model training fits 1D CNN layers weights on Google Colab or fits KNN/SVR regressor coefficients on local parameters partitions."}
                            {hoveredNodeId === "evaluation" && "Evaluation audits final diagnostic indicators (accuracy curves, ROC values, and validation confusion matrix scores)."}
                            {hoveredNodeId === "deployment" && "Deployment compiles standard LayersModel configuration JSON files and shard binaries, placing them in public folder directories."}
                            {hoveredNodeId === "inference" && "Local client inference loads TF.js models in the browser, warming up rendering shader kernels to execute predictions in under 2 milliseconds."}
                        </p>
                    </motion.div>
                ) : (
                    <div className="text-center w-full py-2 text-zinc-500 font-medium text-xs sm:text-sm">
                        Hover over any ML pipeline Lifecycle card to focus stage parameters, scaler layers, and deployment configurations.
                    </div>
                )}
            </div>
        </div>
    );
};
