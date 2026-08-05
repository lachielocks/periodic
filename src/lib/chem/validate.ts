import { canFormBond, validateMolecule } from "@/lib/chem/bondRules";
import { addBond as rawAddBond } from "@/lib/chem/molecule";
import type { BondOrder, Molecule, ValidationResult } from "@/lib/chem/types";

export { validateMolecule, canFormBond };

/** Attempt to add/update a bond; returns new molecule only if valid. */
export function tryAddBond(
  molecule: Molecule,
  a: string,
  b: string,
  order: BondOrder
): { molecule: Molecule; validation: ValidationResult } {
  const validation = canFormBond(molecule, a, b, order);
  if (!validation.ok) {
    return { molecule, validation };
  }
  const next = rawAddBond(molecule, a, b, order);
  const full = validateMolecule(next);
  if (!full.ok) {
    return {
      molecule,
      validation: {
        ok: false,
        errors: full.errors,
        warnings: [...validation.warnings, ...full.warnings],
      },
    };
  }
  return {
    molecule: next,
    validation: {
      ok: true,
      errors: [],
      warnings: [...validation.warnings, ...full.warnings],
    },
  };
}
