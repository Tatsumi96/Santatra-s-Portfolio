"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    wireframeRef.current.rotation.x = time * 0.1;
    wireframeRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <group>
        <Icosahedron ref={meshRef} args={[1, 15]} scale={1.8}>
          <MeshDistortMaterial
            color="#00ffff"
            attach="material"
            distort={0.3}
            speed={4}
            roughness={0.2}
            metalness={0.8}
            opacity={0.6}
            transparent
          />
        </Icosahedron>
        <Icosahedron ref={wireframeRef} args={[1, 4]} scale={1.81}>
          <meshBasicMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <div className="h-[400px] w-full md:h-[600px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00ffff" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
