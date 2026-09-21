import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Crest from "./Crest";

type CTASectionProps = {
  kicker?: string;
  title?: string;
  copy?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTASection({
  kicker = "The Call to Serve",
  title = "Membership is more than a card. It is a commitment to service.",
  copy = "Join a professional chaplaincy community devoted to standing beside those who protect, serve and respond — wherever duty calls.",
  primaryLabel = "Join the Call to Serve",
  primaryHref = "/join",
  secondaryLabel = "Explore IPPSCC",
  secondaryHref = "/about",
}: CTASectionProps) {
  return (
    <section className="grain relative overflow-hidden bg-ink-800">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-40%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-600/15 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-28 lg:px-10">
        <Reveal>
          <Crest className="mx-auto h-20 w-20" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 font-mono text-[0.7rem] tracking-[0.3em] text-gold-400 uppercase">{kicker}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <h2 className="balance mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70 sm:text-lg">{copy}</p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400 sm:w-auto"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:w-auto"
            >
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 font-mono text-[0.65rem] tracking-[0.26em] text-ink-100/40 uppercase">
            Shielded by Faith · Sent to Serve
          </p>
        </Reveal>
      </div>
    </section>
  );
}
