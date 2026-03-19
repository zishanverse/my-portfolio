"use client";

import React, { useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Loader2, Volume2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface AiConversationalAgentProps {
    onStatusChange?: (isActive: boolean) => void;
}

const AiConversationalAgent = ({ onStatusChange }: AiConversationalAgentProps) => {
    const conversation = useConversation({
        onConnect: () => {
            console.log("Connected to ElevenLabs");
            onStatusChange?.(true);
        },
        onDisconnect: () => {
            console.log("Disconnected from ElevenLabs");
            onStatusChange?.(false);
        },
        onError: (error) => console.error("ElevenLabs Error:", error),
    });

    const isConnected = conversation.status === "connected";
    const isConnecting = conversation.status === "connecting";

    const toggleConversation = useCallback(async () => {
        if (isConnected) {
            await conversation.endSession();
        } else {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                await conversation.startSession({
                    agentId: "agent_6701k6t2xyyzf4wbmep6xpkv93ae",
                });
            } catch (err) {
                console.error("Failed to start conversation:", err);
                alert("Microphone access is required for the AI Assistant.");
            }
        }
    }, [conversation, isConnected]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto p-8 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                isConnected && "opacity-100 from-purple-500/20"
            )} />

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className={cn(
                    "p-6 rounded-full bg-zinc-900 border border-white/5 relative",
                    isConnected && "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]",
                    conversation.isSpeaking && "animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                )}>
                    {isConnecting ? (
                        <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
                    ) : isConnected ? (
                        <Volume2 className={cn("w-12 h-12 text-indigo-400", conversation.isSpeaking && "text-purple-400")} />
                    ) : (
                        <Mic className="w-12 h-12 text-zinc-500" />
                    )}
                    
                    {isConnected && (
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                        {isConnected ? "Support Agent" : "AI Appointment Assistant"}
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">
                        {isConnected 
                            ? (conversation.isSpeaking ? "Agent is speaking..." : "Listening for your request...")
                            : "Click start to talk with my automated appointment assistant."
                        }
                    </p>
                </div>
            </div>

            <Button
                onClick={toggleConversation}
                disabled={isConnecting}
                className={cn(
                    "relative z-10 w-full py-7 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl",
                    isConnected 
                        ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 hover:border-rose-500/40" 
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                )}
            >
                {isConnecting ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connecting...
                    </span>
                ) : isConnected ? (
                    <span className="flex items-center gap-2">
                        <MicOff className="w-5 h-5" />
                        End Conversation
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <Mic className="w-5 h-5" />
                        Start Voice Discovery
                    </span>
                )}
            </Button>

            {/* Status Footer */}
            <div className="relative z-10 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-2">
                <span className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full bg-zinc-700", isConnected && "bg-green-500")} />
                    {conversation.status}
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    Low Latency Mode
                </span>
            </div>
        </div>
    );
};

export default AiConversationalAgent;
