import { faqs } from "./faqs";
import { site } from "@/lib/site";

export type ChatEntry = {
  id: string;
  answer: string;
  href?: string;
  linkLabel?: string;
  keywords: string[];
};

/* ——— Curated site knowledge (concise answers + deep links) ——— */

const curated: ChatEntry[] = [
  {
    id: "join",
    answer:
      "Joining starts on the Join page: Section A (personal details), B (education & qualification), C (reference & background), then Review & Declare. You receive a tracking reference instantly, and your draft saves automatically as you type.",
    href: "/join",
    linkLabel: "Start an application",
    keywords: ["join", "apply", "application", "member", "membership", "register", "registration", "sign up", "enlist", "form"],
  },
  {
    id: "journey",
    answer:
      "After you apply: 1) Application received → 2) the Corps contacts you and verifies referees & credentials → 3) payment → 4) registration completes and your portal login details arrive. You can follow every step with your reference.",
    href: "/track",
    linkLabel: "Track an application",
    keywords: ["after apply", "next step", "process", "payment", "pay", "fee", "cost", "how long", "admission", "accept"],
  },
  {
    id: "track",
    answer:
      "Track your application any time with your reference (e.g. IPPSCC-2026-XXXXX) plus the email you applied with. You will see your current stage and the latest review updates.",
    href: "/track",
    linkLabel: "Track now",
    keywords: ["track", "reference", "status", "progress", "check application", "where is my"],
  },
  {
    id: "portal",
    answer:
      "Registered members sign in to the Member Portal for their dashboard, digital ID card, profile setup and Corps notifications. Login details are issued after registration is completed.",
    href: "/portal/login",
    linkLabel: "Open Member Portal",
    keywords: ["portal", "login", "log in", "sign in", "dashboard", "account", "profile", "password", "credentials", "member area"],
  },
  {
    id: "contact",
    answer: `You can reach the Corps at ${site.email} or ${site.phone}. The contact page also has a form for membership, partnership, training and media enquiries.`,
    href: "/contact",
    linkLabel: "Contact page",
    keywords: ["contact", "email", "phone", "call", "number", "reach", "talk", "speak", "message", "write", "address"],
  },
  {
    id: "about",
    answer:
      "IPPSCC — the International Police & Public Safety Chaplain Corps, USA — is a US-registered international professional body serving law enforcement, public-safety personnel and first responders. Motto: “Shielded by Faith, Sent to Serve.” Tagline: “Light in the Line of Duty.”",
    href: "/about",
    linkLabel: "About IPPSCC",
    keywords: ["about", "what is ippscc", "mission", "vision", "motto", "tagline", "who are you", "history", "founded"],
  },
  {
    id: "services",
    answer:
      "The Corps serves across 14 disciplines — law enforcement, first response, crisis & disaster, wellness & resilience, corrections, military support and more — through presence, spiritual care and crisis support.",
    href: "/services",
    linkLabel: "Explore services",
    keywords: ["service", "chaplaincy", "support", "crisis", "disaster", "counselling", "counseling", "help officers", "what do you do", "offer"],
  },
  {
    id: "training",
    answer:
      "IPPSCC forms chaplains through structured training and continuing development — covering crisis intervention, trauma care, ethics, confidentiality and field readiness.",
    href: "/training",
    linkLabel: "Training & formation",
    keywords: ["training", "course", "learn", "study", "formation", "certificate", "certification", "qualify", "equipping"],
  },
  {
    id: "standards",
    answer:
      "Chaplains serve under strict professional standards: confidentiality, ethics, cultural and spiritual respect, clear boundaries — and chaplaincy never replaces medical, psychological or emergency care.",
    href: "/standards",
    linkLabel: "Professional standards",
    keywords: ["standard", "ethic", "confidential", "privacy", "conduct", "rule", "code", "professional"],
  },
  {
    id: "leadership",
    answer:
      "The Corps is led by the Office of the Chaplain General: Prof. Presley Bethuel (Chaplain General) and Amb. Dr. Olatoyinbo Emmanuel Olalekan (Chaplain Lieutenant General).",
    href: "/leadership",
    linkLabel: "Meet the leadership",
    keywords: ["leader", "leadership", "general", "presley", "bethuel", "olatoyinbo", "emmanuel", "chaplain general", "who leads", "founder", "president", "bishop"],
  },
  {
    id: "nigeria",
    answer:
      "IPPSCC Nigeria carries the mission locally — chaplaincy development, commands and collaboration that respect Nigerian law, culture and institutions.",
    href: "/nigeria",
    linkLabel: "IPPSCC Nigeria",
    keywords: ["nigeria", "lagos", "abuja", "nigerian"],
  },
  {
    id: "africa",
    answer:
      "IPPSCC Africa expresses the Corps' mission across the continent — building professional chaplaincy capacity with regional commands and partnerships.",
    href: "/africa",
    linkLabel: "IPPSCC Africa",
    keywords: ["africa", "african", "ghana", "kenya", "continent", "region"],
  },
  {
    id: "global",
    answer:
      "Beyond the USA, IPPSCC holds an international outlook — encouraging professional chaplaincy development and collaboration across appropriate jurisdictions.",
    href: "/global",
    linkLabel: "Global reach",
    keywords: ["global", "international", "world", "outside", "country", "countries", "usa", "america", "united states"],
  },
  {
    id: "partnership",
    answer:
      "Commands, agencies and institutions can explore chaplaincy presence and partnership with the Corps. Relationships are identified publicly only when formally established.",
    href: "/partnerships",
    linkLabel: "Partnerships",
    keywords: ["partner", "institution", "agency", "command", "collaborate", "organization", "church", "department", "request chaplain"],
  },
  {
    id: "events",
    answer: "Gatherings, trainings and Corps assemblies are listed on the Events page — check there for what is coming up.",
    href: "/events",
    linkLabel: "View events",
    keywords: ["event", "gathering", "conference", "assembly", "meeting", "program", "programme", "schedule", "upcoming"],
  },
  {
    id: "faq",
    answer: "The FAQ page answers common questions about the Corps, membership, confidentiality and more.",
    href: "/faq",
    linkLabel: "Read FAQs",
    keywords: ["faq", "question", "frequently asked"],
  },
  {
    id: "eligibility",
    answer:
      "Membership is open to those called to serve law enforcement, public safety, first responders, fire & rescue, emergency services, corrections, crisis response and community service — subject to the Corps' eligibility and professional requirements. Two referees are required: a clergy/spiritual leader and a military, law-enforcement or civil-service referee.",
    href: "/join",
    linkLabel: "See requirements & apply",
    keywords: ["eligible", "requirement", "criteria", "who can", "qualify", "referee", "pastor", "officer", "recommend"],
  },
];

/* ——— FAQs become searchable entries ——— */

const STOP = new Set([
  "the", "and", "for", "with", "does", "what", "how", "are", "you", "your", "our",
  "this", "that", "have", "has", "can", "into", "from", "they", "them", "its",
]);

const FAQ_LINKS: Record<number, { href: string; linkLabel: string; extra: string[] }> = {
  1: { href: "/join", linkLabel: "Start an application", extra: ["join", "apply", "member"] },
  8: { href: "/contact", linkLabel: "Contact the Corps", extra: ["partner", "institution", "request"] },
  9: { href: "/join", linkLabel: "Go to the Join page", extra: ["begin", "start", "apply"] },
};

function faqKeywords(question: string, extra: string[]): string[] {
  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
  return [...new Set([...words, ...extra])];
}

const faqEntries: ChatEntry[] = faqs.map((f, i) => ({
  id: `faq-${i}`,
  answer: f.answer,
  href: FAQ_LINKS[i]?.href,
  linkLabel: FAQ_LINKS[i]?.linkLabel,
  keywords: faqKeywords(f.question, FAQ_LINKS[i]?.extra ?? []),
}));

const ALL: ChatEntry[] = [...curated, ...faqEntries];

/* ——— Matching engine ——— */

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

const GREETING = /^(hi|hello|hey|good\s?(morning|afternoon|evening)|greetings|shalom|peace)\b/;
const THANKS = /\b(thank|thanks|appreciated|appreciate)\b/;

export type ChatReply = { text: string; href?: string; linkLabel?: string };

export function getReply(input: string): ChatReply {
  const text = normalize(input);
  if (!text) {
    return { text: "Ask me anything about IPPSCC — joining, tracking, the portal, services or leadership." };
  }
  if (GREETING.test(text) && text.length < 40) {
    return {
      text: "Welcome — and thank you for stopping by. I can guide you through joining the Corps, tracking an application, the Member Portal, services, leadership and more. What would you like to know?",
    };
  }
  if (THANKS.test(text)) {
    return { text: "You are most welcome. Shielded by Faith, Sent to Serve — I am here if you need anything else." };
  }

  let best: ChatEntry | null = null;
  let bestScore = 0;
  for (const entry of ALL) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (kw.includes(" ") ? text.includes(kw) : new RegExp(`\\b${kw}`).test(text)) {
        score += kw.includes(" ") ? kw.length : Math.min(kw.length, 8);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 5) {
    return { text: best.answer, href: best.href, linkLabel: best.linkLabel };
  }
  return {
    text: `I want to give you the right answer rather than guess. The FAQ page covers the essentials — or write to the Corps at ${site.email} / ${site.phone} and a real person will help.`,
    href: "/faq",
    linkLabel: "Read FAQs",
  };
}

export const QUICK_REPLIES = ["How do I join?", "Track my application", "Contact the Corps"];
