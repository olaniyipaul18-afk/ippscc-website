export const INVESTITURE_EVENT = {
  slug: "investiture-2026",
  title: "IPPSCC-USA Maiden International Honours & Distinguished Fellowship Investiture 2026",
  shortTitle: "Maiden International Honours & Distinguished Fellowship Investiture 2026",
  date: "Monday, 23 November 2026",
  dateShort: "23 November 2026",
  venue: "Oriental Hotel, Victoria Island, Lagos, Nigeria",
  host: "International Police & Public Safety Chaplain Corps, Inc., USA (IPPSCC-USA)",
  theme:
    "Honouring Distinguished Leadership. Advancing Public Safety. Inspiring Service to Humanity.",
  description:
    "A landmark international gathering celebrating distinguished leadership, public safety, humanitarian service, and the formal investiture of IPPSCC-USA Distinguished Fellows.",
  route: "/events/investiture-2026",
  contactEmail: "admin@ippscc.org",
  participationContribution: "₦300,000",
  participationDeadline: "9 November 2026",
} as const;

export type InvestitureNominee = {
  name: string;
  distinction: string;
  image: string;
  alt: string;
};

export const INVESTITURE_NOMINEES: InvestitureNominee[] = [
  {
    name: "H.I.M. Prof. Timothy Atte",
    distinction: "Distinguished Fellow & Member, IPPSCC-USA Advisory Board",
    image: "/images/events/investiture-2026/prof-timothy-atte.jpg",
    alt: "Official investiture nominee postcard for H.I.M. Prof. Timothy Atte",
  },
  {
    name: "Dr. Ogwu James Onoja, FCRB",
    distinction: "Senior Advocate of Nigeria (SAN) · Grand Commander, IPPSCC-USA",
    image: "/images/events/investiture-2026/dr-ogwu-james-onoja.jpg",
    alt: "Official investiture nominee postcard for Dr. Ogwu James Onoja, FCRB",
  },
  {
    name: "DCNS Young Precious Nwanne",
    distinction: "NAPPS Delta State Chairman · Distinguished Fellow, IPPSCC-USA",
    image: "/images/events/investiture-2026/young-precious-nwanne.jpg",
    alt: "Official investiture nominee postcard for DCNS Young Precious Nwanne",
  },
  {
    name: "Amb. Augusta Keneboh",
    distinction:
      "Executive Director, Afro Centre for Development Peace and Justice · Distinguished Fellow, IPPSCC-USA",
    image: "/images/events/investiture-2026/augusta-keneboh.jpg",
    alt: "Official investiture nominee postcard for Amb. Augusta Keneboh",
  },
  {
    name: "Hon. Dr. Hope George, JP, FSM",
    distinction: "Distinguished Fellow, IPPSCC-USA",
    image: "/images/events/investiture-2026/hope-george.jpg",
    alt: "Official investiture nominee postcard for Hon. Dr. Hope George, JP, FSM",
  },
];

export const INVESTITURE_EXPERIENCES = [
  {
    number: "01",
    title: "Morning Humanitarian Outreach",
    description:
      "A planned charity visit to a correctional facility in Lagos and a motherless babies’ home—an expression of compassion, solidarity, and practical commitment to human dignity.",
  },
  {
    number: "02",
    title: "Distinguished Fellowship Investiture",
    description:
      "Formal recognition and presentation of fellowship credentials during IPPSCC-USA’s maiden international investiture.",
  },
  {
    number: "03",
    title: "Professional Networking",
    description:
      "An opportunity to connect with accomplished professionals, academics, legal practitioners, public-safety leaders, chaplains, and humanitarian advocates.",
  },
  {
    number: "04",
    title: "A Legacy of Impact",
    description:
      "Participation in a platform promoting peace, justice, institutional partnerships, and the Sustainable Development Goals.",
  },
];

export const FELLOWSHIP_CREDENTIALS = [
  "Official IPPSCC-USA muffler or scarf",
  "IPPSCC-USA branded jacket",
  "Commemorative fellowship bannerette",
  "Verified Distinguished Fellow profile on the IPPSCC-USA website",
  "Souvenir magazine and a feature in designated print media",
  "Official IPPSCC-USA lapel pin",
  "Distinguished Fellowship award certificate",
  "IPPSCC-USA branded diary",
  "Handbook of Doctrine, Culture & Obligations of an IPPSCC-USA Distinguished Fellow",
];
