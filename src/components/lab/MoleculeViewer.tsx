"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box, Circle, Move } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import * as THREE from "three";
import { getChemistryProfile } from "@/data/chemistryProfiles";
import { elements } from "@/data/elements";
import { categoryColors } from "@/lib/categories";
import { layoutMolecule } from "@/lib/chem/layout3d";
import type { Molecule } from "@/lib/chem/types";

type Mode = "2d" | "3d";

export function MoleculeViewer({
  molecule,
  selectedId,
  onSelectAtom,
}: {
  molecule: Molecule;
  selectedId: string | null;
  onSelectAtom: (id: string | null) => void;
}) {
  const [mode, setMode] = useState<Mode>("3d");
  const laidOut = useMemo(() => layoutMolecule(molecule), [molecule]);

  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-md bg-[#12181f]">
      <div className="absolute top-2 right-2 z-10 flex overflow-hidden rounded-md border border-white/15 bg-black/45 backdrop-blur-sm">
        <ModeBtn active={mode === "2d"} onClick={() => setMode("2d")} label="2D">
          <Circle className="size-3.5" strokeWidth={1.75} />
          2D
        </ModeBtn>
        <ModeBtn active={mode === "3d"} onClick={() => setMode("3d")} label="3D">
          <Box className="size-3.5" strokeWidth={1.75} />
          3D
        </ModeBtn>
      </div>

      {laidOut.atoms.length === 0 ? (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-white/50">
          Add atoms from the picker to start building.
        </div>
      ) : mode === "2d" ? (
        <Molecule2D
          molecule={laidOut}
          selectedId={selectedId}
          onSelectAtom={onSelectAtom}
        />
      ) : (
        <Molecule3D
          molecule={laidOut}
          selectedId={selectedId}
          onSelectAtom={onSelectAtom}
        />
      )}
    </div>
  );
}

function ModeBtn({
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

function Molecule2D({
  molecule,
  selectedId,
  onSelectAtom,
}: {
  molecule: Molecule;
  selectedId: string | null;
  onSelectAtom: (id: string | null) => void;
}) {
  const { points, width, height } = useMemo(() => {
    const atoms = molecule.atoms;
    const xs = atoms.map((a) => a.coords?.x ?? 0);
    const ys = atoms.map((a) => a.coords?.y ?? 0);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 0);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 0);
    const pad = 1.2;
    const spanX = Math.max(maxX - minX, 1) + pad * 2;
    const spanY = Math.max(maxY - minY, 1) + pad * 2;
    const scale = 200 / Math.max(spanX, spanY);
    const w = spanX * scale + 40;
    const h = spanY * scale + 40;
    const pts = Object.fromEntries(
      atoms.map((a) => {
        const x = ((a.coords?.x ?? 0) - minX + pad) * scale + 20;
        const y = ((a.coords?.y ?? 0) - minY + pad) * scale + 20;
        return [a.id, { x, y }];
      })
    );
    return { points: pts, width: w, height: h };
  }, [molecule]);

  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="max-h-full max-w-full"
        role="img"
        aria-label="2D molecular structure"
      >
        {molecule.bonds.map((b) => {
          const a = points[b.a];
          const c = points[b.b];
          if (!a || !c) return null;
          return (
            <g key={b.id}>
              {Array.from({ length: b.order }, (_, i) => {
                const off = (i - (b.order - 1) / 2) * 3.5;
                const dx = c.x - a.x;
                const dy = c.y - a.y;
                const L = Math.hypot(dx, dy) || 1;
                const nx = (-dy / L) * off;
                const ny = (dx / L) * off;
                return (
                  <line
                    key={i}
                    x1={a.x + nx}
                    y1={a.y + ny}
                    x2={c.x + nx}
                    y2={c.y + ny}
                    stroke="rgba(232,240,244,0.7)"
                    strokeWidth={2}
                  />
                );
              })}
            </g>
          );
        })}
        {molecule.atoms.map((atom) => {
          const p = points[atom.id];
          if (!p) return null;
          const el = elements[atom.z - 1];
          const color = categoryColors[el.category].fill;
          const selected = selectedId === atom.id;
          return (
            <g
              key={atom.id}
              onClick={() => onSelectAtom(selected ? null : atom.id)}
              className="cursor-pointer"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={selected ? 16 : 14}
                fill={color}
                stroke={selected ? "#fff" : "rgba(0,0,0,0.25)"}
                strokeWidth={selected ? 2.5 : 1}
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fill="#1a221c"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {getChemistryProfile(atom.z).symbol}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Molecule3D({
  molecule,
  selectedId,
  onSelectAtom,
}: {
  molecule: Molecule;
  selectedId: string | null;
  onSelectAtom: (id: string | null) => void;
}) {
  return (
    <>
      <Canvas camera={{ position: [0, 2, 6], fov: 42 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#12181f"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <group>
          {molecule.bonds.map((b) => {
            const a = molecule.atoms.find((x) => x.id === b.a)?.coords;
            const c = molecule.atoms.find((x) => x.id === b.b)?.coords;
            if (!a || !c) return null;
            return <BondCylinder key={b.id} a={a} b={c} order={b.order} />;
          })}
          {molecule.atoms.map((atom) => {
            const c = atom.coords ?? { x: 0, y: 0, z: 0 };
            const el = elements[atom.z - 1];
            const color = categoryColors[el.category].fill;
            const selected = selectedId === atom.id;
            return (
              <mesh
                key={atom.id}
                position={[c.x, c.y, c.z]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAtom(selected ? null : atom.id);
                }}
              >
                <sphereGeometry args={[selected ? 0.38 : 0.32, 24, 24]} />
                <meshStandardMaterial
                  color={color}
                  emissive={selected ? color : "#000000"}
                  emissiveIntensity={selected ? 0.25 : 0}
                />
              </mesh>
            );
          })}
        </group>
        <OrbitControls enablePan={false} minDistance={2} maxDistance={20} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
        <p className="flex items-center gap-1.5 rounded-sm bg-black/35 px-2 py-0.5 font-mono text-[0.65rem] text-white/70">
          <Move className="size-3" strokeWidth={1.75} aria-hidden />
          Drag to orbit
        </p>
      </div>
    </>
  );
}

function BondCylinder({
  a,
  b,
  order,
}: {
  a: { x: number; y: number; z: number };
  b: { x: number; y: number; z: number };
  order: number;
}) {
  const { mid, quat, length } = useMemo(() => {
    const start = new THREE.Vector3(a.x, a.y, a.z);
    const end = new THREE.Vector3(b.x, b.y, b.z);
    const dir = new THREE.Vector3().subVectors(end, start);
    const length = dir.length() || 0.01;
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return { mid, quat, length };
  }, [a, b]);

  return (
    <group position={[mid.x, mid.y, mid.z]} quaternion={quat}>
      {Array.from({ length: order }, (_, i) => {
        const off = (i - (order - 1) / 2) * 0.1;
        return (
          <mesh key={i} position={[off, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, length, 10]} />
            <meshStandardMaterial color="#c8d4dc" />
          </mesh>
        );
      })}
    </group>
  );
}
