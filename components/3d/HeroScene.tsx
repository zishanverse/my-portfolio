"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dynamic import for Spline
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => null, // Or a placeholder spinner
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const splineRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const checkWidth = () => {
            setIsDesktop(window.innerWidth >= 800);
        };

        const debouncedCheckWidth = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkWidth, 150); // Debounce resize by 150ms
        };

        checkWidth();
        window.addEventListener('resize', debouncedCheckWidth);
        return () => {
            window.removeEventListener('resize', debouncedCheckWidth);
            clearTimeout(timeoutId);
        };
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !splineRef.current || !isDesktop) return;

        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION
        mm.add("(min-width: 800px)", () => {
            // Initial State (Hero Section - Right Side)
            gsap.set(splineRef.current, {
                x: "20vw",
                yPercent: 0,
                scale: 0.85,
                opacity: 1
            });

            // Continuous Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });

            // 1. Hero -> About (Move Left)
            tl.to(splineRef.current, {
                x: "-25vw",
                yPercent: 20,
                scale: 0.85,
                duration: 0.2,
                rotate: 360,
                ease: "power2.inOut"
            });

            // 2. About -> Skills (Move Right)
            tl.to(splineRef.current, {
                x: "45vw",
                yPercent: 10,
                scale: 0.65,
                duration: 0.2,
                ease: "power2.inOut"
            });

            // 3. Skills -> AiSystems (Move Left)
            tl.to(splineRef.current, {
                x: "-25vw",
                yPercent: 0,
                scale: 0.65,
                duration: 0.2,
                ease: "power2.inOut"
            });

            // 3.5 Hold at AiSystems
            tl.to(splineRef.current, {
                x: "-25vw",
                yPercent: 0,
                scale: 0.65,
                duration: 0.2,
                ease: "none"
            });

            // 4. AiSystems -> Experience (Move Right)
            tl.to(splineRef.current, {
                x: "35vw",
                yPercent: 0,
                scale: 0.65,
                duration: 0.2,
                ease: "power2.inOut"
            });

            // 5. Experience -> Achievements (Center)
            tl.to(splineRef.current, {
                x: "0vw",
                yPercent: 10,
                scale: 0.7,
                duration: 0.2,
                rotate: -360,
                ease: "power2.inOut"
            });

            // 6. Fade out at end
            tl.to(splineRef.current, {
                opacity: 0,
                duration: 0.1,
                pointerEvents: "none" // Disable interaction
            });
        });

    }, { scope: containerRef, dependencies: [isDesktop] });

    if (!isDesktop) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
            {/* Container with constrained interactive area */}
            <div ref={splineRef} className="w-[1200px] h-[600px] pointer-events-auto relative overflow-hidden">
                {/* 
                  Oversized Inner Container to push watermark out of view.
                  Height increased +200px, Top shifted -80px.
                  This ensures ~120px is cropped from the bottom.
                */}
                <div className="absolute left-0 w-full h-[calc(100%+200px)] -top-[80px]">
                    <Spline
                        scene="https://prod.spline.design/KP4hwDFoEbQT1Utk/scene.splinecode"
                    />
                </div>
            </div>
        </div>
    );
}
