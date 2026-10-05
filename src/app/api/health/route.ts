import { sql } from "drizzle-orm";
import { db } from "@/db";

export const dynamic = "force-dynamic";

/**
 * Liveness probe. Reports 200 whenever the site itself is up, with a flag
 * describing the database so a missing or unreachable database is visible
 * without pretending the whole deployment is down.
 */
export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch (error) {
    console.warn("GET /api/health — database unavailable", error);
    return Response.json({
      ok: true,
      database: "unavailable",
      note: "Serving bundled room and review content. Set DATABASE_URL for bookings, reviews and messages.",
    });
  }
}
