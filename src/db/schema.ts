import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(),
  tagline: varchar("tagline", { length: 200 }).notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  maxGuests: integer("max_guests").notNull(),
  sizeSqm: integer("size_sqm").notNull(),
  bedType: varchar("bed_type", { length: 80 }).notNull(),
  view: varchar("view", { length: 80 }).notNull(),
  amenities: jsonb("amenities").$type<string[]>().notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  totalUnits: integer("total_units").notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 20 }).notNull().unique(),
  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id),
  guestName: varchar("guest_name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  country: varchar("country", { length: 80 }),
  checkIn: date("check_in", { mode: "string" }).notNull(),
  checkOut: date("check_out", { mode: "string" }).notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull().default(0),
  nights: integer("nights").notNull(),
  nightlyRateCents: integer("nightly_rate_cents").notNull(),
  roomTotalCents: integer("room_total_cents").notNull(),
  discountLabel: varchar("discount_label", { length: 120 }),
  discountCents: integer("discount_cents").notNull().default(0),
  serviceChargeCents: integer("service_charge_cents").notNull(),
  vatCents: integer("vat_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  promoCode: varchar("promo_code", { length: 40 }),
  specialRequests: text("special_requests"),
  status: varchar("status", { length: 20 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  guestName: varchar("guest_name", { length: 120 }).notNull(),
  country: varchar("country", { length: 80 }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  body: text("body").notNull(),
  stayType: varchar("stay_type", { length: 40 }).notNull(),
  approved: boolean("approved").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 80 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
