export type Nominee = {
  id: string;
  name: string;
  title: string;
  org: string;
  photo: string;
  blurb: string;
  /** Placeholder cards are shown until the real finalists are published. */
  placeholder: boolean;
};

export type AwardCategory = {
  id: string;
  name: string;
  tagline: string;
  nominees: Nominee[];
};

export const AWARD_EVENT = {
  slug: "awards-2026",
  edition: "2026 Award & Goodwill Ambassadors Honour",
  title: "Light in the Line of Duty",
  date: "21st November, 2026",
  time: "10:00AM",
  venue: "Oriental Hotel, Victoria Island, Lagos",
  flyer: "/images/events/awards-2026.jpg",
  flyerAlt:
    "Official flyer — Light in the Line of Duty 2026 Award and Goodwill Ambassadors Honour, 21st November 2026, Oriental Hotel Lagos",
  purpose: "Recognizing and honouring champions of human dignity and sustainable development.",
} as const;

function placeholders(categoryId: string): Nominee[] {
  return [1, 2, 3].map((n) => ({
    id: `${categoryId}-n${n}`,
    name: "Nominee to be announced",
    title: `Finalist ${n}`,
    org: "",
    photo: "",
    blurb:
      "The three finalists for this category will be published here once nominations close. Check back soon — your vote will decide the winner.",
    placeholder: true,
  }));
}

export const awardCategories: AwardCategory[] = [
  {
    id: "cat-corporate",
    name: "IPPSCC-USA Distinguished Corporate Social Impact Award",
    tagline: "Honouring organizations whose social impact uplifts communities.",
    nominees: placeholders("cat-corporate"),
  },
  {
    id: "cat-community",
    name: "IPPSCC-USA Community Resilience Champion Award",
    tagline: "Celebrating champions who help communities endure, recover, and thrive.",
    nominees: placeholders("cat-community"),
  },
  {
    id: "cat-safety",
    name: "IPPSCC-USA Public Safety Leadership Award",
    tagline: "Recognizing outstanding leadership in public safety service.",
    nominees: placeholders("cat-safety"),
  },
  {
    id: "cat-women",
    name: "IPPSCC-USA Women of Peace Champion Award",
    tagline: "Honouring women advancing peace in their communities.",
    nominees: placeholders("cat-women"),
  },
  {
    id: "cat-justice",
    name: "IPPSCC-USA Justice of Peace Excellence Award",
    tagline: "Celebrating excellence in the pursuit of justice and peace.",
    nominees: placeholders("cat-justice"),
  },
  {
    id: "cat-legacy",
    name: "IPPSCC-USA Legacy of Service Award",
    tagline: "Honouring a lifetime of faithful service to humanity.",
    nominees: placeholders("cat-legacy"),
  },
  {
    id: "cat-responder",
    name: "IPPSCC-USA First Responder Prestigious Award",
    tagline: "Recognizing exceptional first responders and their sacrifice.",
    nominees: placeholders("cat-responder"),
  },
];

export function findCategory(categoryId: string): AwardCategory | undefined {
  return awardCategories.find((c) => c.id === categoryId);
}

export function findNominee(categoryId: string, nomineeId: string): Nominee | undefined {
  return findCategory(categoryId)?.nominees.find((n) => n.id === nomineeId);
}
