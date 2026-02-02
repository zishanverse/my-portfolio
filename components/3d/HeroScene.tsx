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

        // Initial State (Hero Section - Right Side)
        gsap.set(splineRef.current, {
            xPercent: 25, // Reduced from 30
            yPercent: 0,
            scale: 1, // Normalized scale
            opacity: 1
        });

        // Continuous Timeline for Smooth SCRUBBING (Solves reverse scroll jitter)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Smoother scrub
            }
        });

        // 1. Hero -> About (Move Left)
        tl.to(splineRef.current, {
            xPercent: -25, // Move to Left (Reduced from -35)
            yPercent: 20,
            scale: 1,      // Maintain size
            duration: 0.2, // ~20% of page scroll
            ease: "power2.inOut"
        });

        // 2. About -> Skills (Move Right, avoid overlap)
        tl.to(splineRef.current, {
            xPercent: 35,  // Move further Right to clear Skills grid (Reduced from 45)
            yPercent: 10,
            scale: 0.8,    // Slightly smaller to fit side
            duration: 0.2, // ~Next 20%
            ease: "power2.inOut"
        });

        // 3. Skills -> Experience (Stay Right)
        tl.to(splineRef.current, {
            xPercent: 35, // Reduced from 45
            yPercent: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "none"
        });

        // 4. Fade out at end
        tl.to(splineRef.current, {
            opacity: 0,
            duration: 0.1
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none">
            <div ref={splineRef} className="w-full h-full pointer-events-auto">
                <Spline
                    scene="https://prod.spline.design/KP4hwDFoEbQT1Utk/scene.splinecode"
                />
            </div>
        </div>
    );
}
