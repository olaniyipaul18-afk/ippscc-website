import {
  Ambulance,
  Flame,
  HandHeart,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  MessagesSquare,
  Ribbon,
  Scale,
  ShieldCheck,
  Siren,
  Sparkles,
  Users,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "law-enforcement",
    title: "Law Enforcement Chaplaincy",
    short: "Serving those who protect",
    description:
      "Compassionate chaplaincy support for personnel working within demanding law-enforcement environments — standing beside the person behind the badge.",
    icon: ShieldCheck,
  },
  {
    slug: "public-safety",
    title: "Public Safety Chaplaincy",
    short: "Care across the safety professions",
    description:
      "Spiritual and compassionate support for people working across public-safety environments, institutions and operational commands.",
    icon: Landmark,
  },
  {
    slug: "first-responder",
    title: "First Responder Support",
    short: "When they respond, we stand ready",
    description:
      "A supportive presence for those who respond when others need help — recognizing the human dimension of moving toward danger.",
    icon: Siren,
  },
  {
    slug: "fire-rescue",
    title: "Fire & Rescue Chaplaincy",
    short: "Beside fire and rescue families",
    description:
      "Chaplaincy presence for personnel and families connected to fire and rescue service, in station life and on the fireground's aftermath.",
    icon: Flame,
  },
  {
    slug: "emergency-response",
    title: "Emergency Response Chaplaincy",
    short: "Steady in difficult operations",
    description:
      "Support during difficult operational and emergency circumstances, offered with discipline and respect for the chain of command.",
    icon: Ambulance,
  },
  {
    slug: "crisis-disaster",
    title: "Crisis & Disaster Chaplaincy",
    short: "Presence when life is disrupted",
    description:
      "Compassionate presence and spiritual care during crisis, disaster, grief and loss — alongside, never instead of, professional responders.",
    icon: LifeBuoy,
  },
  {
    slug: "grief-bereavement",
    title: "Grief & Bereavement Support",
    short: "A companion through loss",
    description:
      "A listening and supportive presence for individuals and families navigating loss, line-of-duty death and bereavement.",
    icon: Ribbon,
  },
  {
    slug: "spiritual-care",
    title: "Spiritual Care",
    short: "Respectful, responsive, human",
    description:
      "Respectful spiritual support responsive to the beliefs, circumstances and preferences of those being served.",
    icon: Sparkles,
  },
  {
    slug: "family-support",
    title: "Family Support",
    short: "Because service reaches home",
    description:
      "Recognizing that the demands of public-safety service extend beyond the individual to families and loved ones.",
    icon: Users,
  },
  {
    slug: "critical-incident",
    title: "Critical-Incident Presence",
    short: "Authorized, disciplined, calm",
    description:
      "A chaplaincy presence during appropriately authorized critical incidents and difficult events.",
    icon: Scale,
  },
  {
    slug: "community-outreach",
    title: "Community Outreach",
    short: "Bridges of trust",
    description:
      "Service initiatives designed to strengthen compassionate connections between public-safety environments and communities.",
    icon: HandHeart,
  },
  {
    slug: "humanitarian",
    title: "Humanitarian Service",
    short: "Compassion in action",
    description:
      "Opportunities to express chaplaincy through compassionate humanitarian action across communities and crises.",
    icon: HeartHandshake,
  },
  {
    slug: "wellness",
    title: "Wellness Support",
    short: "Strength to keep serving",
    description:
      "Supportive chaplaincy that complements — never replaces — appropriate professional, clinical, medical or emergency services.",
    icon: MessagesSquare,
  },
  {
    slug: "referral",
    title: "Referral & Resource Navigation",
    short: "The right help, at the right time",
    description:
      "Helping individuals identify appropriate professional or community resources when needs fall beyond the chaplain's scope.",
    icon: Compass,
  },
];

export const whoWeServe: string[] = [
  "Law Enforcement Personnel",
  "Police Personnel",
  "Public-Safety Personnel",
  "Fire & Rescue Personnel",
  "Emergency Medical Responders",
  "First Responders",
  "Correctional Environments",
  "Emergency-Management Personnel",
  "Disaster-Response Teams",
  "Public Institutions",
  "Families of First Responders",
  "Communities Affected by Crisis",
];
