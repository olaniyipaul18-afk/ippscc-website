export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category: string;
  readingTime: string;
  published: string;
  featured?: boolean;
  body: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "ministry-of-presence",
    title: "The Ministry of Presence: Why Showing Up Matters More Than Having Answers",
    standfirst:
      "In the aftermath of critical incidents, the most powerful thing a chaplain carries is not a speech — it is steady, unhurried presence.",
    category: "Chaplaincy Practice",
    readingTime: "6 min read",
    published: "2026",
    featured: true,
    body: [
      {
        paragraphs: [
          "There is a moment every experienced chaplain recognizes: the room after the briefing, the corridor outside the hospital ward, the station kitchen at 3 a.m. Words feel thin. Explanations feel premature. And yet something in the chaplain's training says: stay.",
          "That instinct has a name in professional chaplaincy — the ministry of presence. It is the disciplined practice of being fully, calmly available to another person without rushing to fix, advise or theologize. Presence does not mean passivity. It means attention so complete that the suffering person feels genuinely accompanied rather than managed.",
        ],
      },
      {
        heading: "Presence is a skill, not an accident",
        paragraphs: [
          "New chaplains sometimes imagine presence as simply standing nearby. In practice, it is a trained competence: regulated breathing, open posture, unhurried pacing, reflective listening, and the courage to tolerate silence. Each of these can be learned, practiced and refined — which is why formation matters as much as calling.",
          "In law-enforcement and first-response environments, presence carries additional weight. Personnel in these professions are trained to assess, act and control. A chaplain who arrives calm — who does not flinch, overreact or compete for authority — communicates safety in a language these professionals understand instinctively.",
        ],
      },
      {
        heading: "What presence is not",
        paragraphs: [
          "Presence is not loitering at scenes where chaplains are not authorized. It is not inserting oneself into command decisions. It is not prolonged lingering that becomes a burden to busy personnel. Professional presence is always bounded: invited or authorized, brief or sustained as appropriate, and withdrawn gracefully when the moment passes.",
          "Nor is presence a substitute for referral. The chaplain who sits with a firefighter through the night and then connects that firefighter with appropriate professional support in the morning has practiced presence at its best — accompaniment plus responsibility.",
        ],
      },
      {
        heading: "The quiet standard",
        paragraphs: [
          "IPPSCC holds that chaplains should be measured less by the eloquence of their words than by the quality of their attention. Listening without unnecessary judgment. Supporting without overstepping boundaries. Bringing compassion without compromising integrity.",
          "Behind every uniform is a human being. The ministry of presence is simply the decision — renewed at every call-out — to stand beside that human being, for as long as faithfulness requires.",
        ],
      },
    ],
  },
  {
    slug: "person-behind-the-badge",
    title: "The Person Behind the Badge: A Chaplain's View of Law-Enforcement Life",
    standfirst:
      "A badge does not eliminate grief. Understanding the human cost of policing is the first step toward serving those who serve.",
    category: "Law-Enforcement Chaplaincy",
    readingTime: "7 min read",
    published: "2026",
    body: [
      {
        paragraphs: [
          "Ask a chaplain who serves law enforcement what officers carry, and the answer rarely begins with equipment. It begins with weight: the cumulative load of critical incidents, public scrutiny, disrupted sleep, missed family milestones and decisions that must be made in seconds and defended for years.",
          "Professional chaplaincy begins with a simple conviction: those who protect, respond and serve deserve compassionate support too. That conviction must be translated into practice — into ride-alongs and roll-call presence, hospital visits and kitchen-table conversations, funerals and weddings and the ordinary Tuesdays in between.",
        ],
      },
      {
        heading: "Trust is earned in the uneventful hours",
        paragraphs: [
          "Chaplains who only appear at tragedies are treated as symbols of tragedy. Chaplains who are present in ordinary station life — who know names, ask after families, drink the bad coffee, respect the humor — are trusted when the extraordinary happens.",
          "This is why IPPSCC emphasizes professionalism alongside compassion. Reliability builds credibility: showing up when promised, holding confidences, understanding rank structure and policy, and never confusing pastoral access with operational authority.",
        ],
      },
      {
        heading: "Grief, guilt and the unspoken questions",
        paragraphs: [
          "Officers encounter suffering most citizens never witness. Over a career, those encounters accumulate. Chaplains create space for the questions that rarely surface in briefing rooms — about purpose, fairness, faith and the cost of the calling — without judgment and without easy answers.",
          "Where needs extend beyond chaplaincy scope, the professional chaplain refers: to peer support, clinicians, medical providers or community resources. Knowing the boundary — and honoring it — is itself an act of care.",
        ],
      },
      {
        heading: "Standing beside",
        paragraphs: [
          "The mission, in the end, is simple: stand beside the person behind the badge. Not in front, directing. Not behind, pushing. Beside — as a steady, confidential, compassionate companion through a demanding and honorable profession.",
        ],
      },
    ],
  },
  {
    slug: "confidentiality-is-the-currency",
    title: "Confidentiality Is the Currency of Chaplaincy",
    standfirst:
      "Trust must be earned — and nothing earns or destroys it faster than how a chaplain handles what is shared in confidence.",
    category: "Ethics & Standards",
    readingTime: "5 min read",
    published: "2026",
    body: [
      {
        paragraphs: [
          "Every chaplaincy conversation rests on an invisible contract: what is shared here will be held with care. In public-safety environments — where reputations, careers and operational security are all in play — that contract is load-bearing. Break it once, and years of credibility can collapse.",
          "IPPSCC treats confidentiality as both a core value and a professional standard. Chaplains are expected to respect the privacy and dignity of those who seek support, within applicable legal and professional boundaries.",
        ],
      },
      {
        heading: "Clarity protects everyone",
        paragraphs: [
          "Professional chaplains do not promise absolute secrecy they cannot keep. Instead, they are clear — early and kindly — about the limits of confidentiality, including safeguarding duties where vulnerable people may be at risk. Paradoxically, this honesty deepens trust rather than diminishing it.",
          "Personnel would rather hear the boundaries upfront than discover them in a moment of crisis. Clarity is compassion with foresight.",
        ],
      },
      {
        heading: "Practical disciplines",
        paragraphs: [
          "Confidentiality lives in small habits: private settings for sensitive conversations, careful handling of notes and records, discretion in corridors and canteens, and restraint on social media. It also lives in refusal — the polite, firm refusal to relay personal disclosures to command, colleagues or family, however well-intentioned the request.",
          "Where a chaplain must act on safeguarding concerns, the principle remains: share only what is necessary, with only those who must know, through proper channels — and, wherever possible, with the person's understanding.",
        ],
      },
      {
        heading: "Trust, compounded",
        paragraphs: [
          "Confidentiality kept once is relief. Kept a hundred times, it becomes reputation. And reputation is what allows a chaplain, in the hardest hour of someone's career, to be the person they call. That is a privilege no chaplain should ever take for granted.",
        ],
      },
    ],
  },
  {
    slug: "crisis-chaplaincy-first-seventy-two-hours",
    title: "Crisis Chaplaincy and the First Seventy-Two Hours",
    standfirst:
      "When life is disrupted, presence matters — but so do coordination, humility and respect for every other responder on the ground.",
    category: "Crisis Response",
    readingTime: "6 min read",
    published: "2026",
    body: [
      {
        paragraphs: [
          "In the first hours after disaster strikes, the scene belongs to search, rescue, triage and command. The crisis chaplain's first discipline is therefore humility: arrive only when authorized, report through proper channels, wear what identifies you, and take your place within — never above — the coordinated response.",
          "What chaplains offer in those hours is distinct from every other function: unhurried human attention for people in shock, grief or spiritual distress — survivors, families, witnesses and exhausted responders alike.",
        ],
      },
      {
        heading: "What chaplains actually do at scale",
        paragraphs: [
          "Crisis chaplaincy at a disaster scene is rarely dramatic. It is sitting with families awaiting news. It is walking with responders between rotations. It is helping a displaced elder contact relatives, praying when asked and remaining quietly present when not, and noticing the volunteer who has gone pale and needs relief.",
          "It is also restraint: not conducting impromptu counseling that belongs to clinicians, not making promises about outcomes, not photographing suffering, and not speaking to media about those served.",
        ],
      },
      {
        heading: "The days after",
        paragraphs: [
          "When cameras leave, grief remains. Effective crisis chaplaincy therefore plans beyond the first seventy-two hours — connecting people with community resources, faith communities and professional services, and returning for memorials and anniversaries when invited.",
          "IPPSCC's international outlook recognizes that disasters cross borders and cultures. Chaplains serving across contexts must pair their compassion with cultural competence, local partnership and respect for how each community grieves.",
        ],
      },
      {
        heading: "Alongside, never instead of",
        paragraphs: [
          "The crisis chaplain's creed can be stated in five words: alongside, never instead of. Alongside emergency personnel, licensed professionals and specialized responders — offering what only chaplaincy offers, and yielding gracefully wherever others are better placed to help.",
        ],
      },
    ],
  },
  {
    slug: "chaplaincy-across-cultures",
    title: "One Calling, Many Communities: Chaplaincy Across Cultures",
    standfirst:
      "From American precincts to African commands, human need crosses borders — but wisdom requires serving each place on its own terms.",
    category: "International",
    readingTime: "6 min read",
    published: "2026",
    body: [
      {
        paragraphs: [
          "Public safety is global. The circumstances differ, the cultures differ, the institutions differ — but the human need for compassion, dignity, spiritual care and responsible support crosses every border. This is the conviction behind IPPSCC's international vision.",
          "Yet conviction without humility can become intrusion. Chaplaincy that works beautifully in one context can misfire in another. The international chaplain must therefore be a student before becoming a servant: learning local law, protocol, religious landscape and cultural grammar.",
        ],
      },
      {
        heading: "Africa is part of the mission",
        paragraphs: [
          "Africa's extraordinary cultural, religious and institutional diversity demands a chaplaincy strategy that is culturally aware, professionally responsible, locally responsive and internationally connected. Imported models must be adapted, not imposed — shaped by African chaplains, institutions and communities themselves.",
          "Nigeria, with its scale and complexity, illustrates the principle: effective chaplaincy there requires deep local understanding held together with international vision — respecting Nigerian law, institutional protocols, cultural realities and religious diversity.",
        ],
      },
      {
        heading: "Practices of the cross-cultural chaplain",
        paragraphs: [
          "Several disciplines mark the chaplain who serves well across cultures: partnership with local leaders from the first conversation; patience with consensus and protocol; care with language, symbol and ceremony; and a listening posture that assumes there is always more to learn.",
          "Above all, the cross-cultural chaplain resists the temptation to measure every context against home. Difference is not deficiency. The goal is not replication but resonance — chaplaincy that rings true in each place it serves.",
        ],
      },
      {
        heading: "A global vision, a human calling",
        paragraphs: [
          "One calling, many communities. The chaplain's vocation is universal in its compassion and particular in its expression — professional everywhere, and at home anywhere it is invited to serve.",
        ],
      },
    ],
  },
  {
    slug: "wellness-is-not-weakness",
    title: "Wellness Is Not Weakness: Chaplaincy's Role in Responder Health",
    standfirst:
      "Seeking support is not failure. How chaplains open doors to wellness — and know when to walk someone through them.",
    category: "Wellness",
    readingTime: "5 min read",
    published: "2026",
    body: [
      {
        paragraphs: [
          "In professions built on strength, admitting struggle can feel like professional risk. Many responders will endure far too much, for far too long, rather than be seen as unable to cope. This is where chaplaincy occupies a unique and delicate position.",
          "Chaplains are often perceived as safer first conversations — confidential, non-clinical, non-command, and present without an agenda. A firefighter who would never book a counselling appointment may accept a coffee with the chaplain. That coffee can be the doorway to everything else.",
        ],
      },
      {
        heading: "Complement, never replace",
        paragraphs: [
          "The professional chaplain understands precisely what that doorway is — and is not. Chaplaincy complements appropriate professional services; it never replaces licensed clinical, medical, psychological or emergency care. The chaplain's skill lies partly in recognizing the moment when accompaniment must become referral, and making that referral feel like strength rather than surrender.",
          "Effective chaplains therefore maintain working knowledge of available resources: peer support teams, employee assistance programmes, clinicians experienced with responder populations, crisis lines and community services. Resource navigation is pastoral care with a map.",
        ],
      },
      {
        heading: "Normalizing the conversation",
        paragraphs: [
          "Beyond individual encounters, chaplains shape culture. A chaplain who speaks naturally about rest, grief, family strain and help-seeking — in roll calls, training days and station visits — slowly rewrites the unwritten rule that suffering must be silent.",
          "Wellness is not weakness. Seeking support is not failure. Every responder is a human being first — and human beings were never meant to carry the unbearable alone.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
