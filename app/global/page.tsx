import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Globe from "@/components/Globe";

export const metadata: Metadata = {
  title: "International Outreach — One Calling, Many Communities",
  description:
    "Public safety is global. IPPSCC's international outlook encourages professional chaplaincy development and collaboration across jurisdictions.",
};

const pillars = [
  {
    title: "Respect for local law",
    copy: "Every engagement honors the legal frameworks and institutional protocols of the jurisdiction served.",
  },
  {
    title: "Cultural intelligence",
    copy: "Chaplaincy adapts to local culture, custom and religious landscape — never imposed, always invited.",
  },
  {
    title: "Institutional partnership",
    copy: "Collaboration with commands, agencies and organizations — built on relationship, formalized with care.",
  },
  {
    title: "Shared standards",
    copy: "Ethics, confidentiality, safeguarding and professionalism upheld consistently across every border.",
  },
];

export default function GlobalPage() {
  return (
    <>
      <PageHero
        kicker="International / Global Outreach"
        title="One calling. Many communities."
        lede="Public safety is global. IPPSCC's international outlook encourages professional chaplaincy development and collaboration across appropriate jurisdictions."
        image="/images/city-dusk.jpg"
        imageAlt="A great city skyline at dusk beneath deep blue skies"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Global" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                index="01"
                kicker="The Global Vision"
                title="Human need crosses every border."
              />
              <Reveal delay={0.15}>
                <div className="mt-8 space-y-5">
                  {[
                    "The circumstances may differ.",
                    "The cultures may differ.",
                    "The institutions may differ.",
                  ].map((line) => (
                    <p key={line} className="font-display text-2xl text-ink-100/60 sm:text-3xl">
                      {line}
                    </p>
                  ))}
                  <p className="border-l-2 border-gold-500 pl-6 font-display text-2xl leading-snug text-white sm:text-3xl">
                    But the human need for compassion, dignity, spiritual care and responsible
                    support crosses borders.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="flex flex-col justify-center">
              <div className="grid gap-px border border-white/10 bg-white/10">
                {pillars.map((pillar, i) => (
                  <Reveal key={pillar.title} delay={i * 0.06}>
                    <div className="bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-850 sm:p-7">
                      <h2 className="font-display text-xl text-gold-200">{pillar.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-100/65">{pillar.copy}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corps presence */}
      <section className="border-t border-white/10 bg-ink-950" aria-labelledby="presence">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <Reveal>
            <Globe className="mx-auto h-auto w-full max-w-lg" />
          </Reveal>
          <div>
            <SectionHeading
              index="02"
              kicker="Corps Presence"
              title="Headquartered in the USA. Growing worldwide."
              lede="From Corps headquarters to IPPSCC Nigeria and a widening international fellowship — the map of this mission is still being drawn."
            />
            <ul className="mt-8 border-t border-white/10">
              <li className="flex items-center gap-4 border-b border-white/10 py-4">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gold-500" />
                <div>
                  <p className="font-medium text-white">United States — Corps Headquarters</p>
                  <p className="text-sm text-ink-100/55">The founding command of the international Corps.</p>
                </div>
              </li>
              <li className="flex items-center gap-4 border-b border-white/10 py-4">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-crimson-500" />
                <div>
                  <p className="font-medium text-white">Nigeria — IPPSCC Nigeria</p>
                  <p className="text-sm text-ink-100/55">Local understanding, international vision.</p>
                </div>
              </li>
              <li className="flex items-center gap-4 border-b border-white/10 py-4">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-white/60" />
                <div>
                  <p className="font-medium text-white">International Fellowship — growing</p>
                  <p className="text-sm text-ink-100/55">Regional fellowships in formation across the nations.</p>
                </div>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-ink-100/40">
              Illustrative map. Formal commands and fellowships are announced only when established.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="03"
            kicker="Regional Expressions"
            title="A global vision, locally rooted."
            lede="International mission takes living form in regional fellowships — beginning with Africa and Nigeria."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { href: "/africa", title: "IPPSCC Africa", note: "Africa is part of the mission" },
              { href: "/nigeria", title: "IPPSCC Nigeria", note: "From Nigeria to the world" },
            ].map((region, i) => (
              <Reveal key={region.href} delay={i * 0.07}>
                <Link
                  href={region.href}
                  className="group flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-7 py-8 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.05]"
                >
                  <span>
                    <span className="block font-display text-3xl text-white transition-colors group-hover:text-gold-200">
                      {region.title}
                    </span>
                    <span className="mt-2 block font-mono text-[0.65rem] tracking-[0.24em] text-gold-400 uppercase">
                      {region.note}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="balance mx-auto mt-12 max-w-3xl text-center font-display text-2xl leading-snug text-white/90 italic sm:text-3xl">
              “A global vision for a human-centered calling.”
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Carry the calling across borders."
        copy="Join an international fellowship of chaplains — united in standard, diverse in context, one in mission."
      />
    </>
  );
}
