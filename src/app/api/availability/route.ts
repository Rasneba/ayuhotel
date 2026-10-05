import { NextRequest } from "next/server";
import { normaliseStay, nightsBetween } from "@/lib/dates";
import { bundledAvailability, getAvailability } from "@/lib/queries";

export const dynamic = "force-dynamic";

function clampInt(value: string | null, min: number, max: number, fallback: number) {
  const n = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const { checkIn, checkOut } = normaliseStay(params.get("checkIn"), params.get("checkOut"));
  const adults = clampInt(params.get("adults"), 1, 8, 2);
  const children = clampInt(params.get("children"), 0, 6, 0);
  const promoCode = params.get("promo");

  try {
    const results = await getAvailability({
      checkIn,
      checkOut,
      guests: adults + children,
      promoCode,
    });
    return Response.json({
      checkIn,
      checkOut,
      nights: nightsBetween(checkIn, checkOut),
      adults,
      children,
      results,
    });
  } catch (error) {
    console.error("GET /api/availability — serving bundled rates", error);
    return Response.json({
      checkIn,
      checkOut,
      nights: nightsBetween(checkIn, checkOut),
      adults,
      children,
      offline: true,
      results: bundledAvailability({ checkIn, checkOut, guests: adults + children, promoCode }),
    });
  }
}
