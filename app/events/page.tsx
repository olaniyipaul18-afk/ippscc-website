import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { eventFormats } from "@/data/events";
import { AWARD_EVENT } from "@/data/awards";

export const metadata: Metadata = {
  title: "Events & Conferences — Where Chaplains Connect, Learn & Grow",
  description:
    "IPPSCC conferences, seminars, leadership forums, workshops, summits and Africa and Nigeria programmes — come with experience, leave with perspective.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker="Events & Conferences"
        title="Where chaplains connect, learn & grow."
        lede="Conferences, seminars, forums, workshops and summits — the gathering places where calling is sharpened, friendships are forged and standards are raised."
        image="/images/assembly.jpg"
        imageAlt="A grand conference hall prepared for a chaplaincy gathering"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      {/* Upcoming spotlight */}
      <section className="border-b border-gold-500/25 bg-ink-900" aria-labelledby="upcoming-spotlight">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[300px_1fr] lg:gap-14 lg:px-10">
          <Reveal>
            <Link href="/events/awards-2026" aria-label="Light in the Line of Duty 2026 Award — event details and voting">
              <Image
                src={AWARD_EVENT.flyer}
                alt={AWARD_EVENT.flyerAlt}
                width={600}
                height={750}
                className="w-full border border-gold-500/40 object-cover transition-all duration-500 hover:border-gold-400"
              />
            </Link>
          </Reveal>
          <div>
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] tracking-[0.26em] text-gold-400 uppercase">
                <span className="bg-gold-500 px-2.5 py-1 text-ink-950">Upcoming</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {AWARD_EVENT.date} · {AWARD_EVENT.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {AWARD_EVENT.venue}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="upcoming-spotlight" className="balance mt-5 font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl">
                {AWARD_EVENT.title} — {AWARD_EVENT.edition}.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-100/70">
                {AWARD_EVENT.purpose} Seven award categories, three finalists each — and your
                vote decides who takes the honour.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/events/awards-2026#vote"
                  className="group inline-flex items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.7rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400"
                >
                  Meet the Nominees & Vote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/events/awards-2026"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-[0.7rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
                >
                  Event Details
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="01"
            kicker="Flagship Gatherings"
            title="Eight formats. One fellowship."
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {eventFormats.map((event, i) => (
              <Reveal key={event.title} delay={Math.min((i % 4) * 0.05, 0.2)}>
                <article className="group flex h-full min-h-64 flex-col bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-850 sm:p-7">
                  <div className="flex items-center justify-between">
                    <CalendarDays className="h-5 w-5 text-gold-500" aria-hidden="true" />
                    <span className="border border-gold-500/40 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.2em] text-gold-300 uppercase">
                      {event.cadence}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[1.35rem] leading-tight text-white transition-colors group-hover:text-gold-200">
                    {event.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-100/60">{event.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="inaugural">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">
              The Inaugural Calendar
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="inaugural" className="balance mt-5 font-display text-3xl leading-tight font-medium text-white sm:text-4xl lg:text-5xl">
              Come with experience. Leave with perspective.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70">
              Dates and venues for inaugural IPPSCC gatherings — including Africa Chaplaincy Forums
              and Nigeria Chaplaincy Programmes — will be announced here. Members and partners
              receive priority invitation.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/join"
                className="group inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.7rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400 sm:w-auto"
              >
                Become a Member
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-8 py-4 font-mono text-[0.7rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:w-auto"
              >
                Host or Partner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Be in the room where chaplains grow."
        copy="Membership opens the door to conferences, seminars and summits across the Corps — join the call today."
      />
    </>
  );
}
