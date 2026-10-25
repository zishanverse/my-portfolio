"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "./Particles";

const ThemeAwareParticles = () => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <Particles
            key={isDark ? "dark" : "light"} // Force re-mount on theme change to ensure clean transition
            particleColors={isDark ? ["#ffffff", "#818cf8", "#a5b4fc"] : ["#09090b", "#6366f1", "#4f46e5"]}
            particleCount={36}
            particleSpread={12}
            speed={0.05}
            particleBaseSize={55}
            pixelRatio={1}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30"
        />
    );
};

export default ThemeAwareParticles;
