import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import CTASection from "@/components/CTASection";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ — Questions, Answered Plainly",
  description:
    "What is IPPSCC? Who can join? Is it a government agency? Do chaplains have police powers? Answers to the questions asked most.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="FAQ"
        title="Questions, answered plainly."
        lede="What IPPSCC is, who may join, what chaplains do and do not carry — stated clearly, without ambiguity."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-10">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center justify-between gap-6 border border-white/10 bg-white/[0.02] px-7 py-8 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-2xl text-white">Still have a question?</h2>
                <p className="mt-2 text-sm text-ink-100/60">
                  Write to the Corps — every serious enquiry receives a considered reply.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 bg-gold-500 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-400"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
