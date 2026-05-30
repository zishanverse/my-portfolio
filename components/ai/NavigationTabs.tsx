"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
    name: string;
    id: string;
}

const TABS: TabItem[] = [
    { name: "Overview", id: "hero" },
    { name: "Live Inference", id: "featured-system" },
    { name: "Projects", id: "experiments" },
    { name: "Pipeline", id: "pipeline-flow" },
    { name: "Engineering", id: "engineering-notes" },
];

export const NavigationTabs = () => {
    const [activeTab, setActiveTab] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY + 160;
            for (const tab of [...TABS].reverse()) {
                const el = document.getElementById(tab.id);
                if (el && offset >= el.offsetTop) {
                    setActiveTab(tab.id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
            setActiveTab(id);
        }
    };

    return (
        <div className="sticky top-[72px] z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center overflow-x-auto no-visible-scrollbar gap-0.5 py-0">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollTo(tab.id)}
                        className={cn(
                            "whitespace-nowrap px-4 py-3.5 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 cursor-pointer",
                            activeTab === tab.id
                                ? "border-white text-foreground"
                                : "border-transparent text-muted-foreground hover:text-muted-foreground"
                        )}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
