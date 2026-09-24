import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Flame,
  GraduationCap,
  Globe2,
  HeartHandshake,
  Landmark,
  Medal,
  Shield,
  Siren,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "CIPC Partnership — Advancing Professional Chaplaincy",
  description:
    "IPPSCC is proud to partner with the Chartered Institute of Professional Chaplains (CIPC), USA — advancing professional development, excellence and service across the chaplaincy profession.",
};

const CIPC_URL = "https://www.charteredchaplains.org";

const beyondPulpit = [
  "Crisis",
  "Trauma",
  "Loss",
  "Emergency situations",
  "Major life transitions",
  "Workplace challenges",
  "Humanitarian situations",
  "Institutional environments",
  "Public service",
];

const represents = [
  {
    icon: TrendingUp,
    title: "Professional Development",
    copy: "Supporting the continuous growth and development of professional chaplains.",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    copy: "Encouraging knowledge, preparation, and practical competence for chaplaincy service.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Standards",
    copy: "Promoting professionalism, ethical conduct, responsibility, and excellence in chaplaincy practice.",
  },
  {
    icon: Globe2,
    title: "Diverse Areas of Service",
    copy: "Recognizing chaplaincy across different professional, institutional, humanitarian, and public-service environments.",
  },
  {
    icon: Users,
    title: "Professional Community",
    copy: "Creating opportunities for chaplains to connect, learn, develop, and serve within a professional community.",
  },
];

const fields = [
  { icon: Shield, label: "Police & Public Safety" },
  { icon: Medal, label: "Military & Paramilitary" },
  { icon: Flame, label: "Fire & Rescue" },
  { icon: Siren, label: "Emergency Services" },
  { icon: HeartHandshake, label: "Humanitarian Services" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Landmark, label: "Correctional Services" },
  { icon: BookOpen, label: "Educational Institutions" },
  { icon: Briefcase, label: "Corporate & Workplace Settings" },
  { icon: Users, label: "Community Services" },
];

const whyItMatters = [
  { title: "Better professional preparation", copy: "Chaplains formed for the realities of demanding service environments." },
  { title: "Greater collaboration", copy: "Organizations working together instead of in isolation." },
  { title: "Continuous development", copy: "Learning that does not stop at certification or appointment." },
  { title: "Higher standards of service", copy: "Shared expectations that lift the whole profession." },
  { title: "Cross-sector engagement", copy: "Chaplaincy present wherever people face pressure, crisis and change." },
  { title: "Global professional relationships", copy: "A connected community of chaplains across nations and sectors." },
  { title: "Support in challenging environments", copy: "Strengthening those who serve people on their hardest days." },
];

const certificationPath = [
  { step: "01", title: "Apply", copy: "Begin with a simple registration process." },
  { step: "02", title: "Train", copy: "Structured preparation for real-world chaplaincy environments." },
  { step: "03", title: "Certify", copy: "Become a Certified Professional Chaplain." },
  { step: "04", title: "Connect", copy: "Join a global network of serving chaplains." },
];

export default function CipcPage() {
  return (
    <>
      <PageHero
        kicker="IPPSCC × CIPC"
        title="A Partnership Advancing Professional Chaplaincy"
        lede="The International Police and Public Safety Chaplain Corps is proud to partner with the Chartered Institute of Professional Chaplains in advancing professional development, excellence, and service across the chaplaincy profession."
        image="/images/cipc-partnership.jpg"
        imageAlt="IPPSCC and Chartered Institute of Professional Chaplains partnership — Become a Chartered Professional Chaplain"
        imagePosition="object-top"
        caption="IPPSCC × CIPC"
        cta={{ label: "Explore CIPC", href: CIPC_URL, external: true }}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "CIPC Partnership" }]}
      />

      {/* 01 — Introducing CIPC */}
      <section className="bg-parchment-50 text-ink-900" aria-labelledby="cipc-intro">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="01"
            kicker="Introducing CIPC"
            title="Meet the Chartered Institute of Professional Chaplains"
            tone="light"
            lede="A professional body devoted to the development, advancement, and professional practice of chaplaincy — an independent organization with its own identity, framework, and website."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-ink-800/80 sm:text-lg">
                <p>
                  The Chartered Institute of Professional Chaplains (CIPC), USA exists to give
                  called men and women a clear, guided path into professional chaplaincy —
                  through structured training, professional certification, and a global
                  professional network.
                </p>
                <p>
                  Its work recognizes a simple truth: professional chaplaincy extends far beyond
                  traditional church settings. Chaplains serve people in hospitals, prisons,
                  schools, crisis-response environments, and across diverse professional,
                  institutional, humanitarian, and public-service settings.
                </p>
              </div>
              <a
                href={CIPC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.24em] text-ink-900 uppercase"
              >
                <span className="link-sweep">Visit the official CIPC website</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <ol className="grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2">
                {certificationPath.map((s) => (
                  <li key={s.step} className="bg-parchment-50 p-6">
                    <p className="font-display text-3xl text-gold-600">{s.step}</p>
                    <h3 className="mt-3 font-display text-xl text-ink-900">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-800/70">{s.copy}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-ink-800/55">
                The Apply → Train → Certify → Connect pathway, as presented on the official CIPC website.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — What is professional chaplaincy */}
      <section className="border-y border-white/10 bg-ink-950" aria-labelledby="cipc-beyond">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="02"
            kicker="What Is Professional Chaplaincy?"
            title="Chaplaincy Beyond the Pulpit"
            lede="Professional chaplains serve people in the environments where life is most demanding — combining compassionate human support with appropriate professional preparation and ethical practice."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {beyondPulpit.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.04, 0.3)}>
                <span className="inline-block border border-gold-500/40 bg-gold-500/[0.06] px-5 py-3 text-sm text-gold-200">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl border-l-2 border-gold-500 pl-6 text-base leading-relaxed text-ink-100/75 sm:text-lg">
              Wherever individuals and communities encounter crisis, loss, transition, or
              institutional pressure, a professionally prepared chaplain can offer steady,
              ethical, human presence — and know when to refer to clinical, legal, or
              emergency professionals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — What CIPC represents */}
      <section className="bg-ink-900" aria-labelledby="cipc-represents">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="03"
            kicker="What CIPC Represents"
            title="Professionalism. Preparation. Service."
            align="center"
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {represents.map((card, i) => (
              <Reveal key={card.title} delay={Math.min(i * 0.05, 0.25)}>
                <div className="h-full bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                  <card.icon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-2xl text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-100/65">{card.copy}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <a
                href={CIPC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-52 flex-col justify-between bg-gold-500 p-7 transition-colors duration-300 hover:bg-gold-400 sm:p-8"
              >
                <p className="font-mono text-[0.62rem] tracking-[0.24em] text-ink-950/70 uppercase">
                  Straight from the source
                </p>
                <span>
                  <span className="block font-display text-2xl leading-tight text-ink-950">
                    Explore CIPC&apos;s framework, programs, and opportunities.
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.22em] text-ink-950 uppercase">
                    Visit CIPC Website
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — Who can benefit */}
      <section className="border-y border-white/10 bg-ink-950" aria-labelledby="cipc-fields">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="04"
            kicker="Who Can Benefit"
            title="Serving Across Diverse Fields"
            lede="Professional chaplaincy reaches across sectors — here is the breadth of environments where chaplains serve."
            align="center"
          />
          <div className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
            {fields.map((field, i) => (
              <Reveal key={field.label} delay={Math.min(i * 0.04, 0.3)}>
                <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 bg-ink-950 px-4 py-8 text-center transition-colors duration-300 hover:bg-ink-900">
                  <field.icon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                  <p className="text-sm leading-snug text-ink-100/80">{field.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-100/45">
              This grid illustrates the breadth of professional chaplaincy as a field. It is not
              a claim about any single organization&apos;s operations — for CIPC&apos;s specific
              programs and scope, please visit the official CIPC website.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — The partnership */}
      <section className="bg-ink-900" aria-labelledby="cipc-partnership">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="05"
            kicker="IPPSCC × CIPC"
            title="Building Stronger Pathways for Professional Chaplaincy"
            lede="Two organizations, one shared interest: chaplains better prepared to serve with professionalism, compassion, and purpose."
          />
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">
            <Reveal>
              <div className="h-full bg-ink-900 p-8 sm:p-10">
                <p className="font-mono text-[0.62rem] tracking-[0.28em] text-gold-400 uppercase">Partner — Public Safety Chaplaincy</p>
                <h3 className="mt-3 font-display text-3xl text-white">IPPSCC</h3>
                <p className="mt-1 font-mono text-[0.62rem] tracking-[0.18em] text-ink-100/50 uppercase">
                  International Police & Public Safety Chaplain Corps, USA
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink-100/65">
                  Serving law enforcement, public-safety personnel, and first responders
                  through professional chaplaincy, spiritual care, and crisis response.
                </p>
                <Link
                  href="/about"
                  className="group mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase"
                >
                  <span className="link-sweep">About IPPSCC</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full border-t-2 border-gold-500 bg-ink-850 p-8 sm:p-10 lg:border-t-0 lg:border-l-2">
                <p className="font-mono text-[0.62rem] tracking-[0.28em] text-gold-400 uppercase">Partner — Professional Development</p>
                <h3 className="mt-3 font-display text-3xl text-white">CIPC</h3>
                <p className="mt-1 font-mono text-[0.62rem] tracking-[0.18em] text-ink-100/50 uppercase">
                  Chartered Institute of Professional Chaplains, USA
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink-100/65">
                  Developing professional chaplains through structured training,
                  certification, standards, and a global professional community.
                </p>
                <a
                  href={CIPC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase"
                >
                  <span className="link-sweep">Official CIPC Website</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8 border border-gold-500/30 bg-gold-500/[0.05] px-6 py-6 sm:px-8">
              <p className="text-sm leading-relaxed text-ink-100/75 sm:text-base">
                The collaboration creates space for the two organizations to work together
                around professional chaplaincy, development, training, standards, networking,
                and service. <strong className="text-white">IPPSCC and CIPC remain distinct
                organizations</strong> — each with its own identity, website, structure, and
                areas of responsibility. This partnership is a bridge between them, not a merger.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 — Why it matters */}
      <section className="border-y border-white/10 bg-ink-950" aria-labelledby="cipc-why">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="06"
                kicker="Why It Matters"
                title="A Shared Commitment to Excellence in Service"
                lede="When professional chaplaincy organizations collaborate, the whole profession — and everyone it serves — moves forward."
              />
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-10">
              <ul className="space-y-1">
                {whyItMatters.map((item, i) => (
                  <Reveal key={item.title} delay={Math.min(i * 0.05, 0.3)}>
                    <li className="flex items-baseline justify-between gap-6 border-b border-white/8 py-4 last:border-0">
                      <span>
                        <span className="block font-display text-xl text-white sm:text-[1.35rem]">{item.title}</span>
                        <span className="mt-1 block text-sm text-ink-100/55">{item.copy}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.2em] text-gold-500/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Explore CIPC */}
      <section className="grain relative overflow-hidden bg-ink-800" aria-labelledby="cipc-explore">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-40%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-600/15 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.3em] text-gold-400 uppercase">07 — Explore CIPC</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="cipc-explore" className="balance mt-5 font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl lg:text-6xl">
              Discover More About CIPC
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70 sm:text-lg">
              Learn more about the Chartered Institute of Professional Chaplains, its
              professional framework, opportunities, programs, and work in advancing chaplaincy.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CIPC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400 sm:w-auto"
              >
                Visit CIPC Website
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:w-auto"
              >
                Contact IPPSCC
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gold-500/25 bg-ink-950" aria-labelledby="cipc-final">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <h2 id="cipc-final" className="balance font-display text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
              Professional Chaplaincy. <span className="text-gold-300 italic">Global Service.</span> Greater Impact.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-100/70">
              IPPSCC and CIPC are committed to supporting the continued development of
              chaplains prepared to serve with professionalism, compassion, and purpose.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href={CIPC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 bg-gold-500 px-10 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400"
            >
              Explore CIPC
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
