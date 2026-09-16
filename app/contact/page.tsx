import type { Metadata } from "next";
import { Building2, Globe2, Mail, UserRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteForm, { type FormField } from "@/components/SiteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start the Conversation",
  description:
    "Contact the International Police & Public Safety Chaplain Corps, USA — membership, partnerships, institutional chaplaincy and general enquiries.",
};

const fields: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
  {
    name: "subject",
    label: "Nature of Enquiry",
    type: "select",
    required: true,
    options: [
      "Membership & Joining",
      "Institutional Chaplaincy Request",
      "Partnership Opportunity",
      "Training & Events",
      "IPPSCC Africa",
      "IPPSCC Nigeria",
      "Media & Speaking",
      "General Enquiry",
    ],
  },
  { name: "organization", label: "Organization (if any)", type: "text", required: false, placeholder: "Command, agency or organization" },
  {
    name: "message",
    label: "Your Message",
    type: "textarea",
    required: true,
    rows: 6,
    placeholder: "How may the Corps serve you? Share as much context as is helpful…",
  },
];

const channels = [
  {
    icon: UserRound,
    title: "Membership",
    copy: "Callings, applications and formation enquiries.",
    href: "/join",
    action: "Apply to Join",
  },
  {
    icon: Building2,
    title: "Institutions",
    copy: "Commands and agencies seeking chaplaincy presence.",
    href: "/partnerships",
    action: "Explore Partnerships",
  },
  {
    icon: Globe2,
    title: "Global & Regional",
    copy: "Africa, Nigeria and international collaboration.",
    href: "/global",
    action: "Global Reach",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Start the conversation."
        lede="Membership, partnerships, institutional chaplaincy or a simple question — every serious enquiry receives a considered reply."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {channels.map((channel, i) => (
              <Reveal key={channel.title} delay={i * 0.07}>
                <a
                  href={channel.href}
                  className="group block h-full border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.045]"
                >
                  <channel.icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-xl text-white">{channel.title}</h2>
                  <p className="mt-1.5 text-sm text-ink-100/60">{channel.copy}</p>
                  <span className="mt-4 block font-mono text-[0.62rem] tracking-[0.24em] text-gold-400 uppercase">
                    {channel.action} →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className="lg:sticky lg:top-36">
                <SectionHeading
                  index="01"
                  kicker="Write to the Corps"
                  title="We reply to every serious enquiry."
                />
                <Reveal delay={0.12}>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-8 flex items-center gap-4 border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:border-gold-500/50"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                    <span>
                      <span className="block font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/50 uppercase">
                        Direct Email
                      </span>
                      <span className="mt-1 block text-[0.95rem] text-white">{site.email}</span>
                    </span>
                  </a>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 border-l-2 border-crimson-500 pl-4 text-xs leading-relaxed text-ink-100/60">
                    For time-sensitive pastoral emergencies, please contact your local emergency
                    services or chain of command first — chaplaincy complements emergency response
                    and never replaces it.
                  </p>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/[0.02] p-7 sm:p-10">
                <SiteForm
                  id="General Contact"
                  fields={fields}
                  submitLabel="Send Message"
                  successTitle="Message received."
                  successCopy="Thank you for writing to the Corps. Your message has been noted and a considered reply will follow."
                  note="We aim to respond to all enquiries promptly. Institutional requests are prioritized."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
