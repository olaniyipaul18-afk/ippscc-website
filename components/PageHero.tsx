import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Crest from "./Crest";

type PageHeroProps = {
  kicker: string;
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  /** object-position for the hero image, e.g. "object-top" for portraits with key detail up high */
  imagePosition?: string;
  /** caption shown on the hero image figure */
  caption?: string;
  breadcrumb: { label: string; href?: string }[];
};

/** Interior page hero — editorial masthead with optional art-directed image. */
export default function PageHero({ kicker, title, lede, image, imageAlt = "", imagePosition = "object-center", caption = "IPPSCC — USA", breadcrumb }: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden border-b border-white/10 bg-ink-900">
      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-ink-600/40 blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-8%] h-[380px] w-[380px] rounded-full bg-gold-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,9,15,0.55),rgba(4,9,15,0)_40%,rgba(4,9,15,0.35))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-36 pb-16 sm:pt-40 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-10 lg:pb-20">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.18em] text-ink-100/50 uppercase">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 text-gold-500/60" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-gold-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gold-300/90">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="mt-8 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] text-gold-400 uppercase">
            <span aria-hidden="true" className="h-px w-12 bg-gold-500" />
            {kicker}
          </p>
          <h1 className="balance mt-5 font-display text-5xl leading-[1.02] font-medium text-pretty text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-100/75 sm:text-lg">{lede}</p>
          )}
        </div>

        <div className="relative">
          {image ? (
            <figure className="relative overflow-hidden border border-white/10">
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 480px"
                className={`aspect-[16/10] w-full object-cover sm:aspect-[16/8] lg:aspect-[4/5] ${imagePosition}`}
                priority={false}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 flex w-full items-center justify-between px-5 py-4">
                <span className="font-mono text-[0.65rem] tracking-[0.24em] text-gold-300 uppercase">
                  {caption}
                </span>
                <span className="h-px flex-1 mx-4 bg-gold-500/40" aria-hidden="true" />
                <Crest className="h-12 w-12 opacity-90" />
              </figcaption>
            </figure>
          ) : (
            <div className="flex aspect-[16/10] w-full flex-col justify-between border border-white/10 bg-ink-850/60 p-8 sm:aspect-[16/8] lg:aspect-[4/5]">
              <Crest className="h-32 w-32" />
              <div>
                <p className="font-display text-2xl leading-snug text-white/90 italic">
                  “Shielded by Faith,
                  <br />
                  Sent to Serve.”
                </p>
                <p className="mt-4 font-mono text-[0.65rem] tracking-[0.24em] text-gold-400 uppercase">
                  The Motto of the Corps
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The Line */}
      <div aria-hidden="true" className="rule-gold relative" />
    </section>
  );
}
