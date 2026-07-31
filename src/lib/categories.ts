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

/** Soft pastel fills (Google table–inspired), dark readable type */
export const categoryColors: Record<
  ElementCategory,
  { fill: string; text: string; glow: string }
> = {
  "alkali-metal": {
    fill: "#b7d4ea",
    text: "#1a2a36",
    glow: "rgba(100,150,180,0.4)",
  },
  "alkaline-earth": {
    fill: "#f0c4c8",
    text: "#3a1e24",
    glow: "rgba(200,120,130,0.4)",
  },
  "transition-metal": {
    fill: "#d4c8e4",
    text: "#2a2238",
    glow: "rgba(140,120,180,0.35)",
  },
  "post-transition": {
    fill: "#c5e0c8",
    text: "#1e3224",
    glow: "rgba(100,160,110,0.35)",
  },
  metalloid: {
    fill: "#efe4a8",
    text: "#3a3418",
    glow: "rgba(180,160,60,0.35)",
  },
  nonmetal: {
    fill: "#a8d8e8",
    text: "#1a3038",
    glow: "rgba(80,150,180,0.35)",
  },
  halogen: {
    fill: "#9fd4c4",
    text: "#1a322c",
    glow: "rgba(70,150,130,0.35)",
  },
  "noble-gas": {
    fill: "#f0b8c0",
    text: "#3a1e24",
    glow: "rgba(200,110,120,0.35)",
  },
  lanthanide: {
    fill: "#b0d0e8",
    text: "#1a2a36",
    glow: "rgba(90,140,180,0.35)",
  },
  actinide: {
    fill: "#f0c8a8",
    text: "#3a2818",
    glow: "rgba(200,140,80,0.35)",
  },
  unknown: {
    fill: "#d4d4d4",
    text: "#2a2a2a",
    glow: "rgba(120,120,120,0.3)",
  },
};

export const categoryOrder: ElementCategory[] = [
  "alkali-metal",
  "alkaline-earth",
  "lanthanide",
  "actinide",
  "transition-metal",
  "post-transition",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble-gas",
  "unknown",
];
