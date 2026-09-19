"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Megaphone } from "lucide-react";
import type { MemberPublic, NotificationItem } from "@/lib/store";

export default function BroadcastPage() {
  const [members, setMembers] = useState<MemberPublic[]>([]);
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [recent, setRecent] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setMembers(d.members || []))
      .catch(() => {});
  }, [sent]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, title, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Broadcast failed.");
      setRecent((r) => [data.notification, ...r].slice(0, 20));
      setTitle("");
      setMessage("");
      setAudience("all");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Broadcast failed.");
    } finally {
      setBusy(false);
    }
  }

  const audienceName = (id: string) =>
    id === "all" ? "Corps-wide" : members.find((m) => m.id === id)?.name || id;

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Comms</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Broadcast.</h1>

      <form onSubmit={handleSubmit} className="mt-8 border border-white/10 bg-white/[0.02] p-6 sm:p-8" aria-label="Send notification">
        <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
          <div>
            <label htmlFor="bc-audience" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
              Audience
            </label>
            <select
              id="bc-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white focus:border-gold-400 focus:outline-none"
            >
              <option value="all" className="bg-ink-900">All members</option>
              {members.map((m) => (
                <option key={m.id} value={m.id} className="bg-ink-900">
                  {m.name} ({m.memberId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bc-title" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
              Title
            </label>
            <input
              id="bc-title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Formation weekend — new date"
              className="w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="bc-message" className="mb-2 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase">
            Message
          </label>
          <textarea
            id="bc-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write clearly and briefly — this appears in members' portals."
            className="w-full resize-y border border-white/15 bg-ink-900/80 px-4 py-3 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
          />
        </div>
        {error && (
          <p role="alert" className="mt-4 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
            {error}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="flex items-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                <Megaphone className="h-4 w-4" aria-hidden="true" /> Send Notification
              </>
            )}
          </button>
          {sent && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-300" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Delivered
            </span>
          )}
        </div>
      </form>

      {recent.length > 0 && (
        <div className="mt-8">
          <h2 className="font-mono text-[0.65rem] tracking-[0.26em] text-gold-400 uppercase">Sent This Session</h2>
          <ul className="mt-4 space-y-3">
            {recent.map((n) => (
              <li key={n.id} className="border border-white/10 bg-white/[0.02] px-5 py-4">
                <p className="text-sm font-medium text-white">{n.title}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.18em] text-ink-100/40 uppercase">
                  To {audienceName(n.audience)}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-100/65">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
