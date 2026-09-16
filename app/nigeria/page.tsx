import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Globe from "@/components/Globe";

export const metadata: Metadata = {
  title: "IPPSCC Nigeria — From Nigeria to the World",
  description:
    "Local understanding, international vision. IPPSCC Nigeria: professional chaplaincy for law enforcement, first responders and public safety across Nigeria.",
};

const focus = [
  "Law Enforcement",
  "First Responders",
  "Fire & Rescue",
  "Emergency Response",
  "Public-Safety Personnel",
  "Correctional Environments",
  "Disaster Response",
  "Public Institutions",
  "Families of Service Personnel",
  "Community and Humanitarian Support",
];

export default function NigeriaPage() {
  return (
    <>
      <PageHero
        kicker="IPPSCC Nigeria"
        title="From Nigeria to the world."
        lede="Nigeria represents an important African context for professional chaplaincy, public safety, emergency response and humanitarian service."
        image="/images/africa-chaplains.jpg"
        imageAlt="Nigerian and American chaplains in fellowship outside a training academy"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Global", href: "/global" },
          { label: "Nigeria" },
        ]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="01"
                kicker="The Positioning"
                title="Local understanding. International vision."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75">
                  IPPSCC Nigeria is a locally responsive expression of an international mission —
                  respecting Nigerian law, institutional protocols, cultural realities and religious
                  diversity, while connecting Nigerian chaplains to a wider worldwide fellowship.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 border-l-2 border-gold-500 pl-5 text-sm leading-relaxed text-ink-100/60">
                  IPPSCC&apos;s presence in Nigeria connects local service with a wider
                  international chaplaincy community — without implying governmental endorsement or
                  authority that has not been independently established.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <h2 className="font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
                  Our Focus May Include
                </h2>
              </Reveal>
              <ol className="mt-6">
                {focus.map((item, i) => (
                  <Reveal key={item} delay={Math.min(i * 0.04, 0.3)}>
                    <li className="group flex items-baseline gap-5 border-b border-white/10 py-4 transition-colors first:border-t hover:border-gold-500/40">
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold-500/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-[1.7rem]">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gold-500/25 bg-ink-900" aria-labelledby="nigeria-call">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
              The Invitation
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Globe className="mx-auto h-auto w-full max-w-sm" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 id="nigeria-call" className="balance mt-5 font-display text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
              Nigeria&apos;s responders deserve someone standing beside them.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70">
              From commands to communities, from formation halls to frontline support — IPPSCC
              Nigeria invites chaplains, institutions and partners to build professional chaplaincy
              worthy of the nation&apos;s servants.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Serve Nigeria. Belong to the world."
        copy="Join IPPSCC Nigeria — locally grounded formation and fellowship, internationally connected mission."
      />
    </>
  );
}
