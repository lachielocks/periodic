"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Move } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { categoryColors } from "@/lib/categories";
import { approximateNeutrons, electronShells } from "@/lib/electrons";
import type { ChemicalElement } from "@/types/element";

interface AtomViewerProps {
  element: ChemicalElement;
}

export function AtomViewer({ element }: AtomViewerProps) {
  const colors = categoryColors[element.category];

  return (
    <div className="relative h-[240px] w-full sm:h-[280px]">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#12181f"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-3, -2, -4]} intensity={0.4} color={colors.fill} />
        <AtomScene element={element} accent={colors.fill} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
        <p className="flex items-center gap-1.5 rounded-sm bg-black/35 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-white/70">
          <Move className="size-3 opacity-80" strokeWidth={1.75} aria-hidden />
          Drag to orbit · scroll to zoom
        </p>
      </div>
    </div>
  );
}

function AtomScene({
  element,
  accent,
}: {
  element: ChemicalElement;
  accent: string;
}) {
  const shells = useMemo(
    () => electronShells(element.atomicNumber),
    [element.atomicNumber]
  );
  const neutrons = useMemo(
    () => approximateNeutrons(element.atomicNumber, element.atomicMass),
    [element.atomicNumber, element.atomicMass]
  );

  return (
    <group>
      <Nucleus
        protons={element.atomicNumber}
        neutrons={neutrons}
        accent={accent}
      />
      {shells.map((count, i) => (
        <ElectronShell
          key={`${element.atomicNumber}-${i}`}
          shellIndex={i}
          electronCount={count}
          accent={accent}
        />
      ))}
    </group>
  );
}

function Nucleus({
  protons,
  neutrons,
  accent,
}: {
  protons: number;
  neutrons: number;
  accent: string;
}) {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const total = Math.min(protons + neutrons, 48);
    const protonShare = protons / Math.max(protons + neutrons, 1);
    const items: { pos: THREE.Vector3; isProton: boolean }[] = [];
    const radius = Math.min(0.55, 0.18 + total * 0.012);

    for (let i = 0; i < total; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.35 + 0.65 * Math.random());
      items.push({
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        isProton: i / total < protonShare,
      });
    }
    return items;
  }, [protons, neutrons]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.35;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.25}
          transparent
          opacity={0.35}
        />
      </mesh>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color={p.isProton ? accent : "#c5c0b5"}
            roughness={0.45}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function ElectronShell({
  shellIndex,
  electronCount,
  accent,
}: {
  shellIndex: number;
  electronCount: number;
  accent: string;
}) {
  const group = useRef<THREE.Group>(null);
  const radius = 1.05 + shellIndex * 0.55;
  const speed = 0.4 + shellIndex * 0.15;
  const tilt = (shellIndex % 3) * 0.35;

  const positions = useMemo(() => {
    return Array.from({ length: electronCount }, (_, i) => {
      const angle = (i / electronCount) * Math.PI * 2;
      return angle;
    });
  }, [electronCount]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed;
  });

  // Cap visible electrons for readability on heavy elements
  const visible = positions.slice(0, Math.min(electronCount, 18));

  return (
    <group rotation={[tilt, shellIndex * 0.4, tilt * 0.5]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.28} />
      </mesh>
      <group ref={group}>
        {visible.map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial
              color="#e8f0f4"
              emissive="#9ec4d4"
              emissiveIntensity={0.5}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
