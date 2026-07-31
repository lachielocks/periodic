export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth"
  | "transition-metal"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export type ElementBlock = "s" | "p" | "d" | "f";

export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  group: number | null;
  period: number;
  block: ElementBlock;
  electronConfiguration: string;
  electronegativity: number | null;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  discoveryYear: number | null;
  description: string;
  uses: string[];
  funFact: string | null;
}
