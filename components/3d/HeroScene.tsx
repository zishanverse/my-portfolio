"use client";

import Spline from '@splinetool/react-spline';

export default function HeroScene() {
    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Scaled up wrapper to make model look bigger */}
            <div className="w-full h-full scale-125 origin-center">
                <Spline
                    scene="https://prod.spline.design/KP4hwDFoEbQT1Utk/scene.splinecode"
                />
            </div>

            {/* Overlay to hide Spline watermark */}
            <div className="absolute bottom-0 right-0 w-32 h-16 bg-background z-50 select-none pointer-events-none" />
        </div>
    );
}
