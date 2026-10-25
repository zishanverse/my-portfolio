"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader2 } from 'lucide-react';
import { usePreloader } from '@/components/providers/PreloaderProvider';

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
    const { isSplineLoaded, setSplineLoaded } = usePreloader();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            setIsDesktop(window.innerWidth >= 1024); // Desktop only for performance
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        // Suppress non-fatal Spline runtime internal timeline warnings/errors in development
        const handleSplineError = (event: ErrorEvent) => {
            const message = event.message || "";
            if (message.includes("Missing property") || event.filename?.includes("runtime.js")) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        const handleRejection = (event: PromiseRejectionEvent) => {
            const message = event.reason?.message || String(event.reason || "");
            if (message.includes("Missing property")) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        window.addEventListener("error", handleSplineError, true);
        window.addEventListener("unhandledrejection", handleRejection, true);

        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
            const firstArg = args[0];
            const msg = typeof firstArg === "string" ? firstArg : firstArg?.message || "";
            if (typeof msg === "string" && msg.includes("Missing property")) {
                return;
            }
            originalConsoleError.apply(console, args);
        };

        return () => {
            window.removeEventListener("error", handleSplineError, true);
            window.removeEventListener("unhandledrejection", handleRejection, true);
            console.error = originalConsoleError;
        };
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !splineRef.current || !isDesktop) return;

        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Set initial hero docking
            gsap.set(splineRef.current, {
                x: "22vw",
                yPercent: -2,
                scale: 0.7,
                opacity: 0.95,
                transformOrigin: "center center",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "60% bottom",
                    scrub: 0.8,
                }
            });

            // Hero -> About: smoothly dock in right margin, scale down to prevent any text occlusion
            tl.to(splineRef.current, {
                x: "36vw",
                yPercent: 6,
                scale: 0.5,
                opacity: 0.4,
                duration: 0.25,
                ease: "power2.inOut"
            });

            // About -> Skills: maintain right perimeter dock cleanly
            tl.to(splineRef.current, {
                x: "37vw",
                yPercent: 10,
                scale: 0.46,
                opacity: 0.32,
                duration: 0.25,
                ease: "power2.inOut"
            });

            // Skills -> AI Systems: stay on right margin beside the skills grid
            tl.to(splineRef.current, {
                x: "38vw",
                yPercent: 4,
                scale: 0.42,
                opacity: 0.28,
                duration: 0.25,
                ease: "power2.inOut"
            });

            // Past AI Systems (Projects & Contact): fade out to zero so interactive project cards get full GPU & focus
            tl.to(splineRef.current, {
                x: "40vw",
                yPercent: 8,
                opacity: 0,
                scale: 0.35,
                duration: 0.25,
                ease: "power2.inOut"
            });
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(splineRef.current, {
                x: "20vw",
                yPercent: 0,
                scale: 0.55,
                opacity: 0.4
            });
        });

        return () => mm.revert();
    }, { scope: containerRef, dependencies: [isDesktop] });

    if (!isDesktop) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {/* 
                Calibrated 3D Spline Container:
                1. Keeps interactive 3D model active in Hero and margins.
                2. pointer-events-none prevents blocking text selection or buttons.
                3. will-change and transform-gpu ensure 60fps buttery scrolling.
            */}
            <div 
                ref={splineRef} 
                className={`w-[1000px] h-[600px] pointer-events-none select-none relative overflow-hidden transition-opacity duration-1000 will-change-transform transform-gpu ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="absolute left-0 w-full h-[calc(100%+200px)] -top-[100px]">
                    <Spline
                        scene="https://prod.spline.design/KP4hwDFoEbQT1Utk/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                        onError={(err) => {
                            console.warn("Spline loading warning:", err);
                            setSplineLoaded(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
