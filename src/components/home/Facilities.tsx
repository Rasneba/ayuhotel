import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Bell,
  Briefcase,
  Car,
  Concierge,
  Dumbbell,
  Elevator,
  Plane,
  Pool,
  Shield,
  Snowflake,
  Spa,
  Sparkles,
  Trees,
  Users,
  Wifi,
  type IconProps,
} from "@/components/ui/Icons";

type Facility = { name: string; detail: string; Icon: ComponentType<IconProps> };

const FACILITIES: Facility[] = [
  { name: "Outdoor Pool", detail: "Heated, palm-lined, open 7 AM – 10 PM", Icon: Pool },
  { name: "Sauna & Steam", detail: "Complimentary for all house guests", Icon: Spa },
  { name: "Fitness Centre", detail: "24 hours, Technogym equipment", Icon: Dumbbell },
  { name: "24-hour Front Desk", detail: "Concierge, luggage & currency exchange", Icon: Concierge },
  { name: "Airport Shuttle", detail: "Bole International — 75 minutes", Icon: Plane },
  { name: "Business Centre", detail: "Printing, meeting pods, secretarial", Icon: Briefcase },
  { name: "Meetings & Banquets", detail: "Ballroom for 400, four breakout rooms", Icon: Users },
  { name: "Botanical Gardens", detail: "Two hectares of acacia & jacaranda", Icon: Trees },
  { name: "Free Parking", detail: "Secure, covered, EV charging", Icon: Car },
  { name: "High-speed Wi-Fi", detail: "Fibre throughout, free of charge", Icon: Wifi },
  { name: "Lifts & Accessibility", detail: "Step-free access, adapted rooms", Icon: Elevator },
  { name: "Climate Control", detail: "Individually controlled in every room", Icon: Snowflake },
  { name: "Room Service", detail: "Around the clock, 30-minute promise", Icon: Bell },
  { name: "Laundry & Pressing", detail: "Same-day return before 10 AM", Icon: Sparkles },
  { name: "Security", detail: "24/7 patrols, CCTV, in-room safes", Icon: Shield },
];

export default function Facilities() {
  return (
    <section id="facilities" className="scroll-mt-24 bg-cream-100 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Facilities & Services"
          title="Everything considered, nothing overlooked"
          description="From the moment our shuttle meets you at Bole to the last espresso before departure, every service is designed to make Adama feel effortless."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.name} delay={(i % 5) * 70} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-ink-900/10 bg-white p-5 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_30px_60px_-30px_rgba(18,17,16,0.3)]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cream-100 text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <f.Icon size={20} />
                </span>
                <p className="mt-4 font-display text-lg leading-tight text-ink-900">{f.name}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">{f.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Events feature */}
        <Reveal direction="scale" className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 text-cream-50">
            <Image
              src={IMG.eventChandeliers}
              alt="Abyssinia Ballroom set for a gala dinner"
              fill
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
            <div className="relative grid gap-10 px-8 py-14 lg:grid-cols-12 lg:px-16 lg:py-20">
              <div className="lg:col-span-7">
                <span className="eyebrow">Meetings, weddings & events</span>
                <h3 className="display-lg mt-5">The Abyssinia Ballroom</h3>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200/75">
                  A pillar-free hall for up to 400 guests, four daylight breakout rooms and a garden pavilion for
                  ceremonies under the jacarandas. Our events team handles everything from floral design to
                  simultaneous translation.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/#contact" className="btn-gold">
                    Plan an event
                  </Link>
                  <Link href="/#gallery" className="btn-outline-light">
                    See the venues
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 self-end lg:col-span-5">
                {[
                  { v: "400", l: "Banquet guests" },
                  { v: "650 m²", l: "Pillar-free floor" },
                  { v: "4", l: "Breakout rooms" },
                ].map((s) => (
                  <div key={s.l} className="border-l border-gold-500/50 pl-4">
                    <p className="font-display text-3xl sm:text-4xl">{s.v}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-200/60">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
