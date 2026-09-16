import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import ArticleCard from "@/components/ArticleCard";
import ShareArticle from "@/components/ShareArticle";
import { articles, getArticle } from "@/data/articles";
import { site } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.standfirst,
    openGraph: {
      title: article.title,
      description: article.standfirst,
      type: "article",
      url: `${site.url}/insights/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-white/10 bg-ink-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-ink-600/40 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,9,15,0.55),rgba(4,9,15,0)_45%,rgba(4,9,15,0.35))]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-36 pb-14 sm:pt-40 lg:px-10">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            <span className="link-sweep">The IPPSCC Insight</span>
          </Link>
          <p className="mt-8 font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
            {article.category} — {article.readingTime}
          </p>
          <h1 className="balance mt-4 font-display text-4xl leading-[1.05] font-medium text-white sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-100/70 sm:text-lg">
            {article.standfirst}
          </p>
          <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[0.62rem] tracking-[0.24em] text-ink-100/45 uppercase">
            By the Corps · Published {article.published}
          </p>
        </div>
      </section>

      <article className="bg-ink-950">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:px-10">
          {article.body.map((block, i) => (
            <div key={i} className={i > 0 ? "mt-12" : ""}>
              {block.heading && (
                <Reveal>
                  <h2 className="font-display text-2xl text-gold-200 sm:text-3xl">{block.heading}</h2>
                </Reveal>
              )}
              {block.paragraphs.map((para, j) => (
                <Reveal key={j} delay={0.05 * j}>
                  <p
                    className={`leading-relaxed text-ink-100/80 ${
                      i === 0 && j === 0
                        ? "font-display text-xl text-white/90 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.9] first-letter:text-gold-400 sm:text-2xl"
                        : "mt-5 text-[1.02rem]"
                    } ${block.heading && j === 0 ? "mt-4" : ""}`}
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          ))}

          <Reveal delay={0.08}>
            <div className="mt-14">
              <ShareArticle title={article.title} path={`/insights/${article.slug}`} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-white/10 pt-8">
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.24em] text-gold-300 uppercase"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                <span className="link-sweep">All Essays</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-white/10 bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-display text-3xl text-white sm:text-4xl">Continue reading.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                href="/insights"
                className="group hidden items-center gap-2 font-mono text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase sm:inline-flex"
              >
                <span className="link-sweep">View All</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 0.07}>
                <ArticleCard article={rel} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
