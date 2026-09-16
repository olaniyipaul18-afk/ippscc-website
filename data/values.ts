export type Value = {
  title: string;
  statement: string;
  exposition: string;
};

export const values: Value[] = [
  {
    title: "Faith",
    statement: "A foundation for spiritual purpose, hope and service.",
    exposition:
      "Faith gives the foundation — the quiet conviction that every person in uniform carries infinite dignity, and that service itself is sacred work.",
  },
  {
    title: "Compassion",
    statement: "Seeing the person behind the uniform and responding with humanity.",
    exposition:
      "Compassion gives the human touch — the discipline of noticing suffering, drawing near to it, and refusing to look away.",
  },
  {
    title: "Integrity",
    statement: "Doing what is right, even when nobody is watching.",
    exposition:
      "Integrity gives the credibility — the alignment of private character and public conduct on which all chaplaincy trust depends.",
  },
  {
    title: "Service",
    statement: "Putting the needs of those we serve at the heart of our calling.",
    exposition:
      "Service gives the mission — a posture of showing up, staying present, and placing others' needs above our own comfort.",
  },
  {
    title: "Professionalism",
    statement: "Approaching chaplaincy with preparation, discipline, competence and responsibility.",
    exposition:
      "Professionalism turns good intentions into reliable care — through training, boundaries, accountability and respect for every institution we enter.",
  },
  {
    title: "Confidentiality",
    statement: "Respecting the privacy and dignity of those who seek chaplaincy support.",
    exposition:
      "Confidentiality protects the sacred trust of the conversation — held with care, within applicable legal and professional boundaries.",
  },
  {
    title: "Excellence",
    statement: "Continuously pursuing improvement in knowledge, character, service and practice.",
    exposition:
      "Excellence is the refusal to stagnate — a lifelong commitment to grow in character, competence and the quality of our presence.",
  },
];

export const entitlements: string[] = [
  "Organizational Membership Recognition",
  "Professional IPPSCC Identification",
  "Membership Certificate",
  "Eligible Organizational Rank or Appointment",
  "Authorized Chaplaincy Insignia",
  "Commissioning Opportunities",
  "Professional Chaplaincy Training",
  "Continuing Professional Development",
  "Chaplaincy Workshops & Seminars",
  "Professional Networking",
  "International Chaplaincy Community",
  "Leadership Development Opportunities",
  "Chaplaincy Resources",
  "Authorized Service Opportunities",
  "Humanitarian Initiatives",
  "Recognition for Exemplary Service",
  "Mentorship & Peer Development",
  "Participation in Organizational Programmes",
  "Professional Chaplaincy Identity",
  "A Platform for Purpose-Driven Service",
];

export const trainingAreas: string[] = [
  "Professional Chaplaincy",
  "Spiritual Care",
  "Crisis Response",
  "Active Listening",
  "Grief Support",
  "Trauma-Informed Approaches",
  "Ethics",
  "Confidentiality",
  "Safeguarding",
  "Cultural Competence",
  "Professional Boundaries",
  "Referral Practices",
  "Public-Safety Environments",
  "Wellness Support",
  "Leadership",
  "Interagency Collaboration",
];

export const standards: { title: string; description: string }[] = [
  { title: "Ethical Conduct", description: "Principled conduct in every conversation, ceremony and crisis." },
  { title: "Confidentiality", description: "Respect for private conversations within applicable legal and professional limits." },
  { title: "Accountability", description: "Answerability for professional conduct to the Corps and those served." },
  { title: "Safeguarding", description: "Protecting vulnerable people and responding responsibly to concerns." },
  { title: "Professional Boundaries", description: "Clarity about what chaplaincy is — and what it is not." },
  { title: "Cultural Respect", description: "Serving with dignity across cultures, backgrounds and faith traditions." },
  { title: "Spiritual Diversity", description: "Honoring each person's beliefs without coercion or compromise." },
  { title: "Integrity", description: "Honesty and consistency when visible — and when unseen." },
  { title: "Competence", description: "Serving only within the limits of training, preparation and authorization." },
  { title: "Responsible Referral", description: "Recognizing when another qualified professional is needed." },
  { title: "Professional Development", description: "Continuous growth in knowledge, character and practice." },
  { title: "Respect for Law & Policy", description: "Operating within applicable laws and institutional policies." },
];

export const leadershipTiers: { title: string; remit: string }[] = [
  { title: "Chief Chaplain General", remit: "Overall spiritual and professional leadership of the Corps." },
  { title: "Deputy Chief Chaplain General", remit: "Executive support and delegated command responsibility." },
  { title: "Assistant Chief Chaplain General", remit: "Directorates, special assignments and strategic portfolios." },
  { title: "Regional / Command Leadership", remit: "Geographic and functional command stewardship." },
  { title: "Directors", remit: "Leadership of departments, programmes and professional functions." },
  { title: "Senior Chaplains", remit: "Experienced chaplains mentoring the Corps and modelling the standard." },
  { title: "Chaplain Officers", remit: "Commissioned chaplains serving in authorized assignments." },
  { title: "Chaplain Candidates", remit: "Members in formation, preparing for commissioned service." },
];
