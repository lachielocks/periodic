import { getChemistryProfile } from "@/data/chemistryProfiles";
import { bondsOf } from "@/lib/chem/molecule";
import type { Molecule } from "@/lib/chem/types";

/**
 * Lewis-style formal charge for main-group:
 * FC = valence electrons − nonbonding − ½ bonding electrons
 * We approximate nonbonding = max(0, valence − bondOrderSum*2/ something):
 * For typical covalent graphs without explicit lone-pair editing:
 * bonding electrons = 2 * bondOrderSum
 * lone electrons ≈ max(0, 8 − bonding) for period-2 octet seekers,
 * better: assume atom wants octet (or duet for H):
 * assigned bonding e = 2 * BOS
 * lone e = max(0, preferredShell − assigned bonding e) when underfilled is wrong for FC.
 *
 * Standard shortcut when lone pairs aren't stored:
 * FC = V − L − B/2, with L inferred as V − B for "neutral bonding pattern" is wrong.
 *
 * We use: L = max(0, shell − 2*BOS) where shell is 2 for H else 8 (or 12 expanded),
 * and B = 2*BOS, so FC = V − L − BOS.
 */
export function formalCharge(molecule: Molecule, atomId: string): number {
  const atom = molecule.atoms.find((a) => a.id === atomId);
  if (!atom) return 0;
  if (atom.formalCharge !== undefined) return atom.formalCharge;

  const p = getChemistryProfile(atom.z);
  const bos = bondsOf(molecule, atomId).reduce((s, b) => s + b.order, 0);

  if (p.bondBehavior === "metal" || p.bondBehavior === "unknown") {
    // Oxidation-state style estimate: prefer common OS near coordination
    return estimateMetalOS(atom.z, bos);
  }

  const V = p.valenceElectrons;
  const shell = atom.z === 1 ? 2 : p.allowsExpandedOctet ? Math.max(8, bos * 2) : 8;
  const bondingElectrons = 2 * bos;
  const lone = Math.max(0, shell - bondingElectrons);
  // When overfilled expanded octet, lone may be 0 and FC = V - BOS
  const fc = V - lone - bos;
  return fc;
}

function estimateMetalOS(z: number, bondOrderSum: number): number {
  const p = getChemistryProfile(z);
  const positives = p.commonOxidationStates.filter((x) => x > 0).sort((a, b) => a - b);
  if (positives.length === 0) return 0;
  // Pick closest common positive OS to coordination / BOS
  const target = Math.max(1, bondOrderSum);
  let best = positives[0];
  for (const os of positives) {
    if (Math.abs(os - target) < Math.abs(best - target)) best = os;
  }
  return best;
}

export function allFormalCharges(
  molecule: Molecule
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of molecule.atoms) {
    out[a.id] = formalCharge(molecule, a.id);
  }
  return out;
}

export function totalCharge(molecule: Molecule): number {
  return Object.values(allFormalCharges(molecule)).reduce((s, c) => s + c, 0);
}
