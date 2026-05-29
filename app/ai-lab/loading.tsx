import React from "react";
import { Cpu } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 p-4">
            {/* Pulsing glow background */}
            <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative flex items-center justify-center">
                {/* Circular loader rings */}
                <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 animate-ping absolute" />
                <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin absolute" />
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center relative">
                    <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
                </div>
            </div>

            <div className="text-center space-y-1 relative">
                <p className="text-sm font-bold text-foreground tracking-wider uppercase">Loading Workspace</p>
                <p className="text-xs text-muted-foreground font-mono">sys.init: initializing tensor cores...</p>
            </div>
        </div>
    );
}
