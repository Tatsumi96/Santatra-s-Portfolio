
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
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScroll;
      setScrollProgress(progress);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Morphing based on scroll
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, time * 0.1 + scrollProgress * Math.PI * 2 + mouse.current.y * 0.5, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, time * 0.15 + scrollProgress * Math.PI + mouse.current.x * 0.5, 0.05);
    
    // Zoom/Scale effect
    const scale = 1.2 + scrollProgress * 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    
    // Dynamic distortion
    const material = meshRef.current.material as THREE.ShaderMaterial & { distort: number };
    if (material && typeof material.distort === 'number') {
       material.distort = THREE.MathUtils.lerp(material.distort, 0.4 + scrollProgress * 0.4 + Math.sin(time) * 0.1, 0.05);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <Icosahedron ref={meshRef} args={[1, 64]}>
        <MeshDistortMaterial
          color={isLight ? "#050505" : "#ffffff"}
          speed={3}
          distort={0.45}
          roughness={0}
          metalness={1}
          transparent
          opacity={isLight ? 0.08 : 0.12}
          wireframe={true}
          emissive={isLight ? "#000000" : "#ffffff"}
          emissiveIntensity={isLight ? 0 : 0.2}
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
        <ambientLight intensity={isLight ? 1 : 0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isLight ? 150 : 300} color={isLight ? "#ffffff" : "#ffffff"} />
        <pointLight position={[-10, -10, -10]} intensity={isLight ? 80 : 150} color={isLight ? "#ffffff" : "#ffffff"} />
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
