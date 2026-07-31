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
      className={`element-cell group relative flex aspect-square min-h-0 min-w-0 flex-col items-start justify-between overflow-hidden rounded-[2px] p-[clamp(0.12rem,0.35vw,0.35rem)] text-left transition-[box-shadow,opacity,transform,filter] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)] ${
        selected ? "element-cell-selected" : ""
      }`}
      style={{
        ...style,
        backgroundColor: colors.fill,
        color: colors.text,
        opacity: dimmed ? 0.28 : 1,
        zIndex: selected ? 3 : 1,
        boxShadow: selected
          ? `0 0 0 2px #fff, 0 0 0 3.5px ${colors.text}, 0 6px 20px ${colors.glow}`
          : "0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <span className="font-mono text-[clamp(0.4rem,0.75vw,0.65rem)] leading-none opacity-70">
        {element.atomicNumber}
      </span>
      <span className="w-full text-center font-display text-[clamp(0.65rem,1.45vw,1.25rem)] font-semibold leading-none tracking-tight">
        {element.symbol}
      </span>
      <span className="w-full truncate text-center text-[clamp(0.32rem,0.55vw,0.5rem)] leading-tight opacity-65">
        {element.name}
      </span>
    </button>
  );
}
