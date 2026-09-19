"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, FileSearch, Loader2, XCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { STATUS_LABELS, STATUS_ORDER, STATUS_STYLES } from "@/lib/status";
import type { ApplicationStatus } from "@/lib/store";

type TrackResult = {
  ref: string;
  name: string;
  status: ApplicationStatus;
  updatedAt: string;
  createdAt: string;
  timeline: { status: ApplicationStatus; at: string; text: string }[];
};

const inputCls =
  "w-full border border-white/15 bg-ink-900/80 px-4 py-3.5 text-[0.95rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none";

export default function TrackPage() {
  const [ref, setRef] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setDemo(d.mode === "demo"))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lookup failed.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setBusy(false);
    }
  }

  const failed = result && (result.status === "rejected" || result.status === "changes_requested");

  return (
    <>
      <PageHero
        kicker="Application Tracking"
        title="Track your application."
        lede="Enter the application reference issued at submission, plus the email address on the application, to see where your journey stands."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Track" }]}
      />
      <section className="bg-ink-950">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-10">
          <Reveal>
            <form onSubmit={handleSubmit} className="border border-white/10 bg-white/[0.02] p-7 sm:p-9" aria-label="Track application">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="track-ref" className="mb-2 block font-mono text-[0.65rem] tracking-[0.22em] text-ink-100/60 uppercase">
                    Application Reference
                  </label>
                  <input
                    id="track-ref"
                    required
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    placeholder="IPPSCC-2026-XXXXX"
                    className={`${inputCls} font-mono uppercase`}
                  />
                </div>
                <div>
                  <label htmlFor="track-email" className="mb-2 block font-mono text-[0.65rem] tracking-[0.22em] text-ink-100/60 uppercase">
                    Email on Application
                  </label>
                  <input
                    id="track-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              {error && (
                <p role="alert" className="mt-5 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60 sm:w-auto"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Searching…
                  </>
                ) : (
                  <>
                    <FileSearch className="h-4 w-4" aria-hidden="true" /> Track Application
                  </>
                )}
              </button>
              {demo && (
                <p className="mt-4 text-xs text-ink-100/45">
                  Demonstration mode — try{" "}
                  <button
                    type="button"
                    className="font-mono text-gold-300 underline underline-offset-4"
                    onClick={() => {
                      setRef("IPPSCC-2026-DEMO1");
                      setEmail("demo-track@example.com");
                    }}
                  >
                    IPPSCC-2026-DEMO1 · demo-track@example.com
                  </button>
                </p>
              )}
            </form>
          </Reveal>

          {result && (
            <Reveal>
              <div className="mt-8 border border-white/10 bg-white/[0.02] p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.62rem] tracking-[0.24em] text-ink-100/45 uppercase">{result.ref}</p>
                    <h2 className="mt-1 font-display text-2xl text-white">{result.name}</h2>
                  </div>
                  <span className={`border px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.2em] uppercase ${STATUS_STYLES[result.status]}`}>
                    {STATUS_LABELS[result.status]}
                  </span>
                </div>

                {/* Progress steps */}
                <ol className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4" aria-label="Application progress">
                  {STATUS_ORDER.map((step) => {
                    const reached =
                      STATUS_ORDER.indexOf(result.status) >= STATUS_ORDER.indexOf(step) ||
                      (result.status === "changes_requested" && step !== "completed") ||
                      (result.status === "rejected" && step === "pending");
                    const current = result.status === step;
                    return (
                      <li key={step} className="bg-ink-950 px-3 py-4 text-center">
                        {reached && !failed ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-gold-400" aria-hidden="true" />
                        ) : failed && current ? (
                          <XCircle className="mx-auto h-5 w-5 text-crimson-400" aria-hidden="true" />
                        ) : (
                          <Circle className="mx-auto h-5 w-5 text-ink-100/25" aria-hidden="true" />
                        )}
                        <p className={`mt-2 text-xs ${reached ? "text-white" : "text-ink-100/40"}`}>
                          {STATUS_LABELS[step]}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                {result.timeline.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-mono text-[0.65rem] tracking-[0.26em] text-gold-400 uppercase">
                      Review Updates
                    </h3>
                    <ul className="mt-4 space-y-4">
                      {result.timeline.map((t, i) => (
                        <li key={i} className="border-l-2 border-gold-500/60 pl-4">
                          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">
                            {STATUS_LABELS[t.status]} · {new Date(t.at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-100/75">{t.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-ink-100/45">
                  Submitted {new Date(result.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·
                  last updated {new Date(result.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
                  Questions? <Link href="/contact" className="text-gold-300 underline underline-offset-4">Contact the Corps</Link>.
                </p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <Link href="/join" className="group mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.22em] text-gold-300 uppercase">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              <span className="link-sweep">Back to Application</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
