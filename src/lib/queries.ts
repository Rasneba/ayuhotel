import { and, asc, count, desc, eq, gt, lt, ne, sql } from "drizzle-orm";
import { randomInt } from "node:crypto";
import { db } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import {
  bookings,
  contactMessages,
  reviews,
  rooms,
  type Booking,
  type NewReview,
  type Review,
  type Room,
} from "@/db/schema";
import { nightsBetween } from "./dates";
import { buildQuote, type Quote } from "./pricing";

export type RoomAvailability = {
  room: Room;
  availableUnits: number;
  fitsGuests: boolean;
  quote: Quote;
};

export async function getRooms(): Promise<Room[]> {
  await ensureDatabase();
  return db.select().from(rooms).orderBy(asc(rooms.sortOrder));
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  await ensureDatabase();
  const [room] = await db.select().from(rooms).where(eq(rooms.slug, slug)).limit(1);
  return room ?? null;
}

/** Map of roomId -> number of units already booked for any night in the window. */
export async function getBookedUnits(
  checkIn: string,
  checkOut: string,
): Promise<Map<number, number>> {
  const rows = await db
    .select({ roomId: bookings.roomId, booked: count() })
    .from(bookings)
    .where(
      and(
        ne(bookings.status, "cancelled"),
        lt(bookings.checkIn, checkOut),
        gt(bookings.checkOut, checkIn),
      ),
    )
    .groupBy(bookings.roomId);
  return new Map(rows.map((r) => [r.roomId, Number(r.booked)]));
}

export async function getAvailability(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
  promoCode?: string | null;
}): Promise<RoomAvailability[]> {
  await ensureDatabase();
  const { checkIn, checkOut, guests, promoCode } = params;
  const nights = nightsBetween(checkIn, checkOut);
  const [allRooms, booked] = await Promise.all([
    getRooms(),
    getBookedUnits(checkIn, checkOut),
  ]);

  return allRooms.map((room) => ({
    room,
    availableUnits: Math.max(0, room.totalUnits - (booked.get(room.id) ?? 0)),
    fitsGuests: room.maxGuests >= guests,
    quote: buildQuote({
      nightlyRateCents: room.priceCents,
      nights,
      checkIn,
      promoCode,
    }),
  }));
}

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateReference(): string {
  let out = "";
  for (let i = 0; i < 6; i += 1) out += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  return `AYU-${out}`;
}

export class BookingError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function createBooking(input: {
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guestName: string;
  email: string;
  phone: string;
  country?: string | null;
  specialRequests?: string | null;
  promoCode?: string | null;
}): Promise<{ reference: string; booking: Booking; room: Room }> {
  await ensureDatabase();
  const room = await getRoomBySlug(input.roomSlug);
  if (!room) throw new BookingError("Selected room could not be found.", 404);

  const guests = input.adults + input.children;
  if (guests > room.maxGuests) {
    throw new BookingError(`${room.name} accommodates up to ${room.maxGuests} guests.`);
  }

  const nights = nightsBetween(input.checkIn, input.checkOut);
  const quote = buildQuote({
    nightlyRateCents: room.priceCents,
    nights,
    checkIn: input.checkIn,
    promoCode: input.promoCode,
  });

  return db.transaction(async (tx) => {
    // Serialise concurrent bookings for the same room type.
    await tx.execute(sql`SELECT pg_advisory_xact_lock(${room.id})`);

    const [row] = await tx
      .select({ booked: count() })
      .from(bookings)
      .where(
        and(
          eq(bookings.roomId, room.id),
          ne(bookings.status, "cancelled"),
          lt(bookings.checkIn, input.checkOut),
          gt(bookings.checkOut, input.checkIn),
        ),
      );
    const bookedUnits = Number(row?.booked ?? 0);
    if (bookedUnits >= room.totalUnits) {
      throw new BookingError(
        `${room.name} is fully booked for the selected dates. Please choose different dates or another room.`,
        409,
      );
    }

    let reference = generateReference();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const [existing] = await tx
        .select({ id: bookings.id })
        .from(bookings)
        .where(eq(bookings.reference, reference))
        .limit(1);
      if (!existing) break;
      reference = generateReference();
    }

    const [booking] = await tx
      .insert(bookings)
      .values({
        reference,
        roomId: room.id,
        guestName: input.guestName,
        email: input.email,
        phone: input.phone,
        country: input.country ?? null,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        adults: input.adults,
        children: input.children,
        nights,
        nightlyRateCents: quote.nightlyRateCents,
        roomTotalCents: quote.roomTotalCents,
        discountLabel: quote.discountLabel,
        discountCents: quote.discountCents,
        serviceChargeCents: quote.serviceChargeCents,
        vatCents: quote.vatCents,
        totalCents: quote.totalCents,
        promoCode: quote.promo?.applied ? quote.promo.code : null,
        specialRequests: input.specialRequests ?? null,
        status: "confirmed",
      })
      .returning();

    return { reference, booking, room };
  });
}

export async function getBookingByReference(
  reference: string,
): Promise<{ booking: Booking; room: Room } | null> {
  await ensureDatabase();
  const [row] = await db
    .select({ booking: bookings, room: rooms })
    .from(bookings)
    .innerJoin(rooms, eq(bookings.roomId, rooms.id))
    .where(eq(bookings.reference, reference.toUpperCase()))
    .limit(1);
  return row ?? null;
}

export async function getReviews(limit = 12): Promise<Review[]> {
  await ensureDatabase();
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.approved, true))
    .orderBy(desc(reviews.createdAt))
    .limit(limit);
}

export async function getReviewStats(): Promise<{ average: number; total: number }> {
  await ensureDatabase();
  const [row] = await db
    .select({
      average: sql<string>`coalesce(avg(${reviews.rating}), 0)`,
      total: count(),
    })
    .from(reviews)
    .where(eq(reviews.approved, true));
  return { average: Number(row?.average ?? 0), total: Number(row?.total ?? 0) };
}

export async function createReview(input: NewReview): Promise<Review> {
  await ensureDatabase();
  const [review] = await db.insert(reviews).values(input).returning();
  return review;
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  await ensureDatabase();
  const [row] = await db.insert(contactMessages).values(input).returning();
  return row;
}
