import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHero from "./PageHero";
import Reveal from "./Reveal";
import CTASection from "./CTASection";

export type ServiceDetailProps = {
  kicker: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  sectionLabel: string;
  intro: string[];
  listTitle: string;
  listIntro?: string;
  points: string[];
  closingTitle: string;
  closingCopy: string;
  related: { href: string; label: string; note: string }[];
  /** Crimson marks fields of crisis and sacrifice; gold is the default. */
  accent?: "gold" | "crimson";
};

export default function ServiceDetail(props: ServiceDetailProps) {
  const {
    kicker, title, lede, image, imageAlt, sectionLabel, intro,
    listTitle, listIntro, points, closingTitle, closingCopy, related,
    accent = "gold",
  } = props;

  const crimson = accent === "crimson";

  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        lede={lede}
        image={image}
        imageAlt={imageAlt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: sectionLabel },
        ]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-10">
          <div>
            <Reveal>
              <p
                className={`font-mono text-[0.68rem] tracking-[0.3em] uppercase ${
                  crimson ? "text-crimson-300" : "text-gold-400"
                }`}
              >
                The Practice
              </p>
            </Reveal>
            {intro.map((para, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p
                  className={`mt-5 leading-relaxed text-ink-100/75 ${
                    i === 0 ? "font-display text-2xl text-white/90 sm:text-[1.7rem] sm:leading-snug" : "text-base sm:text-lg"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <Link href="/services" className="group mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.22em] text-gold-300 uppercase">
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                <span className="link-sweep">All Chaplaincy Services</span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div
              className={`border p-8 sm:p-10 lg:sticky lg:top-36 ${
                crimson ? "border-crimson-500/40 bg-crimson-500/[0.05]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <h2 className="font-display text-2xl text-white sm:text-3xl">{listTitle}</h2>
              {listIntro && <p className="mt-3 text-sm leading-relaxed text-ink-100/60">{listIntro}</p>}
              <ul className="mt-7 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-100/80">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
                        crimson ? "border-crimson-500/60" : "border-gold-500/50"
                      }`}
                    >
                      <Check className={`h-3 w-3 ${crimson ? "text-crimson-300" : "text-gold-400"}`} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing statement */}
      <section className="border-y border-white/10 bg-ink-900">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <p
              className={`font-mono text-[0.68rem] tracking-[0.3em] uppercase ${
                crimson ? "text-crimson-300" : "text-gold-400"
              }`}
            >
              {closingTitle}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="balance mt-5 font-display text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
              {closingCopy}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.href}
                  href={rel.href}
                  className="group flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.05]"
                >
                  <span>
                    <span className="block font-medium text-white group-hover:text-gold-200">{rel.label}</span>
                    <span className="mt-1 block text-xs text-ink-100/50">{rel.note}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Bring professional chaplaincy to those who protect and respond."
        copy="Whether you serve in uniform or feel called to stand beside those who do — there is a place for you in this mission."
      />
    </>
  );
}
