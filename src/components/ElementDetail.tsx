"use client";

import { Atom, ChevronLeft, ChevronRight, X } from "lucide-react";
import dynamic from "next/dynamic";
import { categoryColors, categoryLabels } from "@/lib/categories";
import { formatKelvin, formatMass } from "@/lib/layout";
import type { ChemicalElement } from "@/types/element";

const AtomViewer = dynamic(
  () =>
    import("@/components/AtomViewer").then((m) => m.AtomViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 text-sm text-[var(--muted)]">
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

  return (
    <aside
      className="detail-panel relative flex h-full flex-col overflow-hidden"
      aria-label={`${element.name} details`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, ${colors.fill}, transparent 55%)`,
        }}
      />

      <header className="relative flex items-start justify-between gap-3 border-b border-[var(--line)] px-5 pb-4 pt-5 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-widest text-[var(--muted)] uppercase">
            {String(element.atomicNumber).padStart(3, "0")} ·{" "}
            {categoryLabels[element.category]}
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {element.name}
          </h2>
          <p className="mt-1 font-mono text-sm text-[var(--muted)]">
            {element.symbol} · {formatMass(element.atomicMass)} u
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

      <div className="relative flex-1 overflow-y-auto px-5 py-5 sm:px-6">
        <div className="atom-stage mb-6 overflow-hidden rounded-sm">
          <AtomViewer element={element} />
        </div>

        <section className="mb-6">
          <h3 className="section-label">About</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">
            {element.description}
          </p>
          {element.funFact && (
            <p className="mt-3 border-l-2 border-[var(--accent)] pl-3 text-sm leading-relaxed text-[var(--muted)] italic">
              {element.funFact}
            </p>
          )}
        </section>

        <section className="mb-6">
          <h3 className="section-label">Examples of use</h3>
          <ul className="mt-3 space-y-2">
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
        </section>

        <section>
          <h3 className="section-label">Properties</h3>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            <Prop label="Configuration" value={element.electronConfiguration} wide />
            <Prop label="Block" value={`${element.block}-block`} />
            <Prop
              label="Group"
              value={element.group !== null ? String(element.group) : "—"}
            />
            <Prop label="Period" value={String(element.period)} />
            <Prop
              label="Electronegativity"
              value={
                element.electronegativity !== null
                  ? element.electronegativity.toFixed(2)
                  : "—"
              }
            />
            <Prop
              label="Density"
              value={
                element.density !== null ? `${element.density} g/cm³` : "—"
              }
            />
            <Prop label="Melting point" value={formatKelvin(element.meltingPoint)} />
            <Prop label="Boiling point" value={formatKelvin(element.boilingPoint)} />
            <Prop
              label="Discovered"
              value={
                element.discoveryYear !== null
                  ? String(element.discoveryYear)
                  : "Ancient"
              }
            />
          </dl>
        </section>
      </div>
    </aside>
  );
}

function Prop({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm text-[var(--ink)]">{value}</dd>
    </div>
  );
}
