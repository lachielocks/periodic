/**
 * Aufbau subshell order: [principal quantum number n, capacity].
 * Electrons fill in this order, then are tallied into Bohr shells by n.
 */
const AUFBAU: ReadonlyArray<readonly [n: number, capacity: number]> = [
  [1, 2], // 1s
  [2, 2], // 2s
  [2, 6], // 2p
  [3, 2], // 3s
  [3, 6], // 3p
  [4, 2], // 4s
  [3, 10], // 3d
  [4, 6], // 4p
  [5, 2], // 5s
  [4, 10], // 4d
  [5, 6], // 5p
  [6, 2], // 6s
  [4, 14], // 4f
  [5, 10], // 5d
  [6, 6], // 6p
  [7, 2], // 7s
  [5, 14], // 5f
  [6, 10], // 6d
  [7, 6], // 7p
];

/**
 * Ground-state exceptions (shell electrons by n, 1-indexed as array).
 * Covers Cr/Cu and later anomalous d/f fillings used in educational tables.
 */
const SHELL_EXCEPTIONS: Readonly<Record<number, readonly number[]>> = {
  24: [2, 8, 13, 1], // Cr  [Ar] 3d⁵ 4s¹
  29: [2, 8, 18, 1], // Cu  [Ar] 3d¹⁰ 4s¹
  41: [2, 8, 18, 12, 1], // Nb
  42: [2, 8, 18, 13, 1], // Mo
  44: [2, 8, 18, 15, 1], // Ru
  45: [2, 8, 18, 16, 1], // Rh
  46: [2, 8, 18, 18], // Pd
  47: [2, 8, 18, 18, 1], // Ag
  57: [2, 8, 18, 18, 9, 2], // La
  58: [2, 8, 18, 19, 9, 2], // Ce
  64: [2, 8, 18, 25, 9, 2], // Gd
  78: [2, 8, 18, 32, 17, 1], // Pt
  79: [2, 8, 18, 32, 18, 1], // Au
  89: [2, 8, 18, 32, 18, 9, 2], // Ac
  90: [2, 8, 18, 32, 18, 10, 2], // Th
  91: [2, 8, 18, 32, 20, 9, 2], // Pa
  92: [2, 8, 18, 32, 21, 9, 2], // U
  93: [2, 8, 18, 32, 22, 9, 2], // Np
  96: [2, 8, 18, 32, 25, 9, 2], // Cm
};

/** Distribute electrons into Bohr shells using Aufbau (+ known exceptions) */
export function electronShells(atomicNumber: number): number[] {
  const z = Math.max(0, Math.min(atomicNumber, 118));
  if (z === 0) return [];

  const exception = SHELL_EXCEPTIONS[z];
  if (exception) return [...exception];

  const byN: number[] = [];
  let remaining = z;

  for (const [n, capacity] of AUFBAU) {
    if (remaining <= 0) break;
    const count = Math.min(capacity, remaining);
    byN[n - 1] = (byN[n - 1] ?? 0) + count;
    remaining -= count;
  }

  // Drop trailing empty shells (shouldn't happen for Z ≤ 118)
  while (byN.length > 0 && byN[byN.length - 1] === 0) byN.pop();
  return byN;
}

/** e.g. Na → "2, 8, 1" */
export function formatElectronShells(atomicNumber: number): string {
  return electronShells(atomicNumber).join(", ");
}

/** Approximate neutron count from mass number (rounded atomic mass − Z) */
export function approximateNeutrons(
  atomicNumber: number,
  atomicMass: number
): number {
  return Math.max(0, Math.round(atomicMass) - atomicNumber);
}
