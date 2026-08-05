import { cloneMolecule, emptyMolecule } from "@/lib/chem/molecule";
import type { Molecule } from "@/lib/chem/types";

export class MoleculeHistory {
  private past: Molecule[] = [];
  private present: Molecule;

  constructor(initial: Molecule = emptyMolecule()) {
    this.present = cloneMolecule(initial);
  }

  get current(): Molecule {
    return this.present;
  }

  push(next: Molecule): void {
    this.past.push(cloneMolecule(this.present));
    if (this.past.length > 100) this.past.shift();
    this.present = cloneMolecule(next);
  }

  undo(): Molecule | null {
    const prev = this.past.pop();
    if (!prev) return null;
    this.present = prev;
    return cloneMolecule(this.present);
  }

  canUndo(): boolean {
    return this.past.length > 0;
  }

  clear(): void {
    this.past = [];
    this.present = emptyMolecule();
  }
}

export const LAB_STORAGE_KEY = "periodic-lab-draft";

export function loadDraft(): Molecule | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAB_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Molecule;
    if (!parsed?.atoms || !parsed?.bonds) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(molecule: Molecule): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(molecule));
  } catch {
    /* ignore quota */
  }
}
