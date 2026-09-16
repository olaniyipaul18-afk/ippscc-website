import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Globe from "@/components/Globe";

export const metadata: Metadata = {
  title: "IPPSCC Africa — Africa Is Part of the Mission",
  description:
    "Culturally aware. Professionally responsible. Locally responsive. Internationally connected. IPPSCC Africa and the continent's chaplaincy future.",
};

const strategy = [
  { title: "Culturally aware", copy: "Rooted in Africa's languages, customs, faiths and ways of communal care." },
  { title: "Professionally responsible", copy: "Held to the Corps' full standards of ethics, confidentiality and safeguarding." },
  { title: "Locally responsive", copy: "Shaped by African chaplains, institutions and communities — never imported wholesale." },
  { title: "Internationally connected", copy: "Linked to the worldwide Corps for formation, fellowship and shared learning." },
];

export default function AfricaPage() {
  return (
    <>
      <PageHero
        kicker="IPPSCC Africa"
        title="Africa is part of the mission."
        lede="A platform for professional development, collaboration, chaplaincy initiatives and service across Africa's public-safety and humanitarian environments."
        image="/images/africa-lagos.jpg"
        imageAlt="Modern African city skyline glowing at golden hour"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Global", href: "/global" },
          { label: "Africa" },
        ]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="01"
                kicker="The Strategy"
                title="A chaplaincy worthy of the continent."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75">
                  Africa is home to extraordinary cultural, religious and institutional diversity. A
                  meaningful African chaplaincy strategy must therefore be equal to that richness —
                  principled, adaptive and deeply respectful.
                </p>
              </Reveal>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {strategy.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                    <p className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-500/80">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-display text-2xl capitalize text-white">{item.title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-100/60">{item.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continental presence */}
      <section className="border-t border-white/10 bg-ink-950" aria-labelledby="africa-presence">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
          <Reveal>
            <Globe className="mx-auto h-auto w-full max-w-md" />
          </Reveal>
          <div>
            <SectionHeading
              index="02"
              kicker="Continental Presence"
              title="From Corps headquarters to the continent."
              lede="IPPSCC Africa connects the international Corps to African commands, institutions and communities — fellowship across the ocean, service on African soil."
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl border-l-2 border-gold-500 pl-5 text-sm leading-relaxed text-ink-100/65">
                Regional fellowships are announced only when formally established. Until then, every
                African chaplain who joins helps draw the map.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="why-africa">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
              Why Africa Matters to Our Mission
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="why-africa" className="balance mt-5 font-display text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
              Because Africa&apos;s public-safety and emergency-service communities include people
              who serve under demanding circumstances.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70">
              Professional chaplaincy can provide an additional source of compassionate and
              spiritual support within appropriate structures — standing beside African responders
              as they stand for their communities.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/nigeria"
              className="group mt-10 inline-flex items-center gap-2 border border-gold-500/60 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-gold-300 uppercase transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
            >
              Discover IPPSCC Nigeria
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Build African chaplaincy with us."
        copy="Chaplains, institutions and partners across the continent are invited to shape IPPSCC Africa from its foundations."
      />
    </>
  );
}
