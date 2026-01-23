"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, Coffee, Users } from "lucide-react";
import { useRef } from "react";

const stats = [
    {
        icon: Briefcase,
        value: 5,
        suffix: "+",
        label: "Years Experience",
    },
    {
        icon: Award,
        value: 50,
        suffix: "+",
        label: "Projects Completed",
    },
    {
        icon: Users,
        value: 20,
        suffix: "+",
        label: "Happy Clients",
    },
    {
        icon: Coffee,
        value: 1200,
        suffix: "",
        label: "Cups of Coffee",
    },
];

const Achievements = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate each stat
        stats.forEach((_, index) => {
            const element = document.getElementById(`stat-value-${index}`);
            if (element) {
                gsap.fromTo(element,
                    { innerText: 0 },
                    {
                        innerText: stats[index].value,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 }, // Snap to integer
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%", // Start animation when top of section hits 80% viewport
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: function () {
                            element.innerText = Math.ceil(this.targets()[0].innerText).toString();
                        }
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="achievements" className="py-20 w-full bg-background/50 border-t border-b border-border/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center p-4 hover:bg-white/5 rounded-xl transition-colors">
                                <div className="p-3 bg-indigo-500/10 rounded-full mb-4">
                                    <Icon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div className="flex items-baseline gap-0.5">
                                    <span
                                        id={`stat-value-${index}`}
                                        className="text-4xl md:text-5xl font-bold text-foreground"
                                    >
                                        0
                                    </span>
                                    <span className="text-2xl font-bold text-indigo-500">{stat.suffix}</span>
                                </div>
                                <p className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export { Achievements };
