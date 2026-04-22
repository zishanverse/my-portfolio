"use client";

import React, { useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Loader2, Volume2, Sparkles, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface AiConversationalAgentProps {
    onStatusChange?: (isActive: boolean) => void;
}

const AiConversationalAgent = ({ onStatusChange }: AiConversationalAgentProps) => {
    const conversation = useConversation({
        onConnect: () => {
            console.log("AI Agent Connected");
            onStatusChange?.(true);
        },
        onDisconnect: () => {
            console.log("AI Agent Disconnected");
            onStatusChange?.(false);
        },
        onError: (error) => console.error("AI Agent Error:", error),
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
                    connectionType: "webrtc",
                });
            } catch (err) {
                console.error("Failed to start conversation:", err);
                alert("Microphone access is required for the AI Assistant.");
            }
        }
    }, [conversation, isConnected]);

    return (
        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-md mx-auto p-4 sm:p-7 rounded-3xl bg-card/70 dark:bg-zinc-950/50 backdrop-blur-2xl border border-border dark:border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className={cn(
                "absolute inset-0 bg-linear-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                isConnected && "opacity-100 from-violet-500/20"
            )} />

            {/* Agent Identity Row */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-4 w-full">
                <div className={cn(
                    "p-3 sm:p-4 rounded-2xl bg-background/80 dark:bg-zinc-900 border border-border dark:border-white/5 relative shrink-0",
                    isConnected && "bg-violet-500/10 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                    conversation.isSpeaking && "animate-pulse shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                )}>
                    {isConnecting ? (
                        <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-violet-400 animate-spin" />
                    ) : isConnected ? (
                        <Volume2 className={cn("w-7 h-7 sm:w-9 sm:h-9 text-violet-400", conversation.isSpeaking && "text-purple-300")} />
                    ) : (
                        <Bot className="w-7 h-7 sm:w-9 sm:h-9 text-zinc-500" />
                    )}

                    {isConnected && (
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-500"></span>
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-0.5 min-w-0">
                    <h3 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2 leading-tight">
                        {isConnected ? "Zishan's AI Agent" : "AI Appointment Assistant"}
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400 shrink-0" />
                    </h3>
                    <p className="text-muted-foreground text-[11px] sm:text-xs leading-relaxed">
                        {isConnected
                            ? (conversation.isSpeaking ? "Agent is speaking..." : "Listening for your request...")
                            : "Voice-powered · Appointment AI · Male voice"
                        }
                    </p>
                </div>
            </div>

            {/* Speaking Wave Visual */}
            {isConnected && (
                <div className="relative z-10 flex items-center justify-center gap-1 h-8 w-full">
                    {[...Array(14)].map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-1 rounded-full transition-all",
                                conversation.isSpeaking ? "bg-violet-400" : "bg-zinc-700"
                            )}
                            style={{
                                height: conversation.isSpeaking
                                    ? `${8 + (i % 3) * 10 + ((i * 7) % 14)}px`
                                    : "6px",
                            }}
                        />
                    ))}
                </div>
            )}

            <Button
                onClick={toggleConversation}
                disabled={isConnecting}
                className={cn(
                    "relative z-10 w-full py-5 sm:py-6 text-sm sm:text-base font-bold rounded-2xl transition-all duration-300 shadow-xl",
                    isConnected
                        ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40"
                        : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/25"
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
                        Start Voice Conversation
                    </span>
                )}
            </Button>

            {/* Status Footer */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground -mt-1 sm:-mt-2">
                <span className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full bg-zinc-700", isConnected && "bg-green-500")} />
                    {conversation.status}
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    Intelligent Inference
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    Male Voice
                </span>
            </div>
        </div>
    );
};

export default AiConversationalAgent;
