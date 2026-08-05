export type BondOrder = 1 | 2 | 3;

export type BondBehavior =
  | "nonmetal"
  | "metalloid"
  | "metal"
  | "noble"
  | "unknown";

export interface ChemistryProfile {
  z: number;
  symbol: string;
  valenceElectrons: number;
  commonOxidationStates: number[];
  maxCoordination: number;
  preferredCoordination: number[];
  bondBehavior: BondBehavior;
  allowsExpandedOctet: boolean;
  minBondOrder: number;
  maxBondOrder: number;
  covalentRadiusSinglePm: number | null;
  radiusEstimated: boolean;
  electronegativity: number | null;
  category: string;
  group: number | null;
  period: number;
  block: string;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface AtomNode {
  id: string;
  z: number;
  formalCharge?: number;
  coords?: Vec3;
}

export interface BondEdge {
  id: string;
  a: string;
  b: string;
  order: BondOrder;
}

export interface Molecule {
  atoms: AtomNode[];
  bonds: BondEdge[];
}

export interface ValidationIssue {
  level: "error" | "warning";
  code: string;
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export type VseprShape =
  | "linear"
  | "bent"
  | "trigonal-planar"
  | "trigonal-pyramidal"
  | "tetrahedral"
  | "seesaw"
  | "t-shaped"
  | "trigonal-bipyramidal"
  | "square-planar"
  | "square-pyramidal"
  | "octahedral"
  | "pentagonal-bipyramidal"
  | "unknown";

export interface AtomGeometry {
  atomId: string;
  stericNumber: number;
  bondingDomains: number;
  lonePairs: number;
  shape: VseprShape;
  idealAngleDeg: number;
}
