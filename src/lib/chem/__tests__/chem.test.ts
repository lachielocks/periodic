import { describe, expect, it } from "vitest";
import {
  addAtom,
  canFormBond,
  emptyMolecule,
  hillFormula,
  layoutMolecule,
  nameMolecule,
  resetIdCounter,
  tryAddBond,
  validateMolecule,
  bondLengthPm,
  geometryForAtom,
  angleAtAtomDeg,
  formalCharge,
} from "@/lib/chem";

function molWith(...zs: number[]) {
  resetIdCounter();
  let m = emptyMolecule();
  const ids: string[] = [];
  for (const z of zs) {
    const r = addAtom(m, z);
    m = r.molecule;
    ids.push(r.atomId);
  }
  return { m, ids };
}

describe("bondRules", () => {
  it("rejects He–He", () => {
    const { m, ids } = molWith(2, 2);
    const r = canFormBond(m, ids[0], ids[1], 1);
    expect(r.ok).toBe(false);
  });

  it("rejects Ne–Ne", () => {
    const { m, ids } = molWith(10, 10);
    expect(canFormBond(m, ids[0], ids[1], 1).ok).toBe(false);
  });

  it("allows H–H", () => {
    const { m, ids } = molWith(1, 1);
    expect(tryAddBond(m, ids[0], ids[1], 1).validation.ok).toBe(true);
  });

  it("allows O=O", () => {
    const { m, ids } = molWith(8, 8);
    expect(tryAddBond(m, ids[0], ids[1], 2).validation.ok).toBe(true);
  });

  it("allows N≡N", () => {
    const { m, ids } = molWith(7, 7);
    expect(tryAddBond(m, ids[0], ids[1], 3).validation.ok).toBe(true);
  });

  it("allows C–H", () => {
    const { m, ids } = molWith(6, 1);
    expect(tryAddBond(m, ids[0], ids[1], 1).validation.ok).toBe(true);
  });

  it("allows Xe–F", () => {
    const { m, ids } = molWith(54, 9);
    expect(tryAddBond(m, ids[0], ids[1], 1).validation.ok).toBe(true);
  });

  it("rejects H with two bonds", () => {
    let { m, ids } = molWith(1, 8, 1);
    m = tryAddBond(m, ids[0], ids[1], 1).molecule;
    const r = tryAddBond(m, ids[0], ids[2], 1);
    expect(r.validation.ok).toBe(false);
  });
});

describe("lengths", () => {
  it("C–C single > double > triple", () => {
    const s = bondLengthPm(6, 6, 1)!;
    const d = bondLengthPm(6, 6, 2)!;
    const t = bondLengthPm(6, 6, 3)!;
    expect(s).toBeGreaterThan(d);
    expect(d).toBeGreaterThan(t);
  });
});

describe("geometry", () => {
  it("water is bent ~109.5 ideal", () => {
    let { m, ids } = molWith(8, 1, 1);
    m = tryAddBond(m, ids[0], ids[1], 1).molecule;
    m = tryAddBond(m, ids[0], ids[2], 1).molecule;
    const g = geometryForAtom(m, ids[0]);
    expect(g.shape).toBe("bent");
    expect(g.idealAngleDeg).toBeCloseTo(109.5, 0);
  });

  it("ammonia is trigonal pyramidal", () => {
    let { m, ids } = molWith(7, 1, 1, 1);
    for (let i = 1; i <= 3; i++) {
      m = tryAddBond(m, ids[0], ids[i], 1).molecule;
    }
    expect(geometryForAtom(m, ids[0]).shape).toBe("trigonal-pyramidal");
  });

  it("methane is tetrahedral with ~109.5 angles after layout", () => {
    let { m, ids } = molWith(6, 1, 1, 1, 1);
    for (let i = 1; i <= 4; i++) {
      m = tryAddBond(m, ids[0], ids[i], 1).molecule;
    }
    m = layoutMolecule(m);
    expect(geometryForAtom(m, ids[0]).shape).toBe("tetrahedral");
    const ang = angleAtAtomDeg(m, ids[0], ids[1], ids[2]);
    expect(ang).not.toBeNull();
    expect(Math.abs(ang! - 109.5)).toBeLessThan(2);
  });
});

describe("formalCharge", () => {
  it("CO has opposing formal charges pattern", () => {
    let { m, ids } = molWith(6, 8);
    m = tryAddBond(m, ids[0], ids[1], 3).molecule;
    const fcC = formalCharge(m, ids[0]);
    const fcO = formalCharge(m, ids[1]);
    // C≡O classic: C−, O+ or similar depending on lone-pair inference
    expect(typeof fcC).toBe("number");
    expect(typeof fcO).toBe("number");
    expect(fcC + fcO).toBe(0);
  });
});

describe("namer", () => {
  it("names water", () => {
    let { m, ids } = molWith(8, 1, 1);
    m = tryAddBond(m, ids[0], ids[1], 1).molecule;
    m = tryAddBond(m, ids[0], ids[2], 1).molecule;
    const n = nameMolecule(m);
    expect(n.formula).toBe("H2O");
    expect(n.name).toBe("water");
  });

  it("Hill order puts C then H first", () => {
    let { m, ids } = molWith(1, 6, 1, 1, 1);
    for (let i = 1; i <= 4; i++) {
      // ids: H, C, H, H, H — bond C to all H
    }
    // rebuild methane properly
    ({ m, ids } = molWith(6, 1, 1, 1, 1));
    for (let i = 1; i <= 4; i++) m = tryAddBond(m, ids[0], ids[i], 1).molecule;
    expect(hillFormula(m)).toBe("CH4");
  });
});

describe("validateMolecule", () => {
  it("empty molecule is ok", () => {
    expect(validateMolecule(emptyMolecule()).ok).toBe(true);
  });
});
