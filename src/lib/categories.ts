import type { ElementCategory } from "@/types/element";

export const categoryLabels: Record<ElementCategory, string> = {
  "alkali-metal": "Alkali metal",
  "alkaline-earth": "Alkaline earth",
  "transition-metal": "Transition metal",
  "post-transition": "Post-transition",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Unknown",
};

/** Soft, museum-board palette — no neon purple glow */
export const categoryColors: Record<
  ElementCategory,
  { fill: string; text: string; glow: string }
> = {
  "alkali-metal": { fill: "#c45c4a", text: "#fff5f2", glow: "rgba(196,92,74,0.35)" },
  "alkaline-earth": { fill: "#c48a3a", text: "#fff8ef", glow: "rgba(196,138,58,0.35)" },
  "transition-metal": { fill: "#3d7a8c", text: "#f0f8fa", glow: "rgba(61,122,140,0.35)" },
  "post-transition": { fill: "#4a8f7a", text: "#f0faf6", glow: "rgba(74,143,122,0.35)" },
  metalloid: { fill: "#6b8f4e", text: "#f4faf0", glow: "rgba(107,143,78,0.35)" },
  nonmetal: { fill: "#8a9e4a", text: "#f7faef", glow: "rgba(138,158,74,0.35)" },
  halogen: { fill: "#5c9e6e", text: "#f0faf3", glow: "rgba(92,158,110,0.35)" },
  "noble-gas": { fill: "#4a8f9e", text: "#eff8fa", glow: "rgba(74,143,158,0.35)" },
  lanthanide: { fill: "#a66b5c", text: "#faf4f2", glow: "rgba(166,107,92,0.35)" },
  actinide: { fill: "#8c6b7a", text: "#faf2f6", glow: "rgba(140,107,122,0.35)" },
  unknown: { fill: "#6a6e72", text: "#f2f3f4", glow: "rgba(106,110,114,0.35)" },
};

export const categoryOrder: ElementCategory[] = [
  "alkali-metal",
  "alkaline-earth",
  "transition-metal",
  "post-transition",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble-gas",
  "lanthanide",
  "actinide",
  "unknown",
];
