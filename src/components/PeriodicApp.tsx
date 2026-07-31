"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { ElementDetail } from "@/components/ElementDetail";
import { PeriodicTable } from "@/components/PeriodicTable";
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
  const [selected, setSelected] = useState<number | null>(1);
  const [filter, setFilter] = useState<ElementCategory | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const isMobile = useIsMobile();

  const element = selected !== null ? elements[selected - 1] : null;
  const showPanel = Boolean(panelOpen && element);

  const select = useCallback((n: number) => {
    setSelected(n);
    setPanelOpen(true);
  }, []);

  const close = useCallback(() => setPanelOpen(false), []);

  const prev = useCallback(() => {
    setSelected((n) => (n === null ? 1 : n <= 1 ? 118 : n - 1));
    setPanelOpen(true);
  }, []);

  const next = useCallback(() => {
    setSelected((n) => (n === null ? 1 : n >= 118 ? 1 : n + 1));
    setPanelOpen(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, prev, next]);

  useEffect(() => {
    if (showPanel && isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showPanel, isMobile]);

  const detail =
    element && showPanel ? (
      <ElementDetail
        element={element}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    ) : null;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
        <div className="atmosphere" aria-hidden />
        <div className="relative mx-auto max-w-[1200px]">
          <p className="eyebrow animate-fade-up font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase">
            Explore the elements
          </p>
          <h1 className="brand-title animate-fade-up mt-3 font-display text-[clamp(3rem,10vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-[var(--ink)]">
            Periodic
          </h1>
          <p className="animate-fade-up-delay mt-4 max-w-md text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
            An interactive table of every known element — with stories, uses, and
            a living atom you can orbit.
          </p>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-3 pb-10 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="animate-table min-w-0 flex-1">
          <PeriodicTable
            selectedNumber={selected}
            filterCategory={filter}
            onSelect={select}
            onFilterCategory={setFilter}
          />
        </div>

        {!isMobile && (
          <div className="detail-shell w-full shrink-0 lg:sticky lg:top-6 lg:w-[380px] xl:w-[420px]">
            {detail ?? (
              <div className="flex h-[420px] items-center justify-center border border-dashed border-[var(--line)] px-6 text-center text-sm text-[var(--muted)]">
                Select an element to explore its atom and story.
              </div>
            )}
          </div>
        )}
      </main>

      {isMobile && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 ${
              showPanel ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={close}
            aria-hidden
          />
          <div
            className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-[var(--panel)] shadow-[0_-12px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out ${
              showPanel ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {detail && (
              <div className="max-h-[85vh] overflow-y-auto">
                <div className="flex justify-center pt-3 pb-1">
                  <span className="h-1 w-10 rounded-full bg-[var(--line)]" />
                </div>
                {detail}
              </div>
            )}
          </div>
        </>
      )}

      <footer className="border-t border-[var(--line)] px-5 py-6 text-center font-mono text-xs text-[var(--muted)] sm:px-8">
        <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>118 elements</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Keyboard className="size-3.5" strokeWidth={1.75} aria-hidden />
            <ChevronLeft className="size-3" strokeWidth={2} aria-hidden />
            <ChevronRight className="size-3" strokeWidth={2} aria-hidden />
            to browse
          </span>
          <span aria-hidden>·</span>
          <span>Esc to close</span>
        </span>
      </footer>
    </div>
  );
}
