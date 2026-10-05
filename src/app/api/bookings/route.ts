import { NextRequest } from "next/server";
import { isISODate, nightsBetween, todayISO } from "@/lib/dates";
import { BookingError, createBooking, getBookingByReference } from "@/lib/queries";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  roomSlug?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  adults?: unknown;
  children?: unknown;
  guestName?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  specialRequests?: unknown;
  promoCode?: unknown;
};

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v: unknown, fallback: number) => {
  const n = typeof v === "number" ? v : Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
};

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const roomSlug = str(body.roomSlug, 80);
  const checkIn = str(body.checkIn, 10);
  const checkOut = str(body.checkOut, 10);
  const adults = int(body.adults, 0);
  const children = int(body.children, 0);
  const guestName = str(body.guestName, 120);
  const email = str(body.email, 160).toLowerCase();
  const phone = str(body.phone, 40);
  const country = str(body.country, 80) || null;
  const specialRequests = str(body.specialRequests, 1000) || null;
  const promoCode = str(body.promoCode, 40).toUpperCase() || null;

  const errors: Record<string, string> = {};
  if (!roomSlug) errors.roomSlug = "Please select a room.";
  if (!isISODate(checkIn) || checkIn < todayISO()) errors.checkIn = "Check-in must be today or later.";
  if (!isISODate(checkOut) || !isISODate(checkIn) || checkOut <= checkIn) {
    errors.checkOut = "Check-out must be after check-in.";
  } else if (nightsBetween(checkIn, checkOut) > 30) {
    errors.checkOut = "For stays over 30 nights please contact reservations.";
  }
  if (adults < 1 || adults > 8) errors.adults = "Please enter between 1 and 8 adults.";
  if (children < 0 || children > 6) errors.children = "Please enter between 0 and 6 children.";
  if (guestName.length < 2) errors.guestName = "Please enter the lead guest's full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";

  if (Object.keys(errors).length) {
    return Response.json({ error: "Please review the highlighted fields.", errors }, { status: 422 });
  }

  try {
    const { reference, booking, room } = await createBooking({
      roomSlug,
      checkIn,
      checkOut,
      adults,
      children,
      guestName,
      email,
      phone,
      country,
      specialRequests,
      promoCode,
    });
    return Response.json(
      { reference, booking, room: { slug: room.slug, name: room.name } },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof BookingError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("POST /api/bookings", error);
    return Response.json(
      {
        error:
          "Online booking is temporarily unavailable. Please call +251 91 149 1500 or message us on WhatsApp and reception will reserve your room straight away.",
      },
      { status: 503 },
    );
  }
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference")?.trim();
  if (!reference) return Response.json({ error: "Reference is required." }, { status: 400 });
  try {
    const result = await getBookingByReference(reference);
    if (!result) return Response.json({ error: "Booking not found." }, { status: 404 });
    return Response.json(result);
  } catch (error) {
    console.error("GET /api/bookings", error);
    return Response.json({ error: "Unable to load this booking at the moment." }, { status: 503 });
  }
}
