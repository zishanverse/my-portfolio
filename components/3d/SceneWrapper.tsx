"use client";

import dynamic from "next/dynamic";

// Dynamically import the 3D scene with SSR disabled
// This must be done in a Client Component to avoid "ssr: false" errors in Server Components
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
    ssr: false,
});

export default function SceneWrapper() {
    return <HeroScene />;
}
