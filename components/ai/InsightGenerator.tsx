"use client";

import React from "react";
import { Sparkles, CheckCircle } from "lucide-react";

interface InsightGeneratorProps {
    minSupport: number;
    minConfidence: number;
}

export const InsightGenerator: React.FC<InsightGeneratorProps> = ({ minSupport, minConfidence }) => {
    // Generate insights dynamically based on filter values
    const insights = [
        {
            text: "Wood Logging acts as a primary antecedent, triggering Deforestation in 88% of monitored transactions (Lift: 2.15x).",
            valid: minSupport <= 0.38 && minConfidence <= 0.88
        },
        {
            text: "Agricultural Expansion triggers Deforestation events with 74% confidence (Support: 29%).",
            valid: minSupport <= 0.29 && minConfidence <= 0.74
        },
        {
            text: "Deforestation correlates strongly with CO2 Emission Rise (Confidence: 92%, Lift: 3.10x).",
            valid: minSupport <= 0.45 && minConfidence <= 0.92
        },
        {
            text: "Soil Erosion shows high association downstream of Deforestation incidents (Lift: 2.65x, Confidence: 85%).",
            valid: minSupport <= 0.31 && minConfidence <= 0.85
        }
    ];

    const activeInsights = insights.filter((i) => i.valid);

    return (
        <div className="space-y-3 select-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Mining Insights</span>
            </div>
            
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
                {activeInsights.length > 0 ? (
                    activeInsights.map((insight, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white/2 border border-white/5 flex gap-2.5 items-start">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                                {insight.text}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-[11px] text-zinc-500 italic text-center py-4">
                        Filters are too restrictive. Relax support or confidence to generate associations.
                    </p>
                )}
            </div>
        </div>
    );
};
