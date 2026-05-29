"use client";

import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    label?: string;
    title?: string;
    description?: string;
}

export const SectionContainer = ({
    id,
    label,
    title,
    description,
    children,
    className,
    ...props
}: SectionContainerProps) => {
    return (
        <section
            id={id}
            className={cn(
                "py-20 md:py-28 border-b border-white/5 scroll-mt-24",
                className
            )}
            {...props}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {(label || title || description) && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 md:mb-16"
                    >
                        {label && (
                            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                                {label}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                                {description}
                            </p>
                        )}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};
