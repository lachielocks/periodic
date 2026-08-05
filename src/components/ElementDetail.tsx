"use client";

import {
  Atom,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { categoryColors, categoryLabels } from "@/lib/categories";
import { approximateNeutrons, formatElectronShells } from "@/lib/electrons";
import { formatKelvin, formatMass } from "@/lib/layout";
import type { ChemicalElement } from "@/types/element";

const AtomViewer = dynamic(
  () => import("@/components/AtomViewer").then((m) => m.AtomViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 text-sm text-[var(--muted)]">
        <Atom className="size-5 animate-pulse" aria-hidden />
        Assembling atom…
      </div>
    ),
  }
);

interface ElementDetailProps {
  element: ChemicalElement;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ElementDetail({
  element,
  onClose,
  onPrev,
  onNext,
}: ElementDetailProps) {
  const colors = categoryColors[element.category];
  const [showMore, setShowMore] = useState(false);

  const protons = element.atomicNumber;
  const electrons = element.atomicNumber;
  const neutrons = useMemo(
    () => approximateNeutrons(element.atomicNumber, element.atomicMass),
    [element.atomicNumber, element.atomicMass]
  );

  const summary = element.funFact ?? element.description;

  return (
    <aside
      className="detail-panel relative flex h-full min-h-0 flex-col overflow-hidden"
      aria-label={`${element.name} details`}
    >
      <header className="relative flex shrink-0 items-start justify-between gap-3 border-b border-[var(--line)] px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
        <div className="min-w-0">
          <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-[1.75rem]">
            {element.name}{" "}
            <span className="font-normal text-[var(--ink-soft)]">
              ({element.symbol})
            </span>
            <sup className="ml-0.5 font-mono text-[0.55em] font-medium text-[var(--muted)]">
              {element.atomicNumber}
            </sup>
          </h2>
          <p className="mt-1 font-mono text-[0.7rem] tracking-wide text-[var(--muted)] uppercase">
            {categoryLabels[element.category]}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            className="nav-btn"
            aria-label="Previous element"
          >
            <ChevronLeft className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="nav-btn"
            aria-label="Next element"
          >
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="nav-btn ml-1"
            aria-label="Close details"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
        <div className="atom-stage mb-4 overflow-hidden rounded-md">
          <AtomViewer element={element} />
        </div>

        <p className="mb-5 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
          {summary}
        </p>

        <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <PropRow label="Symbol" value={element.symbol} />
          <PropRow
            label="Atomic mass"
            value={`${formatMass(element.atomicMass)} u`}
          />
          <PropRow label="Protons" value={String(protons)} />
          <PropRow label="Electrons" value={String(electrons)} />
          <PropRow label="Neutrons" value={`≈ ${neutrons}`} />
          <PropRow
            label="Electron configuration"
            value={formatElectronShells(element.atomicNumber)}
          />
          <PropRow
            label="Density"
            value={
              element.density !== null ? `${element.density} g/cm³` : "—"
            }
          />
          <PropRow
            label="Melting point"
            value={formatKelvin(element.meltingPoint)}
          />
          <PropRow
            label="Boiling point"
            value={formatKelvin(element.boilingPoint)}
          />
          <PropRow
            label="Year of discovery"
            value={
              element.discoveryYear !== null
                ? String(element.discoveryYear)
                : "Ancient"
            }
          />
        </dl>

        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
        >
          {showMore ? "Less about" : "More about"} {element.name}
          <ChevronRight
            className={`size-4 transition-transform ${showMore ? "rotate-90" : ""}`}
            strokeWidth={1.75}
          />
        </button>

        {showMore && (
          <div className="mt-4 space-y-4 border-t border-[var(--line)] pt-4 pb-2">
            <div>
              <h3 className="section-label">About</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--ink-soft)]">
                {element.description}
              </p>
            </div>
            <div>
              <h3 className="section-label">Examples of use</h3>
              <ul className="mt-2 space-y-2">
                {element.uses.map((use) => (
                  <li
                    key={use}
                    className="flex gap-2 text-[0.9rem] leading-snug text-[var(--ink-soft)]"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: colors.fill }}
                    />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function PropRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-[var(--muted)]">{label}</dt>
      <dd className="text-right font-mono text-sm break-all text-[var(--ink)]">
        {value}
      </dd>
    </div>
  );
}
