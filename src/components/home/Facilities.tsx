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
  Globe,
  Plane,
  Pool,
  Shield,
  Snowflake,
  Spa,
  Sparkles,
  Trees,
  Users,
  Utensils,
  Wine,
  Wifi,
  type IconProps,
} from "@/components/ui/Icons";

type Facility = { name: string; detail: string; Icon: ComponentType<IconProps> };

const FACILITIES: Facility[] = [
  { name: "Outdoor Pool", detail: "In the garden, for house guests", Icon: Pool },
  { name: "Sauna", detail: "Separate men's and women's rooms", Icon: Spa },
  { name: "Massage", detail: "Booked through reception", Icon: Sparkles },
  { name: "Beauty Salon", detail: "On site, for guests and visitors", Icon: Sparkles },
  { name: "Gymnasium", detail: "Cardio and free weights", Icon: Dumbbell },
  { name: "Restaurant", detail: "Ethiopian and continental cooking", Icon: Utensils },
  { name: "Bar", detail: "Indoor bar and garden terrace", Icon: Wine },
  { name: "Conference Halls", detail: "Meetings, weddings and banquets", Icon: Users },
  { name: "24-hour Front Desk", detail: "Check-in at any hour", Icon: Bell },
  { name: "Airport Shuttle", detail: "Pick-up from Bole on request", Icon: Plane },
  { name: "Business Centre", detail: "Printing and meeting space", Icon: Briefcase },
  { name: "Free Wi-Fi", detail: "In the lobby and all rooms", Icon: Wifi },
  { name: "Free Parking", detail: "Private, secure parking on site", Icon: Car },
  { name: "Lift", detail: "To every guest floor", Icon: Elevator },
  { name: "Air Conditioning", detail: "In every room", Icon: Snowflake },
  { name: "Garden", detail: "Walled garden and walkways", Icon: Trees },
  { name: "Non-Smoking Rooms", detail: "Available on request", Icon: Shield },
  { name: "ATM", detail: "On the premises", Icon: Globe },
];

export default function Facilities() {
  return (
    <section id="facilities" className="scroll-mt-24 bg-cream-100 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Facilities & Services"
          title="Everything you need, on the property"
          description="Parking, restaurant, bar, conference halls, sauna, massage, beauty salon, gym, pool, lift, ATM, free Wi-Fi and a front desk that never closes."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.name} delay={(i % 6) * 60} className="h-full">
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
        <span id="events" className="block scroll-mt-28" />
        <Reveal direction="scale" className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 text-cream-50">
            <Image
              src={IMG.meetingHall}
              alt="Conference and banquet hall at Ayu International Hotel set with round tables"
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35" />
            <div className="relative grid gap-10 px-8 py-14 lg:grid-cols-12 lg:px-16 lg:py-20">
              <div className="lg:col-span-7">
                <span className="eyebrow">Meetings, weddings & events</span>
                <h3 className="display-lg mt-5">Conference & banquet halls</h3>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream-200/75">
                  Ayu Int Hotel is one of the established meeting addresses in Adama. Our halls are arranged to
                  suit the occasion — theatre or classroom layouts for conferences and training, and round-table
                  banquets for weddings, christenings and gala dinners. Catering, sound and a microphone come from
                  the hotel kitchen and team, and there is parking for delegates on site.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/#contact" className="btn-gold">
                    Plan an event
                  </Link>
                  <Link href="/#gallery" className="btn-outline-light">
                    See the halls
                  </Link>
                </div>
              </div>
              <div className="grid gap-6 self-end sm:grid-cols-3 lg:col-span-5">
                {[
                  { t: "Conferences", d: "Theatre and classroom set-ups" },
                  { t: "Weddings", d: "Round-table banquets and cake service" },
                  { t: "Catering", d: "Ethiopian and international menus" },
                ].map((s) => (
                  <div key={s.t} className="border-l border-gold-500/50 pl-4">
                    <p className="font-display text-2xl">{s.t}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-cream-200/60">{s.d}</p>
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
