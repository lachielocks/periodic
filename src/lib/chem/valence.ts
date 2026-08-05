import { getChemistryProfile } from "@/data/chemistryProfiles";
import { bondOrderSum, coordinationNumber } from "@/lib/chem/molecule";
import type { Molecule } from "@/lib/chem/types";

export interface AtomValenceInfo {
  atomId: string;
  z: number;
  symbol: string;
  bondOrderSum: number;
  coordination: number;
  valenceElectrons: number;
  maxBondOrderSum: number;
  ok: boolean;
}

export function maxBondOrderSumFor(z: number): number {
  const p = getChemistryProfile(z);
  if (z === 1) return 1;
  if (p.bondBehavior === "metal" || p.bondBehavior === "unknown") {
    return p.maxCoordination;
  }
  if (p.bondBehavior === "noble") return p.maxCoordination;
  if (p.allowsExpandedOctet) return 6;
  if (z === 8) return 3;
  if (z === 7) return 4;
  if (z === 6) return 4;
  return 4;
}

export function atomValence(molecule: Molecule, atomId: string): AtomValenceInfo {
  const atom = molecule.atoms.find((a) => a.id === atomId)!;
  const p = getChemistryProfile(atom.z);
  const bos = bondOrderSum(molecule, atomId);
  const max = maxBondOrderSumFor(atom.z);
  return {
    atomId,
    z: atom.z,
    symbol: p.symbol,
    bondOrderSum: bos,
    coordination: coordinationNumber(molecule, atomId),
    valenceElectrons: p.valenceElectrons,
    maxBondOrderSum: max,
    ok: bos <= max && coordinationNumber(molecule, atomId) <= p.maxCoordination,
  };
}

export function moleculeValence(molecule: Molecule): AtomValenceInfo[] {
  return molecule.atoms.map((a) => atomValence(molecule, a.id));
}
