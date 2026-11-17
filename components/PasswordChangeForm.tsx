"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, LogOut } from "lucide-react";

type PasswordChangeFormProps = {
  role: "admin" | "member";
  mustChangePassword: boolean;
  returnTo: string;
};

const inputCls =
  "w-full border border-white/15 bg-ink-900/80 px-4 py-3 text-[0.92rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[0.6rem] tracking-[0.22em] text-ink-100/55 uppercase";

export default function PasswordChangeForm({ role, mustChangePassword, returnTo }: PasswordChangeFormProps) {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (next.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("The new passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Password change failed.");
      setMessage("Password updated. Taking you to your account…");
      setCurrent("");
      setNext("");
      setConfirm("");
      router.replace(returnTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace(role === "admin" ? "/admin/login" : "/portal/login");
    router.refresh();
  }

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <h2 className="flex items-center gap-2 font-display text-2xl text-white">
        <KeyRound className="h-5 w-5 text-gold-400" aria-hidden="true" />
        {mustChangePassword ? "Set your new password" : "Change your password"}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-100/65">
        {mustChangePassword
          ? "For your security, change the temporary password before continuing."
          : "Enter your current password, then choose a new one for your account."}
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="change-current-password" className={labelCls}>Current password</label>
          <input
            id="change-current-password"
            type="password"
            required
            autoComplete="current-password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="change-new-password" className={labelCls}>New password</label>
          <input
            id="change-new-password"
            type="password"
            required
            minLength={8}
            maxLength={256}
            autoComplete="new-password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            className={inputCls}
          />
          <p className="mt-1.5 text-xs text-ink-100/40">Use at least 8 characters; a longer, unique password is recommended.</p>
        </div>
        <div>
          <label htmlFor="change-confirm-password" className={labelCls}>Confirm new password</label>
          <input
            id="change-confirm-password"
            type="password"
            required
            minLength={8}
            maxLength={256}
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className={inputCls}
          />
        </div>
        {error && (
          <p role="alert" className="border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
            {error}
          </p>
        )}
        {message && <p role="status" className="text-sm text-emerald-300">{message}</p>}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={busy}
            className="flex items-center gap-2 bg-gold-500 px-6 py-3 font-mono text-[0.65rem] tracking-[0.2em] text-ink-950 uppercase transition-colors hover:bg-gold-400 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <KeyRound className="h-4 w-4" aria-hidden="true" />}
            {busy ? "Updating…" : "Update password"}
          </button>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[0.65rem] tracking-[0.18em] text-ink-100/70 uppercase transition-colors hover:border-white/30 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
          </button>
        </div>
      </form>
    </div>
  );
}
