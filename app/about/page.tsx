import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "About IPPSCC — Mission, Vision, Motto & Values",
  description:
    "More than a title — a calling to serve. Discover the mission, vision, motto, tagline and core values of the International Police & Public Safety Chaplain Corps, USA.",
};

const requires = [
  "Character",
  "Preparation",
  "Compassion",
  "Professionalism",
  "Integrity",
  "Confidentiality",
  "Responsibility",
];

const mottoLines = [
  { word: "Faith", rest: "gives the foundation." },
  { word: "Service", rest: "gives the mission." },
  { word: "Compassion", rest: "gives the human touch." },
  { word: "Integrity", rest: "gives the credibility." },
  { word: "The calling", rest: "gives the courage to show up." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About IPPSCC"
        title="More than a title. A calling to serve."
        lede="The International Police & Public Safety Chaplain Corps, USA is an internationally minded professional chaplaincy organization dedicated to serving those who serve in law enforcement, public safety and first-response environments."
        image="/images/about-honor-guard.jpg"
        imageAlt="IPPSCC honor guard in dress uniform standing before the Corps seal, flanked by the Nigerian and American flags"
        imagePosition="object-top"
        caption="Our Cadet"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Conviction */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                index="01"
                kicker="Our Conviction"
                title="Those who protect, respond and serve deserve compassionate support too."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75 sm:text-lg">
                  IPPSCC seeks to develop chaplains who understand that effective service requires
                  more than good intentions. We are building a culture in which chaplaincy is
                  expressed through presence, listening, spiritual care, crisis support and service.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-10">
                <p className="font-mono text-[0.68rem] tracking-[0.28em] text-gold-400 uppercase">
                  Effective service requires
                </p>
                <ul className="mt-6 space-y-1">
                  {requires.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline justify-between border-b border-white/8 py-3 last:border-0"
                    >
                      <span className="font-display text-2xl text-white sm:text-[1.7rem]">{item}</span>
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold-500/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="about-mission">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">Our Mission</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-mission" className="mt-5 font-display text-4xl leading-tight font-medium text-white sm:text-5xl">
              To serve those <span className="text-gold-300 italic">who serve.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <blockquote className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-ink-100/75 sm:text-lg">
              “To serve those who serve by providing professional chaplaincy, spiritual care, crisis
              response and compassionate support to law enforcement, public safety personnel and
              first responders wherever duty calls.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
              {[
                "To listen without unnecessary judgment.",
                "To support without overstepping professional boundaries.",
                "To bring compassion without compromising integrity.",
                "To provide spiritual care while respecting individual beliefs, cultures and circumstances.",
              ].map((line) => (
                <p key={line} className="border-l border-gold-500/50 pl-4 text-sm leading-relaxed text-ink-100/70">
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ink-950" aria-labelledby="about-vision">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              index="02"
              kicker="Our Vision"
              title="A higher standard of professional chaplaincy."
            />
          </div>
          <div>
            <Reveal>
              <blockquote className="border-l-2 border-gold-500 pl-6 font-display text-2xl leading-snug text-white/90 sm:text-3xl">
                “To be a trusted international leader and recognized standard of excellence in
                professional chaplaincy — strengthening those who protect, serve and respond through
                compassionate presence, spiritual care and principled support.”
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 text-base leading-relaxed text-ink-100/75 sm:text-lg">
                Our vision reaches beyond geographical boundaries. We envision a professional
                chaplaincy community capable of serving across cultures, institutions and
                public-safety environments — while maintaining high standards of ethics,
                professionalism, confidentiality and compassionate care.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/global"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.24em] text-gold-300 uppercase"
              >
                <span className="link-sweep">Our International Outlook</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="grain relative overflow-hidden border-y border-gold-500/25 bg-ink-800" aria-labelledby="about-motto">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-40%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-600/15 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">Our Motto</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-motto" className="balance mt-6 font-display text-5xl leading-[1.02] font-medium text-white sm:text-6xl lg:text-7xl">
              Shielded by Faith,
              <br />
              <span className="text-gold-300 italic">Sent to Serve.</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {mottoLines.map((line, i) => (
              <Reveal key={line.word} delay={i * 0.06} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <p className="h-full bg-ink-800 px-6 py-6 text-sm leading-relaxed text-ink-100/75">
                  <strong className="font-display text-xl font-medium text-gold-200">{line.word} </strong>
                  {line.rest}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="bg-ink-950" aria-labelledby="about-tagline">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              index="03"
              kicker="Our Tagline"
              title="Light in the line of duty."
              lede="When circumstances become difficult, a chaplain can become a calm and compassionate presence. Not necessarily with all the answers — sometimes simply by being there."
            />
            <div className="flex flex-col justify-center">
              {["Listening.", "Supporting.", "Encouraging.", "Serving."].map((word, i) => (
                <Reveal key={word} delay={i * 0.07}>
                  <p
                    className={`border-b border-white/10 py-4 font-display text-3xl sm:text-4xl ${
                      i % 2 === 0 ? "text-white" : "text-gold-300 italic"
                    }`}
                  >
                    {word}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-ink-900" aria-labelledby="about-values">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="04"
            kicker="Core Values"
            title="What guides our service."
            lede="Seven convictions drawn directly from the organization's stated core values."
            align="center"
          />
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="h-full bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8">
                  <p className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-500/80">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-white uppercase">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-100/65">{value.statement}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Link href="/standards" className="group flex h-full min-h-52 flex-col justify-between bg-gold-500 p-7 transition-colors duration-300 hover:bg-gold-400 sm:p-8">
                <p className="font-mono text-[0.62rem] tracking-[0.24em] text-ink-950/70 uppercase">
                  Living the values
                </p>
                <span>
                  <span className="block font-display text-2xl leading-tight text-ink-950">
                    See how values become professional standards.
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.22em] text-ink-950 uppercase">
                    Professional Standards
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
