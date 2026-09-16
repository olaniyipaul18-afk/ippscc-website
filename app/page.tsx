import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ArticleCard from "@/components/ArticleCard";
import ValuesList from "@/components/ValuesList";
import { services, whoWeServe } from "@/data/services";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.shortName} — ${site.tagline}`,
  description: site.description,
};

const stoodBeside = [
  "Police officers",
  "Firefighters",
  "Emergency responders",
  "Public-safety personnel",
  "Dispatchers",
  "Correctional personnel",
  "Crisis & emergency teams",
];

const globalPanels = [
  {
    href: "/global",
    index: "I",
    title: "International",
    copy: "One calling, many communities — professional chaplaincy across cultures and institutions.",
    image: "/images/city-dusk.jpg",
    alt: "City skyline at dusk beneath a deep blue sky",
  },
  {
    href: "/africa",
    index: "II",
    title: "IPPSCC Africa",
    copy: "Culturally aware. Professionally responsible. Locally responsive. Internationally connected.",
    image: "/images/africa-lagos.jpg",
    alt: "Modern African city skyline at golden hour",
  },
  {
    href: "/nigeria",
    index: "III",
    title: "IPPSCC Nigeria",
    copy: "From Nigeria to the world — local understanding, international vision.",
    image: "/images/africa-chaplains.jpg",
    alt: "Nigerian and American chaplains standing together in fellowship",
  },
];

export default function HomePage() {
  const previewServices = services.slice(0, 6);
  const previewArticles = articles.slice(0, 3);

  return (
    <>
      <HomeHero />
      <Marquee />

      {/* 01 — A Different Kind of Service */}
      <section id="different-kind-of-service" className="relative bg-ink-950 scroll-mt-24" aria-labelledby="dkos-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              index="01"
              kicker="A Different Kind of Service"
              title="Who stands beside those who stand for others?"
            />
            <Reveal delay={0.2}>
              <div className="mt-8 border-l-2 border-gold-500 pl-6">
                <p className="font-display text-xl leading-relaxed text-white/90 italic sm:text-2xl">
                  “They respond when others need help. They carry responsibility when circumstances
                  become difficult.”
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-ink-100/75 sm:text-lg">
                Police officers. Firefighters. Emergency responders. Public-safety personnel.
                Dispatchers. Correctional personnel. Crisis and emergency teams. And sometimes,{" "}
                <strong className="font-semibold text-white">
                  the people who serve others need someone to stand beside them.
                </strong>
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-100/75 sm:text-lg">
                That is where professional chaplaincy makes the difference — a structured chaplaincy
                presence focused on compassionate support, spiritual care, crisis response and
                responsible service.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2" aria-label="Those we stand beside">
                {stoodBeside.map((role, i) => (
                  <li
                    key={role}
                    className="group flex items-center justify-between bg-ink-950 px-5 py-4 transition-colors duration-300 hover:bg-ink-850"
                  >
                    <span className="text-sm text-ink-100/80 transition-colors group-hover:text-white">{role}</span>
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-gold-500/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="group relative mt-10 overflow-hidden border border-white/10">
                <Image
                  src="/images/prayer-circle.jpg"
                  alt="A diverse circle of responders and chaplains joined in prayer"
                  width={1200}
                  height={700}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 px-6 py-5 font-mono text-[0.62rem] tracking-[0.26em] text-gold-300 uppercase">
                  Compassionate presence — the heart of chaplaincy
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="grain relative overflow-hidden border-y border-gold-500/25 bg-ink-900" aria-labelledby="mission-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-50%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold-600/10 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:px-10">
          <Reveal>
            <p className="font-mono text-[0.7rem] tracking-[0.32em] text-gold-400 uppercase">Our Mission</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="mission-heading" className="balance mt-6 font-display text-4xl leading-[1.1] font-medium text-white sm:text-5xl lg:text-6xl">
              To serve those <span className="text-gold-300 italic">who serve.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <blockquote className="mx-auto mt-8 max-w-3xl border-t border-white/10 pt-8 text-base leading-relaxed text-ink-100/75 sm:text-lg">
              “To serve those who serve by providing professional chaplaincy, spiritual care, crisis
              response and compassionate support to law enforcement, public safety personnel and
              first responders wherever duty calls.”
            </blockquote>
          </Reveal>
          <Reveal delay={0.24}>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.24em] text-gold-300 uppercase"
            >
              <span className="link-sweep">Mission, Vision &amp; Values</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 02 — Services preview */}
      <section className="bg-ink-950" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="02"
              kicker="Chaplaincy Services"
              title="Where duty meets human need."
              lede="Fourteen dimensions of professional chaplaincy — each one a doorway through which compassion enters demanding environments."
            />
            <Reveal delay={0.15}>
              <Link
                href="/services"
                className="group inline-flex shrink-0 items-center gap-2 border border-white/20 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                All Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {previewServices.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <Link
                  href={service.slug === "public-safety" || service.slug === "fire-rescue" || service.slug === "emergency-response" ? "/services" : `/services/${service.slug}`}
                  className="group flex h-full min-h-64 flex-col justify-between bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-850 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <service.icon className="h-6 w-6 text-gold-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                      <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-gold-200">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-100/60">{service.description}</p>
                  </div>
                  <span className="mt-6 flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.24em] text-gold-400 uppercase">
                    {service.short}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Values (light editorial break) */}
      <section className="bg-parchment-50 text-ink-900" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="03"
                kicker="Core Values"
                title="What guides our service."
                tone="light"
              />
              <div className="mt-6">
                <Reveal delay={0.15}>
                  <p className="max-w-md text-base leading-relaxed text-ink-800/70">
                    Seven convictions drawn directly from the organization&apos;s stated core values —
                    shaping every chaplain&apos;s character, conduct and care.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 border-l-2 border-gold-600 pl-5 font-display text-lg leading-relaxed text-ink-900/90 italic">
                    Character. Preparation. Compassion. Professionalism. Integrity. Confidentiality.
                    Responsibility.
                  </p>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.1}>
              <ValuesList />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="serve-heading">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
          <SectionHeading
            index="04"
            kicker="Who We Serve"
            title="Serving the people behind the response."
            align="center"
          />
          <div className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {whoWeServe.map((group, i) => (
              <Reveal key={group} delay={Math.min(i * 0.04, 0.4)}>
                <p className="flex h-full min-h-20 items-center justify-center bg-ink-900 px-4 py-5 text-center text-[0.83rem] leading-snug text-ink-100/75 transition-colors duration-300 hover:bg-ink-850 hover:text-gold-200">
                  {group}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-100/45">
              The precise role of a chaplain always operates within applicable law, organizational
              policies, professional boundaries and the requirements of each environment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Global reach */}
      <section className="bg-ink-950" aria-labelledby="global-heading">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <SectionHeading
            index="05"
            kicker="Global Reach"
            title="One calling. Many communities."
            lede="Human need crosses borders. IPPSCC's international outlook pairs a global vision with deep local respect — for law, culture, institution and faith."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {globalPanels.map((panel, i) => (
              <Reveal key={panel.href + panel.title} delay={i * 0.1} className={i === 1 ? "lg:mt-10" : ""}>
                <Link
                  href={panel.href}
                  className="group relative block overflow-hidden border border-white/10"
                >
                  <Image
                    src={panel.image}
                    alt={panel.alt}
                    width={800}
                    height={1000}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                    <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">
                      {panel.index} — Global Reach
                    </p>
                    <h3 className="mt-3 font-display text-3xl text-white">{panel.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-100/70">{panel.copy}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.24em] text-gold-300 uppercase">
                      Discover
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership + Training split */}
      <section className="grid border-y border-white/10 lg:grid-cols-2" aria-label="Membership and training">
        <div className="grain relative overflow-hidden bg-parchment-100">
          <div className="relative mx-auto max-w-xl px-6 py-20 sm:py-24 lg:px-12">
            <Reveal>
              <p className="font-mono text-[0.68rem] tracking-[0.3em] text-gold-700 uppercase">Membership</p>
              <h2 className="balance mt-4 font-display text-4xl leading-[1.05] font-medium text-ink-900 sm:text-5xl">
                More than a title. A calling to serve.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-800/75">
                Joining IPPSCC means committing to develop yourself, serve responsibly, respect
                professional boundaries — and belong to a community devoted to those who serve.
              </p>
              <Link
                href="/membership"
                className="group mt-8 inline-flex items-center gap-2 bg-ink-900 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-white uppercase transition-colors duration-300 hover:bg-ink-800"
              >
                Membership &amp; Entitlements
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="grain relative overflow-hidden bg-ink-800">
          <Image
            src="/images/watch.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-25"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-ink-800/60 to-ink-950/80" />
          <div className="relative mx-auto max-w-xl px-6 py-20 sm:py-24 lg:px-12">
            <Reveal>
              <p className="font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">Training</p>
              <h2 className="balance mt-4 font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl">
                Training for the moments that matter.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-100/75">
                A certificate documents completion. Preparation builds capacity. Develop the
                knowledge, humility, discipline and compassion that crisis moments demand.
              </p>
              <Link
                href="/training"
                className="group mt-8 inline-flex items-center gap-2 border border-gold-500/60 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-gold-300 uppercase transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
              >
                Training &amp; Development
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="bg-ink-950" aria-labelledby="insights-heading">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="06"
              kicker="The IPPSCC Insight"
              title="Ideas for those who serve."
              lede="Insight for those called to support them — essays on chaplaincy, ethics, crisis response and the life behind the uniform."
            />
            <Reveal delay={0.15}>
              <Link
                href="/insights"
                className="group inline-flex shrink-0 items-center gap-2 border border-white/20 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                All Articles
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {previewArticles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
