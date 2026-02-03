"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CometCard } from "@/components/ui/comet-card";
import { TextHighlight } from "@/components/ui/hero-highlight";
import { Trophy, Star, Medal } from "lucide-react";
import { AchievementModal, AchievementData } from "./AchievementModal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const achievementsData: AchievementData[] = [
    {
        title: "Winner - SIH 2025",
        organization: "Smart India Hackathon",
        date: "2025",
        image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1770049864/WhatsApp_Image_2026-02-02_at_21.56.53_d0bwat.jpg",
        description: "Winner of the Smart India Hackathon 2025, delivering innovative AI solutions for national problems.",
        descriptionLong: "Leading the team to victory at the Smart India Hackathon 2025. Our solution focused on advanced agentic AI workflows and intelligent automation for government systems, outperforming national competitors through robustness and scalability.",
        tags: ["National Winner", "AI Implementation", "Team Lead"],
        link: "https://www.linkedin.com/posts/zishan-khan-_sih2025-smartindiahackathon-sihwinner-ugcPost-7405128952110907392-U6GY/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADoi4asBIDsoYXJqsIz3tNqW21ZREckSgKI",
    },
    {
        title: "Winner - SIH 2024",
        organization: "Smart India Hackathon",
        date: "2024",
        image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1770049865/WhatsApp_Image_2026-02-02_at_21.55.28_hzoete.jpg",
        description: "Winner of the Smart India Hackathon 2024, creating impactful technological solutions.",
        descriptionLong: "Secured the winner title at Smart India Hackathon 2024. Developed a comprehensive solution addressing critical problem statements with a focus on user-centric design and technical excellence.",
        tags: ["National Winner", "Innovation", "Development"],
        link: "https://www.linkedin.com/posts/zishan-khan-_sih2024-winners-ai-ugcPost-7273931055697453056-Gw4l?utm_source=share&utm_medium=member_desktop&rcm=ACoAADoi4asBIDsoYXJqsIz3tNqW21ZREckSgKI",
    },
    {
        title: "Winner - Mega Challenge",
        organization: "Nxtwave",
        date: "2024",
        image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1770049862/WhatsApp_Image_2026-02-02_at_21.59.22_qqysy0.jpg",
        description: "Secured 1st Prize (iPhone 13 mini) in Nxtwave's Mega Coding Challenge among thousands of participants.",
        descriptionLong: "Achieved the top rank in the Nxtwave Mega Challenge. Demonstrating superior problem-solving skills in Full Stack Development and Reverse Engineering. This victory earned the 1st Prize and recognition across the developer community.",
        tags: ["First Prize", "Coding Challenge", "Full Stack"],
        link: "https://www.linkedin.com/posts/zishan-khan-_success-hardwork-hardworkpaysoff-activity-6965678935598673920-GUa_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADoi4asBIDsoYXJqsIz3tNqW21ZREckSgKI",
    },
];

const Achievements = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementData | null>(null);

    useGSAP(() => {
        if (!containerRef.current || !headerRef.current) return;

        // Header Animation
        gsap.fromTo(headerRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 90%",
                }
            }
        );

        // Cards Stagger Animation
        const cards = containerRef.current.querySelectorAll(".achievement-card");
        gsap.fromTo(cards,
            { y: 100, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section className="py-24 relative z-30 overflow-hidden">
            <div ref={containerRef} className="container mx-auto px-6">

                <div ref={headerRef} className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight text-neutral-800 dark:text-white">
                        Awards & Recognition
                    </h2>
                    <p className="text-neutral-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        Honored to have my work and dedication recognized on national platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievementsData.map((achievement, index) => (
                        <div key={index} className="achievement-card">
                            <CometCard className="w-full cursor-pointer" >
                                <button
                                    onClick={() => setSelectedAchievement(achievement)}
                                    className="w-full text-left bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden group h-full flex flex-col shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/0 transition-colors z-10" />
                                        <Image
                                            src={achievement.image}
                                            alt={achievement.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-full z-20">
                                            <Trophy className="w-5 h-5 text-yellow-400" />
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-neutral-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{achievement.title}</h3>
                                        </div>
                                        <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium mb-3">{achievement.organization}</p>
                                        <p className="text-neutral-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                                            {achievement.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {achievement.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md text-neutral-600 dark:text-zinc-300 border border-gray-200 dark:border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            </CometCard>
                        </div>
                    ))}
                </div>
            </div>

            {selectedAchievement && (
                <AchievementModal
                    achievement={selectedAchievement}
                    onClose={() => setSelectedAchievement(null)}
                />
            )}
        </section>
    );
};

export { Achievements };
