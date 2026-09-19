"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Loader2, Search } from "lucide-react";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/status";
import type { Application, ApplicationStatus } from "@/lib/store";

const FILTERS: ("all" | ApplicationStatus)[] = [
  "all", "pending", "under_review", "changes_requested", "approved", "rejected", "completed",
];

function ApplicationsInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState(params.get("status") || "all");
  const [q, setQ] = useState("");
  const [list, setList] = useState<Application[] | null>(null);

  const load = useCallback(async () => {
    const url = new URLSearchParams();
    if (status !== "all") url.set("status", status);
    if (q.trim()) url.set("q", q.trim());
    const res = await fetch(`/api/applications?${url.toString()}`);
    if (res.ok) {
      const d = await res.json();
      setList(d.applications);
    }
  }, [status, q]);

  useEffect(() => {
    const t = window.setTimeout(load, q ? 350 : 0);
    return () => window.clearTimeout(t);
  }, [load, q]);

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Review Queue</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Applications.</h1>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatus(f)}
              aria-pressed={status === f}
              className={`border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${
                status === f
                  ? "border-gold-400 bg-gold-500/15 text-gold-200"
                  : "border-white/15 text-ink-100/55 hover:border-gold-500/50 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
        <div className="relative lg:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-100/35" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, ref…"
            aria-label="Search applications"
            className="w-full border border-white/15 bg-ink-900/80 py-2.5 pr-3 pl-9 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
          />
        </div>
      </div>

      {list === null ? (
        <p className="mt-8 flex items-center gap-3 text-ink-100/60">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : list.length === 0 ? (
        <p className="mt-8 border border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-ink-100/55">
          No applications match this filter.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {list.map((a) => (
            <li key={a.id}>
              <Link
                href={`/admin/applications/${a.id}`}
                className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-white group-hover:text-gold-200">{a.name}</span>
                  <span className="mt-1 block truncate font-mono text-[0.62rem] text-ink-100/45">
                    {a.ref} · {a.email} · {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className={`border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] uppercase ${STATUS_STYLES[a.status]}`}>
                    {STATUS_LABELS[a.status]}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gold-500" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<p className="text-ink-100/60">Loading…</p>}>
      <ApplicationsInner />
    </Suspense>
  );
}
