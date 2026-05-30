"use client";

import React from "react";
import { Sliders, Filter } from "lucide-react";

interface AssociationControlsProps {
    minSupport: number;
    setMinSupport: (val: number) => void;
    minConfidence: number;
    setMinConfidence: (val: number) => void;
    minLift: number;
    setMinLift: (val: number) => void;
    activeCount: number;
    totalCount: number;
}

export const AssociationControls: React.FC<AssociationControlsProps> = ({
    minSupport,
    setMinSupport,
    minConfidence,
    setMinConfidence,
    minLift,
    setMinLift,
    activeCount,
    totalCount
}) => {
    return (
        <div className="p-4 rounded-xl bg-muted border border-border space-y-4 text-xs select-none">
            <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-1.5 font-bold uppercase text-muted-foreground">
                    <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Rule Filters</span>
                </div>
                <span className="px-2 py-0.5 rounded-sm bg-secondary text-[9px] font-mono text-muted-foreground font-bold flex items-center gap-1">
                    <Filter className="w-2.5 h-2.5" />
                    {activeCount}/{totalCount} RULES ACTIVE
                </span>
            </div>

            {/* Support Filter */}
            <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                    <span>MIN SUPPORT</span>
                    <span className="font-mono text-indigo-300">{(minSupport * 100).toFixed(0)}%</span>
                </div>
                <input
                    type="range"
                    min="0.10"
                    max="0.50"
                    step="0.05"
                    value={minSupport}
                    onChange={(e) => setMinSupport(parseFloat(e.target.value))}
                    className="w-full h-1 accent-indigo-500 bg-secondary rounded-lg cursor-pointer"
                />
            </div>

            {/* Confidence Filter */}
            <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                    <span>MIN CONFIDENCE</span>
                    <span className="font-mono text-indigo-300">{(minConfidence * 100).toFixed(0)}%</span>
                </div>
                <input
                    type="range"
                    min="0.50"
                    max="0.95"
                    step="0.05"
                    value={minConfidence}
                    onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
                    className="w-full h-1 accent-indigo-500 bg-secondary rounded-lg cursor-pointer"
                />
            </div>

            {/* Lift Filter */}
            <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                    <span>MIN LIFT</span>
                    <span className="font-mono text-indigo-300">{minLift.toFixed(2)}x</span>
                </div>
                <input
                    type="range"
                    min="1.0"
                    max="3.2"
                    step="0.1"
                    value={minLift}
                    onChange={(e) => setMinLift(parseFloat(e.target.value))}
                    className="w-full h-1 accent-indigo-500 bg-secondary rounded-lg cursor-pointer"
                />
            </div>
        </div>
    );
};
