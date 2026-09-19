export type Leader = {
  name: string;
  title: string;
  office: string;
  photo: string;
  photoAlt: string;
  introduction: string;
  mandate: string[];
  charge: string;
};

export const leaders: Leader[] = [
  {
    name: "Prof. Presley Bethuel",
    title: "Chaplain General, IPPSCC-USA",
    office: "Office of the Chaplain General",
    photo: "/images/leaders/prof-presley-bethuel.jpg",
    photoAlt: "Portrait of Prof. Presley Bethuel, Chaplain General of IPPSCC-USA",
    introduction:
      "The Chaplain General holds overall spiritual and professional leadership of the Corps — the custodian of its vision, the guardian of its standard, and the principal voice of its calling to serve those who serve.",
    mandate: [
      "Overall spiritual and professional leadership of the Corps",
      "Custodianship of the vision, mission and standard of excellence",
      "Final authority on commissioning, appointments and discipline, under governing policy",
      "Principal representation of the Corps to institutions, commands and nations",
    ],
    charge: "To serve those who serve — and to ensure every chaplain is prepared to do so worthily.",
  },
  {
    name: "Amb. Dr. Olatoyinbo Emmanuel Olalekan",
    title: "Chaplain Lieutenant General, IPPSCC-USA",
    office: "Office of the Deputy",
    photo: "/images/leaders/amb-dr-olatoyinbo-emmanuel.jpg",
    photoAlt: "Portrait of Amb. Dr. Olatoyinbo Emmanuel Olalekan, Chaplain Lieutenant General of IPPSCC-USA",
    introduction:
      "The Chaplain Lieutenant General serves as deputy to the Chaplain General — carrying executive responsibility across the Corps, coordinating its commands, and ensuring that vision becomes organized, disciplined action.",
    mandate: [
      "Executive support to the Chaplain General across all commands",
      "Coordination of regional, national and international operations",
      "Oversight of formation, chaplain welfare and professional standards",
      "Command responsibility as delegated by the Chaplain General",
    ],
    charge: "Vision becomes mission only when disciplined hands carry it — that is the work of this office.",
  },
];
