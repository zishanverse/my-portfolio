"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloader } from "@/components/providers/PreloaderProvider";

export function Preloader() {
    const { isSplineLoaded } = usePreloader();
    const [progress, setProgress] = useState(0);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // Simulated loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) {
                    clearInterval(interval);
                    return 99;
                }
                // Slower near the end to wait for spline
                const increment = prev > 80 ? 1 : Math.floor(Math.random() * 5) + 2;
                return Math.min(prev + increment, 99);
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isSplineLoaded) {
            // When Spline finishes, quickly bump to 100% and remove preloader
            setProgress(100);
            const timer = setTimeout(() => {
                setShowPreloader(false);
            }, 500); // Wait a half second at 100% before animating out
            return () => clearTimeout(timer);
        }
    }, [isSplineLoaded]);

    return (
        <AnimatePresence>
            {showPreloader && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        transition: { duration: 1.2, ease: "easeInOut" } 
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white"
                >
                    <div className="flex flex-col items-center justify-center gap-10 md:gap-16 w-full px-6">
                        {/* Logo or Brand Mark */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center gap-3"
                        >
                            <span className="text-7xl md:text-8xl lg:text-9xl font-serif italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-pulse drop-shadow-lg">
                                Zishan
                            </span>
                            <span className="text-xs md:text-sm lg:text-base uppercase tracking-[0.4em] text-zinc-400 font-medium">
                                Creative Developer
                            </span>
                        </motion.div>
                        
                        {/* Progress Counter */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-col items-center gap-6 mt-4 w-full max-w-md md:max-w-xl lg:max-w-2xl"
                        >
                            <div className="text-7xl md:text-9xl lg:text-[10rem] leading-none font-light font-mono tabular-nums tracking-widest text-zinc-100 drop-shadow-md">
                                {progress}<span className="text-zinc-600 text-5xl md:text-7xl lg:text-8xl">%</span>
                            </div>

                            {/* Subtle loading bar */}
                            <div className="w-full h-[3px] md:h-[4px] bg-zinc-800/60 rounded-full overflow-hidden relative shadow-inner">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                    style={{ boxShadow: "0 0 24px 4px rgba(56, 189, 248, 0.5)" }}
                                />
                            </div>
                            
                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="text-[10px] md:text-xs lg:text-sm text-cyan-500/80 uppercase tracking-[0.3em] mt-2 font-medium"
                            >
                                Initializing Experience
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
