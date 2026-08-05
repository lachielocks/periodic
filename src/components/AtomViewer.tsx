"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Circle, Move } from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { categoryColors } from "@/lib/categories";
import { approximateNeutrons, electronShells } from "@/lib/electrons";
import type { ChemicalElement } from "@/types/element";

type AtomMode = "2d" | "3d";

interface AtomViewerProps {
  element: ChemicalElement;
}

export function AtomViewer({ element }: AtomViewerProps) {
  const [mode, setMode] = useState<AtomMode>("3d");
  const colors = categoryColors[element.category];

  return (
    <div className="relative h-[240px] w-full sm:h-[280px]">
      <div className="absolute top-2 right-2 z-10 flex overflow-hidden rounded-md border border-white/15 bg-black/45 backdrop-blur-sm">
        <ModeButton
          active={mode === "2d"}
          onClick={() => setMode("2d")}
          label="2D flat"
        >
          <Circle className="size-3.5" strokeWidth={1.75} />
          2D
        </ModeButton>
        <ModeButton
          active={mode === "3d"}
          onClick={() => setMode("3d")}
          label="3D interactive"
        >
          <Box className="size-3.5" strokeWidth={1.75} />
          3D
        </ModeButton>
      </div>

      {mode === "2d" ? (
        <AtomDiagram2D element={element} accent={colors.fill} />
      ) : (
        <AtomDiagram3D element={element} accent={colors.fill} />
      )}
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`inline-flex items-center gap-1 px-2.5 py-1.5 font-mono text-[0.65rem] tracking-wide transition-colors ${
        active
          ? "bg-white/20 text-white"
          : "text-white/55 hover:bg-white/10 hover:text-white/85"
      }`}
    >
      {children}
    </button>
  );
}

function AtomDiagram2D({
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

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const maxShells = Math.max(shells.length, 1);
  const outerR = 140;
  const shellGap = outerR / (maxShells + 0.35);

  const nucleusR = Math.min(22, 10 + Math.sqrt(element.atomicNumber) * 1.4);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#12181f]">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full max-h-full w-full max-w-full"
        role="img"
        aria-label={`2D Bohr model of ${element.name}`}
      >
        {shells.map((count, shellIndex) => {
          const r = shellGap * (shellIndex + 1);
          const shown = Math.min(count, 24);
          return (
            <g key={shellIndex}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={accent}
                strokeOpacity={0.35}
                strokeWidth={1.25}
              />
              {Array.from({ length: shown }, (_, i) => {
                const angle = (i / shown) * Math.PI * 2 - Math.PI / 2;
                const ex = cx + Math.cos(angle) * r;
                const ey = cy + Math.sin(angle) * r;
                return (
                  <circle
                    key={i}
                    cx={ex}
                    cy={ey}
                    r={4.2}
                    fill="#e8f0f4"
                    stroke="#9ec4d4"
                    strokeWidth={0.8}
                  >
                    <title>Electron</title>
                  </circle>
                );
              })}
              {count > shown && (
                <text
                  x={cx}
                  y={cy - r - 6}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                >
                  +{count - shown}
                </text>
              )}
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={nucleusR} fill={accent} opacity={0.9} />
        <circle
          cx={cx}
          cy={cy}
          r={nucleusR}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1}
        />
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="600"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {element.symbol}
        </text>
        <text
          x={cx}
          y={cy + 11}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
        >
          {element.atomicNumber}p · {neutrons}n
        </text>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
        <p className="rounded-sm bg-black/35 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-white/70">
          Flat Bohr model
        </p>
      </div>
    </div>
  );
}

function AtomDiagram3D({
  element,
  accent,
}: {
  element: ChemicalElement;
  accent: string;
}) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
      >
        <color attach="background" args={["#12181f"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <pointLight position={[-3, -2, -4]} intensity={0.4} color={accent} />
        <AtomScene element={element} accent={accent} />
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
    </>
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
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
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
