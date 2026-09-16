export type EventFormat = {
  title: string;
  description: string;
  cadence: string;
};

export const eventFormats: EventFormat[] = [
  {
    title: "Chaplaincy Conferences",
    description:
      "Flagship gatherings uniting chaplains, commanders and public-safety leaders around the future of professional chaplaincy.",
    cadence: "Annual",
  },
  {
    title: "Professional Development Seminars",
    description:
      "Focused seminars deepening competence in spiritual care, ethics, crisis response and responder support.",
    cadence: "Quarterly",
  },
  {
    title: "Leadership Forums",
    description:
      "Convenings for chaplain leaders on governance, accountability and servant leadership within the Corps.",
    cadence: "Biannual",
  },
  {
    title: "Public-Safety Chaplaincy Workshops",
    description:
      "Practical, scenario-based workshops on presence, listening, referral and critical-incident support.",
    cadence: "Regional",
  },
  {
    title: "International Chaplaincy Summits",
    description:
      "Cross-border summits fostering collaboration, shared standards and friendship among chaplaincies worldwide.",
    cadence: "Annual",
  },
  {
    title: "Crisis-Response Training",
    description:
      "Field-oriented preparation for chaplains serving in disaster, mass-casualty and community-crisis contexts.",
    cadence: "Scheduled",
  },
  {
    title: "Africa Chaplaincy Forums",
    description:
      "Pan-African forums shaping a locally responsive, internationally connected chaplaincy for the continent.",
    cadence: "Annual",
  },
  {
    title: "Nigeria Chaplaincy Programmes",
    description:
      "National programmes connecting Nigerian chaplains with formation, fellowship and the wider Corps.",
    cadence: "National",
  },
];
