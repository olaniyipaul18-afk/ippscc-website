import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteForm, { type FormField } from "@/components/SiteForm";

export const metadata: Metadata = {
  title: "Join the Call to Serve — Membership Application",
  description:
    "Begin your IPPSCC membership application. Membership is more than a card — it is a commitment to service.",
};

const fields: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Your full legal name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", required: false, placeholder: "+1 (___) ___-____" },
  { name: "country", label: "Country of Residence", type: "text", required: true, placeholder: "e.g. United States, Nigeria…" },
  {
    name: "track",
    label: "Service Track of Interest",
    type: "select",
    required: true,
    options: [
      "Law Enforcement Chaplaincy",
      "Public Safety Chaplaincy",
      "First Responder Support",
      "Fire & Rescue Chaplaincy",
      "Crisis & Disaster Chaplaincy",
      "Correctional Chaplaincy",
      "Community & Humanitarian Service",
      "Not yet certain — seeking guidance",
    ],
  },
  {
    name: "background",
    label: "Background & Experience",
    type: "select",
    required: true,
    options: [
      "Serving or retired law enforcement / public safety",
      "Clergy / ministry leader",
      "Chaplain (serving or trained)",
      "Healthcare / emergency services professional",
      "Military (serving or veteran)",
      "Community / humanitarian worker",
      "Other professional background",
    ],
  },
  {
    name: "calling",
    label: "Your Calling — Why IPPSCC?",
    type: "textarea",
    required: true,
    rows: 6,
    placeholder: "In your own words, share why you feel called to professional chaplaincy service with IPPSCC…",
  },
];

const affirmations = [
  "I understand IPPSCC membership is a commitment to character, preparation and responsible service.",
  "I understand IPPSCC titles, badges and insignia confer no police powers or governmental authority.",
  "I understand chaplaincy complements — and never replaces — licensed professional care.",
  "I am willing to undertake formation, training and professional development as required.",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        kicker="Join the Call to Serve"
        title="Begin your application."
        lede="Membership is more than a card — it is a commitment to service. Tell us about your calling, and the Corps will respond with next steps."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Join" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
          <div>
            <div className="lg:sticky lg:top-36">
              <SectionHeading
                index="01"
                kicker="Before You Apply"
                title="Count the cost. Then come."
              />
              <Reveal delay={0.12}>
                <ul className="mt-8 space-y-4">
                  {affirmations.map((affirmation, i) => (
                    <li key={affirmation} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0">
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-ink-100/70">{affirmation}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-6 border-l-2 border-gold-500 pl-5 font-display text-lg leading-relaxed text-white/85 italic">
                  “Don&apos;t just carry the title. Prepare for the responsibility.”
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="border border-white/10 bg-white/[0.02] p-7 sm:p-10">
              <SiteForm
                id="Membership Application"
                fields={fields}
                submitLabel="Submit Application"
                successTitle="Application received."
                successCopy="Thank you for answering the call. The Corps reviews every application with care and will respond with next steps. Shielded by Faith, Sent to Serve."
                note="By submitting, you confirm your interest in IPPSCC membership. Eligibility is determined under the organization's governing policies."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
