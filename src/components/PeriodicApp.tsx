"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ElementDetail } from "@/components/ElementDetail";
import {
  CategoryLegend,
  PeriodicTable,
} from "@/components/PeriodicTable";
import { elements } from "@/data/elements";
import type { ElementCategory } from "@/types/element";

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function PeriodicApp() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<ElementCategory | null>(null);
  const isMobile = useIsMobile();

  const element = selected !== null ? elements[selected - 1] : null;
  const showPanel = element !== null;

  const select = useCallback((n: number) => {
    setSelected((current) => (current === n ? null : n));
  }, []);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setSelected((n) => {
      if (n === null) return 1;
      return n <= 1 ? 118 : n - 1;
    });
  }, []);

  const next = useCallback(() => {
    setSelected((n) => {
      if (n === null) return 1;
      return n >= 118 ? 1 : n + 1;
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && selected !== null) prev();
      if (e.key === "ArrowRight" && selected !== null) next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, prev, next, selected]);

  useEffect(() => {
    if (showPanel && isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showPanel, isMobile]);

  const detail = element ? (
    <ElementDetail
      element={element}
      onClose={close}
      onPrev={prev}
      onNext={next}
    />
  ) : null;

  return (
    <AppShell subtitle="Tap an element for its atom, story, and uses.">
      <main className="relative mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col gap-3 overflow-hidden px-3 py-2 sm:px-6 lg:flex-row lg:items-stretch lg:gap-5 lg:px-8">
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain">
          <PeriodicTable
            selectedNumber={selected}
            filterCategory={filter}
            onSelect={select}
            onFilterCategory={setFilter}
            showLegend={false}
          />
        </div>

        {!isMobile && showPanel && (
          <div className="detail-shell detail-shell-fixed shrink-0 self-start">
            {detail}
          </div>
        )}
      </main>

      <footer className="relative z-10 shrink-0 border-t border-[var(--line)] bg-[var(--paper)] px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="shrink-0 font-display text-sm font-semibold tracking-tight text-[var(--ink)] sm:text-base">
            Periodic
            <span className="ml-2 font-sans text-xs font-normal text-[var(--muted)]">
              118 elements
            </span>
          </p>
          <div className="min-w-0 overflow-x-auto">
            <CategoryLegend
              filterCategory={filter}
              onFilterCategory={setFilter}
            />
          </div>
        </div>
      </footer>

      {isMobile && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              showPanel ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={close}
            aria-hidden
          />
          <div
            className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col overflow-hidden rounded-t-2xl bg-[var(--panel)] shadow-[0_-12px_40px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out ${
              showPanel ? "translate-y-0" : "translate-y-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!showPanel}
          >
            <div className="flex shrink-0 justify-center pt-2.5 pb-1">
              <span className="h-1 w-10 rounded-full bg-[var(--line)]" />
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">{detail}</div>
          </div>
        </>
      )}
    </AppShell>
  );
}
