import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { standards } from "@/data/values";

export const metadata: Metadata = {
  title: "Professional Standards — Ethics, Confidentiality & Safeguarding",
  description:
    "Compassion with boundaries. Faith with professional responsibility. The ethical, confidentiality and safeguarding standards of IPPSCC chaplaincy.",
};

const pillars = [
  {
    title: "Confidentiality",
    copy: "Respect for private conversations within applicable legal and professional limits — the currency in which all chaplaincy trust is minted.",
  },
  {
    title: "Ethics",
    copy: "A commitment to principled conduct: honesty, fidelity, humility and the refusal to exploit pastoral access for any personal end.",
  },
  {
    title: "Boundaries",
    copy: "Understanding what chaplaincy is — and what it is not. Clarity of role protects both the chaplain and those served.",
  },
  {
    title: "Safeguarding",
    copy: "Protecting vulnerable people and responding responsibly to safeguarding concerns through proper channels, without delay.",
  },
  {
    title: "Accountability",
    copy: "Accepting responsibility for professional conduct — answerable to the Corps, to institutions served, and to conscience.",
  },
  {
    title: "Referral",
    copy: "Recognizing when another qualified professional or service is needed — and guiding people there with warmth, not abandonment.",
  },
  {
    title: "Cultural Respect",
    copy: "Serving people with dignity across cultures, backgrounds and faith traditions — a student of every context entered.",
  },
];

export default function StandardsPage() {
  return (
    <>
      <PageHero
        kicker="Professional Standards"
        title="Compassion with boundaries."
        lede="Faith with professional responsibility. Professional chaplaincy requires both heart and discipline — and IPPSCC insists on both."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Standards" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="01"
            kicker="The Professional Culture"
            title="Twelve standards. One unbroken trust."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((standard, i) => (
              <Reveal key={standard.title} delay={Math.min((i % 3) * 0.06, 0.2)}>
                <article className="h-full bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                  <p className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-500/80">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-[1.4rem] leading-tight text-white">{standard.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-100/60">{standard.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="trust">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="02"
                kicker="Ethics, Confidentiality & Safeguarding"
                title="Trust must be earned."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75">
                  Chaplaincy is built on trust — and that trust requires responsibility. IPPSCC
                  maintains clear standards addressing every dimension of faithful, safe practice.
                </p>
              </Reveal>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                    <h3 className="font-display text-xl text-gold-200 sm:text-2xl">{pillar.title}</h3>
                    <p className="text-[0.95rem] leading-relaxed text-ink-100/70">{pillar.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-14 border border-gold-500/30 bg-gold-500/[0.05] px-6 py-6 sm:px-8">
              <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-ink-100/75">
                Chaplaincy is intended to complement appropriate professional services — not replace
                licensed clinical, medical, psychological, legal or emergency care.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Serve within a standard worth keeping."
        copy="Join chaplains who hold compassion and discipline in equal honor — and earn the trust they carry."
      />
    </>
  );
}
