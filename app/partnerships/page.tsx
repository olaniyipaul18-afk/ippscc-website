import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Partnerships — Better Service Through Responsible Collaboration",
  description:
    "IPPSCC seeks constructive relationships with public-safety institutions, community organizations, chaplaincy bodies and faith communities.",
};

const categories = [
  { title: "Public-safety institutions", copy: "Commands, agencies and services seeking structured chaplaincy presence." },
  { title: "Community organizations", copy: "Grassroots bodies bridging responders and the neighborhoods they serve." },
  { title: "Chaplaincy organizations", copy: "Fellow chaplaincies pursuing shared standards and mutual encouragement." },
  { title: "Educational institutions", copy: "Academies and schools partnering in formation and professional development." },
  { title: "Humanitarian organizations", copy: "Relief and development actors serving communities in crisis." },
  { title: "Professional bodies", copy: "Associations upholding excellence across the helping professions." },
  { title: "Faith communities", copy: "Congregations and traditions grounding chaplaincy in lived spiritual wisdom." },
  { title: "Service organizations", copy: "Civic groups whose volunteer spirit amplifies compassionate outreach." },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        kicker="Partnerships"
        title="Better service through responsible collaboration."
        lede="Effective public-safety support is rarely the work of one person or one profession. IPPSCC seeks constructive relationships that multiply compassionate presence."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Partnerships" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="01"
            kicker="With Whom We Collaborate"
            title="Eight doors to shared mission."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={Math.min((i % 4) * 0.05, 0.2)}>
                <article className="group h-full bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-850 sm:p-7">
                  <Handshake className="h-5 w-5 text-gold-500" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-xl leading-tight text-white">{cat.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-100/60">{cat.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-ink-100/45">
              Any partnership, endorsement or institutional relationship is identified publicly only
              when formally established.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Beginning a Partnership"
            title="Relationship first. Formality with care."
            lede="Every institutional relationship begins with conversation — understanding needs, aligning expectations, and discerning together whether and how chaplaincy can serve."
          />
          <div className="flex flex-col justify-center">
            <ol className="space-y-0 border-t border-white/10">
              {[
                "Introduce your institution and its needs through the contact page.",
                "Meet with Corps representatives to explore fit, scope and boundaries.",
                "Agree terms that respect law, policy, culture and professional standards.",
                "Begin service — and review it together, honestly and regularly.",
              ].map((step, i) => (
                <Reveal key={step} delay={i * 0.06}>
                  <li className="flex items-start gap-5 border-b border-white/10 py-5">
                    <span className="font-display text-3xl text-gold-500/80">{String(i + 1).padStart(2, "0")}</span>
                    <p className="pt-1 text-[0.95rem] leading-relaxed text-ink-100/75">{step}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="group mt-8 inline-flex w-fit items-center gap-2 border border-gold-500/60 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-gold-300 uppercase transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
              >
                Start the Conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="No calling is fulfilled alone."
        copy="Join the Corps — or partner with it — and help build a wider circle of care around those who serve."
      />
    </>
  );
}
