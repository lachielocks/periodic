import { getChemistryProfile } from "@/data/chemistryProfiles";
import { getAtom } from "@/lib/chem/molecule";
import type { BondOrder, Molecule } from "@/lib/chem/types";

/** Bond length (pm) ≈ rA + rB with order correction (Pyykkö-inspired shrink). */
export function bondLengthPm(
  zA: number,
  zB: number,
  order: BondOrder
): number | null {
  const ra = getChemistryProfile(zA).covalentRadiusSinglePm;
  const rb = getChemistryProfile(zB).covalentRadiusSinglePm;
  if (ra == null || rb == null) return null;
  const factor = order === 1 ? 1 : order === 2 ? 0.91 : 0.85;
  return Math.round((ra + rb) * factor);
}

export function bondLengthAngstrom(
  zA: number,
  zB: number,
  order: BondOrder
): number | null {
  const pm = bondLengthPm(zA, zB, order);
  return pm == null ? null : Math.round((pm / 100) * 1000) / 1000;
}

export function moleculeBondLengths(
  molecule: Molecule
): { bondId: string; pm: number | null; angstrom: number | null }[] {
  return molecule.bonds.map((b) => {
    const a = getAtom(molecule, b.a)!;
    const c = getAtom(molecule, b.b)!;
    const pm = bondLengthPm(a.z, c.z, b.order);
    return {
      bondId: b.id,
      pm,
      angstrom: pm == null ? null : Math.round((pm / 100) * 1000) / 1000,
    };
  });
}
