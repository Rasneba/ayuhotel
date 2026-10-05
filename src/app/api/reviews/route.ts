import { NextRequest } from "next/server";
import { createReview, getReviewStats, getReviews } from "@/lib/queries";

export const dynamic = "force-dynamic";

const STAY_TYPES = ["Business", "Couple", "Family", "Solo", "Event"];

export async function GET() {
  try {
    const [list, stats] = await Promise.all([getReviews(24), getReviewStats()]);
    return Response.json({ reviews: list, stats });
  } catch (error) {
    console.error("GET /api/reviews", error);
    return Response.json({ error: "Unable to load reviews." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const guestName = str(body.guestName, 120);
  const country = str(body.country, 80);
  const title = str(body.title, 160);
  const text = str(body.body, 1200);
  const stayType = str(body.stayType, 40);
  const rating = Number(body.rating);

  const errors: Record<string, string> = {};
  if (guestName.length < 2) errors.guestName = "Please tell us your name.";
  if (country.length < 2) errors.country = "Please add your country.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Please choose a rating.";
  if (title.length < 3) errors.title = "Please add a short headline.";
  if (text.length < 20) errors.body = "Please share at least a sentence or two.";
  if (!STAY_TYPES.includes(stayType)) errors.stayType = "Please choose a stay type.";

  if (Object.keys(errors).length) {
    return Response.json({ error: "Please review the highlighted fields.", errors }, { status: 422 });
  }

  try {
    const review = await createReview({ guestName, country, rating, title, body: text, stayType });
    return Response.json({ review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews", error);
    return Response.json({ error: "We could not save your review. Please try again." }, { status: 500 });
  }
}
