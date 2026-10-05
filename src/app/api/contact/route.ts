import { NextRequest } from "next/server";
import { createContactMessage } from "@/lib/queries";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBJECTS = ["Reservations", "Weddings & Events", "Dining", "Spa & Wellness", "Corporate", "Other"];

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = str(body.name, 120);
  const email = str(body.email, 160).toLowerCase();
  const phone = str(body.phone, 40) || null;
  const subject = str(body.subject, 80);
  const message = str(body.message, 2000);

  // Honeypot for bots
  if (str(body.website, 10)) return Response.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!SUBJECTS.includes(subject)) errors.subject = "Please choose a subject.";
  if (message.length < 10) errors.message = "Please tell us a little more.";

  if (Object.keys(errors).length) {
    return Response.json({ error: "Please review the highlighted fields.", errors }, { status: 422 });
  }

  try {
    const saved = await createContactMessage({ name, email, phone, subject, message });
    return Response.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact", error);
    return Response.json({ error: "We could not send your message. Please try again." }, { status: 500 });
  }
}
