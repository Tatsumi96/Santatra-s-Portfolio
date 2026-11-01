'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const MINT = '#86F9C0';
const SEGMENTS = 96;

type SectionState = {
  radius: number;
  height: number;
  turns: number;
  scale: number;
  x: number;
  y: number;
  speed: number;
  bend: number;
  tilt: number;
  spin: number;
  activation: number;
  node: number;
  rung: number;
};

const SECTION_STATES: SectionState[] = [
  { radius: 0.86, height: 5.1, turns: 2.6, scale: 1.15, x: 0.34, y: 0.04, speed: 0.1, bend: 0.0, tilt: 0.12, spin: 0.05, activation: 0.2, node: 0.075, rung: 0.026 },
  { radius: 0.95, height: 4.7, turns: 3.4, scale: 1.02, x: -0.42, y: 0.14, speed: 0.15, bend: 0.15, tilt: 0.35, spin: -0.06, activation: 0.35, node: 0.08, rung: 0.028 },
  { radius: 1.1, height: 4.4, turns: 4.2, scale: 1.05, x: 0.08, y: -0.1, speed: 0.2, bend: 0.45, tilt: 0.6, spin: 0.1, activation: 0.5, node: 0.085, rung: 0.03 },
  { radius: 0.45, height: 4.2, turns: 2.2, scale: 1.2, x: -0.24, y: 0.08, speed: 0.13, bend: 0.85, tilt: 0.8, spin: -0.12, activation: 0.4, node: 0.078, rung: 0.028 },
  { radius: 0.35, height: 4.6, turns: 3.2, scale: 1.1, x: 0.0, y: 0.0, speed: 0.11, bend: 1.0, tilt: 0.7, spin: 0.06, activation: 0.25, node: 0.072, rung: 0.026 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function axisPoint(u: number, height: number, bend: number, out: THREE.Vector3) {
  const straightY = (u - 0.5) * height;
  const ringR = height * 0.15;
  const angle = (u - 0.5) * Math.PI * 2;
  const ringX = Math.sin(angle) * ringR;
  const ringY = Math.cos(angle) * ringR;
  out.set(lerp(0, ringX, bend), lerp(straightY, ringY, bend), 0);
  return out;
}

function DnaScene({
  scrollRef,
  activityRef,
  isDark,
}: {
  scrollRef: React.MutableRefObject<number>;
  activityRef: React.MutableRefObject<number>;
  isDark: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const rungsRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, size } = useThree();
  const isMobile = size.width < 768;
  const mobileScale = isMobile ? 0.4 : 1.0;

  const cur = useRef({ ...SECTION_STATES[0] });
  const phase = useRef(0);
  const spinPhase = useRef(0);

  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(1, 10, 10), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fafafa',
        roughness: 0.38,
        metalness: 0.15,
        transparent: true,
        opacity: 0.7,
      }),
    [],
  );
  const rungGeometry = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 6), []);
  const rungMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MINT,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      }),
    [],
  );

  const scratch = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      up: new THREE.Vector3(0, 1, 0),
      reference: new THREE.Vector3(),
      axisA: new THREE.Vector3(),
      axisB: new THREE.Vector3(),
      axisC: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      binormal: new THREE.Vector3(),
      offset: new THREE.Vector3(),
      p1: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      mid: new THREE.Vector3(),
      dir: new THREE.Vector3(),
    }),
    [],
  );

  useEffect(() => {
    nodeMaterial.color.set(isDark ? '#fafafa' : '#111111');
  }, [isDark, nodeMaterial]);

  useEffect(() => {
    nodesRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    rungsRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const progress = Math.max(0, Math.min(1, scrollRef.current));
    const n = SECTION_STATES.length - 1;
    const raw = progress * n;
    const fromIdx = Math.min(Math.floor(raw), n - 1);
    const toIdx = Math.min(fromIdx + 1, n);
    const alpha = raw - fromIdx;

    const from = SECTION_STATES[fromIdx];
    const to = SECTION_STATES[toIdx];

    const target = {
      radius: lerp(from.radius, to.radius, alpha),
      height: lerp(from.height, to.height, alpha),
      turns: lerp(from.turns, to.turns, alpha),
      scale: lerp(from.scale, to.scale, alpha),
      x: lerp(from.x, to.x, alpha),
      y: lerp(from.y, to.y, alpha),
      speed: lerp(from.speed, to.speed, alpha),
      bend: lerp(from.bend, to.bend, alpha),
      tilt: lerp(from.tilt, to.tilt, alpha),
      spin: lerp(from.spin, to.spin, alpha),
      activation: lerp(from.activation, to.activation, alpha),
      node: lerp(from.node, to.node, alpha),
      rung: lerp(from.rung, to.rung, alpha),
    };

    const S = 0.022;
    const P = 0.012;
    const c = cur.current;
    c.radius = lerp(c.radius, target.radius, S);
    c.height = lerp(c.height, target.height, S);
    c.turns = lerp(c.turns, target.turns, S);
    c.scale = lerp(c.scale, target.scale, S);
    c.x = lerp(c.x, target.x, P);
    c.y = lerp(c.y, target.y, P);
    c.speed = lerp(c.speed, target.speed, S);
    c.bend = lerp(c.bend, target.bend, S);
    c.tilt = lerp(c.tilt, target.tilt, S);
    c.spin = lerp(c.spin, target.spin, S);
    c.activation = lerp(c.activation, target.activation, S);
    c.node = lerp(c.node, target.node, S);
    c.rung = lerp(c.rung, target.rung, S);

    const boost = activityRef.current;
    activityRef.current *= Math.exp(-3 * delta);

    phase.current += delta * c.speed * (1 + boost * 0.5);
    spinPhase.current += delta * c.spin;

    const nodes = nodesRef.current;
    const rungs = rungsRef.current;
    if (!nodes || !rungs) return;

    const sc = scratch;
    const pulse = Math.min(1, c.activation + boost * 0.5);
    const eps = 0.002;

    for (let i = 0; i < SEGMENTS; i++) {
      const u = i / (SEGMENTS - 1);

      axisPoint(u + eps, c.height, c.bend, sc.axisA);
      axisPoint(u - eps, c.height, c.bend, sc.axisB);
      sc.tangent.subVectors(sc.axisA, sc.axisB).normalize();

      if (Math.abs(sc.tangent.z) < 0.88) {
        sc.reference.set(0, 0, 1);
      } else {
        sc.reference.set(1, 0, 0);
      }

      sc.normal.crossVectors(sc.tangent, sc.reference).normalize();
      sc.binormal.crossVectors(sc.tangent, sc.normal).normalize();

      axisPoint(u, c.height, c.bend, sc.axisC);

      const theta = u * c.turns * Math.PI * 2 + phase.current;
      const wave = Math.sin(u * Math.PI * 8 - t * (0.5 + c.activation * 0.8)) * pulse;
      const radius = c.radius * (1 + wave * 0.1);

      sc.offset
        .copy(sc.normal)
        .multiplyScalar(Math.cos(theta) * radius)
        .addScaledVector(sc.binormal, Math.sin(theta) * radius);

      sc.p1.copy(sc.axisC).add(sc.offset);
      sc.p2.copy(sc.axisC).sub(sc.offset);

      const nodeScale = c.node * (1 + wave * 0.25);

      sc.dummy.position.copy(sc.p1);
      sc.dummy.quaternion.identity();
      sc.dummy.scale.setScalar(nodeScale);
      sc.dummy.updateMatrix();
      nodes.setMatrixAt(i * 2, sc.dummy.matrix);

      sc.dummy.position.copy(sc.p2);
      sc.dummy.quaternion.identity();
      sc.dummy.scale.setScalar(nodeScale);
      sc.dummy.updateMatrix();
      nodes.setMatrixAt(i * 2 + 1, sc.dummy.matrix);

      sc.mid.addVectors(sc.p1, sc.p2).multiplyScalar(0.5);
      sc.dir.subVectors(sc.p2, sc.p1);
      const length = sc.dir.length();
      sc.dir.normalize();

      const rungScale = c.rung * (1 + wave * 0.18);
      sc.dummy.position.copy(sc.mid);
      sc.dummy.quaternion.setFromUnitVectors(sc.up, sc.dir);
      sc.dummy.scale.set(rungScale, Math.max(length, 0.0001), rungScale);
      sc.dummy.updateMatrix();
      rungs.setMatrixAt(i, sc.dummy.matrix);
    }

    nodes.instanceMatrix.needsUpdate = true;
    rungs.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.position.x = c.x * viewport.width * 0.3;
      groupRef.current.position.y = c.y * viewport.height * 0.3;
      groupRef.current.scale.setScalar((c.scale + Math.sin(t * 0.16) * 0.008) * mobileScale);
      groupRef.current.rotation.x = c.tilt * 0.18 + Math.sin(t * 0.08) * 0.015;
      groupRef.current.rotation.y = spinPhase.current;
      groupRef.current.rotation.z = c.tilt * 0.32;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <directionalLight position={[-4, -2, -5]} intensity={0.5} />

      <group ref={groupRef}>
        <instancedMesh
          ref={nodesRef}
          args={[nodeGeometry, nodeMaterial, SEGMENTS * 2]}
          frustumCulled={false}
        />
        <instancedMesh
          ref={rungsRef}
          args={[rungGeometry, rungMaterial, SEGMENTS]}
          frustumCulled={false}
        />
      </group>
    </>
  );
}

export default function ScrollDna3D() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';
  const scrollRef = useRef(0);
  const activityRef = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {

    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const delta = Math.abs(top - lastScroll.current);
      lastScroll.current = top;
      scrollRef.current = height > 0 ? top / height : 0;
      activityRef.current = Math.min(1, activityRef.current + delta / 180);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('lenis-scroll', onScroll as EventListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('lenis-scroll', onScroll as EventListener);
    };
  }, []);

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
        <DnaScene scrollRef={scrollRef} activityRef={activityRef} isDark={isDark} />
      </Canvas>
    </div>
  );
}
