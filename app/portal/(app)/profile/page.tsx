"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, KeyRound, Loader2, UserRound } from "lucide-react";
import type { MemberPublic } from "@/lib/store";

const inputCls =
  "w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-[0.92rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase";

const FIELDS: { section: string; fields: { name: string; label: string; type?: string }[] }[] = [
  {
    section: "Personal",
    fields: [
      { name: "fullName", label: "Full Name" },
      { name: "preferredName", label: "Title / Preferred Name" },
      { name: "phone", label: "Phone / Mobile", type: "tel" },
      { name: "whatsapp", label: "WhatsApp Number", type: "tel" },
    ],
  },
  {
    section: "Location & Vocation",
    fields: [
      { name: "address", label: "Residential Address" },
      { name: "city", label: "City / Town" },
      { name: "stateProvince", label: "State / Province" },
      { name: "country", label: "Country" },
      { name: "occupation", label: "Occupation / Profession" },
      { name: "employer", label: "Current Employer / Organization" },
    ],
  },
  {
    section: "Ministry & Service",
    fields: [
      { name: "churchName", label: "Church / Ministry" },
      { name: "churchRole", label: "Ministerial Role" },
      { name: "serviceTrack", label: "Service Track" },
    ],
  },
];

export default function ProfilePage() {
  const [member, setMember] = useState<MemberPublic | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwBusy, setPwBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setMember(d.member);
        const p = (d.member.profile || {}) as Record<string, unknown>;
        const next: Record<string, string> = {};
        for (const s of FIELDS) for (const f of s.fields) next[f.name] = typeof p[f.name] === "string" ? (p[f.name] as string) : "";
        setForm(next);
        setPhotoPreview(typeof p.photoUrl === "string" ? p.photoUrl : "");
      })
      .catch(() => {});
  }, []);

  function set(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setMember(data.member);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadPhoto() {
    if (!photoFile) return;
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("photo", photoFile);
      const res = await fetch("/api/profile", { method: "PATCH", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setMember(data.member);
      setPhotoPreview((data.member.profile?.photoUrl as string) || "");
      setPhotoFile(null);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    setPwMsg("");
    if (pw.next.length < 8) {
      setPwMsg("New password must be at least 8 characters.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwMsg("New passwords do not match.");
      return;
    }
    setPwBusy(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "change-password", current: pw.current, next: pw.next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password change failed.");
      setMember(data.member);
      setPw({ current: "", next: "", confirm: "" });
      setPwMsg("Password updated successfully.");
    } catch (err) {
      setPwMsg(err instanceof Error ? err.message : "Password change failed.");
    } finally {
      setPwBusy(false);
    }
  }

  if (!member) {
    return (
      <div className="flex items-center gap-3 text-ink-100/60">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading your profile…
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">Member Profile</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Set up your profile.</h1>

      {member.mustChangePassword && (
        <p className="mt-5 border border-gold-500/50 bg-gold-500/10 px-5 py-3.5 text-sm text-gold-200">
          Temporary password in use — please set your own password in the Security section below.
        </p>
      )}

      {/* Photo */}
      <section aria-label="Profile photo" className="mt-8 border border-white/10 bg-white/[0.02] p-6">
        <h2 className="flex items-center gap-2 font-display text-xl text-white">
          <Camera className="h-4 w-4 text-gold-400" aria-hidden="true" /> Profile Photo
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <span className="flex h-20 w-20 items-center justify-center overflow-hidden border border-gold-500/50 bg-ink-900">
            {photoPreview ? (
              <Image src={photoPreview} alt="Profile photo preview" width={160} height={160} className="h-full w-full object-cover" unoptimized />
            ) : (
              <UserRound className="h-8 w-8 text-ink-100/30" aria-hidden="true" />
            )}
          </span>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              aria-label="Choose profile photo"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setPhotoFile(f);
                setPhotoPreview(URL.createObjectURL(f));
              }}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="border border-white/20 px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                Choose Photo
              </button>
              {photoFile && (
                <button
                  type="button"
                  onClick={uploadPhoto}
                  disabled={saving}
                  className="bg-gold-500 px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
                >
                  {saving ? "Uploading…" : "Upload"}
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-ink-100/45">JPG, PNG or WebP · under 3MB · photo uploads need the production backend.</p>
          </div>
        </div>
      </section>

      {/* Details */}
      <form onSubmit={saveProfile} className="mt-5 border border-white/10 bg-white/[0.02] p-6">
        <h2 className="flex items-center gap-2 font-display text-xl text-white">
          <UserRound className="h-4 w-4 text-gold-400" aria-hidden="true" /> Personal Details
        </h2>
        <p className="mt-2 font-mono text-[0.62rem] tracking-[0.18em] text-ink-100/45 uppercase">
          {member.memberId} · {member.rank} · {member.region || "Region assigned by the Corps"}
        </p>
        {FIELDS.map((section) => (
          <fieldset key={section.section} className="mt-6">
            <legend className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-400 uppercase">
              {section.section}
            </legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {section.fields.map((f) => (
                <div key={f.name}>
                  <label htmlFor={`pf-${f.name}`} className={labelCls}>{f.label}</label>
                  <input
                    id={`pf-${f.name}`}
                    type={f.type || "text"}
                    value={form[f.name] || ""}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={inputCls}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        ))}
        {error && (
          <p role="alert" className="mt-5 border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
            {error}
          </p>
        )}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold-500 px-7 py-3 font-mono text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-300" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Saved
            </span>
          )}
        </div>
      </form>

      {/* Security */}
      <form onSubmit={changePassword} className="mt-5 border border-white/10 bg-white/[0.02] p-6">
        <h2 className="flex items-center gap-2 font-display text-xl text-white">
          <KeyRound className="h-4 w-4 text-gold-400" aria-hidden="true" /> Security
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="pw-current" className={labelCls}>Current Password</label>
            <input id="pw-current" type="password" required value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className={inputCls} autoComplete="current-password" />
          </div>
          <div>
            <label htmlFor="pw-next" className={labelCls}>New Password</label>
            <input id="pw-next" type="password" required value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className={inputCls} autoComplete="new-password" />
          </div>
          <div>
            <label htmlFor="pw-confirm" className={labelCls}>Confirm New</label>
            <input id="pw-confirm" type="password" required value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputCls} autoComplete="new-password" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={pwBusy}
            className="border border-gold-500/60 px-7 py-3 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase transition-all hover:bg-gold-500 hover:text-ink-950 disabled:opacity-60"
          >
            {pwBusy ? "Updating…" : "Change Password"}
          </button>
          {pwMsg && <span role="status" className="text-sm text-ink-100/70">{pwMsg}</span>}
        </div>
      </form>
    </div>
  );
}
