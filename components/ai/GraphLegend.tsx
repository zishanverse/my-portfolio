"use client";

import React from "react";
import { Info } from "lucide-react";

export const GraphLegend = () => {
    const items = [
        { label: "Target (Deforestation)", color: "bg-red-400" },
        { label: "Driving Factors", color: "bg-yellow-400" },
        { label: "Consequent Impacts", color: "bg-purple-400" },
        { label: "Environmental Ratios", color: "bg-blue-400" }
    ];

    return (
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 select-none">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>Node & Path Mappings</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                        <span className="font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
            
            <div className="text-[9px] text-zinc-500 font-mono leading-relaxed border-t border-white/5 pt-2 mt-2">
                * Note: Node circles size represents the support (frequency) of that indicator, and path brightness represents the lift correlation.
            </div>
        </div>
    );
};
