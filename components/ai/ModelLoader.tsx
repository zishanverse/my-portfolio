"use client";

import React from "react";
import { Cpu, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

interface ModelLoaderProps {
    progress: number;
    stage: string;
    error: string | null;
    onRetry: () => void;
}

export const ModelLoader: React.FC<ModelLoaderProps> = ({ progress, stage, error, onRetry }) => {
    return (
        <div className="w-full p-6 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col items-center justify-center text-center gap-4 min-h-[160px] backdrop-blur-md relative overflow-hidden select-none">
            {error ? (
                <div className="space-y-4">
                    <div className="p-3 bg-red-500/10 rounded-full w-12 h-12 flex items-center justify-center border border-red-500/20 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="space-y-1">
                        <h5 className="text-sm font-extrabold uppercase text-foreground">AI Runtime Error</h5>
                        <p className="text-xs text-muted-foreground max-w-xs">{error}</p>
                    </div>
                    <button
                        onClick={onRetry}
                        className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Initialize</span>
                    </button>
                </div>
            ) : progress < 100 ? (
                <div className="space-y-4 w-full max-w-xs">
                    <div className="p-3 bg-indigo-500/10 rounded-full w-12 h-12 flex items-center justify-center border border-indigo-500/20 mx-auto">
                        <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-xs font-extrabold uppercase text-zinc-400 tracking-wider">
                            Loading AI Runtime ({progress}%)
                        </h5>
                        <p className="text-[10px] text-zinc-500 font-mono tracking-wide">
                            {stage}
                        </p>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="bg-indigo-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="p-3 bg-emerald-500/15 rounded-full w-12 h-12 flex items-center justify-center border border-emerald-500/30 mx-auto">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                        <h5 className="text-sm font-extrabold uppercase text-foreground">Model Loaded & Warm</h5>
                        <p className="text-xs text-muted-foreground">TensorFlow.js execution environment initialized.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
