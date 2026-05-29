"use client";

import React from "react";

interface FeatureImportanceProps {
    co2: number;
    waste: number;
    plastic: number;
    renewable: number;
    energy: number;
    gdp: number;
}

export const FeatureImportance: React.FC<FeatureImportanceProps> = ({
    co2,
    waste,
    plastic,
    renewable,
    energy,
    gdp
}) => {
    // Dynamically calculate contribution scores based on weights
    const co2Impact = co2 * 8.5;
    const wasteImpact = waste * 15.5;
    const plasticImpact = plastic * 3.2;
    const renewableOffset = renewable * 0.45;
    const energyImpact = energy * 6.2;
    const gdpOffset = (gdp / 1000) * 0.12;

    const items = [
        { label: "CO2 Emissions Driver", value: `+${co2Impact.toFixed(0)}%`, pos: true },
        { label: "Industrial Waste Factor", value: `+${wasteImpact.toFixed(0)}%`, pos: true },
        { label: "Plastic Density Impact", value: `+${plasticImpact.toFixed(0)}%`, pos: true },
        { label: "Power Grid Consumption", value: `+${energyImpact.toFixed(0)}%`, pos: true },
        { label: "Renewable Energy Offset", value: `-${renewableOffset.toFixed(0)}%`, pos: false },
        { label: "GDP Green Surcharge", value: `-${gdpOffset.toFixed(0)}%`, pos: false }
    ];

    return (
        <div className="border-t border-white/5 pt-4 text-left space-y-2.5 w-full select-none">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Feature Impact Analysis
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((imp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 bg-white/2 border border-white/5 rounded-lg">
                        <span className="text-zinc-400 font-medium text-[11px]">{imp.label}</span>
                        <span className={`font-mono font-bold text-[11px] ${imp.pos ? "text-red-400" : "text-emerald-400"}`}>
                            {imp.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
