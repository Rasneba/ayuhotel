import { count, sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings, reviews, rooms } from "./schema";
import { SEED_REVIEWS, SEED_ROOMS, buildSeedBookings } from "./seed-data";

let ready: Promise<void> | null = null;

/**
 * Makes sure the schema exists and seed content is present. Idempotent and
 * memoised per server process, so it costs a single round-trip after warm-up.
 * `drizzle-kit push` remains the primary way to apply schema changes; this is a
 * safety net for fresh environments.
 */
export function ensureDatabase(): Promise<void> {
  if (!ready) {
    ready = initialise().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

async function initialise() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "rooms" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar(80) NOT NULL UNIQUE,
      "name" varchar(120) NOT NULL,
      "category" varchar(40) NOT NULL,
      "tagline" varchar(200) NOT NULL,
      "description" text NOT NULL,
      "price_cents" integer NOT NULL,
      "max_guests" integer NOT NULL,
      "size_sqm" integer NOT NULL,
      "bed_type" varchar(80) NOT NULL,
      "view" varchar(80) NOT NULL,
      "amenities" jsonb NOT NULL,
      "highlights" jsonb NOT NULL,
      "images" jsonb NOT NULL,
      "total_units" integer NOT NULL,
      "featured" boolean DEFAULT false NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "bookings" (
      "id" serial PRIMARY KEY NOT NULL,
      "reference" varchar(20) NOT NULL UNIQUE,
      "room_id" integer NOT NULL REFERENCES "rooms"("id"),
      "guest_name" varchar(120) NOT NULL,
      "email" varchar(160) NOT NULL,
      "phone" varchar(40) NOT NULL,
      "country" varchar(80),
      "check_in" date NOT NULL,
      "check_out" date NOT NULL,
      "adults" integer NOT NULL,
      "children" integer DEFAULT 0 NOT NULL,
      "nights" integer NOT NULL,
      "nightly_rate_cents" integer NOT NULL,
      "room_total_cents" integer NOT NULL,
      "discount_label" varchar(120),
      "discount_cents" integer DEFAULT 0 NOT NULL,
      "service_charge_cents" integer NOT NULL,
      "vat_cents" integer NOT NULL,
      "total_cents" integer NOT NULL,
      "promo_code" varchar(40),
      "special_requests" text,
      "status" varchar(20) DEFAULT 'confirmed' NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "reviews" (
      "id" serial PRIMARY KEY NOT NULL,
      "guest_name" varchar(120) NOT NULL,
      "country" varchar(80) NOT NULL,
      "rating" integer NOT NULL,
      "title" varchar(160) NOT NULL,
      "body" text NOT NULL,
      "stay_type" varchar(40) NOT NULL,
      "approved" boolean DEFAULT true NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contact_messages" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(120) NOT NULL,
      "email" varchar(160) NOT NULL,
      "phone" varchar(40),
      "subject" varchar(80) NOT NULL,
      "message" text NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  const [{ value: roomCount }] = await db.select({ value: count() }).from(rooms);
  if (Number(roomCount) === 0) {
    await db.insert(rooms).values(SEED_ROOMS).onConflictDoNothing();
  }

  const [{ value: reviewCount }] = await db.select({ value: count() }).from(reviews);
  if (Number(reviewCount) === 0) {
    await db.insert(reviews).values(SEED_REVIEWS);
  }

  const [{ value: bookingCount }] = await db.select({ value: count() }).from(bookings);
  if (Number(bookingCount) === 0) {
    const allRooms = await db.select({ id: rooms.id, slug: rooms.slug }).from(rooms);
    const byId = Object.fromEntries(allRooms.map((r) => [r.slug, r.id]));
    const seed = buildSeedBookings(byId);
    if (seed.length) await db.insert(bookings).values(seed).onConflictDoNothing();
  }
}
