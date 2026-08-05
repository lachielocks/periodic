import { getChemistryProfile } from "@/data/chemistryProfiles";
import { elements } from "@/data/elements";
import type { Molecule } from "@/lib/chem/types";

/** Hill system molecular formula */
export function hillFormula(molecule: Molecule): string {
  const counts = new Map<string, number>();
  for (const a of molecule.atoms) {
    const sym = getChemistryProfile(a.z).symbol;
    counts.set(sym, (counts.get(sym) ?? 0) + 1);
  }
  if (counts.size === 0) return "";

  const hasC = counts.has("C");
  const parts: string[] = [];

  const fmt = (sym: string) => {
    const n = counts.get(sym);
    if (!n) return;
    parts.push(n === 1 ? sym : `${sym}${n}`);
    counts.delete(sym);
  };

  if (hasC) {
    fmt("C");
    fmt("H");
  }
  [...counts.keys()].sort().forEach(fmt);
  return parts.join("");
}

/** Curated common names keyed by Hill formula (neutral) or formula+charge */
const COMMON_NAMES: Record<string, string> = {
  H2: "dihydrogen",
  O2: "dioxygen",
  N2: "dinitrogen",
  F2: "difluorine",
  Cl2: "dichlorine",
  Br2: "dibromine",
  I2: "diiodine",
  H2O: "water",
  H2O2: "hydrogen peroxide",
  NH3: "ammonia",
  CH4: "methane",
  C2H6: "ethane",
  C2H4: "ethene",
  C2H2: "ethyne",
  CO: "carbon monoxide",
  CO2: "carbon dioxide",
  NO: "nitrogen monoxide",
  NO2: "nitrogen dioxide",
  N2O: "nitrous oxide",
  SO2: "sulfur dioxide",
  SO3: "sulfur trioxide",
  HCl: "hydrogen chloride",
  HF: "hydrogen fluoride",
  HBr: "hydrogen bromide",
  HI: "hydrogen iodide",
  H2S: "hydrogen sulfide",
  PH3: "phosphine",
  SiH4: "silane",
  BF3: "boron trifluoride",
  BCl3: "boron trichloride",
  CF4: "tetrafluoromethane",
  CCl4: "tetrachloromethane",
  SF6: "sulfur hexafluoride",
  XeF2: "xenon difluoride",
  XeF4: "xenon tetrafluoride",
  XeF6: "xenon hexafluoride",
  PCl3: "phosphorus trichloride",
  PCl5: "phosphorus pentachloride",
  NaCl: "sodium chloride",
  KCl: "potassium chloride",
  NaF: "sodium fluoride",
  LiF: "lithium fluoride",
  MgO: "magnesium oxide",
  CaO: "calcium oxide",
  Fe2O3: "iron(III) oxide",
  Al2O3: "aluminium oxide",
  O3: "ozone",
};

export function connectivityString(molecule: Molecule): string {
  if (molecule.atoms.length === 0) return "";
  const byId = Object.fromEntries(
    molecule.atoms.map((a) => [a.id, getChemistryProfile(a.z).symbol])
  );
  const bondBits = molecule.bonds.map((b) => {
    const sa = byId[b.a];
    const sb = byId[b.b];
    const [left, right] = sa <= sb ? [sa, sb] : [sb, sa];
    const bar = b.order === 1 ? "–" : b.order === 2 ? "=" : "≡";
    return `${left}${bar}${right}`;
  });
  bondBits.sort();
  const formula = hillFormula(molecule);
  if (bondBits.length === 0) return formula || "empty";
  return `${formula} (${bondBits.join(", ")})`;
}

export function nameMolecule(molecule: Molecule): {
  formula: string;
  name: string;
  source: "curated" | "connectivity" | "empty";
} {
  const formula = hillFormula(molecule);
  if (!formula) return { formula: "", name: "Empty", source: "empty" };
  const curated = COMMON_NAMES[formula];
  if (curated) return { formula, name: curated, source: "curated" };
  // Single atom
  if (molecule.atoms.length === 1) {
    const el = elements[molecule.atoms[0].z - 1];
    return { formula, name: el?.name ?? formula, source: "curated" };
  }
  return {
    formula,
    name: connectivityString(molecule),
    source: "connectivity",
  };
}
