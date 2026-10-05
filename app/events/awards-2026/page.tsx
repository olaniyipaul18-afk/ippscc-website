import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Mail, MapPin, Phone, Vote } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import AwardVoting from "@/components/AwardVoting";
import { AWARD_EVENT, awardCategories } from "@/data/awards";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Light in the Line of Duty 2026 Award & Goodwill Ambassadors Honour",
  description:
    "IPPSCC-USA 2026 Award & Goodwill Ambassadors Honour — 21st November 2026, Oriental Hotel, Victoria Island, Lagos. Meet the nominees across 7 categories and cast your vote.",
};

const howItWorks = [
  { step: "01", title: "Find a category", copy: "Seven award categories — each with three finalists." },
  { step: "02", title: "Choose your hero", copy: "Read each finalist and pick the most deserving." },
  { step: "03", title: "One vote counts", copy: "One vote per category. Highest votes wins the honour." },
];

export default function Awards2026Page() {
  return (
    <>
      <PageHero
        kicker="Upcoming Event · 21 November 2026"
        title="Light in the Line of Duty — 2026 Award & Goodwill Ambassadors Honour."
        lede="Recognizing and honouring champions of human dignity and sustainable development. Join distinguished leaders, changemakers, and humanitarians for an unforgettable day of honour — and let your vote decide the winners."
        image={AWARD_EVENT.flyer}
        imageAlt={AWARD_EVENT.flyerAlt}
        imagePosition="object-top"
        caption="21 · 11 · 2026 — Lagos"
        cta={{ label: "Vote for Nominees", href: "#vote" }}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: "Awards 2026" }]}
      />

      {/* Event details */}
      <section className="border-b border-white/10 bg-ink-900" aria-label="Event details">
        <div className="mx-auto grid max-w-7xl gap-px border-white/10 bg-white/10 px-0 sm:grid-cols-3 lg:mx-10 lg:my-0">
          {[
            { icon: CalendarDays, label: "Date", value: AWARD_EVENT.date },
            { icon: Clock, label: "Time", value: AWARD_EVENT.time },
            { icon: MapPin, label: "Venue", value: AWARD_EVENT.venue },
          ].map((d, i) => (
            <Reveal key={d.label} delay={i * 0.06}>
              <div className="flex h-full items-center gap-4 bg-ink-900 px-6 py-7 lg:px-10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-500/40">
                  <d.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/50 uppercase">
                    {d.label}
                  </span>
                  <span className="mt-1 block font-display text-lg leading-snug text-white">{d.value}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About the awards */}
      <section className="bg-ink-950" aria-labelledby="awards-about">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                index="01"
                kicker="The Honour"
                title="Across borders and against the odds."
                lede="Extraordinary individuals are shaping a brighter, more equitable future for us all. This is the day the Corps gathers to honour them."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75">
                  Expect a global goodwill ambassador honour and recognition ceremony, the Light
                  in the Line of Duty 2026 awards, new collaborations, and high-level
                  networking — all in one unforgettable day in Lagos.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-10">
                <p className="font-mono text-[0.68rem] tracking-[0.28em] text-gold-400 uppercase">
                  7 Award Categories
                </p>
                <ul className="mt-6 space-y-1">
                  {awardCategories.map((cat, i) => (
                    <li key={cat.id} className="border-b border-white/8 py-3 last:border-0">
                      <Link href={`#${cat.id}`} className="group flex items-baseline justify-between gap-4">
                        <span className="font-display text-lg leading-snug text-white transition-colors group-hover:text-gold-200 sm:text-xl">
                          {cat.name.replace("IPPSCC-USA ", "")}
                        </span>
                        <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.2em] text-gold-500/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Voting */}
      <section id="vote" className="scroll-mt-24 border-y border-gold-500/25 bg-ink-900" aria-labelledby="awards-vote">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Call for Nomination · Public Vote"
            title="Your vote decides the winners."
            lede="Three finalists per category. One vote per category per person. The nominee with the highest votes in each category takes the honour."
            align="center"
          />
          <ol className="mx-auto mt-10 grid max-w-4xl gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.06}>
                <li className="flex h-full items-start gap-4 bg-ink-900 p-6">
                  <Vote className="mt-1 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[0.6rem] tracking-[0.24em] text-gold-500/80">
                      Step {s.step}
                    </span>
                    <span className="mt-1 block font-display text-lg text-white">{s.title}</span>
                    <span className="mt-1 block text-sm text-ink-100/60">{s.copy}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <AwardVoting />
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="bg-ink-950" aria-labelledby="awards-sponsor">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <SectionHeading
              index="03"
              kicker="Sponsorship & Partnership"
              title="Be part of history."
              lede="Reserve your seat, nominate a hero, or align your brand with an evening that honours service, dignity, and humanity. Sponsorship and partnership enquiries are warmly welcome."
            />
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:border-gold-500/50"
                >
                  <Mail className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/50 uppercase">
                      Sponsorship Enquiries
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-white">{site.email}</span>
                  </span>
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:border-gold-500/50"
                >
                  <Phone className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/50 uppercase">
                      Direct Line
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-white">{site.phone}</span>
                  </span>
                </a>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.7rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400"
                >
                  Reserve Your Seat
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Be Part of History"
        title="Nominate a hero. Honour a legacy."
        copy="Seats are limited and nominations are open — reach the Corps today to reserve your place or put a hero forward."
        primaryLabel="Nominate a Hero"
        primaryHref="/contact"
        secondaryLabel="All Events"
        secondaryHref="/events"
      />
    </>
  );
}
