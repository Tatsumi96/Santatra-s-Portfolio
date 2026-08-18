'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// ─── Per-section blob states ────────────────────────────────────────────────
// Each entry describes the blob at a given section in the page
const SECTION_STATES = [
  // 0 — Hero: large, calm, right side
  { distort: 0.12, speed: 1.0, scale: 2.6, x: 0.32, y: 0.05,  wireOpacity: 0.09, dotOpacity: 0.18 },
  // 1 — About: medium, more distorted, left
  { distort: 0.52, speed: 2.8, scale: 1.9, x: -0.38, y: 0.18, wireOpacity: 0.08, dotOpacity: 0.14 },
  // 2 — Skills: heavily distorted, center
  { distort: 0.78, speed: 4.0, scale: 2.1, x: 0.08, y: -0.12, wireOpacity: 0.07, dotOpacity: 0.11 },
  // 3 — Projects: wide, soft, right
  { distort: 0.38, speed: 2.2, scale: 2.4, x: -0.22, y: 0.08, wireOpacity: 0.08, dotOpacity: 0.13 },
  // 4 — Contact: smooth, centered, full
  { distort: 0.08, speed: 0.7, scale: 1.8, x: 0.0,   y: 0.0,  wireOpacity: 0.10, dotOpacity: 0.20 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── 3D Blob Mesh ────────────────────────────────────────────────────────────
function BlobScene({
  scrollRef,
  isDark,
}: {
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
}) {
  const wireRef    = useRef<THREE.Mesh>(null);
  const wireMat    = useRef<THREE.Material & { distort: number; speed: number }>(null);
  const pointsRef  = useRef<THREE.Points>(null);
  const { viewport, size } = useThree();
  const isMobile = size.width < 768;
  const mobileScale = isMobile ? 0.4 : 1.0;

  // Interpolated current state
  const cur = useRef({ ...SECTION_STATES[0] });

  // Sphere geometry for the points cloud (slightly larger radius)
  const dotsGeom = useMemo(() => new THREE.SphereGeometry(1.15, 48, 48), []);
  const dotsMat  = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.022,
        transparent: true,
        opacity: 0.16,
        sizeAttenuation: true,
        color: '#ffffff',
      }),
    [],
  );

  useFrame(({ clock }) => {
    const t        = clock.getElapsedTime();
    const progress = Math.max(0, Math.min(1, scrollRef.current));
    const n        = SECTION_STATES.length - 1;
    const raw      = progress * n;
    const fromIdx  = Math.min(Math.floor(raw), n - 1);
    const toIdx    = Math.min(fromIdx + 1, n);
    const alpha    = raw - fromIdx;

    const from = SECTION_STATES[fromIdx];
    const to   = SECTION_STATES[toIdx];

    // Target state (linearly interpolated between adjacent sections)
    const target = {
      distort:     lerp(from.distort,     to.distort,     alpha),
      speed:       lerp(from.speed,       to.speed,       alpha),
      scale:       lerp(from.scale,       to.scale,       alpha),
      x:           lerp(from.x,           to.x,           alpha),
      y:           lerp(from.y,           to.y,           alpha),
      wireOpacity: lerp(from.wireOpacity, to.wireOpacity, alpha),
      dotOpacity:  lerp(from.dotOpacity,  to.dotOpacity,  alpha),
    };

    // Smooth damp current toward target
    const S = 0.032; // position/shape smoothing
    const P = 0.018; // extra lag for position
    const c = cur.current;
    c.distort     = lerp(c.distort,     target.distort,     S);
    c.speed       = lerp(c.speed,       target.speed,       S);
    c.scale       = lerp(c.scale,       target.scale,       S);
    c.x           = lerp(c.x,           target.x,           P);
    c.y           = lerp(c.y,           target.y,           P);
    c.wireOpacity = lerp(c.wireOpacity, target.wireOpacity, S);
    c.dotOpacity  = lerp(c.dotOpacity,  target.dotOpacity,  S);

    const color = isDark ? '#d4d4d4' : '#111111';

    // ── Wireframe sphere ──────────────────────────────────────────────────
    if (wireRef.current && wireMat.current) {
      (wireMat.current as any).distort = c.distort;
      (wireMat.current as any).speed   = c.speed;
      (wireMat.current as any).opacity = c.wireOpacity;
      (wireMat.current as any).color.set(color);

      const sc = (c.scale + Math.sin(t * 0.22) * 0.055) * mobileScale;
      wireRef.current.scale.setScalar(sc);
      wireRef.current.position.x = c.x * viewport.width  * 0.30;
      wireRef.current.position.y = c.y * viewport.height * 0.30;
      wireRef.current.rotation.x = t * 0.042 + Math.sin(t * 0.17) * 0.09;
      wireRef.current.rotation.y = t * 0.068 + Math.cos(t * 0.13) * 0.09;
      wireRef.current.rotation.z = t * 0.021;
    }

    // ── Points cloud ──────────────────────────────────────────────────────
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = c.dotOpacity;
      mat.color.set(color);

      const sc2 = (c.scale + 0.12 + Math.sin(t * 0.22 + 0.6) * 0.055) * mobileScale;
      pointsRef.current.scale.setScalar(sc2);
      pointsRef.current.position.x = c.x * viewport.width  * 0.30;
      pointsRef.current.position.y = c.y * viewport.height * 0.30;
      // Counter-rotate slowly so dots feel independent from the mesh
      pointsRef.current.rotation.x = -t * 0.030;
      pointsRef.current.rotation.y = -t * 0.055;
      pointsRef.current.rotation.z =  t * 0.014;
    }
  });

  return (
    <>
      {/* Ambient light for subtle shading on the distort material */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />

      {/* ── Wireframe morphing sphere ── */}
      <Sphere ref={wireRef} args={[1, 80, 80]}>
        <MeshDistortMaterial
          ref={wireMat as any}
          color={isDark ? '#d4d4d4' : '#111111'}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.08}
          wireframe
        />
      </Sphere>

      {/* ── Dotted point cloud (same distortion via rotation sync) ── */}
      <points ref={pointsRef} geometry={dotsGeom} material={dotsMat} />
    </>
  );
}

// ─── Canvas wrapper (fixed, full-viewport) ────────────────────────────────────
export default function ScrollBlob3D() {
  const scrollRef  = useRef(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      const top    = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = height > 0 ? top / height : 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Also listen for lenis scroll events (custom event dispatched by lenis)
    window.addEventListener('lenis-scroll', onScroll as EventListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lenis-scroll', onScroll as EventListener);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <BlobScene scrollRef={scrollRef} isDark={isDark} />
      </Canvas>
    </div>
  );
}
