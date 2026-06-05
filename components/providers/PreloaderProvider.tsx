"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
    isSplineLoaded: boolean;
    setSplineLoaded: (loaded: boolean) => void;
    isMobile: boolean;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isSplineLoaded, setSplineLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // For mobile devices, auto-resolve since Spline isn't loaded
    useEffect(() => {
        if (isMobile) {
            // Give it a tiny simulated delay for the animation to show
            const timer = setTimeout(() => {
                setSplineLoaded(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    return (
        <PreloaderContext.Provider value={{ isSplineLoaded, setSplineLoaded, isMobile }}>
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error("usePreloader must be used within a PreloaderProvider");
    }
    return context;
}
