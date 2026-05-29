"use client";

import React from "react";
import { motion } from "framer-motion";

export const BackgroundGrid = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    color: "var(--color-border, #e5e5e5)",
                }}
            />

            {/* Glowing Spotlights */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle floating overlay grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.01] dark:opacity-[0.03]">
                <defs>
                    <pattern id="grid-large" width="120" height="120" patternUnits="userSpaceOnUse">
                        <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-large)" />
            </svg>
        </div>
    );
};
