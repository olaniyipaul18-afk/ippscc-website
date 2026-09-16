import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "First Responder Chaplaincy — When They Respond, We Stand Ready",
  description:
    "IPPSCC first-responder chaplaincy recognizes the human dimension of moving toward danger — compassionate presence, spiritual care and steady support.",
};

export default function FirstResponderPage() {
  return (
    <ServiceDetail
      kicker="First Responder Chaplaincy"
      title="When the call comes, they respond."
      lede="First responders move toward situations others are trying to escape. IPPSCC develops chaplaincy support that honors the human dimension of that responsibility."
      image="/images/presence.jpg"
      imageAlt="A reassuring hand on the shoulder of a responder in protective gear"
      sectionLabel="First Responder"
      intro={[
        "There is a particular courage in running toward what everyone else is fleeing — and a particular cost that accumulates quietly, call after call, year after year.",
        "IPPSCC first-responder chaplaincy exists to meet that cost with compassion: a supportive presence for firefighters, emergency medical responders, rescue personnel and all who answer the call. The chaplain understands station culture, respects operational rhythm, and offers care that never competes with command or clinical support.",
        "Trust here is built in the uneventful hours — the shared meals, the remembered names, the kept confidences — so that when crisis strikes, the chaplain is already a familiar and welcome presence.",
      ]}
      listTitle="When they respond, we stand ready to serve"
      listIntro="The disciplines of first-responder chaplaincy, practiced with consistency and humility."
      points={[
        "Compassionate presence",
        "Spiritual care",
        "Encouragement",
        "Listening",
        "Support",
        "Appropriate referral",
        "Human connection",
      ]}
      closingTitle="The Commitment"
      closingCopy="When they respond, we stand ready to serve."
      related={[
        { href: "/services/crisis-disaster", label: "Crisis & Disaster Chaplaincy", note: "Presence when life is disrupted" },
        { href: "/services/law-enforcement", label: "Law Enforcement Chaplaincy", note: "Serving those who protect" },
      ]}
    />
  );
}
