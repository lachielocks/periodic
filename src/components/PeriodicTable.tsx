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
  showLegend?: boolean;
}

export function PeriodicTable({
  selectedNumber,
  filterCategory,
  onSelect,
  onFilterCategory,
  showLegend = true,
}: PeriodicTableProps) {
  return (
    <div className="w-full">
      <div className="table-scroll -mx-1 overflow-x-auto overflow-y-visible px-1 pb-2 touch-pan-x">
        <div
          className="periodic-grid mx-auto"
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

          <div
            className="h-2 sm:h-3"
            style={{ gridColumn: "1 / -1", gridRow: 8 }}
            aria-hidden
          />

          <div
            className="flex items-center justify-center text-[var(--muted)]"
            style={{ gridColumn: 2, gridRow: 9 }}
            aria-hidden
          >
            <Asterisk
              className="size-[clamp(0.5rem,0.9vw,0.7rem)]"
              strokeWidth={2}
            />
          </div>
          <div
            className="flex items-center justify-center gap-px text-[var(--muted)]"
            style={{ gridColumn: 2, gridRow: 10 }}
            aria-hidden
          >
            <Asterisk
              className="size-[clamp(0.4rem,0.75vw,0.6rem)]"
              strokeWidth={2}
            />
            <Asterisk
              className="size-[clamp(0.4rem,0.75vw,0.6rem)]"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {showLegend && (
        <CategoryLegend
          filterCategory={filterCategory}
          onFilterCategory={onFilterCategory}
        />
      )}
    </div>
  );
}

export function CategoryLegend({
  filterCategory,
  onFilterCategory,
}: {
  filterCategory: ElementCategory | null;
  onFilterCategory: (category: ElementCategory | null) => void;
}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {categoryOrder.map((cat) => {
        const active = filterCategory === cat;
        return (
          <li key={cat}>
            <button
              type="button"
              onClick={() => onFilterCategory(active ? null : cat)}
              className="flex items-center gap-1.5 rounded-sm py-0.5 text-[0.7rem] tracking-wide transition-opacity duration-200"
              style={{ opacity: filterCategory && !active ? 0.35 : 1 }}
              aria-pressed={active}
            >
              <span
                className="inline-block size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: categoryColors[cat].fill }}
              />
              <span className="text-[var(--muted)] whitespace-nowrap">
                {categoryLabels[cat]}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
