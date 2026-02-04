"use client";

import { motion } from "framer-motion";

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none hidden dark:block bg-black">
            {/* Blob 1 - Purple/Blue */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70"
            />

            {/* Blob 2 - Pink/Red */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70"
            />

            {/* Blob 3 - Blue/Cyan */}
            <motion.div
                animate={{
                    x: [0, -50, 100, 0],
                    y: [0, 50, -100, 0],
                    scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
                className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60"
            />

            {/* Blob 4 - Accent */}
            <motion.div
                animate={{
                    x: [0, 80, -80, 0],
                    y: [0, 80, -80, 0],
                    scale: [1, 1.2, 1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1,
                }}
                className="absolute bottom-[20%] left-[20%] w-[40vw] h-[40vw] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60"
            />
        </div>
    );
};
