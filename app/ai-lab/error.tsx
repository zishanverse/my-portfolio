"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RefreshCw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an analytics service
        console.error("AI Lab Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none">
            {/* Glowing background */}
            <div className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-md w-full relative bg-zinc-900/50 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <AlertOctagon className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight uppercase">
                        Runtime Exception
                    </h2>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                        An error occurred while initializing the AI-Lab dashboard. This might be due to web browser canvas limits or static model loaders.
                    </p>
                </div>

                {/* Simulated Stack Trace Terminal */}
                <div className="w-full bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-left text-red-400/90 whitespace-pre-wrap select-text h-32 overflow-y-auto">
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>DIAGNOSTIC TRACEBACK</span>
                    </div>
                    {error.message || "Error: Unknown exception thrown."}
                    {error.stack && `\n\n${error.stack}`}
                </div>

                <Button
                    onClick={() => reset()}
                    className="w-full py-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold tracking-tight shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all flex items-center justify-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reset Model Runtime
                </Button>
            </div>
        </div>
    );
}
