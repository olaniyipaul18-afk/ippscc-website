import type { Metadata } from "next";
import Crest from "@/components/Crest";
import LoginForm from "@/components/LoginForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Member Portal — Sign In",
  description: "Sign in to the IPPSCC member portal: dashboard, profile, digital ID and notifications.",
};

export default function PortalLoginPage() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-30%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-600/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-md px-6 pt-40 pb-24 sm:pt-44">
        <Reveal>
          <div className="text-center">
            <Crest className="mx-auto h-16 w-16" />
            <p className="mt-6 font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
              Member Portal
            </p>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">Welcome back.</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-100/60">
              Sign in with the login details issued after your registration was completed.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 border border-white/10 bg-white/[0.02] p-7 sm:p-8">
            <LoginForm role="member" redirectTo="/portal" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
