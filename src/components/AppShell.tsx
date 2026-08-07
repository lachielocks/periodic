"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function AppShell({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle?: string;
}) {
  const pathname = usePathname();
  const onLab = pathname?.startsWith("/lab");

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-[var(--paper)]">
      <header className="relative shrink-0 px-4 pb-2 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <div className="atmosphere" aria-hidden />
        <div className="relative mx-auto flex max-w-[1500px] items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="brand-title font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--ink)]">
              Periodic
            </h1>
            {subtitle && (
              <p className="mt-1 max-w-sm text-sm text-[var(--ink-soft)]">
                {subtitle}
              </p>
            )}
          </div>

          {onLab && (
            <nav
              className="flex shrink-0 items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--panel)]/80 p-1 backdrop-blur-sm"
              aria-label="Primary"
            >
              <NavLink href="/" active={false}>
                Table
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      {children}
    </div>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-sm px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
        active
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "text-[var(--muted)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
