export const site = {
  name: "International Police & Public Safety Chaplain Corps, USA",
  shortName: "IPPSCC",
  tagline: "Light in the Line of Duty",
  motto: "Shielded by Faith, Sent to Serve",
  description:
    "The International Police & Public Safety Chaplain Corps, USA (IPPSCC) provides professional chaplaincy, spiritual care, crisis response and compassionate support to law enforcement, public safety personnel and first responders wherever duty calls.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://ippscc.org",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@ippscc.org",
  phone: "+234 906 993 7052",
  phoneHref: "tel:+2349069937052",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
} as const;

export const legalDisclaimers = [
  "IPPSCC is an independent professional chaplaincy organization. It is not a government agency, and nothing on this website implies governmental authority or endorsement unless independently established.",
  "No IPPSCC chaplaincy title, badge, uniform, insignia or rank confers police powers or law-enforcement authority.",
  "Chaplaincy complements — and never replaces — licensed clinical, medical, psychological, legal or emergency care.",
] as const;
