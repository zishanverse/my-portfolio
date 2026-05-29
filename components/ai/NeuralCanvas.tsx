"use client";

import React, { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export const NeuralCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: Node[] = [];
        const nodeCount = 60;
        const connectionDistance = 120;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            initNodes();
        };

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Check theme (usually .dark class is on html)
            const isDark = document.documentElement.classList.contains("dark");
            const nodeColor = isDark ? "rgba(129, 140, 248, 0.4)" : "rgba(79, 70, 229, 0.25)";
            const lineColor = isDark ? "rgba(129, 140, 248, 0.05)" : "rgba(79, 70, 229, 0.04)";
            const mouseLineColor = isDark ? "rgba(129, 140, 248, 0.15)" : "rgba(79, 70, 229, 0.1)";

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance);
                        ctx.strokeStyle = lineColor.replace("0.05", (alpha * 0.05).toString()).replace("0.04", (alpha * 0.04).toString());
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse if active
                if (mouseRef.current.active) {
                    const dx = nodeA.x - mouseRef.current.x;
                    const dy = nodeA.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance * 1.5) {
                        const alpha = (1 - dist / (connectionDistance * 1.5)) * 0.4;
                        ctx.strokeStyle = mouseLineColor.replace("0.15", (alpha * 0.15).toString()).replace("0.1", (alpha * 0.1).toString());
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce bounds
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-75 z-0" 
        />
    );
};
