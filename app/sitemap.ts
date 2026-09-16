import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/law-enforcement",
    "/services/first-responder",
    "/services/crisis-disaster",
    "/services/wellness",
    "/membership",
    "/training",
    "/standards",
    "/leadership",
    "/global",
    "/africa",
    "/nigeria",
    "/partnerships",
    "/events",
    "/insights",
    "/faq",
    "/join",
    "/contact",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : route.startsWith("/insights/") ? 0.7 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/insights/${article.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
