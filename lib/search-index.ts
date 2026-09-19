import { articles } from "@/data/articles";
import { eventFormats } from "@/data/events";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { values } from "@/data/values";

export type SearchEntry = {
  title: string;
  section: string;
  href: string;
  keywords: string;
};

const pages: SearchEntry[] = [
  { title: "Home", section: "IPPSCC", href: "/", keywords: "light in the line of duty shielded by faith sent to serve start" },
  { title: "About IPPSCC", section: "Organization", href: "/about", keywords: "mission vision motto tagline calling history who we are" },
  { title: "All Chaplaincy Services", section: "Services", href: "/services", keywords: "what we do care support spiritual crisis grief family" },
  { title: "Law Enforcement Chaplaincy", section: "Services", href: "/services/law-enforcement", keywords: "police badge officers protect patrol" },
  { title: "First Responder Chaplaincy", section: "Services", href: "/services/first-responder", keywords: "fire ems rescue respond ambulance firefighters" },
  { title: "Crisis & Disaster Chaplaincy", section: "Services", href: "/services/crisis-disaster", keywords: "disaster emergency trauma grief loss critical incident" },
  { title: "Wellness & Support", section: "Services", href: "/services/wellness", keywords: "wellness health strength human referral" },
  { title: "Membership", section: "Join", href: "/membership", keywords: "join member entitlements benefits card commission rank insignia" },
  { title: "Join the Call to Serve", section: "Join", href: "/join", keywords: "apply application volunteer become chaplain enlist" },
  { title: "Training & Development", section: "Formation", href: "/training", keywords: "training course education development calling competence preparation" },
  { title: "Professional Standards", section: "Formation", href: "/standards", keywords: "ethics confidentiality safeguarding boundaries accountability standards trust" },
  { title: "Leadership & Governance", section: "Organization", href: "/leadership", keywords: "leaders ranks structure chief chaplain general command governance" },
  { title: "International Outreach", section: "Global", href: "/global", keywords: "global world international abroad mission" },
  { title: "IPPSCC Africa", section: "Global", href: "/africa", keywords: "africa continent pan-african forum" },
  { title: "IPPSCC Nigeria", section: "Global", href: "/nigeria", keywords: "nigeria lagos abuja africa west" },
  { title: "Partnerships", section: "Organization", href: "/partnerships", keywords: "partner collaborate institutions sponsor cooperate" },
  { title: "Events & Conferences", section: "Gather", href: "/events", keywords: "events conference summit seminar workshop forum calendar" },
  { title: "The IPPSCC Insight", section: "Gather", href: "/insights", keywords: "news articles blog essays insight read" },
  { title: "FAQ", section: "Organization", href: "/faq", keywords: "questions answers government police powers help" },
  { title: "Contact", section: "IPPSCC", href: "/contact", keywords: "contact email write message reach phone" },
  { title: "Member Portal — Sign In", section: "Portal", href: "/portal/login", keywords: "login sign in dashboard account member area profile" },
  { title: "Track Application", section: "Portal", href: "/track", keywords: "track reference status application progress check" },
  { title: "Chaplain General — Prof. Presley Bethuel", section: "Leadership", href: "/leadership", keywords: "presley bethuel chaplain general leader office" },
  { title: "Lieutenant General — Amb. Dr. Olatoyinbo Emmanuel", section: "Leadership", href: "/leadership", keywords: "olatoyinbo emmanuel lieutenant general deputy leader office" },
];

const detailSlugs = new Set(["law-enforcement", "first-responder", "crisis-disaster", "wellness"]);

export const searchIndex: SearchEntry[] = [
  ...pages,
  ...services.map((s): SearchEntry => ({
    title: s.title,
    section: "Services",
    href: detailSlugs.has(s.slug) ? `/services/${s.slug}` : "/services",
    keywords: `${s.short} ${s.description}`.toLowerCase(),
  })),
  ...articles.map((a): SearchEntry => ({
    title: a.title,
    section: `Insight — ${a.category}`,
    href: `/insights/${a.slug}`,
    keywords: a.standfirst.toLowerCase(),
  })),
  ...faqs.map((f): SearchEntry => ({
    title: f.question,
    section: "FAQ",
    href: "/faq",
    keywords: f.answer.toLowerCase(),
  })),
  ...eventFormats.map((e): SearchEntry => ({
    title: e.title,
    section: "Events",
    href: "/events",
    keywords: `${e.description} ${e.cadence}`.toLowerCase(),
  })),
  ...values.map((v): SearchEntry => ({
    title: `${v.title} — Core Value`,
    section: "Values",
    href: "/about",
    keywords: `${v.statement} ${v.exposition}`.toLowerCase(),
  })),
];

export const suggestedSearches: SearchEntry[] = [
  pages[8],
  pages[2],
  pages[7],
  pages[14],
  pages[19],
  pages[12],
];
