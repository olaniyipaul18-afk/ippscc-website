import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarDays,
  Check,
  HeartHandshake,
  Mail,
  MapPin,
  UsersRound,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import {
  FELLOWSHIP_CREDENTIALS,
  INVESTITURE_EVENT,
  INVESTITURE_EXPERIENCES,
  INVESTITURE_NOMINEES,
} from "@/data/investiture";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Maiden International Honours & Distinguished Fellowship Investiture 2026",
  description:
    "Join IPPSCC-USA in Lagos on Monday, 23 November 2026, for the Maiden International Honours & Distinguished Fellowship Investiture—honouring leadership, public safety, and service to humanity.",
};

const eventDetails = [
  { icon: CalendarDays, label: "Date", value: INVESTITURE_EVENT.date },
  { icon: MapPin, label: "Venue", value: INVESTITURE_EVENT.venue },
  { icon: Building2, label: "Hosted by", value: INVESTITURE_EVENT.host },
];

export default function Investiture2026Page() {
  return (
    <>
      <PageHero
        kicker="Upcoming Event · Monday, 23 November 2026"
        title={`${INVESTITURE_EVENT.title}.`}
        lede={INVESTITURE_EVENT.theme}
        cta={{ label: "View the Nominee Postcards", href: "#nominees" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: "Investiture 2026" },
        ]}
      />

      <section className="border-b border-white/10 bg-ink-900" aria-label="Event details">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 sm:grid-cols-3">
          {eventDetails.map((detail, i) => (
            <Reveal key={detail.label} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 bg-ink-900 px-6 py-7 lg:px-8">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-gold-500/40">
                  <detail.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/50 uppercase">
                    {detail.label}
                  </span>
                  <span className="mt-1 block font-display text-lg leading-snug text-white">
                    {detail.value}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-950" aria-label="About the Distinguished Fellowship Honour">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              index="01"
              kicker="The Distinguished Fellowship Honour"
              title="A recognition of merit. A gathering for service."
              lede="The IPPSCC-USA Distinguished Fellowship Honour celebrates individuals whose leadership, professional accomplishments, integrity, and contributions to humanity reflect the values of public safety, justice, compassion, and service."
            />
            <Reveal delay={0.14}>
              <p className="mt-6 text-base leading-relaxed text-ink-100/70">
                The maiden international investiture brings distinguished leaders together for
                institutional recognition, professional networking, humanitarian outreach, and a
                shared commitment to sustainable human development.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <blockquote className="flex h-full flex-col justify-center border border-gold-500/30 bg-gold-500/[0.04] p-8 sm:p-10">
              <Award className="h-7 w-7 text-gold-400" aria-hidden="true" />
              <p className="mt-6 font-display text-2xl leading-snug text-white sm:text-3xl">
                “Your distinction is a recognition of merit. Your participation is an opportunity to make a difference.”
              </p>
              <p className="mt-6 font-mono text-[0.62rem] tracking-[0.22em] text-gold-400 uppercase">
                The IPPSCC-USA Distinguished Fellowship Investiture
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="investiture-experience">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="02"
            kicker="The Investiture Experience"
            title="Recognition beyond the ceremony."
            lede="The programme is designed to connect distinguished leaders through service, fellowship, and a shared commitment to human dignity."
          />
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {INVESTITURE_EXPERIENCES.map((item, i) => (
              <Reveal key={item.number} delay={Math.min(i * 0.06, 0.18)}>
                <article className="h-full bg-ink-900 p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <HeartHandshake className="h-5 w-5 text-gold-500" aria-hidden="true" />
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-gold-500/70">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight text-white">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-100/65">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="nominees" className="scroll-mt-24 bg-ink-950" aria-labelledby="nominees-heading">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <SectionHeading
            index="03"
            kicker="The 2026 Investiture"
            title="Official nominee postcards."
            lede="Meet the distinguished honourees through their official event postcard designs. This is a showcase gallery—there is no public voting."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTITURE_NOMINEES.map((nominee, i) => (
              <Reveal key={nominee.name} delay={Math.min((i % 3) * 0.06, 0.12)}>
                <figure className="group h-full overflow-hidden border border-white/10 bg-ink-900 transition-colors duration-300 hover:border-gold-500/40">
                  <a
                    href={nominee.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open full postcard design for ${nominee.name}`}
                    className="block overflow-hidden bg-ink-950"
                  >
                    <Image
                      src={nominee.image}
                      alt={nominee.alt}
                      width={1254}
                      height={1254}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </a>
                  <figcaption className="border-t border-white/10 px-5 py-5">
                    <h3 className="font-display text-xl leading-snug text-white">{nominee.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-100/60">{nominee.distinction}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold-500/25 bg-ink-900" aria-labelledby="fellowship-credentials">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              index="04"
              kicker="Fellowship Credentials & Benefits"
              title="A distinction carried forward."
              lede="The brochure outlines the following credentials for duly invested Distinguished Fellows, subject to the applicable programme arrangements."
            />
          </div>
          <Reveal delay={0.1}>
            <ul id="fellowship-credentials" className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {FELLOWSHIP_CREDENTIALS.map((credential) => (
                <li key={credential} className="flex items-start gap-3 bg-ink-900 p-5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink-100/75">{credential}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-950" aria-label="Programme participation details">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                index="05"
                kicker="Programme Participation"
                title="Plan ahead for the investiture."
                lede="The attached programme brochure lists a participation contribution of ₦300,000, with a payment deadline of 9 November 2026."
              />
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-100/65">
                  The contribution covers programme participation and associated administrative,
                  production, and logistical arrangements. The Distinguished Fellowship is a
                  recognition of merit, leadership, and service—it is not purchased through payment.
                  For verified participation and payment guidance, please contact IPPSCC-USA directly.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/[0.02] p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-500/40">
                    <UsersRound className="h-5 w-5 text-gold-400" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.6rem] tracking-[0.24em] text-ink-100/50 uppercase">
                      Contribution in brochure
                    </p>
                    <p className="mt-1 font-display text-3xl text-white">{INVESTITURE_EVENT.participationContribution}</p>
                  </div>
                </div>
                <p className="mt-6 border-t border-white/10 pt-5 font-mono text-xs tracking-[0.1em] text-gold-300/80">
                  PAYMENT DEADLINE · {INVESTITURE_EVENT.participationDeadline}
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-7 inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[0.65rem] tracking-[0.18em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Ask IPPSCC-USA
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-relaxed text-ink-100/60">
                Hosted by {INVESTITURE_EVENT.host}. In partnership with the Chartered Institute of
                Professional Chaplains, USA.
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-gold-300 uppercase"
              >
                Contact the Corps
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        kicker="Monday · 23 November 2026"
        title="Honouring leadership. Advancing public safety."
        copy="For event details, programme participation, or partnership enquiries, please contact the International Police & Public Safety Chaplain Corps, Inc., USA."
        primaryLabel="Contact IPPSCC-USA"
        primaryHref="/contact"
        secondaryLabel="All Events"
        secondaryHref="/events"
      />
    </>
  );
}
