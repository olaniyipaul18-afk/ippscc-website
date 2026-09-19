"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import type { NotificationItem } from "@/lib/store";

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[] | null>(null);
  const [me, setMe] = useState("");

  async function load() {
    const [nRes, meRes] = await Promise.all([fetch("/api/notifications"), fetch("/api/auth/me")]);
    if (nRes.ok) {
      const d = await nRes.json();
      setItems(d.notifications);
    }
    if (meRes.ok) {
      const d = await meRes.json();
      setMe(d.member?.id || "");
    }
  }

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  async function markAll() {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: "all" }),
    });
    load();
  }

  async function markOne(id: string) {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">Notifications</p>
          <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Orders & announcements.</h1>
        </div>
        <button
          type="button"
          onClick={markAll}
          className="flex items-center gap-2 border border-white/20 px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
        >
          <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" /> Mark all read
        </button>
      </div>

      {items === null ? (
        <p className="mt-8 flex items-center gap-3 text-ink-100/60">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : items.length === 0 ? (
        <p className="mt-8 border border-white/10 bg-white/[0.02] px-6 py-8 text-center text-sm text-ink-100/55">
          No notifications yet. Corps announcements will appear here.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((n) => {
            const unread = me ? !n.readBy.includes(me) : false;
            return (
              <li
                key={n.id}
                className={`border bg-white/[0.02] px-6 py-5 transition-colors ${
                  unread ? "border-gold-500/50" : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Bell className={`mt-0.5 h-4 w-4 shrink-0 ${unread ? "text-gold-400" : "text-ink-100/30"}`} aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white">{n.title}</p>
                      <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.18em] text-ink-100/40 uppercase">
                        {new Date(n.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        {n.audience === "all" ? " · Corps-wide" : " · Personal"}
                      </p>
                    </div>
                  </div>
                  {unread ? (
                    <button
                      type="button"
                      onClick={() => markOne(n.id)}
                      className="shrink-0 font-mono text-[0.6rem] tracking-[0.2em] text-gold-300 uppercase underline underline-offset-4 hover:text-gold-200"
                    >
                      Mark read
                    </button>
                  ) : (
                    <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/35 uppercase">Read</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-100/70">{n.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
