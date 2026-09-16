"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, MailOpen } from "lucide-react";
import { site } from "@/lib/site";

/** Compact "Receive the Insight" capture — posts to the form endpoint when set. */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    if (!email) return;
    setStatus("sending");

    if (site.formEndpoint) {
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _form: "Newsletter — The IPPSCC Insight", email }),
        });
        if (!res.ok) throw new Error("failed");
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Subscribe — The IPPSCC Insight"
    )}&body=${encodeURIComponent(`Please subscribe ${email} to The IPPSCC Insight.`)}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex items-center gap-3 border border-gold-500/40 bg-ink-900/70 px-5 py-4" role="status">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
        <p className="text-sm text-ink-100/80">
          You are on the list. New essays from the Corps will find you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" aria-label="Subscribe to The IPPSCC Insight">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <MailOpen className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-100/35" aria-hidden="true" />
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Your email address"
            autoComplete="email"
            className="w-full border border-white/15 bg-ink-900/80 py-3.5 pr-4 pl-11 text-[0.95rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] whitespace-nowrap text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Subscribing…
            </>
          ) : (
            <>
              Receive the Insight
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          Something went wrong. Please try again, or write to{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="mt-3 text-xs text-ink-100/40">
        Occasional essays only. No noise — unsubscribe anytime.
      </p>
    </form>
  );
}
