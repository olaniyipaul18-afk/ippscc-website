export type NavChild = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About IPPSCC", href: "/about", description: "Mission, vision, motto & values" },
      { label: "Leadership & Governance", href: "/leadership", description: "Servant leadership, professional responsibility" },
      { label: "Partnerships", href: "/partnerships", description: "Responsible collaboration" },
      { label: "FAQ", href: "/faq", description: "Questions, answered plainly" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Chaplaincy Services", href: "/services", description: "Where duty meets human need" },
      { label: "Law Enforcement", href: "/services/law-enforcement", description: "Serving those who protect" },
      { label: "First Responder", href: "/services/first-responder", description: "When they respond, we stand ready" },
      { label: "Crisis & Disaster", href: "/services/crisis-disaster", description: "Presence when life is disrupted" },
      { label: "Wellness & Support", href: "/services/wellness", description: "Supporting the people behind the service" },
    ],
  },
  { label: "Membership", href: "/membership" },
  {
    label: "Training & Standards",
    href: "/training",
    children: [
      { label: "Training & Development", href: "/training", description: "Training for the moments that matter" },
      { label: "Professional Standards", href: "/standards", description: "Ethics, confidentiality & safeguarding" },
    ],
  },
  {
    label: "Global Reach",
    href: "/global",
    children: [
      { label: "International", href: "/global", description: "One calling, many communities" },
      { label: "IPPSCC Africa", href: "/africa", description: "Africa is part of the mission" },
      { label: "IPPSCC Nigeria", href: "/nigeria", description: "From Nigeria to the world" },
    ],
  },
  {
    label: "Insights & Events",
    href: "/insights",
    children: [
      { label: "The IPPSCC Insight", href: "/insights", description: "Ideas for those who serve" },
      { label: "Events & Conferences", href: "/events", description: "Connect, learn & grow" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavChild[] }[] = [
  {
    title: "Organization",
    links: [
      { label: "About IPPSCC", href: "/about" },
      { label: "Leadership & Governance", href: "/leadership" },
      { label: "Membership", href: "/membership" },
      { label: "Training & Development", href: "/training" },
      { label: "Professional Standards", href: "/standards" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    title: "Chaplaincy Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Law Enforcement", href: "/services/law-enforcement" },
      { label: "First Responder", href: "/services/first-responder" },
      { label: "Crisis & Disaster", href: "/services/crisis-disaster" },
      { label: "Wellness & Support", href: "/services/wellness" },
    ],
  },
  {
    title: "Global & Knowledge",
    links: [
      { label: "International Outreach", href: "/global" },
      { label: "IPPSCC Africa", href: "/africa" },
      { label: "IPPSCC Nigeria", href: "/nigeria" },
      { label: "The IPPSCC Insight", href: "/insights" },
      { label: "Events & Conferences", href: "/events" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
