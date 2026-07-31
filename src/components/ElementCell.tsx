"use client";

import type { CSSProperties } from "react";
import { categoryColors } from "@/lib/categories";
import type { ChemicalElement } from "@/types/element";

interface ElementCellProps {
  element: ChemicalElement;
  selected: boolean;
  dimmed: boolean;
  onSelect: (atomicNumber: number) => void;
  style?: CSSProperties;
}

export function ElementCell({
  element,
  selected,
  dimmed,
  onSelect,
  style,
}: ElementCellProps) {
  const colors = categoryColors[element.category];

  return (
    <button
      type="button"
      onClick={() => onSelect(element.atomicNumber)}
      aria-label={`${element.name}, atomic number ${element.atomicNumber}`}
      aria-pressed={selected}
      className="element-cell group relative flex aspect-square min-h-0 min-w-0 flex-col items-start justify-between overflow-hidden rounded-[3px] p-[clamp(0.15rem,0.4vw,0.4rem)] text-left transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      style={{
        ...style,
        backgroundColor: colors.fill,
        color: colors.text,
        opacity: dimmed ? 0.28 : 1,
        transform: selected ? "scale(1.08)" : undefined,
        zIndex: selected ? 2 : 1,
        boxShadow: selected
          ? `0 0 0 2px var(--ink), 0 8px 28px ${colors.glow}`
          : undefined,
      }}
    >
      <span className="font-mono text-[clamp(0.45rem,0.85vw,0.7rem)] leading-none opacity-80">
        {element.atomicNumber}
      </span>
      <span className="w-full text-center font-display text-[clamp(0.7rem,1.6vw,1.35rem)] font-semibold leading-none tracking-tight">
        {element.symbol}
      </span>
      <span className="w-full truncate text-center text-[clamp(0.35rem,0.65vw,0.55rem)] leading-tight opacity-75">
        {element.name}
      </span>
    </button>
  );
}
