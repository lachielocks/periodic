import { bondLengthAngstrom } from "@/lib/chem/lengths";
import { geometryForAtom } from "@/lib/chem/geometry";
import { getAtom, neighbors } from "@/lib/chem/molecule";
import type { Molecule, Vec3 } from "@/lib/chem/types";

function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function scale(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function len(a: Vec3): number {
  return Math.hypot(a.x, a.y, a.z);
}

function norm(a: Vec3): Vec3 {
  const L = len(a) || 1;
  return scale(a, 1 / L);
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/** Ideal unit direction vectors for a coordination geometry. */
function unitDirs(shape: string, n: number): Vec3[] {
  if (n <= 0) return [];
  if (n === 1) return [{ x: 1, y: 0, z: 0 }];
  if (n === 2) return [{ x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }];
  if (shape === "trigonal-planar" || (n === 3 && shape !== "trigonal-pyramidal")) {
    return [0, 1, 2].map((i) => {
      const a = (i * 2 * Math.PI) / 3;
      return { x: Math.cos(a), y: Math.sin(a), z: 0 };
    });
  }
  if (shape === "trigonal-pyramidal" || shape === "tetrahedral" || n === 4) {
    // tetrahedral set; for pyramidal use first 3
    const t = [
      { x: 1, y: 1, y2: 1 },
    ];
    void t;
    const dirs = [
      { x: 1, y: 1, z: 1 },
      { x: 1, y: -1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
    ].map(norm);
    return dirs.slice(0, n);
  }
  if (shape === "bent") {
    const half = ((109.5 / 2) * Math.PI) / 180;
    return [
      { x: Math.cos(half), y: Math.sin(half), z: 0 },
      { x: Math.cos(half), y: -Math.sin(half), z: 0 },
    ];
  }
  if (shape === "square-planar" || shape === "octahedral") {
    const planar = [
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
    ];
    if (n <= 4) return planar.slice(0, n);
    return [
      ...planar,
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
    ].slice(0, n);
  }
  // default: even ring in xy
  return Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n;
    return { x: Math.cos(a), y: Math.sin(a), z: 0 };
  });
}

/**
 * Place atoms in 3D from connectivity using local VSEPR/CN geometries.
 * Lengths in Ångströms.
 */
export function layoutMolecule(molecule: Molecule): Molecule {
  if (molecule.atoms.length === 0) return molecule;

  const coords = new Map<string, Vec3>();
  const placed = new Set<string>();

  const start = molecule.atoms[0].id;
  coords.set(start, { x: 0, y: 0, z: 0 });
  placed.add(start);

  const queue = [start];

  while (queue.length) {
    const id = queue.shift()!;
    const center = coords.get(id)!;
    const geom = geometryForAtom(molecule, id);
    const neigh = neighbors(molecule, id);
    const dirs = unitDirs(geom.shape, neigh.length);

    // Orient frame: if we have a parent direction, align first bond opposite to parent
    let frameDirs = dirs;
    const parent = [...placed].find(
      (p) => p !== id && neighbors(molecule, id).includes(p)
    );
    if (parent && dirs.length) {
      const parentDir = norm(sub(coords.get(parent)!, center));
      // rotate so dirs[0] aligns with -parentDir roughly for first neighbor = parent
      const parentIndex = neigh.indexOf(parent);
      if (parentIndex >= 0) {
        frameDirs = orientDirs(dirs, parentIndex, scale(parentDir, -1));
      }
    }

    neigh.forEach((nid, i) => {
      if (placed.has(nid)) return;
      const a = getAtom(molecule, id)!;
      const b = getAtom(molecule, nid)!;
      const bond = molecule.bonds.find(
        (bn) =>
          (bn.a === id && bn.b === nid) || (bn.a === nid && bn.b === id)
      )!;
      const L = bondLengthAngstrom(a.z, b.z, bond.order) ?? 1.5;
      const dir = frameDirs[i] ?? { x: 1, y: 0, z: 0 };
      coords.set(nid, add(center, scale(norm(dir), L)));
      placed.add(nid);
      queue.push(nid);
    });
  }

  // Disjoint fragments
  for (const atom of molecule.atoms) {
    if (!placed.has(atom.id)) {
      coords.set(atom.id, {
        x: placed.size * 2,
        y: 0,
        z: 0,
      });
      placed.add(atom.id);
    }
  }

  return {
    ...molecule,
    atoms: molecule.atoms.map((a) => ({
      ...a,
      coords: coords.get(a.id) ?? { x: 0, y: 0, z: 0 },
    })),
  };
}

function orientDirs(dirs: Vec3[], alignIndex: number, target: Vec3): Vec3[] {
  // Simple: swap so alignIndex direction becomes target; leave others relative via orthonormal basis rebuild
  if (dirs.length === 0) return dirs;
  const from = dirs[alignIndex];
  // Build rotation taking `from` to `target`
  const f = norm(from);
  const t = norm(target);
  const axis = cross(f, t);
  const axisLen = len(axis);
  if (axisLen < 1e-6) {
    // parallel or anti
    if (f.x * t.x + f.y * t.y + f.z * t.z > 0) return dirs;
    return dirs.map((d) => scale(d, -1));
  }
  const angle = Math.acos(
    Math.max(-1, Math.min(1, f.x * t.x + f.y * t.y + f.z * t.z))
  );
  const u = scale(axis, 1 / axisLen);
  return dirs.map((d) => rotateAround(d, u, angle));
}

function rotateAround(v: Vec3, u: Vec3, angle: number): Vec3 {
  // Rodrigues
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const dot = v.x * u.x + v.y * u.y + v.z * u.z;
  const cr = cross(u, v);
  return {
    x: v.x * c + cr.x * s + u.x * dot * (1 - c),
    y: v.y * c + cr.y * s + u.y * dot * (1 - c),
    z: v.z * c + cr.z * s + u.z * dot * (1 - c),
  };
}

export function angleAtAtomDeg(
  molecule: Molecule,
  centerId: string,
  aId: string,
  bId: string
): number | null {
  const c = getAtom(molecule, centerId)?.coords;
  const a = getAtom(molecule, aId)?.coords;
  const b = getAtom(molecule, bId)?.coords;
  if (!c || !a || !b) return null;
  const va = norm(sub(a, c));
  const vb = norm(sub(b, c));
  const dot = va.x * vb.x + va.y * vb.y + va.z * vb.z;
  return (Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI;
}
