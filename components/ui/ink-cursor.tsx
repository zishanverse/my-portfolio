"use client";

import { useEffect, useRef, useState } from "react";

export const InkCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            setIsDesktop(window.innerWidth >= 800 && matchMedia("(pointer:fine)").matches);
        };
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let isHovered = false;
        let isVisible = false;
        let rafId: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isVisible) {
                isVisible = true;
                if (dotRef.current) dotRef.current.style.opacity = "1";
                if (ringRef.current) ringRef.current.style.opacity = "1";
            }

            // Direct hardware transform for instant center dot
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }

            // Check if hovering interactive elements
            const target = e.target as HTMLElement | null;
            isHovered = Boolean(target && target.closest("a, button, [role='button'], input, textarea"));
        };

        const onMouseLeave = () => {
            isVisible = false;
            if (dotRef.current) dotRef.current.style.opacity = "0";
            if (ringRef.current) ringRef.current.style.opacity = "0";
        };

        const render = () => {
            // Smooth lerp for trailing ring
            const ease = 0.18;
            ringX += (mouseX - ringX) * ease;
            ringY += (mouseY - ringY) * ease;

            if (ringRef.current) {
                const scale = isHovered ? 1.6 : 1.0;
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
            }

            rafId = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, [isDesktop]);

    if (!isDesktop) return null;

    return (
        <>
            {/* Center Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-indigo-400 pointer-events-none z-[9999] opacity-0 mix-blend-difference transition-opacity duration-200 will-change-transform"
            />

            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-indigo-400/70 pointer-events-none z-[9998] opacity-0 mix-blend-difference transition-[opacity,transform] duration-150 will-change-transform"
            />

            <style jsx global>{`
                @media (min-width: 800px) and (pointer: fine) {
                    body, a, button, input {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
};
