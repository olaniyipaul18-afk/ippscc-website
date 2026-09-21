import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Crest from "@/components/Crest";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-600/30 blur-[160px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
        <Crest className="mx-auto h-24 w-24 opacity-90" />
        <p className="mt-8 font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
          Error 404 — Off the Patrol Route
        </p>
        <h1 className="balance mt-5 font-display text-5xl leading-[1.02] font-medium text-white sm:text-6xl">
          This post is <span className="text-gold-300 italic">unmanned.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-100/70">
          The page you requested doesn&apos;t exist or has been moved. Return to headquarters —
          the mission continues.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:w-auto"
          >
            Contact the Corps
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
