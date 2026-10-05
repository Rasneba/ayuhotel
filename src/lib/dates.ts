const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

const pad = (n: number) => String(n).padStart(2, "0");

/** Local-time YYYY-MM-DD (avoids UTC off-by-one issues). */
export function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): string {
  return toISO(new Date());
}

export function addDays(iso: string, days: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + days);
  return toISO(d);
}

export function isISODate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_RE.test(value)) return false;
  const d = parseISO(value);
  return !Number.isNaN(d.getTime()) && toISO(d) === value;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = parseISO(checkOut).getTime() - parseISO(checkIn).getTime();
  return Math.round(ms / 86_400_000);
}

export function daysUntil(iso: string): number {
  return nightsBetween(todayISO(), iso);
}

export function formatDate(
  iso: string,
  style: "long" | "short" | "weekday" | "compact" = "long",
): string {
  const d = parseISO(iso);
  const opts: Intl.DateTimeFormatOptions =
    style === "long"
      ? { weekday: "short", day: "numeric", month: "long", year: "numeric" }
      : style === "weekday"
        ? { weekday: "long", day: "numeric", month: "long" }
        : style === "compact"
          ? { day: "numeric", month: "short" }
          : { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", opts).format(d);
}

/** Normalises arbitrary query input into a valid stay window. */
export function normaliseStay(
  checkIn: unknown,
  checkOut: unknown,
): { checkIn: string; checkOut: string } {
  const today = todayISO();
  let ci = isISODate(checkIn) && checkIn >= today ? checkIn : addDays(today, 1);
  let co = isISODate(checkOut) ? checkOut : addDays(ci, 2);
  if (co <= ci) co = addDays(ci, 1);
  if (nightsBetween(ci, co) > 30) co = addDays(ci, 30);
  if (ci < today) ci = today;
  return { checkIn: ci, checkOut: co };
}
