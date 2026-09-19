"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Loader2 } from "lucide-react";
import { GROUPS, formatValue, isRowArray, prettyLabel } from "@/lib/application";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/status";
import type { Application, ApplicationStatus } from "@/lib/store";

const REVIEW_ACTIONS: { status: ApplicationStatus; label: string; hint: string }[] = [
  { status: "under_review", label: "Mark Under Review", hint: "Begin active verification." },
  { status: "changes_requested", label: "Request Changes", hint: "Applicant sees your note in tracking." },
  { status: "approved", label: "Approve & Provision", hint: "Creates the member account + login." },
  { status: "rejected", label: "Decline", hint: "Terminal. Applicant sees your note." },
  { status: "completed", label: "Mark Completed", hint: "Payment received, registration closed." },
];

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<Application | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState("");
  const [creds, setCreds] = useState<{ memberId: string; email: string; tempPassword: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(() => {
    fetch(`/api/applications/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setApp(d.application))
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(status: ApplicationStatus) {
    if ((status === "changes_requested" || status === "rejected") && !note.trim()) {
      setError("A note is required — the applicant will read it in tracking.");
      return;
    }
    setBusy(status);
    setError("");
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note: note.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");
      setApp(data.application);
      setNote("");
      if (data.credentials) setCreds(data.credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusy(null);
    }
  }

  function copyCreds() {
    if (!creds) return;
    navigator.clipboard.writeText(
      `IPPSCC login — Member ID: ${creds.memberId}, Email: ${creds.email}, Temporary password: ${creds.tempPassword}`
    ).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  if (!app) {
    return (
      <p className="flex items-center gap-3 text-ink-100/60">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading application…
      </p>
    );
  }

  return (
    <div>
      <Link href="/admin/applications" className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        <span className="link-sweep">Review Queue</span>
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.24em] text-ink-100/45 uppercase">{app.ref}</p>
          <h1 className="mt-1 font-display text-3xl text-white sm:text-4xl">{app.name}</h1>
          <p className="mt-1 text-sm text-ink-100/55">
            {app.email} · submitted {new Date(app.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <span className={`border px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.2em] uppercase ${STATUS_STYLES[app.status]}`}>
          {STATUS_LABELS[app.status]}
        </span>
      </div>

      {creds && (
        <div className="mt-6 border border-gold-400 bg-gold-500/10 p-6" role="status">
          <p className="font-mono text-[0.65rem] tracking-[0.24em] text-gold-300 uppercase">
            Member account provisioned — share these login details securely (shown once)
          </p>
          <dl className="mt-4 grid gap-3 font-mono text-sm sm:grid-cols-3">
            <div className="border border-white/10 bg-ink-950/60 px-4 py-3">
              <dt className="text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">Member ID</dt>
              <dd className="mt-1 text-gold-200">{creds.memberId}</dd>
            </div>
            <div className="border border-white/10 bg-ink-950/60 px-4 py-3">
              <dt className="text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">Email</dt>
              <dd className="mt-1 break-all text-white">{creds.email}</dd>
            </div>
            <div className="border border-white/10 bg-ink-950/60 px-4 py-3">
              <dt className="text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">Temporary Password</dt>
              <dd className="mt-1 text-gold-200">{creds.tempPassword}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={copyCreds}
            className="mt-4 flex items-center gap-2 border border-gold-500/60 px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy Credentials"}
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Payload */}
        <div className="space-y-8">
          {GROUPS.map((group) => {
            const entries = group.keys
              .map((k) => ({ key: k, value: app.payload[k] }))
              .filter(({ value }) => value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0));
            if (entries.length === 0) return null;
            return (
              <section key={group.code} aria-label={group.title} className="border border-white/10 bg-white/[0.02]">
                <h2 className="border-b border-white/10 px-5 py-3.5 font-mono text-[0.62rem] tracking-[0.24em] text-gold-400 uppercase">
                  {group.title}
                </h2>
                <dl className="divide-y divide-white/5">
                  {entries.map(({ key, value }) => (
                    <div key={key} className="grid gap-1 px-5 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
                      <dt className="text-xs tracking-wide text-ink-100/45">{prettyLabel(key)}</dt>
                      <dd className="text-sm leading-relaxed text-ink-100/85">
                        {isRowArray(value) ? (
                          <span className="block space-y-1.5">
                            {value.map((row, i) => (
                              <span key={i} className="block border border-white/10 bg-ink-950/50 px-3 py-2 text-xs">
                                {Object.entries(row).map(([rk, rv]) => (
                                  <span key={rk} className="mr-4 inline-block">
                                    <span className="text-ink-100/40">{prettyLabel(rk)}: </span>
                                    <span className="text-ink-100/85">{rv || "—"}</span>
                                  </span>
                                ))}
                              </span>
                            ))}
                          </span>
                        ) : (
                          formatValue(value)
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>

        {/* Review panel */}
        <div className="xl:sticky xl:top-36 xl:self-start">
          <section aria-label="Review actions" className="border border-white/10 bg-white/[0.02] p-6">
            <h2 className="font-display text-xl text-white">Review</h2>
            <label htmlFor="review-note" className="mt-4 mb-1.5 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
              Review Note (visible to applicant in tracking)
            </label>
            <textarea
              id="review-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="e.g. Referee 1 verified by phone. Awaiting attestation letter…"
              className="w-full resize-y border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
            />
            {error && (
              <p role="alert" className="mt-3 border border-crimson-500/50 bg-crimson-500/10 px-3 py-2.5 text-xs text-crimson-300">
                {error}
              </p>
            )}
            <div className="mt-4 space-y-2.5">
              {REVIEW_ACTIONS.map((action) => (
                <button
                  key={action.status}
                  type="button"
                  disabled={busy !== null || app.status === action.status}
                  onClick={() => act(action.status)}
                  className={`w-full border px-4 py-3 text-left transition-all disabled:opacity-40 ${
                    action.status === "approved"
                      ? "border-gold-400 bg-gold-500/15 hover:bg-gold-500/25"
                      : action.status === "rejected"
                        ? "border-crimson-600/60 hover:bg-crimson-500/10"
                        : "border-white/15 hover:border-gold-500/50 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    {busy === action.status && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                    {action.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-100/50">{action.hint}</span>
                </button>
              ))}
            </div>
          </section>

          {app.notes.length > 0 && (
            <section aria-label="Review history" className="mt-5 border border-white/10 bg-white/[0.02] p-6">
              <h2 className="font-display text-xl text-white">History</h2>
              <ul className="mt-4 space-y-4">
                {app.notes.map((n, i) => (
                  <li key={i} className="border-l-2 border-gold-500/50 pl-3">
                    <p className="font-mono text-[0.58rem] tracking-[0.2em] text-ink-100/45 uppercase">
                      {STATUS_LABELS[n.status]} · {n.by} · {new Date(n.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                    <p className="mt-1 text-sm text-ink-100/75">{n.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
