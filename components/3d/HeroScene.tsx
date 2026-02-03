"use client";

import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const splineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !splineRef.current) return;

        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION
        mm.add("(min-width: 800px)", () => {
            // Initial State (Hero Section - Right Side)
            gsap.set(splineRef.current, {
                x: "25vw",
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
                ease: "power2.inOut"
            });

            // 2. About -> Skills (Move Right)
            tl.to(splineRef.current, {
                x: "35vw",
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
                duration: 0.1,
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
                ease: "power2.inOut"
            });

            // 6. Fade out at end
            tl.to(splineRef.current, {
                opacity: 0,
                duration: 0.1
            });
        });

        // MOBILE ANIMATION
        mm.add("(max-width: 799px)", () => {
            // Initial State (Centered, Smaller)
            gsap.set(splineRef.current, {
                x: "0vw",
                yPercent: 0,
                scale: 0.5,
                opacity: 1
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });

            // Simple subtle move/fade for mobile
            // 1. Fade out/in or slight movement to keep it dynamic but unobtrusive

            // Move slightly down and fade out during content heavy sections
            tl.to(splineRef.current, {
                yPercent: 10,
                scale: 0.45,
                duration: 0.2
            });

            // Keep it relatively static but present
            tl.to(splineRef.current, {
                yPercent: 20,
                scale: 0.45,
                duration: 0.8
            });

            // Fade out at end
            tl.to(splineRef.current, {
                opacity: 0,
                duration: 0.1
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
            {/* Container with constrained interactive area */}
            <div ref={splineRef} className="w-[800px] h-[800px] pointer-events-auto relative overflow-hidden">
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
