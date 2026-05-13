"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current || !outerRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    wireframeRef.current.rotation.x = time * 0.1;
    wireframeRef.current.rotation.y = time * 0.15;
    outerRef.current.rotation.x = -time * 0.05;
    outerRef.current.rotation.z = time * 0.08;
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <group>
        <Icosahedron ref={meshRef} args={[1, 15]} scale={1.6}>
          <MeshDistortMaterial
            color="#00ffff"
            attach="material"
            distort={0.25}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            opacity={0.5}
            transparent
          />
        </Icosahedron>
        <Icosahedron ref={wireframeRef} args={[1, 4]} scale={1.61}>
          <meshBasicMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.15}
          />
        </Icosahedron>
        {/* Outer purple shell - smaller and more subtle */}
        <Icosahedron ref={outerRef} args={[1, 2]} scale={2.1}>
          <meshBasicMaterial
            color="#bc13fe"
            wireframe
            transparent
            opacity={0.08}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function ThreeScene() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="h-[400px] w-full md:h-[600px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={isLight ? 1.5 : 0.5} />
        <directionalLight position={[5, 5, 5]} intensity={isLight ? 3 : 2} color="#00ffff" />
        <directionalLight position={[-5, -5, 5]} intensity={isLight ? 3 : 2} color="#bc13fe" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
