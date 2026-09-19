import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import OrgChart from "@/components/OrgChart";
import { leaders } from "@/data/leaders";

export const metadata: Metadata = {
  title: "Leadership & Governance — Servant Leadership",
  description:
    "Servant leadership, professional responsibility. Meet the Chaplain General and Chaplain Lieutenant General, and explore the organizational structure of IPPSCC-USA.",
};

const tenets = [
  {
    title: "Authority as responsibility",
    copy: "Rank within the Corps is measured by the weight of care carried — for chaplains, for institutions, and for every person served.",
  },
  {
    title: "Character before position",
    copy: "Leadership is conferred on proven character: integrity, humility, competence and a record of faithful service.",
  },
  {
    title: "Accountability at every tier",
    copy: "Each level answers upward and serves downward — authority flows one way, responsibility flows both.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        kicker="Leadership & Governance"
        title="Servant leadership. Professional responsibility."
        lede="Leadership within IPPSCC is understood not simply as authority, but as responsibility — the duty to shepherd chaplains and safeguard the trust placed in the Corps."
        image="/images/formation-dawn.jpg"
        imageAlt="Service members in formation at dawn with a chaplain alongside"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Leadership" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-3">
            {tenets.map((tenet, i) => (
              <Reveal key={tenet.title} delay={i * 0.07}>
                <div className="h-full border-t-2 border-gold-500/70 pt-6">
                  <h2 className="font-display text-2xl text-white">{tenet.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-100/65">{tenet.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office of the Chaplain General */}
      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="office">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="01"
            kicker="Office of the Chaplain General"
            title="The leaders of the Corps."
            lede="Two offices, one chain of faithful command — the men entrusted with the spiritual direction and executive leadership of IPPSCC-USA."
          />

          <div className="mt-16 space-y-20">
            {leaders.map((leader, i) => (
              <article
                key={leader.name}
                className={`grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
                aria-label={`${leader.name}, ${leader.title}`}
              >
                <Reveal>
                  <figure className="relative mx-auto max-w-sm lg:mx-0">
                    <div aria-hidden="true" className="absolute -inset-3 border border-gold-500/30" />
                    <div className="relative overflow-hidden border border-gold-500/50">
                      <Image
                        src={leader.photo}
                        alt={leader.photoAlt}
                        width={800}
                        height={1000}
                        className="aspect-[4/5] w-full object-cover object-top"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
                        <span className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-300 uppercase">
                          {leader.office}
                        </span>
                        <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>

                <div>
                  <Reveal>
                    <p className="font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
                      {String(i + 1).padStart(2, "0")} — {leader.office}
                    </p>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h3 className="balance mt-4 font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl">
                      {leader.name}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-3 font-display text-xl text-gold-300 italic sm:text-2xl">
                      {leader.title}
                    </p>
                  </Reveal>
                  <Reveal delay={0.14}>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-100/75">
                      {leader.introduction}
                    </p>
                  </Reveal>
                  <Reveal delay={0.18}>
                    <h4 className="mt-8 font-mono text-[0.65rem] tracking-[0.28em] text-ink-100/50 uppercase">
                      Mandate of the Office
                    </h4>
                    <ul className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                      {leader.mandate.map((item) => (
                        <li key={item} className="bg-ink-900 px-5 py-4 text-sm leading-relaxed text-ink-100/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.22}>
                    <blockquote className="mt-8 border-l-2 border-gold-500 pl-6 font-display text-xl leading-relaxed text-white/90 italic sm:text-2xl">
                      “{leader.charge}”
                    </blockquote>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-ink-950" aria-labelledby="structure">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Organizational Leadership Structure"
            title="Eight tiers. One standard of service."
            align="center"
          />
          <div className="mt-14">
            <OrgChart />
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-12 max-w-3xl border border-white/10 bg-white/[0.02] px-6 py-5 text-center text-xs leading-relaxed text-ink-100/55">
              These titles represent the proposed internal organizational structure of IPPSCC. They
              are not presented as government-issued police or military ranks, and confer no
              governmental authority, unless independently established by applicable authority.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Leadership is earned through service."
        copy="Grow through formation, prove faithful in small assignments — and rise within a Corps that honors servant leadership."
      />
    </>
  );
}
