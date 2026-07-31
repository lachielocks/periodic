"use client";

import { Asterisk } from "lucide-react";
import { ElementCell } from "@/components/ElementCell";
import { elements } from "@/data/elements";
import { categoryColors, categoryLabels, categoryOrder } from "@/lib/categories";
import { getGridPosition } from "@/lib/layout";
import type { ElementCategory } from "@/types/element";

interface PeriodicTableProps {
  selectedNumber: number | null;
  filterCategory: ElementCategory | null;
  onSelect: (atomicNumber: number) => void;
  onFilterCategory: (category: ElementCategory | null) => void;
}

export function PeriodicTable({
  selectedNumber,
  filterCategory,
  onSelect,
  onFilterCategory,
}: PeriodicTableProps) {
  return (
    <div className="w-full">
      <div
        className="periodic-grid mx-auto w-full max-w-[1200px]"
        role="grid"
        aria-label="Periodic table of elements"
      >
        {elements.map((el) => {
          const { col, row } = getGridPosition(el);
          const dimmed =
            filterCategory !== null && el.category !== filterCategory;
          return (
            <ElementCell
              key={el.atomicNumber}
              element={el}
              selected={selectedNumber === el.atomicNumber}
              dimmed={dimmed}
              onSelect={onSelect}
              style={{ gridColumn: col, gridRow: row }}
            />
          );
        })}

        {/* Spacer between main block and f-block */}
        <div
          className="h-2 sm:h-3"
          style={{ gridColumn: "1 / -1", gridRow: 8 }}
          aria-hidden
        />

        {/* f-block series labels */}
        <div
          className="flex items-center justify-center text-[var(--muted)]"
          style={{ gridColumn: 2, gridRow: 9 }}
          aria-hidden
        >
          <Asterisk className="size-[clamp(0.55rem,1vw,0.75rem)]" strokeWidth={2} />
        </div>
        <div
          className="flex items-center justify-center gap-px text-[var(--muted)]"
          style={{ gridColumn: 2, gridRow: 10 }}
          aria-hidden
        >
          <Asterisk className="size-[clamp(0.45rem,0.85vw,0.65rem)]" strokeWidth={2} />
          <Asterisk className="size-[clamp(0.45rem,0.85vw,0.65rem)]" strokeWidth={2} />
        </div>
      </div>

      <ul className="mx-auto mt-6 flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-2">
        {categoryOrder.map((cat) => {
          const active = filterCategory === cat;
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onFilterCategory(active ? null : cat)}
                className="flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-[0.7rem] tracking-wide transition-opacity duration-200 hover:opacity-100"
                style={{ opacity: filterCategory && !active ? 0.4 : 1 }}
                aria-pressed={active}
              >
                <span
                  className="inline-block size-2.5 rounded-[2px]"
                  style={{ backgroundColor: categoryColors[cat].fill }}
                />
                <span className="text-[var(--muted)]">{categoryLabels[cat]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
