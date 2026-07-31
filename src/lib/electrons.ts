/** Bohr-style shell capacities (K–Q) */
const SHELL_CAPACITY = [2, 8, 18, 32, 32, 18, 8];

/** Distribute electrons into shells for a simplified Bohr atom */
export function electronShells(atomicNumber: number): number[] {
  let remaining = Math.max(0, Math.min(atomicNumber, 118));
  const shells: number[] = [];

  for (const capacity of SHELL_CAPACITY) {
    if (remaining <= 0) break;
    const count = Math.min(capacity, remaining);
    shells.push(count);
    remaining -= count;
  }

  return shells;
}

/** Approximate neutron count from mass number (rounded atomic mass − Z) */
export function approximateNeutrons(atomicNumber: number, atomicMass: number): number {
  return Math.max(0, Math.round(atomicMass) - atomicNumber);
}
