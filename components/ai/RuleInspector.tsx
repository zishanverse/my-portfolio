"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, AlertTriangle } from "lucide-react";

interface Edge {
    source: string;
    target: string;
    support: number;
    confidence: number;
    lift: number;
}

interface RuleInspectorProps {
    edge: Edge | null;
    nodeLabel: string | null;
    getNodeLabel: (id: string) => string;
}

export const RuleInspector: React.FC<RuleInspectorProps> = ({ edge, nodeLabel, getNodeLabel }) => {
    return (
        <div className="space-y-4 font-mono text-[11px] text-zinc-300 select-none">
            <h5 className="text-xs uppercase tracking-wider text-zinc-400 font-extrabold pb-2 border-b border-white/5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                Rule Inspector
            </h5>

            {edge ? (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-2.5">
                        <div className="text-[10px] text-zinc-500 uppercase font-bold">Selected Rule Pathway</div>
                        <div className="flex items-center gap-1.5 text-xs text-foreground font-bold flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">{getNodeLabel(edge.source)}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">{getNodeLabel(edge.target)}</span>
                        </div>
                        
                        <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                            <span className="text-zinc-500">SUPPORT (FREQUENCY):</span>
                            <span className="text-foreground font-bold">{(edge.support * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">CONFIDENCE (STRENGTH):</span>
                            <span className="text-foreground font-bold">{(edge.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">LIFT (CORRELATION RATIO):</span>
                            <span className="text-emerald-400 font-extrabold">{edge.lift.toFixed(2)}x</span>
                        </div>
                    </div>
                </motion.div>
            ) : nodeLabel ? (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1.5"
                >
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Focused Metric Node</div>
                    <p className="text-xs font-bold text-foreground">{nodeLabel}</p>
                    <p className="text-zinc-400 leading-relaxed text-[10px] pt-1">
                        Hover over connected lines to inspect specific antecedent-to-consequent association values.
                    </p>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-black/20 border border-dashed border-white/5 rounded-xl text-center gap-2 text-zinc-500 min-h-[120px]">
                    <AlertTriangle className="w-5 h-5 text-zinc-600" />
                    <p className="text-[10px] leading-relaxed max-w-[200px]">
                        Hover over any item node or connector path in the graph network to focus inspector statistics.
                    </p>
                </div>
            )}
        </div>
    );
};
