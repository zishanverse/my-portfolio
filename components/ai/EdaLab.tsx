"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Heart, Eye, ArrowRight, BookOpen } from "lucide-react";

interface ScatterPoint {
    age: number;
    chol: number;
    risk: "high" | "low";
    cp: number; // chest pain 0-3
    thalach: number; // max heart rate
}

const SCATTER_DATA: ScatterPoint[] = [
    { age: 63, chol: 233, risk: "high", cp: 3, thalach: 150 },
    { age: 37, chol: 250, risk: "high", cp: 2, thalach: 187 },
    { age: 41, chol: 204, risk: "high", cp: 1, thalach: 172 },
    { age: 56, chol: 236, risk: "high", cp: 1, thalach: 178 },
    { age: 57, chol: 354, risk: "low",  cp: 0, thalach: 163 },
    { age: 57, chol: 192, risk: "high", cp: 0, thalach: 148 },
    { age: 56, chol: 294, risk: "low",  cp: 1, thalach: 153 },
    { age: 44, chol: 263, risk: "high", cp: 1, thalach: 173 },
    { age: 52, chol: 199, risk: "high", cp: 2, thalach: 162 },
    { age: 57, chol: 168, risk: "high", cp: 2, thalach: 174 },
    { age: 54, chol: 239, risk: "high", cp: 0, thalach: 160 },
    { age: 48, chol: 264, risk: "low",  cp: 2, thalach: 150 },
    { age: 49, chol: 256, risk: "high", cp: 1, thalach: 171 },
    { age: 64, chol: 211, risk: "low",  cp: 3, thalach: 144 },
    { age: 58, chol: 283, risk: "high", cp: 3, thalach: 162 },
    { age: 50, chol: 219, risk: "high", cp: 2, thalach: 158 },
    { age: 58, chol: 340, risk: "low",  cp: 2, thalach: 172 },
    { age: 66, chol: 212, risk: "low",  cp: 0, thalach: 132 },
    { age: 43, chol: 303, risk: "high", cp: 0, thalach: 181 },
    { age: 69, chol: 254, risk: "low",  cp: 2, thalach: 146 },
    { age: 59, chol: 239, risk: "low",  cp: 0, thalach: 142 },
    { age: 42, chol: 244, risk: "high", cp: 0, thalach: 178 },
    { age: 61, chol: 203, risk: "low",  cp: 0, thalach: 161 },
    { age: 45, chol: 222, risk: "high", cp: 1, thalach: 186 }
];

const CP_TYPES = [
    { type: 0, label: "Typical Angina", count: 143, risk: 27 },
    { type: 1, label: "Atypical Angina", count: 50, risk: 82 },
    { type: 2, label: "Non-Anginal", count: 87, risk: 79 },
    { type: 3, label: "Asymptomatic", count: 23, risk: 69 }
];

const CORRELATION_MATRIX = {
    features: ["Age", "Cholesterol", "Max HR", "Blood Pressure", "Heart Risk"],
    matrix: [
        [1.00, 0.21, -0.40, 0.28, -0.23], // Age
        [0.21, 1.00, -0.04, 0.12, -0.09], // Cholesterol
        [-0.40, -0.04, 1.00, -0.05, 0.42], // Max HR
        [0.28, 0.12, -0.05, 1.00, -0.14], // BP
        [-0.23, -0.09, 0.42, -0.14, 1.00]  // Heart Risk
    ]
};

export const EdaLab = () => {
    const [edaTab, setEdaTab] = useState<"scatter" | "cp" | "heatmap">("scatter");
    const [hoveredPoint, setHoveredPoint] = useState<ScatterPoint | null>(null);
    const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

    // Helpers to scale scatter plot points inside 500x300 SVG viewbox
    // Age: min=30, max=75 -> map to x=[50, 450]
    // Chol: min=150, max=360 -> map to y=[260, 40]
    const getX = (age: number) => 50 + ((age - 30) / (75 - 30)) * 400;
    const getY = (chol: number) => 260 - ((chol - 150) / (380 - 150)) * 220;

    return (
        <div className="flex flex-col gap-6">
            {/* Header with quick sub-navigation */}
            <div className="flex items-center justify-between border-b border-border pb-4 flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-400" />
                    <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                        Cardiology Exploration Lab (Heart Attack Dataset)
                    </h4>
                </div>
                
                <div className="flex gap-2">
                    {["scatter", "cp", "heatmap"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setEdaTab(tab as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                                edaTab === tab
                                    ? "bg-red-500/10 border border-red-500/30 text-red-300"
                                    : "bg-transparent text-muted-foreground hover:text-muted-foreground"
                            }`}
                        >
                            {tab === "scatter" && "Scatter Plot"}
                            {tab === "cp" && "Chest Pain Risk"}
                            {tab === "heatmap" && "Correlations"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Interactive Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visualizer Frame */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-card border border-border flex items-center justify-center min-h-[350px] relative backdrop-blur-md">
                    <AnimatePresence mode="wait">
                        {edaTab === "scatter" && (
                            <motion.div
                                key="scatter"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="w-full h-full flex flex-col justify-between"
                            >
                                <div className="text-center mb-2">
                                    <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest">
                                        Patient Cholesterol vs Age Index
                                    </p>
                                </div>
                                <svg viewBox="0 0 500 300" className="w-full h-auto overflow-visible select-none">
                                    {/* Grid lines */}
                                    <line x1="50" y1="40" x2="450" y2="40" stroke="rgba(255,255,255,0.03)" />
                                    <line x1="50" y1="150" x2="450" y2="150" stroke="rgba(255,255,255,0.03)" />
                                    <line x1="50" y1="260" x2="450" y2="260" stroke="rgba(255,255,255,0.1)" />
                                    <line x1="50" y1="40" x2="50" y2="260" stroke="rgba(255,255,255,0.1)" />
                                    <line x1="250" y1="40" x2="250" y2="260" stroke="rgba(255,255,255,0.03)" />
                                    <line x1="450" y1="40" x2="450" y2="260" stroke="rgba(255,255,255,0.03)" />

                                    {/* Labels */}
                                    <text x="40" y="45" fill="#555" fontSize="8" textAnchor="end" fontFamily="monospace">380</text>
                                    <text x="40" y="154" fill="#555" fontSize="8" textAnchor="end" fontFamily="monospace">265</text>
                                    <text x="40" y="264" fill="#555" fontSize="8" textAnchor="end" fontFamily="monospace">150</text>
                                    <text x="25" y="150" fill="#666" fontSize="9" textAnchor="middle" transform="rotate(-90 25 150)" fontFamily="monospace" fontWeight="bold">CHOLESTEROL (mg/dl)</text>

                                    <text x="50" y="278" fill="#555" fontSize="8" textAnchor="middle" fontFamily="monospace">30</text>
                                    <text x="250" y="278" fill="#555" fontSize="8" textAnchor="middle" fontFamily="monospace">52</text>
                                    <text x="450" y="278" fill="#555" fontSize="8" textAnchor="middle" fontFamily="monospace">75</text>
                                    <text x="250" y="294" fill="#666" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">AGE (Years)</text>

                                    {/* Plot Points */}
                                    {SCATTER_DATA.map((pt, i) => (
                                        <circle
                                            key={i}
                                            cx={getX(pt.age)}
                                            cy={getY(pt.chol)}
                                            r={hoveredPoint === pt ? 7 : 4.5}
                                            className={`transition-all duration-150 cursor-pointer ${
                                                pt.risk === "high" 
                                                    ? "fill-red-500 hover:fill-red-400 stroke-red-500/20 stroke-[4]" 
                                                    : "fill-blue-500 hover:fill-blue-400 stroke-blue-500/20 stroke-[4]"
                                            }`}
                                            onMouseEnter={() => setHoveredPoint(pt)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                        />
                                    ))}
                                </svg>
                            </motion.div>
                        )}

                        {edaTab === "cp" && (
                            <motion.div
                                key="cp"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="w-full h-full flex flex-col justify-between"
                            >
                                <div className="text-center mb-2">
                                    <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest">
                                        Chest Pain Type vs Heart Attack Risk Ratio
                                    </p>
                                </div>
                                <div className="space-y-4 py-4 w-full max-w-lg mx-auto">
                                    {CP_TYPES.map((cp, idx) => (
                                        <div key={idx} className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-semibold text-muted-foreground">{cp.label}</span>
                                                <span className="font-mono text-red-400 font-extrabold">{cp.risk}% Risk Probability</span>
                                            </div>
                                            <div className="w-full bg-muted h-4 rounded-lg overflow-hidden border border-border flex items-center relative">
                                                <motion.div
                                                    className="h-full bg-linear-to-r from-red-500/20 to-red-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${cp.risk}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                />
                                                <span className="absolute right-3 font-mono text-[9px] text-muted-foreground">
                                                    N={cp.count} cases
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {edaTab === "heatmap" && (
                            <motion.div
                                key="heatmap"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="w-full h-full flex flex-col items-center justify-center gap-4"
                            >
                                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-widest text-center">
                                    Clinical Indicators Correlation Matrix
                                </p>
                                <div className="grid grid-cols-5 gap-1.5 w-full max-w-sm aspect-square">
                                    {CORRELATION_MATRIX.matrix.map((row, rIdx) => 
                                        row.map((val, cIdx) => {
                                            // correlation color scaling
                                            // 1.0 = solid red, -0.4 = blueish, 0 = transparent
                                            let bgStyle = "";
                                            let textStyle = "text-foreground";
                                            if (val > 0.8) {
                                                bgStyle = "bg-red-500/80 border-red-400/40";
                                            } else if (val > 0.3) {
                                                bgStyle = "bg-red-500/40 border-red-500/20";
                                            } else if (val > 0) {
                                                bgStyle = "bg-red-500/10 border-red-500/5";
                                            } else if (val < -0.3) {
                                                bgStyle = "bg-blue-500/40 border-blue-500/20";
                                            } else {
                                                bgStyle = "bg-blue-500/10 border-blue-500/5";
                                            }

                                            return (
                                                <div
                                                    key={`${rIdx}-${cIdx}`}
                                                    className={`w-full aspect-square rounded-lg border flex flex-col items-center justify-center cursor-crosshair transition-all duration-150 relative group ${bgStyle} ${
                                                        hoveredCell?.r === rIdx && hoveredCell?.c === cIdx ? "scale-105 ring-1 ring-red-400" : ""
                                                    }`}
                                                    onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx })}
                                                    onMouseLeave={() => setHoveredCell(null)}
                                                >
                                                    <span className="font-mono text-[10px] font-bold">
                                                        {val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Information / Inspector Deck */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-card border border-border flex flex-col justify-between backdrop-blur-md min-h-[300px] gap-6">
                    {edaTab === "scatter" && (
                        <div className="space-y-4">
                            <h5 className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold">
                                Patient Inspector
                            </h5>
                            {hoveredPoint ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2.5 font-mono text-[11px] text-muted-foreground"
                                >
                                    <div className="p-3 bg-muted rounded-xl border border-border space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">AGE:</span>
                                            <span className="text-foreground font-bold">{hoveredPoint.age} Years</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">CHOLESTEROL:</span>
                                            <span className="text-foreground font-bold">{hoveredPoint.chol} mg/dl</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">MAX HEART RATE:</span>
                                            <span className="text-foreground font-bold">{hoveredPoint.thalach} bpm</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">CHEST PAIN:</span>
                                            <span className="text-foreground font-bold">Type {hoveredPoint.cp}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-border pt-2 mt-2">
                                            <span className="text-muted-foreground">RISK CLASS:</span>
                                            <span className={`font-bold uppercase ${
                                                hoveredPoint.risk === "high" ? "text-red-400" : "text-blue-400"
                                            }`}>
                                                {hoveredPoint.risk} Risk
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    Hover over any individual patient circle in the scatter plot to inspect telemetry features. Red represents high clinical heart attack risk, Blue represents low risk.
                                </p>
                            )}
                        </div>
                    )}

                    {edaTab === "cp" && (
                        <div className="space-y-4">
                            <h5 className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold">
                                Clinical Distribution
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                The dataset demonstrates a clear correlation: patients displaying Type 1 (Atypical Angina) or Type 2 (Non-anginal) chest pain experience significantly higher risk coefficients (exceeding 75%) compared to Type 0 (Typical Angina) which only features a 27% clinical risk rate.
                            </p>
                        </div>
                    )}

                    {edaTab === "heatmap" && (
                        <div className="space-y-4">
                            <h5 className="text-xs uppercase tracking-wider text-muted-foreground font-extrabold">
                                Feature Correlation Inspector
                            </h5>
                            {hoveredCell ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-muted rounded-xl border border-border text-[11px] font-mono text-muted-foreground space-y-1.5"
                                >
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Indicator Relationship</p>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground truncate max-w-[100px]">{CORRELATION_MATRIX.features[hoveredCell.r]}</span>
                                        <span className="text-muted-foreground font-extrabold flex items-center"><ArrowRight className="w-3 h-3 mx-1" /></span>
                                        <span className="text-muted-foreground truncate max-w-[100px]">{CORRELATION_MATRIX.features[hoveredCell.c]}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-border pt-1.5 mt-1.5">
                                        <span className="text-muted-foreground">COEFFICIENT (R):</span>
                                        <span className={`font-bold ${
                                            CORRELATION_MATRIX.matrix[hoveredCell.r][hoveredCell.c] > 0 ? "text-red-400" : "text-blue-400"
                                        }`}>
                                            {CORRELATION_MATRIX.matrix[hoveredCell.r][hoveredCell.c].toFixed(4)}
                                        </span>
                                    </div>
                                </motion.div>
                            ) : (
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    Hover over any cell block in the correlation grid. R-values closer to +1.0 represent strong positive correlation, while values closer to -1.0 signify a strong negative correlation (e.g. Max Heart Rate decreases as Age increases: r = -0.40).
                                </p>
                            )}
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex gap-3 items-start">
                        <Heart className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                        <div className="space-y-1">
                            <p className="text-[10px] text-red-300 font-extrabold uppercase tracking-wide">
                                Cardiology EDA Insight
                            </p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                                Heart attack risk demonstrates a positive correlation with Max Heart Rate (+0.42) and chest pain type indices, and negative correlation with patient age (-0.23).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
