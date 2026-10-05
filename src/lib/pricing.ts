import { daysUntil } from "./dates";

export const SERVICE_CHARGE_RATE = 0.1; // 10% service charge (standard in Ethiopia)
export const VAT_RATE = 0.15; // 15% VAT
export const LONG_STAY_MIN_NIGHTS = 4;
export const LONG_STAY_RATE = 0.1;

export type PromoDefinition = {
  code: string;
  label: string;
  rate: number;
  minNights?: number;
  minLeadDays?: number;
  description: string;
};

export const PROMO_CODES: Record<string, PromoDefinition> = {
  EARLYBIRD: {
    code: "EARLYBIRD",
    label: "Early Bird",
    rate: 0.15,
    minLeadDays: 30,
    description: "Save 15% when you book 30 or more days ahead.",
  },
  AYUWELCOME: {
    code: "AYUWELCOME",
    label: "Welcome Offer",
    rate: 0.1,
    description: "10% off your first stay with us.",
  },
  ROMANCE: {
    code: "ROMANCE",
    label: "Romance Escape",
    rate: 0.12,
    minNights: 2,
    description: "12% off stays of two nights or more.",
  },
  BUSINESS: {
    code: "BUSINESS",
    label: "Business Traveller",
    rate: 0.08,
    description: "8% off plus late check-out on request.",
  },
};

export type Quote = {
  nights: number;
  nightlyRateCents: number;
  roomTotalCents: number;
  discountLabel: string | null;
  discountCents: number;
  netRoomCents: number;
  serviceChargeCents: number;
  vatCents: number;
  totalCents: number;
  promo: { code: string; applied: boolean; message: string } | null;
};

export type PromoEvaluation =
  | { ok: true; definition: PromoDefinition }
  | { ok: false; code: string; message: string };

export function evaluatePromo(
  rawCode: string | null | undefined,
  nights: number,
  checkIn: string,
): PromoEvaluation | null {
  const code = (rawCode ?? "").trim().toUpperCase();
  if (!code) return null;
  const def = PROMO_CODES[code];
  if (!def) return { ok: false, code, message: "We don't recognise that code." };
  if (def.minNights && nights < def.minNights) {
    return {
      ok: false,
      code,
      message: `${def.label} requires a minimum of ${def.minNights} nights.`,
    };
  }
  if (def.minLeadDays && daysUntil(checkIn) < def.minLeadDays) {
    return {
      ok: false,
      code,
      message: `${def.label} is valid for arrivals ${def.minLeadDays}+ days from today.`,
    };
  }
  return { ok: true, definition: def };
}

export function buildQuote(input: {
  nightlyRateCents: number;
  nights: number;
  checkIn: string;
  promoCode?: string | null;
}): Quote {
  const { nightlyRateCents, nights, checkIn } = input;
  const roomTotalCents = nightlyRateCents * nights;

  const candidates: Array<{ label: string; rate: number; source: "stay" | "promo" }> = [];
  if (nights >= LONG_STAY_MIN_NIGHTS) {
    candidates.push({
      label: `Long Stay Offer (−${Math.round(LONG_STAY_RATE * 100)}%)`,
      rate: LONG_STAY_RATE,
      source: "stay",
    });
  }

  const promoEval = evaluatePromo(input.promoCode, nights, checkIn);
  if (promoEval?.ok) {
    candidates.push({
      label: `${promoEval.definition.label} · ${promoEval.definition.code} (−${Math.round(
        promoEval.definition.rate * 100,
      )}%)`,
      rate: promoEval.definition.rate,
      source: "promo",
    });
  }

  const best = candidates.sort((a, b) => b.rate - a.rate)[0] ?? null;
  const discountCents = best ? Math.round(roomTotalCents * best.rate) : 0;
  const netRoomCents = roomTotalCents - discountCents;
  const serviceChargeCents = Math.round(netRoomCents * SERVICE_CHARGE_RATE);
  const vatCents = Math.round((netRoomCents + serviceChargeCents) * VAT_RATE);
  const totalCents = netRoomCents + serviceChargeCents + vatCents;

  let promo: Quote["promo"] = null;
  if (promoEval) {
    if (!promoEval.ok) {
      promo = { code: promoEval.code, applied: false, message: promoEval.message };
    } else if (best?.source === "promo") {
      promo = {
        code: promoEval.definition.code,
        applied: true,
        message: `${promoEval.definition.label} applied — you save ${formatMoney(discountCents)}.`,
      };
    } else {
      promo = {
        code: promoEval.definition.code,
        applied: false,
        message: "Our Long Stay Offer already gives you a better rate.",
      };
    }
  }

  return {
    nights,
    nightlyRateCents,
    roomTotalCents,
    discountLabel: best?.label ?? null,
    discountCents,
    netRoomCents,
    serviceChargeCents,
    vatCents,
    totalCents,
    promo,
  };
}

const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const usdExact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(cents: number): string {
  return cents % 100 === 0 ? usdWhole.format(cents / 100) : usdExact.format(cents / 100);
}
