/** Client-safe application schema: groups, required fields, labels, formatters. */

export const REQUIRED_A = [
  "fullName", "dob", "gender", "nationality", "country", "city", "phone", "email",
  "occupation", "eFullName", "eRelationship", "ePhone", "servingChaplain", "servedRelated",
];

export const REQUIRED_B = ["highestQual", "theoTraining"];

export const REQUIRED_C = [
  "r1Name", "r1Org", "r1Phone", "r1Ethical", "r1Recommend", "r1Attached",
  "r2Name", "r2Agency", "r2Phone", "r2Trustworthy", "r2Recommend", "r2Attached",
  "bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7",
  "c8", "c9", "c10", "c11", "c12", "c13",
  "motiveWhy", "motiveSkills", "motiveUnderstanding",
  "availAssign", "availTraining",
  "attestName", "consent1", "consent2", "consent3", "consent4", "consent5",
];

export const REQUIRED_ALL = [...REQUIRED_A, ...REQUIRED_B, ...REQUIRED_C];

/** Background answers that require a detail explanation when "Yes". */
export const CONDITIONAL_DETAILS = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7"];

export type Group = { title: string; code: string; keys: string[] };

export const GROUPS: Group[] = [
  {
    title: "A1 · Applicant Information",
    code: "A1",
    keys: ["fullName", "preferredName", "dob", "gender", "nationality", "country", "stateProvince", "city", "resAddress", "postalAddress", "phone", "whatsapp", "email", "altEmail", "occupation", "employer", "positionRank", "workAddress"],
  },
  {
    title: "A2 · Emergency Contact",
    code: "A2",
    keys: ["eFullName", "eRelationship", "ePhone", "eWhatsapp", "eEmail", "eAddress"],
  },
  {
    title: "A3 · Chaplaincy / Ministry Information",
    code: "A3",
    keys: ["servingChaplain", "chapTypes", "chapTypesOther", "chapOrg", "chapSince", "chapRank", "servedRelated", "servedDetails"],
  },
  {
    title: "A4 · Church / Ministry Affiliation",
    code: "A4",
    keys: ["churchName", "denomination", "churchRole", "churchLeader", "churchPhone", "churchEmail", "churchAddress", "churchYears"],
  },
  {
    title: "B1 · Educational Background",
    code: "B1",
    keys: ["educationRows", "highestQual", "profCerts"],
  },
  {
    title: "B2 · Theological / Ministerial Education",
    code: "B2",
    keys: ["theoTraining", "theoInst", "theoQual", "theoField", "theoYear", "ordDate", "ordBody"],
  },
  {
    title: "B3 · Professional Experience",
    code: "B3",
    keys: ["employmentRows"],
  },
  {
    title: "B4 · Professional / Chaplaincy Training",
    code: "B4",
    keys: ["training", "trainingOther", "trainingNotes"],
  },
  {
    title: "B5 · Professional Memberships",
    code: "B5",
    keys: ["membershipRows"],
  },
  {
    title: "C1 · Referee 1 — Clergy / Spiritual Leader",
    code: "C1",
    keys: ["r1Name", "r1Title", "r1Org", "r1Denomination", "r1Relationship", "r1Years", "r1Address", "r1Phone", "r1Whatsapp", "r1Email", "r1Character", "r1Ethical", "r1Recommend", "r1Attached"],
  },
  {
    title: "C2 · Referee 2 — Military / Law Enforcement / Civil Service",
    code: "C2",
    keys: ["r2Name", "r2Rank", "r2Agency", "r2Service", "r2ServiceNo", "r2Relationship", "r2Years", "r2Address", "r2Phone", "r2Whatsapp", "r2Email", "r2Conduct", "r2Trustworthy", "r2Recommend", "r2Attached"],
  },
  {
    title: "C3 · Character, Conduct & Background Declaration",
    code: "C3",
    keys: ["bg1", "bg1d", "bg2", "bg2d", "bg3", "bg3d", "bg4", "bg4d", "bg5", "bg5d", "bg6", "bg6d", "bg7", "bg7d"],
  },
  {
    title: "C4 · Personal & Professional Conduct",
    code: "C4",
    keys: ["c8", "c9", "c10", "c11", "c12", "c13"],
  },
  {
    title: "C5 · Motivation for Joining IPPSCC",
    code: "C5",
    keys: ["motiveWhy", "motiveSkills", "motiveUnderstanding", "motivePopulation"],
  },
  {
    title: "C6 · Availability & Service",
    code: "C6",
    keys: ["availAssign", "serviceAreas", "serviceOther", "serviceGeo", "availTraining"],
  },
  {
    title: "C7 · Document Checklist",
    code: "C7",
    keys: ["docs", "docsOther"],
  },
  {
    title: "C8 · Applicant's Attestation & Declaration",
    code: "C8",
    keys: ["attestName", "attestDate", "consent1", "consent2", "consent3", "consent4", "consent5"],
  },
];

const LABEL_OVERRIDES: Record<string, string> = {
  dob: "Date of Birth", eFullName: "Emergency Contact — Full Name", eRelationship: "Relationship",
  ePhone: "Emergency Phone", eWhatsapp: "Emergency WhatsApp", eEmail: "Emergency Email", eAddress: "Emergency Address",
  chapTypes: "Type of Chaplaincy", chapOrg: "Organization / Agency / Department", chapSince: "Chaplaincy Commenced",
  chapRank: "Current Chaplaincy Position / Rank", servedRelated: "Served in Related Field",
  r1Name: "Referee 1 — Full Name", r1Recommend: "Recommends Applicant", r1Attached: "Attestation Letter",
  r2Name: "Referee 2 — Full Name", r2Recommend: "Recommends Applicant", r2Attached: "Attestation Letter",
  r2Trustworthy: "Known Trustworthy", r1Ethical: "Responsible Conduct",
  bg1: "Q1 · Arrest / Charge / Investigation", bg2: "Q2 · Criminal Conviction", bg3: "Q3 · Pending Proceedings",
  bg4: "Q4 · Dismissal / Discipline", bg5: "Q5 · Abuse / Misconduct Investigation", bg6: "Q6 · License Revoked / Suspended",
  bg7: "Q7 · Other Suitability Matter",
  c8: "Q8 · Serious Disciplinary Conduct", c9: "Q9 · Submit to Background Verification",
  c10: "Q10 · Comply with Constitution & Ethics", c11: "Q11 · Maintain Confidentiality",
  c12: "Q12 · Serve All Backgrounds with Dignity", c13: "Q13 · Understands Limits of Authority",
  motiveWhy: "Why IPPSCC", motiveSkills: "Skills & Qualifications to Contribute",
  motiveUnderstanding: "Understanding of the Chaplain's Role", motivePopulation: "Preferred Population / Area",
  availAssign: "Available for Assignments", availTraining: "Will Attend Training & Development",
  serviceAreas: "Preferred Areas of Service", attestName: "Declarant Full Name", attestDate: "Declaration Date",
  educationRows: "Education History", employmentRows: "Employment History", membershipRows: "Memberships",
};

export function prettyLabel(key: string): string {
  if (LABEL_OVERRIDES[key]) return LABEL_OVERRIDES[key];
  if (/^(bg\d)d$/.test(key)) return `${prettyLabel(key.slice(0, -1))} — Details`;
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    if (value.length === 0) return "—";
    if (typeof value[0] === "object") return `${value.length} entr${value.length === 1 ? "y" : "ies"}`;
    return (value as string[]).join("; ");
  }
  if (typeof value === "string") return value.trim() === "" ? "—" : value;
  return String(value);
}

export function isRowArray(value: unknown): value is Record<string, string>[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === "object";
}

export function isFilled(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return value !== null && value !== undefined;
}
