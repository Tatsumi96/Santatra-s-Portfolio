"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Icosahedron, 
  MeshDistortMaterial, 
  Preload,
  AdaptiveDpr,
  Bvh
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

function MasterShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScroll;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Morphing based on scroll
    meshRef.current.rotation.x = time * 0.1 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.y = time * 0.15 + scrollProgress * Math.PI;
    
    // Zoom/Scale effect
    const scale = 1.5 + scrollProgress * 2;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    // Dynamic distortion
    if (meshRef.current.material instanceof THREE.MeshPhysicalMaterial || meshRef.current.material instanceof THREE.ShaderMaterial) {
       // @ts-expect-error - distort property exists on MeshDistortMaterial but not on base material types
       if (meshRef.current.material.distort !== undefined) {
         // @ts-expect-error - distort property exists on MeshDistortMaterial
         meshRef.current.material.distort = 0.2 + scrollProgress * 0.5;
       }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <Icosahedron ref={meshRef} args={[1, 40]}>
        <MeshDistortMaterial
          color={isLight ? "#050505" : "#fafafa"}
          speed={1.5}
          distort={0.3}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.3}
        />
      </Icosahedron>
    </Float>
  );
}

function SceneContent() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Bvh firstHitOnly>
        <ambientLight intensity={isLight ? 2 : 0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isLight ? 100 : 200} color={isLight ? "#050505" : "#fafafa"} />
        <pointLight position={[-10, -10, -10]} intensity={isLight ? 50 : 100} color={isLight ? "#050505" : "#fafafa"} />
        <MasterShape />
        <Preload all />
        <AdaptiveDpr pixelated />
      </Bvh>
    </>
  );
}

export default function MasterBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-[var(--section-3d-opacity)] transition-opacity duration-1000">
      <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
