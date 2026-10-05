"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, Check, Loader2, TriangleAlert } from "lucide-react";
import { awardCategories, type Nominee } from "@/data/awards";
import Reveal from "./Reveal";

type Tallies = Record<string, Record<string, number>>;
type Totals = Record<string, number>;
type MyVotes = Record<string, string>;

const LOCAL_KEY = "ippscc-my-votes";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function loadLocal(): MyVotes {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw) as MyVotes;
  } catch {
    /* ignore */
  }
  return {};
}

export default function AwardVoting() {
  const [tallies, setTallies] = useState<Tallies>({});
  const [totals, setTotals] = useState<Totals>({});
  const [myVotes, setMyVotes] = useState<MyVotes>({});
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/votes", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.tallies) setTallies(d.tallies);
        if (d.totals) setTotals(d.totals);
        setMyVotes({ ...loadLocal(), ...(d.myVotes || {}) });
        setIsDemo(d.demo === true);
      })
      .catch(() => {
        if (!cancelled) setNotice("Vote counts could not be loaded. You can still cast your vote below.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const vote = useCallback(
    async (categoryId: string, nominee: Nominee) => {
      if (nominee.placeholder || myVotes[categoryId] || voting) return;
      setVoting(nominee.id);
      setNotice("");
      try {
        const res = await fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryId, nomineeId: nominee.id }),
        });
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || "Your vote could not be recorded.");
        setTallies(out.tallies);
        setTotals(out.totals);
        setMyVotes((m) => {
          const next = { ...m, [categoryId]: nominee.id };
          try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
          } catch {
            /* ignore */
          }
          return next;
        });
        setNotice(`Your vote for ${nominee.name} has been counted. Thank you.`);
      } catch (err) {
        setNotice(err instanceof Error ? err.message : "Your vote could not be recorded.");
      } finally {
        setVoting(null);
      }
    },
    [myVotes, voting]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-6 py-16" role="status">
        <Loader2 className="h-5 w-5 animate-spin text-gold-400" aria-hidden="true" />
        <p className="font-mono text-[0.68rem] tracking-[0.24em] text-ink-100/60 uppercase">
          Loading categories & counts…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {notice && (
        <p role={notice.startsWith("Your vote for") ? "status" : "alert"} className="border border-gold-500/40 bg-gold-500/[0.07] px-5 py-4 text-sm leading-relaxed text-gold-200">
          {notice}
        </p>
      )}
      {isDemo && (
        <p className="flex items-start gap-2 border border-white/10 bg-white/[0.02] px-5 py-3 text-xs leading-relaxed text-ink-100/50">
          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden="true" />
          Demonstration mode — votes are counted live but reset if the site restarts. Connect the
          production database before the voting window opens.
        </p>
      )}

      {awardCategories.map((cat, i) => {
        const total = totals[cat.id] || 0;
        const votedFor = myVotes[cat.id];
        const ranked = [...cat.nominees].sort(
          (a, b) => (tallies[cat.id]?.[b.id] || 0) - (tallies[cat.id]?.[a.id] || 0)
        );
        const leaderId = total > 0 ? ranked[0].id : null;
        return (
          <Reveal key={cat.id}>
            <article id={cat.id} aria-labelledby={`${cat.id}-title`} className="scroll-mt-32 border border-white/10 bg-white/[0.02]">
              <header className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 px-6 py-6 sm:px-8">
                <div>
                  <p className="font-mono text-[0.62rem] tracking-[0.26em] text-gold-400 uppercase">
                    Category {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 id={`${cat.id}-title`} className="mt-2 max-w-2xl font-display text-2xl leading-tight text-white sm:text-[1.7rem]">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-100/55">{cat.tagline}</p>
                </div>
                <p className="border border-gold-500/40 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase">
                  {total} vote{total === 1 ? "" : "s"}
                </p>
              </header>

              <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                {cat.nominees.map((nominee) => {
                  const count = tallies[cat.id]?.[nominee.id] || 0;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const isMine = votedFor === nominee.id;
                  const locked = !!votedFor;
                  const isLeader = leaderId === nominee.id;
                  return (
                    <div key={nominee.id} className="flex flex-col bg-ink-950 p-6 sm:p-7">
                      <div className="flex items-center gap-4">
                        {nominee.photo ? (
                          <Image
                            src={nominee.photo}
                            alt={`Portrait of ${nominee.name}`}
                            width={160}
                            height={160}
                            className="h-16 w-16 shrink-0 rounded-full border border-gold-500/50 object-cover"
                          />
                        ) : (
                          <span aria-hidden="true" className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border font-display text-xl ${nominee.placeholder ? "border-dashed border-white/20 text-ink-100/30" : "border-gold-500/50 text-gold-300"}`}>
                            {nominee.placeholder ? "?" : initials(nominee.name)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <h4 className={`truncate font-display text-lg leading-snug ${nominee.placeholder ? "text-ink-100/40 italic" : "text-white"}`}>
                            {nominee.name}
                          </h4>
                          <p className="mt-0.5 truncate text-xs text-ink-100/50">
                            {[nominee.title, nominee.org].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                      </div>
                      {!nominee.placeholder && nominee.blurb && (
                        <p className="mt-4 line-clamp-3 text-[0.83rem] leading-relaxed text-ink-100/60">{nominee.blurb}</p>
                      )}
                      {nominee.placeholder && (
                        <p className="mt-4 text-[0.83rem] leading-relaxed text-ink-100/40 italic">{nominee.blurb}</p>
                      )}

                      <div className="mt-5" aria-hidden={!locked && total === 0 ? undefined : true}>
                        <div className="h-1.5 bg-white/10">
                          <div
                            className={`h-full transition-all duration-700 ${isLeader ? "bg-gold-400" : "bg-gold-600/60"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                          <span className="text-ink-100/50">
                            {count} vote{count === 1 ? "" : "s"} · {pct}%
                          </span>
                          {isLeader && (
                            <span className="text-gold-300">Leading</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-5 flex-1" />
                      {nominee.placeholder ? (
                        <p className="border border-dashed border-white/15 px-4 py-3 text-center font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/35 uppercase">
                          Finalists soon
                        </p>
                      ) : isMine ? (
                        <p className="flex items-center justify-center gap-2 bg-gold-500 px-4 py-3 font-mono text-[0.65rem] tracking-[0.2em] text-ink-950 uppercase">
                          <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Your vote
                        </p>
                      ) : (
                        <button
                          type="button"
                          disabled={locked || voting === nominee.id}
                          onClick={() => vote(cat.id, nominee)}
                          className="flex w-full items-center justify-center gap-2 border border-gold-500/60 px-4 py-3 font-mono text-[0.65rem] tracking-[0.2em] text-gold-300 uppercase transition-all hover:bg-gold-500 hover:text-ink-950 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-gold-300"
                        >
                          {voting === nominee.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Voting…
                            </>
                          ) : locked ? (
                            <>
                              <Check className="h-4 w-4" aria-hidden="true" /> Voted
                            </>
                          ) : (
                            "Vote"
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              {votedFor && (
                <p className="border-t border-gold-500/25 bg-gold-500/[0.05] px-6 py-3 text-center font-mono text-[0.6rem] tracking-[0.22em] text-gold-300/90 uppercase sm:px-8">
                  You have voted in this category — one vote per category
                </p>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
