"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("IPPSCC application error:", error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-center bg-ink-950">
      <div className="mx-auto max-w-2xl px-6 py-32 text-center lg:px-10">
        <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
          Something Went Wrong
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight font-medium text-white sm:text-5xl">
          Even the steady need a moment to recover.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-100/70">
          An unexpected error interrupted this page. You can try again, or return home to continue
          the mission.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="w-full bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400 sm:w-auto"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full border border-white/25 px-8 py-4 text-center font-mono text-[0.72rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:w-auto"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
