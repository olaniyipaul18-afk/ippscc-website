import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Admin Control — Sign In",
  description: "Restricted administrator access to the IPPSCC control room.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-30%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-crimson-600/15 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-md px-6 pt-40 pb-24 sm:pt-44">
        <Reveal>
          <div className="text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center border border-crimson-500/50 bg-crimson-500/10">
              <ShieldCheck className="h-7 w-7 text-crimson-300" aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-[0.68rem] tracking-[0.3em] text-crimson-300 uppercase">
              Restricted · Admin Control
            </p>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">Control room.</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-100/60">
              Authorized administrators only. All review actions are recorded.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 border border-white/10 bg-white/[0.02] p-7 sm:p-8">
            <LoginForm role="admin" redirectTo="/admin" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
