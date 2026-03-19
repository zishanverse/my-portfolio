"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const NeuralParticles = ({ count = 500, active = false }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, [count]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.1;
        if (active) {
            groupRef.current.scale.setScalar(1 + Math.sin(time * 5) * 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <Points positions={points} stride={3}>
                <PointMaterial
                    transparent
                    color={active ? "#818cf8" : "#4f46e5"}
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const Core = ({ active = false }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const targetDistort = active ? 0.6 : 0.3;
        const targetSpeed = active ? 4 : 1.5;
        
        // Simple lerp-like effect via state
        meshRef.current.rotation.z = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1.5, 128, 128]}>
                <MeshDistortMaterial
                    color={active ? "#a855f7" : "#6366f1"}
                    speed={active ? 3 : 1.5}
                    distort={active ? 0.5 : 0.3}
                    radius={1}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={active ? "#a855f7" : "#000000"}
                    emissiveIntensity={active ? 0.5 : 0}
                />
            </Sphere>
        </Float>
    );
};

const NeuralCore = ({ active = false }) => {
    return (
        <div className="w-full h-[400px] md:h-full relative pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
                <spotLight position={[0, 10, 0]} intensity={0.5} penumbra={1} />
                
                <Core active={active} />
                <NeuralParticles active={active} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default NeuralCore;
