"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown, Copy, Loader2, Search } from "lucide-react";
import type { MemberPublic } from "@/lib/store";

function MembersInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState(params.get("status") || "all");
  const [q, setQ] = useState("");
  const [list, setList] = useState<MemberPublic[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [temp, setTemp] = useState<{ id: string; email: string; temp: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    const url = new URLSearchParams();
    if (status !== "all") url.set("status", status);
    if (q.trim()) url.set("q", q.trim());
    const res = await fetch(`/api/members?${url.toString()}`);
    if (res.ok) {
      const d = await res.json();
      setList(d.members);
    }
  }, [status, q]);

  useEffect(() => {
    const t = window.setTimeout(load, q ? 350 : 0);
    return () => window.clearTimeout(t);
  }, [load, q]);

  async function setMemberStatus(id: string, next: string) {
    setBusy(id);
    await fetch(`/api/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(null);
    load();
  }

  async function resetPassword(id: string) {
    setBusy(id);
    const res = await fetch(`/api/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reset-password" }),
    });
    const data = await res.json();
    setBusy(null);
    if (res.ok) setTemp({ id, email: data.member.email, temp: data.tempPassword });
    load();
  }

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Membership Roll</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Members.</h1>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {["all", "active", "pending", "suspended"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${
                status === s
                  ? "border-gold-400 bg-gold-500/15 text-gold-200"
                  : "border-white/15 text-ink-100/55 hover:border-gold-500/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative lg:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-100/35" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, ID…"
            aria-label="Search members"
            className="w-full border border-white/15 bg-ink-900/80 py-2.5 pr-3 pl-9 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
          />
        </div>
      </div>

      {temp && (
        <div className="mt-6 border border-gold-400 bg-gold-500/10 p-5" role="status">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] text-gold-300 uppercase">
            New temporary password for {temp.email} — share securely (shown once)
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code className="border border-white/10 bg-ink-950/60 px-4 py-2.5 font-mono text-sm text-gold-200">{temp.temp}</code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`IPPSCC temporary password for ${temp.email}: ${temp.temp}`).catch(() => {});
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 border border-gold-500/60 px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.2em] text-gold-300 uppercase"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => setTemp(null)}
              className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/50 uppercase underline underline-offset-4"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {list === null ? (
        <p className="mt-8 flex items-center gap-3 text-ink-100/60">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : list.length === 0 ? (
        <p className="mt-8 border border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-ink-100/55">
          No members match this filter.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {list.map((m) => {
            const expanded = open === m.id;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : m.id)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-white">{m.name}</span>
                    <span className="mt-1 block truncate font-mono text-[0.62rem] text-ink-100/45">
                      {m.memberId} · {m.email}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span
                      className={`border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] uppercase ${
                        m.status === "active"
                          ? "border-emerald-500/50 text-emerald-300"
                          : m.status === "suspended"
                            ? "border-crimson-600 text-crimson-300"
                            : "border-white/20 text-ink-100/60"
                      }`}
                    >
                      {m.status}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gold-500 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </span>
                </button>
                {expanded && (
                  <div className="grid gap-5 border-t border-white/5 py-5 lg:grid-cols-2">
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        ["Rank / Title", m.rank],
                        ["Region", m.region || "—"],
                        ["Joined", new Date(m.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
                        ["Phone", String(m.profile.phone || "—")],
                        ["City", String(m.profile.city || "—")],
                        ["Country", String(m.profile.country || "—")],
                        ["Track", String(m.profile.serviceTrack || "—")],
                        ["Church", String(m.profile.churchName || "—")],
                      ].map(([k, v]) => (
                        <div key={k} className="border border-white/10 bg-white/[0.02] px-3 py-2.5">
                          <dt className="font-mono text-[0.56rem] tracking-[0.18em] text-ink-100/40 uppercase">{k}</dt>
                          <dd className="mt-0.5 truncate text-ink-100/85">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/50 uppercase">Account Status</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["active", "pending", "suspended"].map((s) => (
                            <button
                              key={s}
                              type="button"
                              disabled={busy === m.id || m.status === s}
                              onClick={() => setMemberStatus(m.id, s)}
                              className={`border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] uppercase transition-colors disabled:opacity-40 ${
                                m.status === s
                                  ? "border-gold-400 bg-gold-500/15 text-gold-200"
                                  : "border-white/15 text-ink-100/60 hover:border-gold-500/50 hover:text-white"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/50 uppercase">Credentials</p>
                        <button
                          type="button"
                          disabled={busy === m.id}
                          onClick={() => resetPassword(m.id)}
                          className="mt-2 border border-crimson-600/60 px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] text-crimson-300 uppercase transition-colors hover:bg-crimson-500/10 disabled:opacity-40"
                        >
                          {busy === m.id ? "Working…" : "Reset Password"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<p className="text-ink-100/60">Loading…</p>}>
      <MembersInner />
    </Suspense>
  );
}
