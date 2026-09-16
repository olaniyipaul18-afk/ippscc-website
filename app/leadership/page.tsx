import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import OrgChart from "@/components/OrgChart";

export const metadata: Metadata = {
  title: "Leadership & Governance — Servant Leadership",
  description:
    "Servant leadership, professional responsibility. The organizational leadership structure of the International Police & Public Safety Chaplain Corps, USA.",
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

      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="structure">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="01"
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
