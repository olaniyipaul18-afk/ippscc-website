import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Chaplaincy Services — Where Duty Meets Human Need",
  description:
    "Fourteen dimensions of IPPSCC professional chaplaincy: law enforcement, public safety, first responder, fire & rescue, crisis, grief, spiritual care, family support and more.",
};

const deepDives = [
  { href: "/services/law-enforcement", label: "Law Enforcement Chaplaincy", note: "Serving those who protect" },
  { href: "/services/first-responder", label: "First Responder Chaplaincy", note: "When they respond, we stand ready" },
  { href: "/services/crisis-disaster", label: "Crisis & Disaster Chaplaincy", note: "Presence when life is disrupted" },
  { href: "/services/wellness", label: "Wellness & Support", note: "Supporting the people behind the service" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Chaplaincy Services"
        title="Where duty meets human need."
        lede="Fourteen dimensions of professional chaplaincy — each one a doorway through which compassion, spiritual care and steady presence enter demanding environments."
        image="/images/prayer-circle.jpg"
        imageAlt="Responders and chaplains bowed together in a prayer circle at dusk"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="01"
            kicker="The Full Spectrum"
            title="Fourteen ways chaplaincy serves."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min((i % 3) * 0.06, 0.2)}>
                <article className="group h-full bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                  <div className="flex items-center justify-between">
                    <service.icon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[1.45rem] leading-tight text-white">
                    {service.title}
                  </h2>
                  <p className="mt-1 font-mono text-[0.62rem] tracking-[0.22em] text-gold-400 uppercase">
                    {service.short}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-100/60">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 border border-gold-500/30 bg-gold-500/[0.05] px-6 py-6 sm:px-8">
              <p className="text-sm leading-relaxed text-ink-100/75">
                <strong className="font-semibold text-gold-200">A note on scope: </strong>
                chaplaincy complements — and never replaces — licensed clinical, medical,
                psychological, legal or emergency care. Where needs extend beyond chaplaincy scope,
                appropriate professional referral is always encouraged.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Go Deeper"
            title="Four fields, explored in full."
            lede="Extended reflections on the chaplaincy disciplines closest to the Corps' founding call."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {deepDives.map((dive, i) => (
              <Reveal key={dive.href} delay={i * 0.06}>
                <Link
                  href={dive.href}
                  className="group flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-7 py-7 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.05]"
                >
                  <span>
                    <span className="block font-display text-2xl text-white transition-colors group-hover:text-gold-200">
                      {dive.label}
                    </span>
                    <span className="mt-1.5 block font-mono text-[0.65rem] tracking-[0.22em] text-gold-400 uppercase">
                      {dive.note}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bring professional chaplaincy to your command or community."
        copy="Institutions and individuals alike are invited to begin the conversation — presence starts with a single step."
      />
    </>
  );
}
