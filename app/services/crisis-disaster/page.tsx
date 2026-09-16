import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "Crisis & Disaster Chaplaincy — Presence When Life Is Disrupted",
  description:
    "IPPSCC crisis and disaster chaplaincy offers compassionate presence and spiritual care during crisis, grief and loss — alongside professional responders.",
};

export default function CrisisDisasterPage() {
  return (
    <ServiceDetail
      accent="crimson"
      kicker="Crisis & Disaster Chaplaincy"
      title="When life is disrupted, presence matters."
      lede="Crisis can change circumstances in moments. IPPSCC chaplaincy offers an appropriate compassionate presence — disciplined, coordinated and humble."
      image="/images/vigil.jpg"
      imageAlt="Candlelight glowing in darkness during a community vigil"
      sectionLabel="Crisis & Disaster"
      intro={[
        "In the first hours after disaster strikes, the scene belongs to search, rescue, triage and command. The crisis chaplain's first discipline is therefore humility: arriving only when authorized, serving within the coordinated response, and offering what only chaplaincy offers.",
        "During difficult events, people may need many things at once. The chaplain provides unhurried human attention — for survivors, families, witnesses and exhausted responders alike — while fully respecting the roles of emergency personnel, licensed professionals and other specialized responders.",
        "And when the cameras leave, chaplaincy remains: connecting people with community resources, faith communities and professional services, and returning for memorials and anniversaries when invited.",
      ]}
      listTitle="In crisis, people may need"
      listIntro="The chaplain meets human need where it is — and yields gracefully wherever others are better placed to help."
      points={[
        "Practical help and steady guidance",
        "Professional intervention — connected, never replaced",
        "Emotional support without judgment",
        "Spiritual care responsive to belief and circumstance",
        "Someone simply willing to listen",
        "A calm presence amid overwhelming events",
        "Connection to community and professional resources",
      ]}
      closingTitle="The Chaplain's Creed"
      closingCopy="Alongside, never instead of."
      related={[
        { href: "/services/wellness", label: "Wellness & Support", note: "Strength to keep serving" },
        { href: "/services/first-responder", label: "First Responder Chaplaincy", note: "When they respond, we stand ready" },
      ]}
    />
  );
}
