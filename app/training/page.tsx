import type { Metadata } from "next";
import { GraduationCap, ArrowRight as Arrow } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { trainingAreas } from "@/data/values";

export const metadata: Metadata = {
  title: "Training & Professional Development — From Calling to Competence",
  description:
    "IPPSCC training philosophy: developing chaplains of knowledge, humility, discipline and compassion — from calling to competence.",
};

const pathway = ["Character", "Knowledge", "Skills", "Professional Conduct", "Service", "Leadership"];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        kicker="Training & Professional Development"
        title="Training for the moments that matter."
        lede="A certificate may document completion. Preparation builds capacity. IPPSCC formation develops chaplains who serve with knowledge, humility, discipline and compassion."
        image="/images/military-ministry.jpg"
        imageAlt="A military chaplain in dialogue with soldiers on base at golden hour"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Training" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <SectionHeading
                index="01"
                kicker="The Philosophy"
                title="Preparation builds capacity."
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-ink-100/75 sm:text-lg">
                  Crisis moments do not wait for the unprepared — and goodwill alone cannot carry
                  the weight of another person&apos;s worst hour. IPPSCC&apos;s training philosophy
                  therefore focuses on forming chaplains equal to the responsibility they will bear.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="flex items-center gap-3 border border-gold-500/30 bg-gold-500/[0.06] px-6 py-5">
                  <GraduationCap className="h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
                  <p className="font-display text-xl text-white sm:text-2xl">
                    Don&apos;t just carry the title. <span className="text-gold-300 italic">Prepare for the responsibility.</span>
                  </p>
                </div>
              </Reveal>
              <h2 className="mt-10 font-mono text-[0.68rem] tracking-[0.3em] text-gold-400 uppercase">
                Training Areas
              </h2>
              <ul className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                {trainingAreas.map((area, i) => (
                  <Reveal key={area} delay={Math.min((i % 2) * 0.05, 0.1)}>
                    <li className="flex items-center justify-between bg-ink-950 px-5 py-4 text-sm text-ink-100/80 transition-colors duration-300 hover:bg-ink-850 hover:text-white">
                      {area}
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-500/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Development pathway */}
      <section className="border-y border-white/10 bg-ink-900" aria-labelledby="pathway">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10">
          <SectionHeading
            index="02"
            kicker="Chaplain Development"
            title="From calling to competence."
            lede="Calling may begin the journey. Development strengthens it. IPPSCC encourages continuous growth across six ascending disciplines."
            align="center"
          />
          <ol className="mx-auto mt-14 max-w-5xl">
            {pathway.map((stage, i) => (
              <Reveal key={stage} delay={i * 0.05}>
                <li className="group flex items-center gap-5 border-b border-white/10 py-5 transition-colors first:border-t hover:border-gold-500/40 sm:gap-10 sm:py-6">
                  <span className="font-display text-4xl text-gold-500/70 transition-colors group-hover:text-gold-400 sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                    {stage}
                  </span>
                  {i < pathway.length - 1 && (
                    <Arrow className="ml-auto hidden h-5 w-5 rotate-90 text-gold-500/60 sm:block" aria-hidden="true" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <p className="balance mx-auto mt-12 max-w-3xl text-center font-display text-2xl leading-snug text-white/90 sm:text-3xl">
              The goal is not simply to produce more chaplains.{" "}
              <span className="text-gold-300 italic">
                The goal is to develop chaplains who are prepared to serve responsibly.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Calling begins the journey. Formation completes it."
        copy="Join a Corps that takes preparation as seriously as compassion — and grow into the chaplain the moment requires."
      />
    </>
  );
}
