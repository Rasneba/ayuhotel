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
    description: "Plan your stay a month ahead and take 15% off the room rate.",
    perks: ["15% off the room rate", "Free cancellation up to 48 hours", "No payment today"],
    code: "EARLYBIRD",
    href: "/booking?promo=EARLYBIRD",
    image: IMG.exterior,
    terms: "Valid for arrivals 30 or more days from the booking date.",
  },
  {
    title: "Long Stay",
    tag: "Stay 4+, save 10%",
    description: "Four nights or more and the discount is applied automatically at checkout.",
    perks: ["10% off applied automatically", "Same room for the whole stay", "Late check-out on request"],
    code: null,
    href: "/booking",
    image: IMG.roomDouble,
    terms: "No code needed — calculated for stays of four nights or more.",
  },
  {
    title: "Welcome Offer",
    tag: "Save 10%",
    description: "A first-stay discount for guests booking directly with the hotel.",
    perks: ["10% off the room rate", "Best rate when you book direct", "Free Wi-Fi and parking"],
    code: "AYUWELCOME",
    href: "/booking?promo=AYUWELCOME",
    image: IMG.pool,
    terms: "One use per guest. Subject to availability.",
  },
  {
    title: "Business Traveller",
    tag: "Save 8%",
    description: "For guests travelling on company business, with meeting rooms close at hand.",
    perks: ["8% off the room rate", "Late check-out on request", "Priority use of the business centre"],
    code: "BUSINESS",
    href: "/booking?promo=BUSINESS&room=executive-suite",
    image: IMG.roomDeluxe,
    terms: "Company identification may be requested at check-in.",
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
          title="Book direct with the hotel"
          description="Reserving with us rather than through an agent means the best available rate, free cancellation and a room allocated by the people who know the building best."
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
