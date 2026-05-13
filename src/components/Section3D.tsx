"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Torus, Octahedron, Box, Icosahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ScatteredParticles() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const count = 50;
  const meshRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15] as [number, number, number],
        scale: Math.random() * 0.25 + 0.05,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        speed: Math.random() * 0.15 + 0.05,
        color: i % 3 === 0 ? "var(--neon-cyan)" : i % 3 === 1 ? "var(--neon-purple)" : "#ec4899"
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.children.forEach((child, i) => {
      const p = particles[i];
      child.position.y += Math.sin(time * p.speed + i) * 0.003;
      child.rotation.x += 0.005;
      child.rotation.y += 0.005;
    });
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale} rotation={p.rotation}>
          {i % 3 === 0 ? <boxGeometry /> : i % 3 === 1 ? <octahedronGeometry /> : <tetrahedronGeometry />}
          <meshStandardMaterial 
            color={isLight ? (i % 3 === 0 ? "#0369a1" : i % 3 === 1 ? "#7e22ce" : "#be185d") : (i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#bc13fe" : "#ff00ff")} 
            transparent 
            opacity={isLight ? 0.6 : 0.4} 
            wireframe 
            emissive={isLight ? "black" : (i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#bc13fe" : "#ff00ff")}
            emissiveIntensity={isLight ? 0 : 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function RotatingShape({ type, color }: { type: 'torus' | 'octa' | 'box' | 'complex', color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.4;
      meshRef.current.rotation.y = time * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -time * 0.2;
      outerRef.current.rotation.y = -time * 0.4;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
      {type === 'torus' && (
        <Torus ref={meshRef} args={[1.2, 0.4, 32, 100]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} wireframe />
        </Torus>
      )}
      {type === 'octa' && (
        <Octahedron ref={meshRef} args={[1.2, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} wireframe />
        </Octahedron>
      )}
      {type === 'box' && (
        <Box ref={meshRef} args={[1.2, 1.2, 1.2]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} wireframe />
        </Box>
      )}
      {type === 'complex' && (
        <group>
          <Icosahedron ref={meshRef} args={[1, 15]}>
            <MeshDistortMaterial color={color} speed={2} distort={0.4} metalness={0.8} roughness={0.2} transparent opacity={0.6} />
          </Icosahedron>
          <Octahedron ref={outerRef} args={[1.6, 1]}>
            <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
          </Octahedron>
        </group>
      )}
    </Float>
  );
}

export default function Section3D({ type, color = "#00ffff" }: { type: 'torus' | 'octa' | 'box' | 'complex', color?: string }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-[var(--section-3d-opacity)] transition-opacity duration-500">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={isLight ? 1.2 : 0.4} />
        <pointLight position={[10, 10, 10]} intensity={isLight ? 3 : 2} color="#00ffff" />
        <pointLight position={[-10, -10, 10]} intensity={isLight ? 3 : 2} color="#bc13fe" />
        <RotatingShape type={type} color={color} />
        <ScatteredParticles />
        {!isLight && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />}
      </Canvas>
    </div>
  );
}
