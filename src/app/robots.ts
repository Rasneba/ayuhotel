import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/hotel";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/booking/confirmation/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
