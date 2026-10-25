"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
    /** Array of words to cycle through in the animation */
    words?: string[];
    /** Time in milliseconds between word transitions */
    interval?: number;
    /** Additional CSS classes to apply to the container */
    className?: string;
    /** Additional CSS classes to apply to the text */
    textClassName?: string;
    /** Duration of the transition animation in milliseconds (optional for compatibility) */
    animationDuration?: number;
}

export function ContainerTextFlip({
    words = ["Backend Systems", "Voice AI Telephony", "Autonomous Multi-Agent", "Production RAG"],
    interval = 3000,
    className,
    textClassName,
}: ContainerTextFlipProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <div className={cn("relative min-h-[2.5rem] sm:min-h-[3.25rem] md:min-h-[4rem] flex items-center overflow-hidden select-none", className)}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "inline-block font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent will-change-transform",
                        textClassName
                    )}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
