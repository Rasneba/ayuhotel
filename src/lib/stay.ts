import { normaliseStay } from "./dates";

export type StaySearch = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: string; // room slug or "" for any
  promo: string;
};

type RawParams = Record<string, string | string[] | undefined> | URLSearchParams;

function read(params: RawParams, key: string): string | undefined {
  if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
  const v = params[key];
  return Array.isArray(v) ? v[0] : v;
}

function clampInt(value: string | undefined, min: number, max: number, fallback: number) {
  const n = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function parseStaySearch(params: RawParams): StaySearch {
  const { checkIn, checkOut } = normaliseStay(read(params, "checkIn"), read(params, "checkOut"));
  return {
    checkIn,
    checkOut,
    adults: clampInt(read(params, "adults"), 1, 8, 2),
    children: clampInt(read(params, "children"), 0, 6, 0),
    room: (read(params, "room") ?? "").slice(0, 80),
    promo: (read(params, "promo") ?? "").toUpperCase().slice(0, 40),
  };
}

export function staySearchToQuery(s: Partial<StaySearch>): string {
  const q = new URLSearchParams();
  if (s.checkIn) q.set("checkIn", s.checkIn);
  if (s.checkOut) q.set("checkOut", s.checkOut);
  if (s.adults) q.set("adults", String(s.adults));
  if (s.children !== undefined) q.set("children", String(s.children));
  if (s.room) q.set("room", s.room);
  if (s.promo) q.set("promo", s.promo);
  return q.toString();
}
