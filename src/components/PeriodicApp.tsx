"use client";

import { useCallback, useEffect, useState } from "react";
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
    <div className="flex min-h-full flex-1 flex-col bg-[var(--paper)]">
      <header className="relative shrink-0 px-4 pb-3 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <div className="atmosphere" aria-hidden />
        <div className="relative mx-auto flex max-w-[1500px] items-end justify-between gap-4">
          <div>
            <h1 className="brand-title font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--ink)]">
              Periodic
            </h1>
            <p className="mt-1.5 max-w-sm text-sm text-[var(--ink-soft)] sm:text-[0.95rem]">
              Tap an element for its atom, story, and uses.
            </p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-4 px-3 pb-4 sm:px-6 lg:flex-row lg:items-stretch lg:gap-5 lg:px-8 lg:pb-6">
        <div
          className={`min-w-0 flex-1 transition-[flex-basis] duration-300 ${
            showPanel && !isMobile ? "lg:flex-[1.4]" : ""
          }`}
        >
          <PeriodicTable
            selectedNumber={selected}
            filterCategory={filter}
            onSelect={select}
            onFilterCategory={setFilter}
            showLegend={false}
          />
        </div>

        {!isMobile && (
          <div
            className={`detail-shell shrink-0 overflow-hidden transition-all duration-300 ease-out ${
              showPanel
                ? "w-full max-w-[400px] opacity-100 xl:max-w-[440px]"
                : "pointer-events-none w-0 max-w-0 opacity-0"
            }`}
          >
            {showPanel && (
              <div className="h-full min-h-[560px] w-[min(100%,400px)] xl:w-[440px]">
                {detail}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="relative mt-auto border-t border-[var(--line)] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {detail}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
