import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "The IPPSCC Insight — Ideas for Those Who Serve",
  description:
    "Essays on public-safety chaplaincy, law-enforcement care, ethics, crisis response, leadership, Africa, Nigeria and responder wellness.",
};

const topics = [
  "Public-Safety Chaplaincy",
  "Law-Enforcement Chaplaincy",
  "First-Responder Support",
  "Spiritual Care",
  "Chaplaincy Ethics",
  "Crisis Response",
  "Chaplain Leadership",
  "Professional Development",
  "Africa",
  "Nigeria",
  "International Chaplaincy",
  "Wellness",
  "Community Service",
];

export default function InsightsPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        kicker="News / Articles / Insights"
        title="The IPPSCC Insight."
        lede="An authoritative knowledge platform for professional chaplaincy — ideas for those who serve, insight for those called to support them."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      {/* Featured essay */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-10">
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid overflow-hidden border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-gold-500/40 lg:grid-cols-[1.2fr_1fr]"
            >
              <div className="p-8 sm:p-12">
                <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">
                  Featured Essay — {featured.category}
                </p>
                <h2 className="balance mt-4 font-display text-3xl leading-tight text-white transition-colors duration-300 group-hover:text-gold-200 sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-100/65">{featured.standfirst}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase">
                  Read the Essay
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
              <div className="grain relative hidden min-h-80 flex-col justify-between overflow-hidden bg-ink-800 p-8 lg:flex">
                <p className="font-display text-7xl leading-none text-gold-500/25" aria-hidden="true">
                  &ldquo;
                </p>
                <div>
                  <p className="font-display text-xl leading-snug text-white/85 italic">
                    “Listening. Supporting. Encouraging. Serving.”
                  </p>
                  <p className="mt-3 font-mono text-[0.62rem] tracking-[0.24em] text-gold-400 uppercase">
                    {featured.readingTime} · {featured.published}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All essays */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <SectionHeading
            index="01"
            kicker="The Collection"
            title="Essays from the Corps."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={Math.min(i * 0.06, 0.24)}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="border-t border-white/10 bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <Reveal>
            <h2 className="text-center font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
              Fields of Coverage
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="border border-white/12 px-4 py-2 text-xs tracking-wide text-ink-100/70 transition-colors duration-300 hover:border-gold-500/50 hover:text-gold-200"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-white/10 bg-ink-950" aria-labelledby="newsletter">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <Reveal>
              <p className="font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
                The Newsletter
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="newsletter" className="balance mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
                Receive the Insight.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-100/65">
                New essays on chaplaincy, ethics and the life behind the uniform — delivered
                occasionally, and worth opening always.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <NewsletterForm />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Grow in the wisdom of the calling."
        copy="Join the Corps to receive formation, fellowship and continuing insight — from first interest to seasoned leadership."
      />
    </>
  );
}
