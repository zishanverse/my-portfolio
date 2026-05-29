"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PredictionCardProps {
    probability: number | null;
    isCalculating: boolean;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ probability, isCalculating }) => {
    if (probability === null) return null;

    const isHighRisk = probability > 0.5;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 w-full max-w-sm mx-auto select-none"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Inference Result Mapped
            </div>

            <div className="space-y-1.5">
                <h5 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    Pollution Risk Probability
                </h5>
                <span className={`text-5xl font-black tracking-tight ${isHighRisk ? "text-red-400" : "text-indigo-400"}`}>
                    {(probability * 100).toFixed(1)}%
                </span>
            </div>

            <div className="space-y-2">
                <div className="w-full bg-white/5 border border-white/10 rounded-full h-3 overflow-hidden p-0.5">
                    <motion.div 
                        className={`h-full rounded-full ${isHighRisk ? "bg-red-500" : "bg-indigo-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${probability * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
                <p className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold">
                    Status: {isHighRisk ? "High Pollution Threat Level" : "Eco-Stable Threat Level"}
                </p>
            </div>
        </motion.div>
    );
};
