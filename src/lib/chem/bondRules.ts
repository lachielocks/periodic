import { getChemistryProfile } from "@/data/chemistryProfiles";
import {
  bondOrderSum,
  coordinationNumber,
  getAtom,
  neighbors,
} from "@/lib/chem/molecule";
import type {
  BondOrder,
  Molecule,
  ValidationIssue,
  ValidationResult,
} from "@/lib/chem/types";

const NOBLE_PARTNERS: Record<number, number[]> = {
  // Xe commonly bonds to F, O, Cl, etc.
  54: [8, 9, 17],
  36: [9], // KrF2
  18: [], // Ar compounds exotic — disallow default
  10: [],
  2: [],
  86: [9], // Rn fluorides known in theory/limited
};

export function canFormBond(
  molecule: Molecule,
  atomA: string,
  atomB: string,
  order: BondOrder
): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const a = getAtom(molecule, atomA);
  const b = getAtom(molecule, atomB);
  if (!a || !b) {
    errors.push({
      level: "error",
      code: "missing-atom",
      message: "Both atoms must exist in the molecule.",
    });
    return { ok: false, errors, warnings };
  }
  if (atomA === atomB) {
    errors.push({
      level: "error",
      code: "self-bond",
      message: "An atom cannot bond to itself.",
    });
    return { ok: false, errors, warnings };
  }

  const pa = getChemistryProfile(a.z);
  const pb = getChemistryProfile(b.z);

  // Identical noble gas atoms
  if (pa.bondBehavior === "noble" && pb.bondBehavior === "noble") {
    errors.push({
      level: "error",
      code: "noble-noble",
      message: `${pa.symbol}–${pb.symbol} bonds are not chemically viable under normal conditions.`,
    });
  }

  // He and Ne essentially nonbonding
  for (const p of [pa, pb]) {
    if (p.z === 2 || p.z === 10) {
      errors.push({
        level: "error",
        code: "inert-noble",
        message: `${p.symbol} does not form stable covalent compounds.`,
      });
    }
  }

  // Noble gas partner rules
  for (const [noble, other] of [
    [pa, pb],
    [pb, pa],
  ] as const) {
    if (noble.bondBehavior === "noble" && noble.z !== 2 && noble.z !== 10) {
      const allowed = NOBLE_PARTNERS[noble.z] ?? [];
      if (!allowed.includes(other.z)) {
        errors.push({
          level: "error",
          code: "noble-partner",
          message: `${noble.symbol} does not form known stable bonds with ${other.symbol} in this model.`,
        });
      }
      if (order > 1) {
        errors.push({
          level: "error",
          code: "noble-order",
          message: `${noble.symbol} bonds are treated as single bonds only.`,
        });
      }
    }
  }

  if (order < pa.minBondOrder || order > pa.maxBondOrder) {
    errors.push({
      level: "error",
      code: "order-a",
      message: `${pa.symbol} does not support bond order ${order} (max ${pa.maxBondOrder}).`,
    });
  }
  if (order < pb.minBondOrder || order > pb.maxBondOrder) {
    errors.push({
      level: "error",
      code: "order-b",
      message: `${pb.symbol} does not support bond order ${order} (max ${pb.maxBondOrder}).`,
    });
  }

  // Hydrogen: only single bonds, CN ≤ 1 (after this bond)
  for (const [atom, profile] of [
    [a, pa],
    [b, pb],
  ] as const) {
    if (profile.z === 1) {
      if (order > 1) {
        errors.push({
          level: "error",
          code: "h-order",
          message: "Hydrogen only forms single bonds.",
        });
      }
      const otherId = atom.id === a.id ? b.id : a.id;
      const cn = neighbors(molecule, atom.id).filter((id) => id !== otherId).length + 1;
      if (cn > 1) {
        errors.push({
          level: "error",
          code: "h-cn",
          message: "Hydrogen is limited to one bond (coordination number 1).",
        });
      }
    }
  }

  // Coordination limits (count neighbor after bond)
  for (const [atom, profile, other] of [
    [a, pa, b],
    [b, pb, a],
  ] as const) {
    const existing = neighbors(molecule, atom.id);
    const willHave = existing.includes(other.id)
      ? existing.length
      : existing.length + 1;
    if (willHave > profile.maxCoordination) {
      errors.push({
        level: "error",
        code: "max-cn",
        message: `${profile.symbol} exceeds max coordination ${profile.maxCoordination}.`,
      });
    }
  }

  // Valence / bond-order sum checks for main-group nonmetals
  for (const [atom, profile, otherId] of [
    [a, pa, b.id],
    [b, pb, a.id],
  ] as const) {
    if (
      profile.bondBehavior === "nonmetal" ||
      profile.bondBehavior === "metalloid"
    ) {
      const current = bondsWithout(molecule, atom.id, otherId);
      const nextSum = current + order;
      const maxValence = profile.allowsExpandedOctet
        ? Math.max(profile.valenceElectrons + 4, 12)
        : profile.z === 1
          ? 1
          : 4; // shared pairs roughly; H special
      // Better: electrons around atom ≈ 2 * bondOrderSum for pure covalent
      // Cap bond-order sum: H=1, period-2 nonmetals ≈4 (octet/2), expanded higher
      const maxBos =
        profile.z === 1
          ? 1
          : profile.allowsExpandedOctet
            ? 6
            : profile.valenceElectrons <= 4
              ? 4
              : Math.ceil((8 - (profile.valenceElectrons - 4)) / 2) +
                (8 - profile.valenceElectrons) / 2;
      // Simpler educational max:
      const simpleMax =
        profile.z === 1
          ? 1
          : profile.z === 8
            ? 3 // O can be 2 typically, allow 3 for O3/CO etc.
            : profile.z === 7
              ? 4
              : profile.z === 6
                ? 4
                : profile.allowsExpandedOctet
                  ? 6
                  : 4;
      if (nextSum > simpleMax) {
        errors.push({
          level: "error",
          code: "valence",
          message: `${profile.symbol} would exceed typical valence (bond-order sum ${nextSum} > ${simpleMax}).`,
        });
      }
      void maxValence;
      void nextSum;
    }
  }

  // Superheavy warning
  if (a.z >= 104 || b.z >= 104) {
    warnings.push({
      level: "warning",
      code: "superheavy",
      message:
        "Superheavy element bonding is speculative; structural data is limited or absent.",
    });
  }
  if (pa.radiusEstimated || pb.radiusEstimated) {
    warnings.push({
      level: "warning",
      code: "radius-estimate",
      message: "Bond length uses an estimated covalent radius for at least one atom.",
    });
  }

  // Metal–metal unsupported in this model (except allow with warning for some)
  if (pa.bondBehavior === "metal" && pb.bondBehavior === "metal") {
    warnings.push({
      level: "warning",
      code: "metal-metal",
      message: "Metal–metal bonds are simplified; treat as illustrative only.",
    });
  }

  return { ok: errors.length === 0, errors, warnings };
}

function bondsWithout(m: Molecule, atomId: string, excludeOther: string): number {
  return m.bonds
    .filter((b) => {
      if (b.a !== atomId && b.b !== atomId) return false;
      const other = b.a === atomId ? b.b : b.a;
      return other !== excludeOther;
    })
    .reduce((s, b) => s + b.order, 0);
}

export function validateMolecule(molecule: Molecule): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  for (const bond of molecule.bonds) {
    // Validate each bond in isolation against current graph
    const r = canFormBond(molecule, bond.a, bond.b, bond.order);
    // Re-check without double-counting CN from the bond itself — canFormBond assumes adding;
    // for existing bonds, check H CN and noble separately lightly:
    const a = getAtom(molecule, bond.a);
    const b = getAtom(molecule, bond.b);
    if (!a || !b) {
      errors.push({
        level: "error",
        code: "dangling-bond",
        message: `Bond ${bond.id} references a missing atom.`,
      });
      continue;
    }
    const pa = getChemistryProfile(a.z);
    const pb = getChemistryProfile(b.z);
    if ((pa.z === 2 || pa.z === 10) || (pb.z === 2 || pb.z === 10)) {
      errors.push({
        level: "error",
        code: "inert-noble",
        message: `Invalid bond involving ${pa.symbol} or ${pb.symbol}.`,
      });
    }
    if (pa.bondBehavior === "noble" && pb.bondBehavior === "noble") {
      errors.push({
        level: "error",
        code: "noble-noble",
        message: `${pa.symbol}–${pb.symbol} is invalid.`,
      });
    }
    for (const [atom, profile] of [
      [a, pa],
      [b, pb],
    ] as const) {
      if (profile.z === 1 && coordinationNumber(molecule, atom.id) > 1) {
        errors.push({
          level: "error",
          code: "h-cn",
          message: "Hydrogen has more than one bond.",
        });
      }
      if (coordinationNumber(molecule, atom.id) > profile.maxCoordination) {
        errors.push({
          level: "error",
          code: "max-cn",
          message: `${profile.symbol} exceeds max coordination.`,
        });
      }
      if (bond.order > profile.maxBondOrder) {
        errors.push({
          level: "error",
          code: "order",
          message: `${profile.symbol} cannot have bond order ${bond.order}.`,
        });
      }
    }
    for (const w of r.warnings) {
      if (!warnings.some((x) => x.message === w.message)) warnings.push(w);
    }
  }

  // Isolated atoms OK; check valence sums for nonmetals
  for (const atom of molecule.atoms) {
    const p = getChemistryProfile(atom.z);
    const bos = bondOrderSum(molecule, atom.id);
    if (p.z === 1 && bos > 1) {
      errors.push({
        level: "error",
        code: "h-valence",
        message: "A hydrogen atom has bond-order sum > 1.",
      });
    }
    if (
      (p.bondBehavior === "nonmetal" || p.bondBehavior === "metalloid") &&
      p.z !== 1
    ) {
      const max = p.allowsExpandedOctet ? 6 : p.z === 8 ? 3 : 4;
      if (bos > max) {
        errors.push({
          level: "error",
          code: "valence",
          message: `${p.symbol} bond-order sum ${bos} exceeds ${max}.`,
        });
      }
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}
