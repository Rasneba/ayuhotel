"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check, Copy } from "@/components/ui/Icons";

type Offer = {
  title: string;
  tag: string;
  description: string;
  perks: string[];
  code: string | null;
  href: string;
  image: string;
  terms: string;
};

const OFFERS: Offer[] = [
  {
    title: "Early Bird",
    tag: "Save 15%",
    description: "Plan ahead and enjoy our best flexible rate on every room and suite.",
    perks: ["15% off the flexible rate", "Breakfast for two included", "Free cancellation up to 48h"],
    code: "EARLYBIRD",
    href: "/booking?promo=EARLYBIRD",
    image: IMG.heroMountain,
    terms: "Valid for arrivals 30+ days from booking date.",
  },
  {
    title: "Long Stay",
    tag: "Stay 4+, save 10%",
    description: "Settle in. Four nights or more unlocks an automatic 10% saving and extra comforts.",
    perks: ["10% applied automatically", "Complimentary pressing, 2 items daily", "Late check-out on request"],
    code: null,
    href: "/booking",
    image: IMG.roomDeluxe,
    terms: "No code needed — applied at checkout for 4+ nights.",
  },
  {
    title: "Romance Escape",
    tag: "Save 12%",
    description: "Rose-petal turndown, a candlelit dinner on the Terrace and a couples' sunset ritual.",
    perks: ["Candlelit three-course dinner", "60-minute couples' massage", "Sparkling wine on arrival"],
    code: "ROMANCE",
    href: "/booking?promo=ROMANCE&room=executive-suite",
    image: IMG.terraceSunset,
    terms: "Minimum two nights. Subject to availability.",
  },
  {
    title: "Business Traveller",
    tag: "Save 8%",
    description: "Seamless stays for working guests, with transfers and lounge privileges built in.",
    perks: ["Airport transfer one-way", "Executive Lounge access", "Guaranteed 4 PM check-out"],
    code: "BUSINESS",
    href: "/booking?promo=BUSINESS&room=executive-suite",
    image: IMG.lobbyHall,
    terms: "Corporate ID may be requested at check-in.",
  },
];

function CodeChip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy promo code ${code}`}
      className="inline-flex items-center gap-2 rounded-full border border-dashed border-gold-600/60 bg-gold-100/60 px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.2em] text-gold-700 transition-colors hover:bg-gold-200/70"
    >
      {code}
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function Offers() {
  return (
    <section id="offers" className="scroll-mt-24 bg-cream-50 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Special Offers"
          title="Thoughtfully curated stays"
          description="Direct bookings always receive our best available rate. Apply a code at checkout, or let our long-stay saving find you automatically."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.title} delay={(i % 2) * 120} className="h-full">
              <article className="card-hover group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white sm:flex-row">
                <div className="img-zoom relative aspect-[4/3] sm:aspect-auto sm:w-[42%]">
                  <Image src={offer.image} alt={offer.title} fill sizes="(min-width:768px) 22vw, 92vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-lg">
                    {offer.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-2xl text-ink-900">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{offer.description}</p>
                  <ul className="mt-4 space-y-2">
                    {offer.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] text-ink-600">
                        <Check size={14} className="mt-0.5 shrink-0 text-gold-600" /> {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[11px] text-ink-400">{offer.terms}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    {offer.code ? (
                      <CodeChip code={offer.code} />
                    ) : (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">Automatic</span>
                    )}
                    <Link href={offer.href} className="link-underline inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-900">
                      Book this offer <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
