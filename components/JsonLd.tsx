import { site } from "@/lib/site";

/** Structured data: Organization + WebSite schemas for search engines. */
export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/images/ippscc-seal.png`,
    slogan: site.motto,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "444 Alaska Avenue, Suite #CIN848",
      addressLocality: "Torrance",
      addressRegion: "CA",
      postalCode: "90503",
      addressCountry: "US",
    },
    identifier: `Charter No. ${site.charterNumber}`,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: `${site.shortName} — ${site.tagline}`,
    url: site.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
