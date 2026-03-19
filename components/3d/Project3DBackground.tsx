"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ color, position, speed, distort, radius }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time * speed) * 0.2;
        meshRef.current.rotation.y = Math.cos(time * speed) * 0.2;
    });

    return (
        <Float speed={speed * 2} rotationIntensity={2} floatIntensity={2}>
            <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Sphere>
        </Float>
    );
};

const Project3DBackground = ({ colorPrimary = "#6366f1", colorSecondary = "#a855f7" }) => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color={colorPrimary} />
                
                <FloatingShape 
                    color={colorPrimary} 
                    position={[-2, 1, 0]} 
                    speed={1.5} 
                    distort={0.4} 
                    radius={0.8}
                />
                <FloatingShape 
                    color={colorSecondary} 
                    position={[2, -1.5, -1]} 
                    speed={1} 
                    distort={0.3} 
                    radius={1.2}
                />
                <FloatingShape 
                    color="#ffffff" 
                    position={[0, 2, -2]} 
                    speed={2} 
                    distort={0.5} 
                    radius={0.4}
                />
            </Canvas>
        </div>
    );
};

export default Project3DBackground;
