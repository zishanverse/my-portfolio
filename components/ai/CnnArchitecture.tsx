"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";

interface LayerInfo {
    name: string;
    type: string;
    shape: string;
    params: string;
    activation: string;
    desc: string;
    color: string;
}

export const CnnArchitecture = () => {
    const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

    const layers: LayerInfo[] = [
        {
            name: "Input Layer",
            type: "Tabular Input",
            shape: "[15, 1]",
            params: "0",
            activation: "None",
            desc: "Ingests 15 normalized environmental features (CO2, plastic waste, busy dashers, GDP, etc.) structured as a 1D sequence.",
            color: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
        },
        {
            name: "Conv1D Layer",
            type: "Convolution 1D",
            shape: "[13, 32]",
            params: "128 (Weights: 3x1x32, Biases: 32)",
            activation: "ReLU",
            desc: "Applies 32 sliding filters of kernel size 3 to extract local spatial patterns and parameter correlations.",
            color: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/30 text-indigo-400",
        },
        {
            name: "MaxPooling1D",
            type: "Downsampling",
            shape: "[6, 32]",
            params: "0",
            activation: "None",
            desc: "Reduces spatial dimension by 50% by extracting the maximum value over a stride of 2, preventing overfitting.",
            color: "from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400",
        },
        {
            name: "Flatten Layer",
            type: "Reshaping",
            shape: "[192]",
            params: "0",
            activation: "None",
            desc: "Flattens the 3D tensor ([6, 32]) into a 1D vector of length 192, ready to be ingested by the classifier.",
            color: "from-pink-500/20 to-pink-600/5 border-pink-500/30 text-pink-400",
        },
        {
            name: "Dense Layer",
            type: "Fully Connected",
            shape: "[50]",
            params: "9,650 (Weights: 192x50, Biases: 50)",
            activation: "ReLU",
            desc: "Learns non-linear feature combinations from the flattened representations using 50 hidden neurons.",
            color: "from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400",
        },
        {
            name: "Output Layer",
            type: "Fully Connected",
            shape: "[1]",
            params: "51 (Weights: 50x1, Biases: 1)",
            activation: "Sigmoid",
            desc: "Squashes prediction values between 0 and 1, outputting the binary probability of high pollution risk.",
            color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
        },
    ];

    const totalParams = 9829;

    return (
        <div className="flex flex-col gap-6 select-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h4 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
                        1D CNN Model Architecture Explorer
                    </h4>
                </div>
                <span className="px-2.5 py-1 bg-secondary border border-border rounded-lg text-[10px] sm:text-xs font-mono text-indigo-300">
                    TOTAL PARAMS: {totalParams.toLocaleString()}
                </span>
            </div>

            {/* Architecture Node Flow */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 p-4 rounded-2xl bg-muted border border-border overflow-x-auto no-visible-scrollbar">
                {layers.map((layer, idx) => (
                    <React.Fragment key={idx}>
                        {/* Layer Block */}
                        <motion.div
                            className={`w-full lg:w-40 shrink-0 p-4 rounded-xl bg-linear-to-br ${layer.color} border backdrop-blur-sm cursor-default transition-all duration-300 relative group overflow-hidden ${
                                hoveredLayer === idx ? "shadow-lg scale-105 border-opacity-100" : ""
                            }`}
                            onMouseEnter={() => setHoveredLayer(idx)}
                            onMouseLeave={() => setHoveredLayer(null)}
                            whileHover={{ y: -4 }}
                        >
                            {/* hover shimmer */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            </div>

                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{layer.type}</p>
                            <h5 className="text-sm font-extrabold text-foreground truncate mt-1">{layer.name}</h5>
                            
                            <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                                <span className="text-[10px] text-muted-foreground font-mono">SHAPE:</span>
                                <span className="text-[10px] text-foreground font-mono font-bold">{layer.shape}</span>
                            </div>
                        </motion.div>

                        {/* Arrow separator */}
                        {idx < layers.length - 1 && (
                            <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 rotate-90 lg:rotate-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Dynamic Description Box */}
            <div className="p-5 rounded-2xl bg-card/80 border border-border min-h-[100px] flex items-center">
                {hoveredLayer !== null ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2 w-full"
                    >
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="text-sm font-extrabold text-foreground uppercase tracking-wide">
                                {layers[hoveredLayer].name} ({layers[hoveredLayer].type})
                            </span>
                            <span className="px-2 py-0.5 rounded-sm bg-secondary text-[9px] font-mono text-muted-foreground">
                                ACTIVATION: {layers[hoveredLayer].activation}
                            </span>
                            <span className="px-2 py-0.5 rounded-sm bg-secondary text-[9px] font-mono text-muted-foreground">
                                PARAMETERS: {layers[hoveredLayer].params}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                            {layers[hoveredLayer].desc}
                        </p>
                    </motion.div>
                ) : (
                    <div className="text-center w-full py-4 text-muted-foreground font-medium text-xs sm:text-sm">
                        Hover over any architectural layer block to inspect shapes, parameters, and operations.
                    </div>
                )}
            </div>
        </div>
    );
};
