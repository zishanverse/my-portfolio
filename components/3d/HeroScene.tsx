"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2 } from 'lucide-react';

// Dynamic import with custom loader to improve perceived performance
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
    ),
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const splineRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            setIsDesktop(window.innerWidth >= 1024); // Desktop only for performance
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !splineRef.current || !isDesktop) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        // Hero -> About
        tl.to(splineRef.current, {
            x: "-25vw",
            yPercent: 15,
            scale: 0.7,
            duration: 0.2,
            ease: "power2.inOut"
        });

        // About -> Skills
        tl.to(splineRef.current, {
            x: "35vw",
            yPercent: 5,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.inOut"
        });

        // Skills -> AI Systems
        tl.to(splineRef.current, {
            x: "-30vw",
            yPercent: 0,
            scale: 0.6,
            duration: 0.2,
            ease: "power2.inOut"
        });

        // Keep at end
        tl.to(splineRef.current, {
            x: "20vw",
            yPercent: 10,
            opacity: 0.4,
            scale: 0.4,
            duration: 0.2,
            ease: "power2.inOut"
        });

    }, { scope: containerRef, dependencies: [isDesktop] });

    if (!isDesktop) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {/* 
                Optimized Spline Container:
                1. Render at fixed size and scale down visually for 'smaller' footprint as requested.
                2. Lower z-index to stay behind UI correctly.
            */}
            <div 
                ref={splineRef} 
                className={`w-[1000px] h-[600px] pointer-events-auto relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="absolute left-0 w-full h-[calc(100%+200px)] -top-[100px]">
                    <Spline
                        scene="https://prod.spline.design/KP4hwDFoEbQT1Utk/scene.splinecode"
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </div>
        </div>
    );
}
