"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const InkCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorRef.current) return;

        // Configuration
        const amount = 20;
        const sineDots = Math.floor(amount * 0.3);
        const width = 26;
        const idleTimeout = 150;

        // Dot Class
        class Dot {
            index: number;
            anglespeed: number;
            x: number;
            y: number;
            scale: number;
            range: number;
            limit: number;
            element: HTMLSpanElement;
            lockX: number = 0;
            lockY: number = 0;
            angleX: number = 0;
            angleY: number = 0;

            constructor(index = 0) {
                this.index = index;
                this.anglespeed = 0.05;
                this.x = 0;
                this.y = 0;
                this.scale = 1 - 0.05 * index;
                this.range = width / 2 - (width / 2) * this.scale + 2;
                this.limit = width * 0.75 * this.scale;

                this.element = document.createElement("span");
                this.element.style.position = "absolute";
                this.element.style.display = "block";
                this.element.style.width = `${width}px`;
                this.element.style.height = `${width}px`;
                this.element.style.borderRadius = "20px";
                this.element.style.backgroundColor = "white"; // Or theme color
                this.element.style.transformOrigin = "center center";
                this.element.style.pointerEvents = "none";

                gsap.set(this.element, { scale: this.scale });
                cursorRef.current?.appendChild(this.element);
            }

            lock() {
                this.lockX = this.x;
                this.lockY = this.y;
                this.angleX = Math.PI * 2 * Math.random();
                this.angleY = Math.PI * 2 * Math.random();
            }

            draw() {
                if (!idle || this.index <= sineDots) {
                    gsap.set(this.element, { x: this.x, y: this.y });
                } else {
                    this.angleX += this.anglespeed;
                    this.angleY += this.anglespeed;
                    this.y = this.lockY + Math.sin(this.angleY) * this.range;
                    this.x = this.lockX + Math.sin(this.angleX) * this.range;
                    gsap.set(this.element, { x: this.x, y: this.y });
                }
            }
        }

        // State
        let lastFrame = 0;
        let mousePosition = { x: 0, y: 0 };
        let dots: Dot[] = [];
        let timeoutID: any;
        let idle = false;

        // Initialization
        const buildDots = () => {
            for (let i = 0; i < amount; i++) {
                let dot = new Dot(i);
                dots.push(dot);
            }
        };

        const startIdleTimer = () => {
            timeoutID = setTimeout(goInactive, idleTimeout);
            idle = false;
        };

        const resetIdleTimer = () => {
            clearTimeout(timeoutID);
            startIdleTimer();
        };

        const goInactive = () => {
            idle = true;
            for (let dot of dots) {
                dot.lock();
            }
        };

        const onMouseMove = (event: MouseEvent) => {
            mousePosition.x = event.clientX - width / 2;
            mousePosition.y = event.clientY - width / 2;
            resetIdleTimer();
        };

        const onTouchMove = (event: TouchEvent) => {
            mousePosition.x = event.touches[0].clientX - width / 2;
            mousePosition.y = event.touches[0].clientY - width / 2;
            resetIdleTimer();
        };

        const positionCursor = (delta: number) => {
            let x = mousePosition.x;
            let y = mousePosition.y;
            dots.forEach((dot, index, dots) => {
                let nextDot = dots[index + 1] || dots[0];
                dot.x = x;
                dot.y = y;
                dot.draw();
                if (!idle || index <= sineDots) {
                    const dx = (nextDot.x - dot.x) * 0.35;
                    const dy = (nextDot.y - dot.y) * 0.35;
                    x += dx;
                    y += dy;
                }
            });
        };

        const render = (timestamp: number) => {
            const delta = timestamp - lastFrame;
            positionCursor(delta);
            lastFrame = timestamp;
            requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        buildDots();
        requestAnimationFrame(render);

        // Initial Hide/Show logic could be added here if needed

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            clearTimeout(timeoutID);
            // Cleanup dots
            if (cursorRef.current) {
                cursorRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <>
            {/* SVG Filter for Goo effect */}
            <svg style={{ display: "none" }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Cursor Container */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ filter: "url('#goo')" }}
            />

            {/* Global Styles to hide original cursor */}
            <style jsx global>{`
            body, html, a, button, input {
                cursor: none !important;
            }
        `}</style>
        </>
    );
};
