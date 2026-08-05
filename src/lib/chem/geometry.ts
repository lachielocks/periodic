import { getChemistryProfile } from "@/data/chemistryProfiles";
import { bondsOf, coordinationNumber } from "@/lib/chem/molecule";
import type { AtomGeometry, Molecule, VseprShape } from "@/lib/chem/types";

function lonePairsMainGroup(z: number, bos: number): number {
  const p = getChemistryProfile(z);
  if (z === 1) return Math.max(0, 1 - bos); // shouldn't happen
  const V = p.valenceElectrons;
  // electrons left for lone pairs ≈ V - bos (each bond uses one from atom in simple model)
  // better: L = V - bos for FC-neutral; lone pairs = floor(L/2) when remaining for octet
  const remaining = V - bos;
  return Math.max(0, Math.floor(remaining / 2));
}

function shapeFromSN(
  steric: number,
  bonding: number,
  lone: number
): { shape: VseprShape; angle: number } {
  if (steric <= 1) return { shape: "linear", angle: 180 };
  if (steric === 2) return { shape: "linear", angle: 180 };
  if (steric === 3) {
    if (bonding === 2 && lone >= 1) return { shape: "bent", angle: 120 };
    return { shape: "trigonal-planar", angle: 120 };
  }
  if (steric === 4) {
    if (bonding === 2 && lone === 2) return { shape: "bent", angle: 109.5 };
    if (bonding === 3 && lone === 1)
      return { shape: "trigonal-pyramidal", angle: 109.5 };
    return { shape: "tetrahedral", angle: 109.5 };
  }
  if (steric === 5) {
    if (bonding === 4 && lone === 1) return { shape: "seesaw", angle: 90 };
    if (bonding === 3 && lone === 2) return { shape: "t-shaped", angle: 90 };
    if (bonding === 2 && lone === 3) return { shape: "linear", angle: 180 };
    return { shape: "trigonal-bipyramidal", angle: 120 };
  }
  if (steric === 6) {
    if (bonding === 4 && lone === 2) return { shape: "square-planar", angle: 90 };
    if (bonding === 5 && lone === 1)
      return { shape: "square-pyramidal", angle: 90 };
    return { shape: "octahedral", angle: 90 };
  }
  if (steric === 7) return { shape: "pentagonal-bipyramidal", angle: 72 };
  return { shape: "unknown", angle: 109.5 };
}

function tmShape(cn: number): { shape: VseprShape; angle: number } {
  if (cn <= 2) return { shape: "linear", angle: 180 };
  if (cn === 3) return { shape: "trigonal-planar", angle: 120 };
  if (cn === 4) return { shape: "tetrahedral", angle: 109.5 }; // default; square planar for d8 often
  if (cn === 5) return { shape: "trigonal-bipyramidal", angle: 120 };
  if (cn === 6) return { shape: "octahedral", angle: 90 };
  return { shape: "unknown", angle: 90 };
}

export function geometryForAtom(
  molecule: Molecule,
  atomId: string
): AtomGeometry {
  const atom = molecule.atoms.find((a) => a.id === atomId)!;
  const p = getChemistryProfile(atom.z);
  const bonding = coordinationNumber(molecule, atomId);
  const bos = bondsOf(molecule, atomId).reduce((s, b) => s + b.order, 0);

  if (
    p.bondBehavior === "metal" ||
    p.bondBehavior === "unknown" ||
    p.block === "d" ||
    p.block === "f"
  ) {
    const { shape, angle } = tmShape(bonding);
    return {
      atomId,
      stericNumber: bonding,
      bondingDomains: bonding,
      lonePairs: 0,
      shape,
      idealAngleDeg: angle,
    };
  }

  const lone = lonePairsMainGroup(atom.z, bos);
  const steric = bonding + lone;
  const { shape, angle } = shapeFromSN(steric, bonding, lone);
  return {
    atomId,
    stericNumber: steric,
    bondingDomains: bonding,
    lonePairs: lone,
    shape,
    idealAngleDeg: angle,
  };
}

export function moleculeGeometry(molecule: Molecule): AtomGeometry[] {
  return molecule.atoms.map((a) => geometryForAtom(molecule, a.id));
}
