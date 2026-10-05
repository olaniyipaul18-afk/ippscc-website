"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Trophy } from "lucide-react";
import { awardCategories } from "@/data/awards";

type Tallies = Record<string, Record<string, number>>;
type Totals = Record<string, number>;

export default function AdminVotesPage() {
  const [tallies, setTallies] = useState<Tallies>({});
  const [totals, setTotals] = useState<Totals>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/votes", { cache: "no-store" });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Could not load votes.");
      setTallies(out.tallies || {});
      setTotals(out.totals || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load votes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.26em] text-gold-400 uppercase">
            2026 Award & Goodwill Ambassadors Honour
          </p>
          <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Award Votes</h1>
          <p className="mt-2 text-sm text-ink-100/60">
            Live public tallies across all 7 categories — one vote per category per voter.{" "}
            <span className="text-gold-300">{grandTotal} total votes cast.</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={refreshing}
          className="flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[0.62rem] tracking-[0.22em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300 disabled:opacity-50"
        >
          {refreshing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-6 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-8 flex items-center gap-3 border border-white/10 bg-white/[0.02] px-6 py-14" role="status">
          <Loader2 className="h-5 w-5 animate-spin text-gold-400" aria-hidden="true" />
          <p className="font-mono text-[0.68rem] tracking-[0.24em] text-ink-100/60 uppercase">Loading tallies…</p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {awardCategories.map((cat, i) => {
            const total = totals[cat.id] || 0;
            const ranked = [...cat.nominees]
              .map((n) => ({ ...n, votes: tallies[cat.id]?.[n.id] || 0 }))
              .sort((a, b) => b.votes - a.votes);
            return (
              <section key={cat.id} aria-label={cat.name} className="border border-white/10 bg-white/[0.02]">
                <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 px-5 py-4 sm:px-6">
                  <h2 className="font-display text-lg leading-snug text-white sm:text-xl">
                    <span className="mr-3 font-mono text-[0.62rem] tracking-[0.2em] text-gold-500/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {cat.name}
                  </h2>
                  <p className="font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase">
                    {total} vote{total === 1 ? "" : "s"}
                  </p>
                </header>
                <ol>
                  {ranked.map((n, rank) => {
                    const pct = total > 0 ? Math.round((n.votes / total) * 100) : 0;
                    const leading = rank === 0 && total > 0;
                    return (
                      <li
                        key={n.id}
                        className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${rank < ranked.length - 1 ? "border-b border-white/8" : ""} ${leading ? "bg-gold-500/[0.06]" : ""}`}
                      >
                        <span className={`font-display text-2xl ${leading ? "text-gold-300" : "text-ink-100/30"}`}>
                          {rank + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-sm ${n.placeholder ? "text-ink-100/40 italic" : "text-white"}`}>
                            {n.name}
                            {leading && <Trophy className="ml-2 inline h-3.5 w-3.5 text-gold-400" aria-label="Leading" />}
                          </span>
                          <span className="mt-1.5 block h-1.5 bg-white/10">
                            <span
                              className={`block h-full ${leading ? "bg-gold-400" : "bg-gold-600/50"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </span>
                        </span>
                        <span className="shrink-0 text-right font-mono text-[0.65rem] tracking-[0.14em] text-ink-100/60">
                          {n.votes} · {pct}%
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
