import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ApplicationWizard from "@/components/ApplicationWizard";

export const metadata: Metadata = {
  title: "Join the Call to Serve — Membership Application",
  description:
    "Complete the IPPSCC Membership / Registration Application: personal details, education & qualification, reference & background — then track your reference.",
};

const journey = [
  { title: "Application Received", copy: "Submit all three sections and keep your tracking reference." },
  { title: "Contact & Verification", copy: "The Corps reaches you; referees and credentials are verified." },
  { title: "Payment", copy: "Membership payment instructions are issued upon successful verification." },
  { title: "Completion & Login", copy: "Registration completes — login details arrive, and the portal opens." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        kicker="Join the Call to Serve"
        title="Membership / Registration Application."
        lede="Three sections, one calling. Your progress saves automatically on this device, and a tracking reference is issued the moment you submit."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Join" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-10">
          <Reveal>
            <ApplicationWizard />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 sm:flex-row">
              <p className="text-sm text-ink-100/65">
                Already applied? Follow your reference from submission to decision.
              </p>
              <Link
                href="/track"
                className="group inline-flex shrink-0 items-center gap-2 border border-gold-500/60 px-6 py-3 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase transition-all hover:bg-gold-500 hover:text-ink-950"
              >
                <FileSearch className="h-4 w-4" aria-hidden="true" />
                Track Application
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-900" aria-labelledby="journey">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <SectionHeading
            index="01"
            kicker="After You Apply"
            title="From application to portal."
            align="center"
          />
          <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.06}>
                <li className="h-full bg-ink-900 p-7">
                  <p className="font-display text-4xl text-gold-500/80">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-xl text-white">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-100/60">{stage.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <div className="mt-10 text-center">
              <Link
                href="/portal/login"
                className="group inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.24em] text-gold-300 uppercase"
              >
                <span className="link-sweep">Registered members — enter the portal</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
