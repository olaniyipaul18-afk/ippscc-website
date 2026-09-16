import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Public Safety Wellness & Support — Every Responder Is Human First",
  description:
    "Wellness is not weakness. IPPSCC wellness chaplaincy creates another avenue for compassionate, spiritual and supportive care — with responsible referral.",
};

export default function WellnessPage() {
  return (
    <ServiceDetail
      kicker="Wellness & Support"
      title="Supporting the people behind the service."
      lede="Professional chaplaincy creates another avenue through which public-safety personnel may access compassionate, spiritual and supportive care."
      image="/images/chaplain-field.jpg"
      imageAlt="A chaplain kneeling in quiet conversation with a firefighter at night"
      sectionLabel="Wellness"
      intro={[
        "In professions built on strength, admitting struggle can feel like professional risk. Chaplains are often a safer first conversation — confidential, non-clinical, non-command, and present without an agenda.",
        "IPPSCC wellness chaplaincy opens doors: normalizing rest, grief, family strain and help-seeking in roll calls, training days and station visits — and walking with personnel toward the right help at the right time.",
        "Where needs extend beyond chaplaincy scope, appropriate professional referral is always encouraged. The chaplain's skill lies partly in recognizing that moment — and making referral feel like strength rather than surrender.",
      ]}
      listTitle="The convictions behind our care"
      listIntro="Three truths the Corps carries into every conversation about responder health."
      points={[
        "Wellness is not weakness.",
        "Seeking support is not failure.",
        "Every responder is a human being first.",
        "Chaplaincy complements — never replaces — clinical, medical or emergency care.",
        "Confidentiality protects the conversation, within applicable boundaries.",
        "The right resource at the right time can change a career — or save a life.",
      ]}
      closingTitle="The Truth We Carry"
      closingCopy="Every responder is a human being first."
      related={[
        { href: "/services/law-enforcement", label: "Law Enforcement Chaplaincy", note: "Serving those who protect" },
        { href: "/services/crisis-disaster", label: "Crisis & Disaster Chaplaincy", note: "Presence when life is disrupted" },
      ]}
    />
  );
}
