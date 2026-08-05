"use client";

import dynamic from "next/dynamic";
import {
  Eraser,
  HelpCircle,
  Link2,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { elements } from "@/data/elements";
import { getChemistryProfile } from "@/data/chemistryProfiles";
import { categoryColors } from "@/lib/categories";
import {
  addAtom,
  allFormalCharges,
  emptyMolecule,
  geometryForAtom,
  loadDraft,
  MoleculeHistory,
  moleculeBondLengths,
  nameMolecule,
  removeAtom,
  removeBond,
  saveDraft,
  totalCharge,
  tryAddBond,
  type BondOrder,
  type Molecule,
  type ValidationIssue,
} from "@/lib/chem";

const MoleculeViewer = dynamic(
  () =>
    import("@/components/lab/MoleculeViewer").then((m) => m.MoleculeViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[240px] items-center justify-center rounded-md bg-[#12181f] text-sm text-white/50">
        Loading viewer…
      </div>
    ),
  }
);

export function LabApp() {
  const historyRef = useRef(new MoleculeHistory(emptyMolecule()));
  const [molecule, setMolecule] = useState<Molecule>(emptyMolecule());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bondTargetId, setBondTargetId] = useState<string | null>(null);
  const [bondOrder, setBondOrder] = useState<BondOrder>(1);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      historyRef.current = new MoleculeHistory(draft);
      setMolecule(draft);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveDraft(molecule);
  }, [molecule, hydrated]);

  const commit = useCallback((next: Molecule) => {
    historyRef.current.push(next);
    setMolecule(next);
    setCanUndo(historyRef.current.canUndo());
  }, []);

  const naming = useMemo(() => nameMolecule(molecule), [molecule]);
  const charges = useMemo(() => allFormalCharges(molecule), [molecule]);
  const lengths = useMemo(() => moleculeBondLengths(molecule), [molecule]);
  const chargeTotal = useMemo(() => totalCharge(molecule), [molecule]);

  const filteredElements = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return elements;
    return elements.filter(
      (el) =>
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        String(el.atomicNumber) === q
    );
  }, [query]);

  const addElement = (z: number) => {
    const { molecule: next, atomId } = addAtom(molecule, z);
    commit(next);
    setSelectedId(atomId);
    setIssues([]);
  };

  const onSelectAtom = (id: string | null) => {
    if (id && selectedId && id !== selectedId && bondTargetId === null) {
      // Second click while one selected: attempt bond
      const result = tryAddBond(molecule, selectedId, id, bondOrder);
      if (result.validation.ok) {
        commit(result.molecule);
        setIssues(result.validation.warnings);
        setSelectedId(id);
        return;
      }
      setIssues([
        ...result.validation.errors,
        ...result.validation.warnings,
      ]);
      setSelectedId(id);
      return;
    }
    setSelectedId(id);
    setBondTargetId(null);
  };

  const bondSelectedPair = () => {
    if (!selectedId || !bondTargetId) return;
    const result = tryAddBond(molecule, selectedId, bondTargetId, bondOrder);
    if (result.validation.ok) {
      commit(result.molecule);
      setIssues(result.validation.warnings);
      setBondTargetId(null);
    } else {
      setIssues([...result.validation.errors, ...result.validation.warnings]);
    }
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    commit(removeAtom(molecule, selectedId));
    setSelectedId(null);
    setIssues([]);
  };

  const undo = () => {
    const prev = historyRef.current.undo();
    if (prev) {
      setMolecule(prev);
      setIssues([]);
      setCanUndo(historyRef.current.canUndo());
    }
  };

  const clearAll = () => {
    historyRef.current.clear();
    setMolecule(emptyMolecule());
    setSelectedId(null);
    setIssues([]);
    setCanUndo(false);
  };

  const selectedAtom = molecule.atoms.find((a) => a.id === selectedId);
  const selectedGeom = selectedAtom
    ? geometryForAtom(molecule, selectedAtom.id)
    : null;

  return (
    <AppShell subtitle="Build molecules with valence rules, VSEPR geometry, and bond checks.">
      <main className="relative mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col gap-3 overflow-hidden px-3 py-2 sm:px-6 lg:flex-row lg:gap-4 lg:px-8">
        {/* Picker */}
        <aside className="flex max-h-[40%] min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-md border border-[var(--line)] bg-[var(--panel)] lg:max-h-none lg:w-[240px]">
          <div className="shrink-0 border-b border-[var(--line)] p-3">
            <label className="section-label" htmlFor="lab-search">
              Add element
            </label>
            <input
              id="lab-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symbol or name…"
              className="mt-2 w-full rounded-md border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto p-2">
            {filteredElements.map((el) => (
              <li key={el.atomicNumber}>
                <button
                  type="button"
                  onClick={() => addElement(el.atomicNumber)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-[var(--paper-deep)]"
                >
                  <span
                    className="flex size-7 items-center justify-center rounded-sm font-display text-xs font-semibold"
                    style={{
                      backgroundColor: categoryColors[el.category].fill,
                      color: categoryColors[el.category].text,
                    }}
                  >
                    {el.symbol}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[var(--ink-soft)]">
                    {el.name}
                  </span>
                  <Plus className="size-3.5 shrink-0 text-[var(--muted)]" />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Workspace */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--panel)] p-1">
              {([1, 2, 3] as BondOrder[]).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBondOrder(o)}
                  className={`rounded-sm px-2.5 py-1 font-mono text-xs ${
                    bondOrder === o
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "text-[var(--muted)] hover:bg-[var(--paper-deep)]"
                  }`}
                  aria-pressed={bondOrder === o}
                >
                  {o === 1 ? "Single" : o === 2 ? "Double" : "Triple"}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="lab-tool-btn"
              onClick={bondSelectedPair}
              disabled={!selectedId || !bondTargetId}
              title="Bond selected → target"
            >
              <Link2 className="size-3.5" />
              Bond
            </button>
            <button
              type="button"
              className="lab-tool-btn"
              onClick={deleteSelected}
              disabled={!selectedId}
            >
              <Trash2 className="size-3.5" />
              Delete
            </button>
            <button
              type="button"
              className="lab-tool-btn"
              onClick={undo}
              disabled={!canUndo}
            >
              <RotateCcw className="size-3.5" />
              Undo
            </button>
            <button type="button" className="lab-tool-btn" onClick={clearAll}>
              <Eraser className="size-3.5" />
              Clear
            </button>
            <button
              type="button"
              className="lab-tool-btn ml-auto"
              onClick={() => setShowHelp((v) => !v)}
            >
              <HelpCircle className="size-3.5" />
              Help
            </button>
          </div>

          {showHelp && (
            <div className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink-soft)]">
              Click an element to add it. Select one atom, then another to attempt
              a bond at the chosen order. Invalid bonds (He–He, over-valence,
              etc.) are rejected. Transition-metal geometry uses common
              coordination shapes; superheavy elements carry warnings. Naming is
              Hill formula + curated common names — not full IUPAC.
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-hidden">
            <MoleculeViewer
              molecule={molecule}
              selectedId={selectedId}
              onSelectAtom={onSelectAtom}
            />
          </div>

          {issues.length > 0 && (
            <ul className="max-h-24 overflow-y-auto rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm">
              {issues.map((issue, i) => (
                <li
                  key={`${issue.code}-${i}`}
                  className={
                    issue.level === "error"
                      ? "text-red-700"
                      : "text-amber-800"
                  }
                >
                  {issue.message}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Inspector */}
        <aside className="flex max-h-[35%] min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-md border border-[var(--line)] bg-[var(--panel)] lg:max-h-none lg:w-[300px]">
          <div className="shrink-0 border-b border-[var(--line)] px-4 py-3">
            <p className="section-label">Molecule</p>
            <p className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
              {naming.formula || "—"}
            </p>
            <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{naming.name}</p>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">
              Net formal charge ≈ {chargeTotal >= 0 ? `+${chargeTotal}` : chargeTotal}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {selectedAtom ? (
              <div className="mb-4 space-y-2">
                <p className="section-label">Selected atom</p>
                <p className="font-display text-lg font-semibold">
                  {getChemistryProfile(selectedAtom.z).symbol}
                  <span className="ml-2 font-sans text-sm font-normal text-[var(--muted)]">
                    {elements[selectedAtom.z - 1]?.name}
                  </span>
                </p>
                <dl className="space-y-1 text-sm">
                  <Row
                    label="Formal charge / OS"
                    value={String(charges[selectedAtom.id] ?? 0)}
                  />
                  {selectedGeom && (
                    <>
                      <Row label="Shape" value={selectedGeom.shape} />
                      <Row
                        label="Ideal angle"
                        value={`${selectedGeom.idealAngleDeg}°`}
                      />
                      <Row
                        label="Lone pairs (est.)"
                        value={String(selectedGeom.lonePairs)}
                      />
                    </>
                  )}
                </dl>
                <div className="pt-2">
                  <p className="mb-1 text-xs text-[var(--muted)]">
                    Set as bond target, then pick another atom or press Bond:
                  </p>
                  <button
                    type="button"
                    className="lab-tool-btn"
                    onClick={() => setBondTargetId(selectedAtom.id)}
                  >
                    Mark as bond target
                    {bondTargetId === selectedAtom.id ? " ✓" : ""}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mb-4 text-sm text-[var(--muted)]">
                Select an atom in the viewer.
              </p>
            )}

            <p className="section-label">Bonds</p>
            {molecule.bonds.length === 0 ? (
              <p className="mt-1 text-sm text-[var(--muted)]">No bonds yet.</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {molecule.bonds.map((b) => {
                  const a = molecule.atoms.find((x) => x.id === b.a)!;
                  const c = molecule.atoms.find((x) => x.id === b.b)!;
                  const len = lengths.find((l) => l.bondId === b.id);
                  const bar = b.order === 1 ? "–" : b.order === 2 ? "=" : "≡";
                  return (
                    <li
                      key={b.id}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="font-mono">
                        {getChemistryProfile(a.z).symbol}
                        {bar}
                        {getChemistryProfile(c.z).symbol}
                      </span>
                      <span className="text-[var(--muted)]">
                        {len?.angstrom != null ? `${len.angstrom} Å` : "—"}
                      </span>
                      <button
                        type="button"
                        className="text-[var(--muted)] hover:text-red-700"
                        onClick={() => commit(removeBond(molecule, b.id))}
                        aria-label="Remove bond"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <p className="section-label mt-5">Atoms</p>
            <ul className="mt-2 space-y-1">
              {molecule.atoms.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className={`flex w-full items-center justify-between rounded-sm px-1.5 py-1 text-sm ${
                      selectedId === a.id
                        ? "bg-[var(--paper-deep)]"
                        : "hover:bg-[var(--paper-deep)]/60"
                    }`}
                  >
                    <span className="font-mono">
                      {getChemistryProfile(a.z).symbol}
                    </span>
                    <span className="text-[var(--muted)]">
                      FC {charges[a.id] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="font-mono text-[var(--ink)]">{value}</dd>
    </div>
  );
}
