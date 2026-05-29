"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    statusText?: string;
    statusColor?: "green" | "yellow" | "blue" | "red" | "indigo";
}

export const DashboardShell = ({
    title,
    subtitle,
    action,
    statusText,
    statusColor = "indigo",
    children,
    className,
    ...props
}: DashboardShellProps) => {
    const statusColorClasses = {
        green: "bg-green-400 border-green-500/30 text-green-400 shadow-green-500/20",
        yellow: "bg-yellow-400 border-yellow-500/30 text-yellow-400 shadow-yellow-500/20",
        blue: "bg-blue-400 border-blue-500/30 text-blue-400 shadow-blue-500/20",
        red: "bg-red-400 border-red-500/30 text-red-400 shadow-red-500/20",
        indigo: "bg-indigo-400 border-indigo-500/30 text-indigo-300 shadow-indigo-500/20",
    };

    return (
        <div 
            className={cn(
                "relative bg-white/3 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col gap-6",
                className
            )}
            {...props}
        >
            {/* Spotlight shimmer at the top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Header portion */}
            {(title || subtitle || action || statusText) && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-1">
                        {title && (
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
                        {statusText && (
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border text-[11px] font-bold uppercase tracking-wider",
                                statusColorClasses[statusColor]
                            )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                                    statusColor === "green" ? "bg-green-400" :
                                    statusColor === "yellow" ? "bg-yellow-400" :
                                    statusColor === "blue" ? "bg-blue-400" :
                                    statusColor === "red" ? "bg-red-400" : "bg-indigo-400"
                                )} />
                                {statusText}
                            </div>
                        )}
                        {action}
                    </div>
                </div>
            )}

            {/* Children content area */}
            <div className="flex-1 relative z-10">
                {children}
            </div>
        </div>
    );
};
