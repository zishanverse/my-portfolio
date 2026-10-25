"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const lenis = new Lenis({
            duration: prefersReducedMotion ? 0 : 0.55,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !prefersReducedMotion,
            touchMultiplier: 1.0,
            wheelMultiplier: 1.0,
            autoRaf: false,
            prevent: (node) => Boolean(
                (node as HTMLElement)?.closest?.('[data-lenis-prevent], [role="dialog"], [aria-modal="true"]')
            ),
        });

        lenisRef.current = lenis;

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(500, 33);

        // Smooth scroll for in-page anchor links (e.g., #about, #projects)
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (!target) return;
            const href = target.getAttribute("href");
            if (href && href.startsWith("/#") && window.location.pathname === "/") {
                e.preventDefault();
                const hash = href.replace("/", "");
                const element = document.querySelector(hash);
                if (element) {
                    lenis.scrollTo(element as HTMLElement, { offset: -60, duration: 0.9 });
                }
            } else if (href && href.startsWith("#")) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    lenis.scrollTo(element as HTMLElement, { offset: -60, duration: 0.9 });
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
