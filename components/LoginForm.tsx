"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

type LoginFormProps = {
  role: "member" | "admin";
  redirectTo: string;
};

export default function LoginForm({ role, redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setDemo(d.mode === "demo"))
      .catch(() => {});
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.role === role) router.replace(redirectTo);
      })
      .catch(() => {});
  }, [role, redirectTo, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign-in failed.");
        setBusy(false);
        return;
      }
      router.push(data.redirect || redirectTo);
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setBusy(false);
    }
  }

  const demoCreds = role === "admin"
    ? { email: "admin@ippscc.org", password: "Admin123!" }
    : { email: "member@ippscc.org", password: "Member123!" };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label={role === "admin" ? "Administrator sign in" : "Member sign in"}>
      <div>
        <label htmlFor={`${role}-email`} className="mb-2 block font-mono text-[0.65rem] tracking-[0.22em] text-ink-100/60 uppercase">
          Email Address
        </label>
        <input
          id={`${role}-email`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-white/15 bg-ink-900/80 px-4 py-3.5 text-[0.95rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor={`${role}-password`} className="mb-2 block font-mono text-[0.65rem] tracking-[0.22em] text-ink-100/60 uppercase">
          Password
        </label>
        <div className="relative">
          <input
            id={`${role}-password`}
            type={show ? "text" : "password"}
            required
            autoComplete={role === "admin" ? "current-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-white/15 bg-ink-900/80 px-4 py-3.5 pr-12 text-[0.95rem] text-white placeholder:text-ink-100/35 transition-colors focus:border-gold-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-ink-100/50 transition-colors hover:text-gold-300"
          >
            {show ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="border border-crimson-500/50 bg-crimson-500/10 px-4 py-3 text-sm text-crimson-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="group flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400 disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Signing In…
          </>
        ) : (
          <>
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>

      {demo && (
        <div className="border border-gold-500/30 bg-gold-500/[0.06] px-4 py-3.5">
          <p className="font-mono text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase">
            Demo credentials
          </p>
          <p className="mt-1.5 font-mono text-xs text-ink-100/70">
            {demoCreds.email} · {demoCreds.password}
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail(demoCreds.email);
              setPassword(demoCreds.password);
            }}
            className="mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-gold-400 uppercase underline underline-offset-4 hover:text-gold-300"
          >
            Fill demo credentials
          </button>
        </div>
      )}

      {role === "member" && (
        <p className="text-center text-xs leading-relaxed text-ink-100/45">
          Not yet a member?{" "}
          <Link href="/join" className="text-gold-300 underline underline-offset-4 hover:text-gold-200">
            Apply for membership
          </Link>{" "}
          ·{" "}
          <Link href="/track" className="text-gold-300 underline underline-offset-4 hover:text-gold-200">
            Track your application
          </Link>
        </p>
      )}
    </form>
  );
}
