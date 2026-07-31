import type { ChemicalElement } from "@/types/element";

/** CSS grid column/row for the standard 18-column table + f-block rows */
export function getGridPosition(el: ChemicalElement): { col: number; row: number } {
  const { atomicNumber: z, period, group } = el;

  // Lanthanides La–Yb sit on period-row 8, cols 3–16
  if (z >= 57 && z <= 70) {
    return { col: z - 54, row: 9 };
  }
  // Actinides Ac–No sit on period-row 9, cols 3–16
  if (z >= 89 && z <= 102) {
    return { col: z - 86, row: 10 };
  }

  // Lu and Lr reclaim group 3 under Y
  if (z === 71 || z === 103) {
    return { col: 3, row: period };
  }

  if (group === null) {
    return { col: 1, row: period };
  }

  return { col: group, row: period };
}

export function formatMass(mass: number): string {
  if (Number.isInteger(mass)) return String(mass);
  const rounded = Math.round(mass * 10000) / 10000;
  return String(rounded);
}

export function formatKelvin(k: number | null): string {
  if (k === null) return "—";
  const c = k - 273.15;
  if (c < -200) return `${k.toFixed(1)} K`;
  return `${c.toFixed(1)} °C`;
}
