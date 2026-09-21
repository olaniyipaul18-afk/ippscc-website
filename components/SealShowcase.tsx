"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import Crest from "./Crest";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const DETAILS = [
  {
    title: "The Outer Ring",
    copy: "“International Police & Public Safety ★ Chaplain Corps Inc. · USA” — the full name and American incorporation of the Corps.",
  },
  {
    title: "The Banner",
    copy: "“Chaplain Corps” crowned with “IPPSCC · U.S.A.” — carried on a gold scroll across the top of the seal.",
  },
  {
    title: "The Star & Medallion",
    copy: "A five-pointed star of service behind a crimson medallion bearing the cross — faith at the very center of duty — ringed with stars.",
  },
  {
    title: "The Eagle & Shield",
    copy: "The American eagle with shield, olive branch and arrows — vigilance, peace through strength, and the nation of the Corps' founding.",
  },
  {
    title: "The Motto Ribbon",
    copy: "“Serving Law Enforcement, Public Safety & First Responders” — exactly whom the Corps exists to serve.",
  },
];

/** Large, explorable presentation of the Corps seal — every detail readable. */
export default function SealShowcase() {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  return (
    <section className="border-b border-white/10 bg-ink-900" aria-labelledby="seal-showcase">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <Reveal>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label="Enlarge the IPPSCC seal"
            className="group relative mx-auto block w-fit cursor-zoom-in"
          >
            <span aria-hidden="true" className="absolute inset-8 rounded-full bg-gold-500/15 blur-[90px] transition-opacity duration-500 group-hover:opacity-150" />
            <Crest className="relative h-72 w-72 transition-transform duration-500 group-hover:scale-[1.03] sm:h-80 sm:w-80 lg:h-[24rem] lg:w-[24rem]" priority />
            <span className="mx-auto mt-6 flex w-fit items-center gap-2 border border-gold-500/50 px-4 py-2 font-mono text-[0.6rem] tracking-[0.22em] text-gold-300 uppercase transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
              <Expand className="h-3.5 w-3.5" aria-hidden="true" />
              Click to enlarge
            </span>
          </button>
        </Reveal>

        <div>
          <SectionHeading
            index="S"
            kicker="The Seal of the Corps"
            title="Every detail, by design."
            lede="The seal is the signature of the Corps. Study it large — then read what each element declares."
          />
          <dl className="mt-8 space-y-1">
            {DETAILS.map((d, i) => (
              <Reveal key={d.title} delay={Math.min(i * 0.06, 0.24)}>
                <div className="flex gap-5 border-b border-white/8 py-4 last:border-0">
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold-500/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="font-display text-lg text-white">{d.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-100/65">{d.copy}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      {/* Lightbox — full-resolution seal */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="IPPSCC seal, enlarged"
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center bg-ink-950/95 p-6 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close enlarged seal"
            className="absolute top-5 right-5 border border-white/20 p-2.5 text-white transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <Image
            src="/images/ippscc-seal.png"
            alt="Official seal of the International Police & Public Safety Chaplain Corps, USA — enlarged"
            width={1024}
            height={1024}
            quality={100}
            priority
            className="h-auto w-[min(88vw,60dvh)] max-w-[640px] object-contain [filter:drop-shadow(0_0_60px_rgba(198,161,91,0.35))]"
          />
          <p className="mt-6 text-center font-mono text-[0.62rem] tracking-[0.26em] text-gold-300/90 uppercase">
            The Seal of the Corps — IPPSCC · USA
          </p>
        </div>
      )}
    </section>
  );
}
