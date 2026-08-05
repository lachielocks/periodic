import { getChemistryProfile } from "@/data/chemistryProfiles";
import type { AtomNode, BondEdge, BondOrder, Molecule } from "@/lib/chem/types";

export function emptyMolecule(): Molecule {
  return { atoms: [], bonds: [] };
}

export function cloneMolecule(m: Molecule): Molecule {
  return {
    atoms: m.atoms.map((a) => ({ ...a, coords: a.coords ? { ...a.coords } : undefined })),
    bonds: m.bonds.map((b) => ({ ...b })),
  };
}

export function getAtom(m: Molecule, id: string): AtomNode | undefined {
  return m.atoms.find((a) => a.id === id);
}

export function bondsOf(m: Molecule, atomId: string): BondEdge[] {
  return m.bonds.filter((b) => b.a === atomId || b.b === atomId);
}

export function neighbors(m: Molecule, atomId: string): string[] {
  return bondsOf(m, atomId).map((b) => (b.a === atomId ? b.b : b.a));
}

export function bondOrderSum(m: Molecule, atomId: string): number {
  return bondsOf(m, atomId).reduce((s, b) => s + b.order, 0);
}

export function coordinationNumber(m: Molecule, atomId: string): number {
  return bondsOf(m, atomId).length;
}

export function findBond(m: Molecule, a: string, b: string): BondEdge | undefined {
  return m.bonds.find(
    (bond) =>
      (bond.a === a && bond.b === b) || (bond.a === b && bond.b === a)
  );
}

let idCounter = 0;
export function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}_${idCounter}_${Math.random().toString(36).slice(2, 7)}`;
}

export function resetIdCounter(): void {
  idCounter = 0;
}

export function symbolOf(z: number): string {
  return getChemistryProfile(z).symbol;
}

export function addAtom(m: Molecule, z: number): { molecule: Molecule; atomId: string } {
  const atom: AtomNode = { id: nextId("a"), z };
  return { molecule: { ...m, atoms: [...m.atoms, atom] }, atomId: atom.id };
}

export function removeAtom(m: Molecule, atomId: string): Molecule {
  return {
    atoms: m.atoms.filter((a) => a.id !== atomId),
    bonds: m.bonds.filter((b) => b.a !== atomId && b.b !== atomId),
  };
}

export function addBond(
  m: Molecule,
  a: string,
  b: string,
  order: BondOrder
): Molecule {
  if (a === b) return m;
  if (findBond(m, a, b)) {
    return {
      ...m,
      bonds: m.bonds.map((bond) =>
        (bond.a === a && bond.b === b) || (bond.a === b && bond.b === a)
          ? { ...bond, order }
          : bond
      ),
    };
  }
  return {
    ...m,
    bonds: [...m.bonds, { id: nextId("b"), a, b, order }],
  };
}

export function removeBond(m: Molecule, bondId: string): Molecule {
  return { ...m, bonds: m.bonds.filter((b) => b.id !== bondId) };
}
