"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Or moving-ui button if preferred, standard button is fine for small UI
import { cn } from "@/lib/utils";

type Message = {
    role: "user" | "bot";
    content: string;
};

const AiChatDemo = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Hello! I am an AI agent capable of complex reasoning. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const botMsg: Message = {
                role: "bot",
                content: "I've analyzed your request. Based on the current context, I recommend integrating a RAG pipeline to enhance data retrieval accuracy."
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="w-full h-[500px] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Agentic AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online • v2.4.0</p>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-950/50">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex gap-3 max-w-[80%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === "user" ? "bg-zinc-200 dark:bg-zinc-800" : "bg-indigo-500/10"
                        )}>
                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-500" />}
                        </div>
                        <div className={cn(
                            "p-3 rounded-2xl text-sm",
                            msg.role === "user"
                                ? "bg-indigo-600 text-white rounded-tr-sm"
                                : "bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded-tl-sm shadow-sm"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 rounded-tl-sm shadow-sm flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about AI architecture..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
                />
                <Button size="icon" onClick={handleSend} className="rounded-full h-10 w-10 shrink-0">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default AiChatDemo;
