"use client";

import { Suspense, useCallback, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown, Copy, Loader2, Search, ShieldCheck, UserRoundPlus } from "lucide-react";
import type { MemberPublic } from "@/lib/store";

const INITIAL_FELLOW_NAMES = [
  "Dr. Jumai Ahmadu",
  "Dr. Donatus Emeka Makata",
  "Mrs. Catherine Nkeiruka Njoku",
  "Mr. Olufesobi Williams James",
  "Dr. Ogwu James Onoja, FCRB",
  "DCNS Young Precious Nwanne",
  "H.I.M. Prof. Timothy Atte",
  "Amb. Augusta Keneboh",
  "Hon. Dr. Hope George, JP, FSM",
];

type IssuedCredential = { member: MemberPublic; tempPassword: string };
type ResetCredential = { id: string; username: string; memberId: string; tempPassword: string };

function MembersInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState(params.get("status") || "all");
  const [q, setQ] = useState("");
  const [list, setList] = useState<MemberPublic[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [names, setNames] = useState(INITIAL_FELLOW_NAMES.join("\n"));
  const [provisioning, setProvisioning] = useState(false);
  const [issued, setIssued] = useState<IssuedCredential[] | null>(null);
  const [temp, setTemp] = useState<ResetCredential | null>(null);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

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

  async function provisionFellows(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIssued(null);
    const cleaned = names.split("\n").map((name) => name.trim()).filter(Boolean);
    if (cleaned.length === 0) {
      setError("Enter at least one member name.");
      return;
    }
    setProvisioning(true);
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: cleaned }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Accounts could not be provisioned.");
      setIssued(data.members);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Accounts could not be provisioned.");
    } finally {
      setProvisioning(false);
    }
  }

  async function setMemberStatus(id: string, next: string) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Status could not be updated.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status could not be updated.");
    } finally {
      setBusy(null);
    }
  }

  async function resetPassword(id: string) {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset-password" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password could not be reset.");
      setTemp({
        id,
        username: data.member.username,
        memberId: data.member.memberId,
        tempPassword: data.tempPassword,
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password could not be reset.");
    } finally {
      setBusy(null);
    }
  }

  async function reviewUsername(id: string, action: "approve-username" | "reject-username") {
    setBusy(id);
    setError("");
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Username request could not be reviewed.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Username request could not be reviewed.");
    } finally {
      setBusy(null);
    }
  }

  async function copyText(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setError("Could not copy to clipboard. Select and copy the credentials manually.");
    }
  }

  function credentialText(member: MemberPublic, password: string) {
    return `IPPSCC member: ${member.name}\nUsername: ${member.username}\nMember ID: ${member.memberId}\nTemporary password: ${password}\nSign in at https://ippscc.org/portal/login and change the temporary password at first login.`;
  }

  const resetText = temp
    ? `IPPSCC member username: ${temp.username}\nMember ID: ${temp.memberId}\nTemporary password: ${temp.tempPassword}\nSign in at https://ippscc.org/portal/login and change the temporary password at first login.`
    : "";

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Membership Roll</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Members.</h1>

      {error && (
        <p role="alert" className="mt-5 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
          {error}
        </p>
      )}

      <section className="mt-6 border border-gold-500/30 bg-gold-500/[0.04] p-5 sm:p-6" aria-labelledby="provision-heading">
        <div className="flex items-start gap-3">
          <UserRoundPlus className="mt-1 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
          <div>
            <h2 id="provision-heading" className="font-display text-xl text-white">Provision Distinguished Fellows</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-100/60">
              Create portal accounts for already-approved members. Enter one name per line; emails are optional. Each account receives a unique username, IPPSCC member ID and strong temporary password. Members must change the password before entering the portal.
            </p>
          </div>
        </div>
        <form onSubmit={provisionFellows} className="mt-5">
          <label htmlFor="fellow-names" className="mb-2 block font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/60 uppercase">Member names</label>
          <textarea
            id="fellow-names"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            rows={6}
            maxLength={6000}
            className="w-full border border-white/15 bg-ink-950/80 px-4 py-3 font-mono text-sm leading-relaxed text-white focus:border-gold-400 focus:outline-none"
            aria-describedby="fellow-names-hint"
          />
          <p id="fellow-names-hint" className="mt-2 text-xs text-ink-100/45">The nine confirmed Distinguished Fellows are prefilled. Remove any names you do not intend to provision; existing duplicate accounts are rejected.</p>
          <button
            type="submit"
            disabled={provisioning}
            className="mt-4 flex items-center gap-2 bg-gold-500 px-6 py-3 font-mono text-[0.62rem] tracking-[0.2em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {provisioning ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <UserRoundPlus className="h-4 w-4" aria-hidden="true" />}
            {provisioning ? "Creating accounts…" : "Create member accounts"}
          </button>
        </form>
      </section>

      {issued && (
        <section className="mt-6 border border-gold-400 bg-gold-500/10 p-5 sm:p-6" role="status" aria-labelledby="credentials-heading">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="credentials-heading" className="flex items-center gap-2 font-display text-xl text-gold-100">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" /> One-time login credentials
              </h2>
              <p className="mt-2 text-sm text-gold-100/75">These temporary passwords are shown only in this response. Save and share them securely now; they are not emailed or stored in readable form.</p>
            </div>
            <button
              type="button"
              onClick={() => setIssued(null)}
              className="font-mono text-[0.6rem] tracking-[0.18em] text-ink-100/55 uppercase underline underline-offset-4"
            >
              Dismiss credentials
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {issued.map(({ member, tempPassword: password }) => (
              <div key={member.id} className="border border-white/10 bg-ink-950/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <div><dt className="inline text-ink-100/45">Username: </dt><dd className="inline font-mono text-gold-200">{member.username}</dd></div>
                      <div><dt className="inline text-ink-100/45">Member ID: </dt><dd className="inline font-mono text-gold-200">{member.memberId}</dd></div>
                      <div className="sm:col-span-2"><dt className="inline text-ink-100/45">Temporary password: </dt><dd className="break-all font-mono text-white">{password}</dd></div>
                    </dl>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(member.id, credentialText(member, password))}
                    className="flex shrink-0 items-center gap-2 border border-gold-500/60 px-3 py-2 font-mono text-[0.58rem] tracking-[0.16em] text-gold-200 uppercase"
                  >
                    {copied === member.id ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                    {copied === member.id ? "Copied" : "Copy details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {temp && (
        <div className="mt-6 border border-gold-400 bg-gold-500/10 p-5" role="status">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] text-gold-300 uppercase">
            Temporary password for {temp.username} — share securely (shown once)
          </p>
          <p className="mt-2 text-sm text-ink-100/70">Member ID: <span className="font-mono text-gold-200">{temp.memberId}</span></p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code className="break-all border border-white/10 bg-ink-950/60 px-4 py-2.5 font-mono text-sm text-gold-200">{temp.tempPassword}</code>
            <button
              type="button"
              onClick={() => copyText("reset", resetText)}
              className="flex items-center gap-2 border border-gold-500/60 px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.2em] text-gold-300 uppercase"
            >
              {copied === "reset" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied === "reset" ? "Copied" : "Copy details"}
            </button>
            <button type="button" onClick={() => setTemp(null)} className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/50 uppercase underline underline-offset-4">Dismiss</button>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {["all", "active", "pending", "suspended"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${
                status === s ? "border-gold-400 bg-gold-500/15 text-gold-200" : "border-white/15 text-ink-100/55 hover:border-gold-500/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-100/35" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, username, email, ID…"
            aria-label="Search members"
            className="w-full border border-white/15 bg-ink-900/80 py-2.5 pr-3 pl-9 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
          />
        </div>
      </div>

      {list === null ? (
        <p className="mt-8 flex items-center gap-3 text-ink-100/60"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading…</p>
      ) : list.length === 0 ? (
        <p className="mt-8 border border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-ink-100/55">No members match this filter.</p>
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
                      {m.memberId} · {m.username} · {m.email || "No email on file"}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className={`border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] uppercase ${
                      m.status === "active" ? "border-emerald-500/50 text-emerald-300" : m.status === "suspended" ? "border-crimson-600 text-crimson-300" : "border-white/20 text-ink-100/60"
                    }`}>{m.status}</span>
                    {m.requestedUsername && <span className="border border-gold-500/50 px-2 py-1 font-mono text-[0.52rem] text-gold-300 uppercase">Username review</span>}
                    <ChevronDown className={`h-4 w-4 text-gold-500 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </span>
                </button>
                {expanded && (
                  <div className="grid gap-5 border-t border-white/5 py-5 lg:grid-cols-2">
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        ["Username", m.username],
                        ["Email", m.email || "Not provided"],
                        ["Rank / Title", m.rank],
                        ["Region", m.region || "—"],
                        ["Joined", new Date(m.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
                        ["Phone", String(m.profile.phone || "—")],
                        ["City", String(m.profile.city || "—")],
                        ["Country", String(m.profile.country || "—")],
                        ["Track", String(m.profile.serviceTrack || "—")],
                        ["Church", String(m.profile.churchName || m.profile.church || "—")],
                      ].map(([k, v]) => (
                        <div key={k} className="border border-white/10 bg-white/[0.02] px-3 py-2.5">
                          <dt className="font-mono text-[0.56rem] tracking-[0.18em] text-ink-100/40 uppercase">{k}</dt>
                          <dd className="mt-0.5 break-words text-ink-100/85">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="space-y-4">
                      {m.requestedUsername && (
                        <section className="border border-gold-500/30 bg-gold-500/[0.05] p-4" aria-label="Username change review">
                          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-300 uppercase">Username request</p>
                          <p className="mt-2 text-sm text-white"><span className="text-ink-100/50">Current:</span> <span className="font-mono">{m.username}</span></p>
                          <p className="mt-1 text-sm text-white"><span className="text-ink-100/50">Requested:</span> <span className="font-mono text-gold-200">{m.requestedUsername}</span></p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button type="button" disabled={busy === m.id} onClick={() => reviewUsername(m.id, "approve-username")} className="border border-emerald-500/60 px-3 py-2 font-mono text-[0.58rem] tracking-[0.16em] text-emerald-200 uppercase disabled:opacity-40">Approve</button>
                            <button type="button" disabled={busy === m.id} onClick={() => reviewUsername(m.id, "reject-username")} className="border border-crimson-500/60 px-3 py-2 font-mono text-[0.58rem] tracking-[0.16em] text-crimson-200 uppercase disabled:opacity-40">Decline</button>
                          </div>
                        </section>
                      )}
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
                                m.status === s ? "border-gold-400 bg-gold-500/15 text-gold-200" : "border-white/15 text-ink-100/60 hover:border-gold-500/50 hover:text-white"
                              }`}
                            >{s}</button>
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
                        >{busy === m.id ? "Working…" : "Reset Password"}</button>
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
  return <Suspense fallback={<p className="text-ink-100/60">Loading…</p>}><MembersInner /></Suspense>;
}
