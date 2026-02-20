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
            particleColors={isDark ? ["#ffffff"] : ["#000000"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="absolute inset-0"
        />
    );
};

export default ThemeAwareParticles;
