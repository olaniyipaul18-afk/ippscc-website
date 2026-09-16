import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { entitlements } from "@/data/values";

export const metadata: Metadata = {
  title: "Membership — A Commitment to Service",
  description:
    "IPPSCC membership is more than a card — it is a commitment to develop, serve responsibly and belong to an international professional chaplaincy community.",
};

const pathways = [
  "Law enforcement",
  "Public safety",
  "First responders",
  "Fire and rescue",
  "Emergency services",
  "Correctional environments",
  "Crisis and disaster response",
  "Community and humanitarian service",
];

const steps = [
  {
    title: "Express your calling",
    copy: "Complete the application of interest on the Join page, telling us about your background and the field you feel called to serve.",
  },
  {
    title: "Professional review",
    copy: "The Corps reviews each submission against its eligibility, application and professional requirements.",
  },
  {
    title: "Conversation & documentation",
    copy: "Successful applicants proceed through conversation, documentation and any further requirements defined by governing policy.",
  },
  {
    title: "Formation & commissioning",
    copy: "Members enter formation — training, mentorship and development — toward authorized, commissioned service.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        kicker="Membership"
        title="Membership is more than a card."
        lede="It is a commitment to service — to develop yourself, serve responsibly, respect professional boundaries, and belong to a community devoted to those who serve."
        image="/images/chaplain-comfort.jpg"
        imageAlt="A chaplain comforting a police officer in a quiet moment of care"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership" }]}
      />

      {/* Philosophy */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                index="01"
                kicker="The Meaning of Membership"
                title="It is a commitment to become."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75 sm:text-lg">
                  Joining IPPSCC should represent more than receiving an identification card or
                  organizational title. It represents a decision to grow in character, prepare with
                  discipline, serve with compassion — and stand with others who have made the same
                  commitment.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/join"
                  className="group mt-8 inline-flex items-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400"
                >
                  Begin Your Application
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-10">
                <p className="font-mono text-[0.68rem] tracking-[0.28em] text-gold-400 uppercase">
                  Who is membership for?
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-100/65">
                  A membership pathway for appropriately qualified individuals interested in
                  professional chaplaincy and service to:
                </p>
                <ul className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                  {pathways.map((path) => (
                    <li key={path} className="bg-ink-950 px-4 py-3.5 text-sm text-ink-100/80">
                      {path}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-ink-100/45">
                  Membership categories and eligibility requirements are clearly defined by the
                  organization&apos;s governing policies.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Entitlements */}
      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="entitlements">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Membership Entitlements"
            title="What your membership can open the door to."
            align="center"
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {entitlements.map((item, i) => (
              <Reveal key={item} delay={Math.min((i % 4) * 0.05, 0.2)}>
                <div className="group flex h-full min-h-28 items-start gap-3 bg-ink-900 p-5 transition-colors duration-300 hover:bg-ink-850">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  <p className="text-sm leading-snug text-ink-100/80 transition-colors group-hover:text-white">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-100/45">
              Entitlements are presented according to the actual membership package, eligibility
              criteria and applicable organizational policies — not as universal guarantees. No
              entitlement confers police powers, governmental authority or law-enforcement status.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="03"
            kicker="The Pathway"
            title="From calling to commissioned service."
            lede="A clear, professional journey — designed to prepare, not merely to process."
          />
          <ol className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <li className="h-full bg-ink-950 p-7 sm:p-8">
                  <p className="font-display text-5xl text-gold-500/80">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-display text-xl text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-100/60">{step.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Don't just carry the title. Prepare for the responsibility."
        copy="Begin your application today — and take the first disciplined step toward professional chaplaincy service."
      />
    </>
  );
}
