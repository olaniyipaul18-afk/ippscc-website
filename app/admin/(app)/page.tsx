"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Loader2, UserCheck, Users } from "lucide-react";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/status";
import type { Application, Stats } from "@/lib/store";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setStats(d.stats);
        setRecent(d.recent || []);
      })
      .catch(() => {});
  }, []);

  const cards = stats
    ? [
        { label: "Total Members", value: stats.membersTotal, icon: Users, href: "/admin/members" },
        { label: "Active Members", value: stats.membersActive, icon: UserCheck, href: "/admin/members?status=active" },
        { label: "Pending Review", value: stats.applicationsPending, icon: FileText, href: "/admin/applications?status=pending" },
        { label: "Approved / Completed", value: stats.approvedTotal, icon: UserCheck, href: "/admin/applications?status=approved" },
      ]
    : [];

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Admin Control</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Command overview.</h1>

      {!stats ? (
        <p className="mt-8 flex items-center gap-3 text-ink-100/60">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="group bg-ink-950 p-6 transition-colors hover:bg-ink-850"
              >
                <div className="flex items-center justify-between">
                  <card.icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                  <ArrowUpRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </div>
                <p className="mt-4 font-display text-5xl text-white">{card.value}</p>
                <p className="mt-1.5 font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/55 uppercase">{card.label}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="font-display text-xl text-white">Latest applications</h2>
              <Link href="/admin/applications" className="group flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase">
                All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="px-6 py-8 text-sm text-ink-100/55">No applications yet.</p>
            ) : (
              <ul className="divide-y divide-white/10">
                {recent.map((a) => (
                  <li key={a.id}>
                    <Link href={`/admin/applications/${a.id}`} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/[0.03]">
                      <span>
                        <span className="block text-sm font-medium text-white">{a.name}</span>
                        <span className="mt-0.5 block font-mono text-[0.62rem] text-ink-100/45">{a.ref} · {a.email}</span>
                      </span>
                      <span className={`border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] uppercase ${STATUS_STYLES[a.status]}`}>
                        {STATUS_LABELS[a.status]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
