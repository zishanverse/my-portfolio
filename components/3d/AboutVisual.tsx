"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const FluidShape = ({ color }: { color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
};

const ConnectingParticles = ({ count = 30 }: { count?: number }) => {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push(new THREE.Vector3(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            ));
        }
        return p;
    }, [count]);

    const lineRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!lineRef.current) return;
        lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    });

    return (
        <group ref={lineRef}>
            {points.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.03]} />
                    <meshBasicMaterial color="#6366f1" />
                </mesh>
            ))}
        </group>
    );
};

const AboutVisual = () => {
    return (
        <div className="w-full h-[400px] md:h-[600px] relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
                
                <FluidShape color="#6366f1" />
                <ConnectingParticles />
                
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default AboutVisual;
