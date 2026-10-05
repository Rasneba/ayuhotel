import type { MetadataRoute } from "next";
import { fallbackRooms } from "@/db/seed-data";
import { SITE_URL } from "@/lib/hotel";
import { getRooms } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rooms = await getRooms().catch(() => fallbackRooms());
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/rooms`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/booking`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...rooms.map((r) => ({
      url: `${SITE_URL}/rooms/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
