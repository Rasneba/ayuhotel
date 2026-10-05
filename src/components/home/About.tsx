import Image from "next/image";
import Link from "next/link";
import { HOTEL } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

const STATS = [
  { value: HOTEL.roomCount, suffix: "", label: "Rooms & suites" },
  { value: new Date().getFullYear() - HOTEL.founded, suffix: "+", label: "Years of hospitality" },
  { value: HOTEL.rating, decimals: 1, suffix: "", label: "Guest rating" },
  { value: 400, suffix: "", label: "Banquet capacity" },
];

const MARQUEE = [
  "Outdoor Pool",
  "Sauna & Steam",
  "Sabisa Restaurant",
  "Abyssinia Ballroom",
  "24-hour Front Desk",
  "Airport Shuttle",
  "Business Centre",
  "Botanical Gardens",
  "Ayu Wellness Spa",
  "Free Parking",
  "High-speed Wi-Fi",
  "Buna Lounge",
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream-50 py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        {/* Collage */}
        <div className="relative lg:col-span-6">
          <Reveal direction="left" className="relative mb-12 lg:mb-0">
            <div className="img-zoom relative aspect-[4/5] w-[78%] overflow-hidden rounded-[2rem]">
              <Image
                src={IMG.lobbyDesk}
                alt="Reception desk at Ayu International Hotel"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="img-zoom absolute -bottom-10 right-0 aspect-[4/3] w-[55%] overflow-hidden rounded-[1.5rem] border-[6px] border-cream-50 shadow-[0_40px_80px_-30px_rgba(18,17,16,0.45)]">
              <Image
                src={IMG.terraceSunset}
                alt="Sunset terrace lounge"
                fill
                sizes="(min-width: 1024px) 28vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-3 top-8 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-ink-900 text-cream-50 shadow-xl animate-float sm:-left-6 sm:h-32 sm:w-32">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400">Since</span>
              <span className="font-display text-3xl font-semibold leading-none sm:text-4xl">{HOTEL.founded}</span>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <span className="eyebrow">About Ayu</span>
            <h2 className="display-lg mt-5 text-ink-900">
              A landmark of Ethiopian hospitality,
              <br className="hidden sm:block" /> reimagined for today
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-500 sm:text-base">
            <p>
              Set at the gateway to the Great Rift Valley, {HOTEL.name} has welcomed diplomats,
              business leaders and travelling families to Adama since {HOTEL.founded}. Behind its
              contemporary façade lies a philosophy rooted in Ethiopian generosity: every guest is
              received as an honoured visitor to the family home.
            </p>
            <p>
              Today the hotel unites {HOTEL.roomCount} rooms and suites, a palm-fringed pool, three
              dining venues, a sanctuary spa and the region&apos;s most sought-after ballroom — all a
              short drive from Addis Ababa via the expressway, and moments from Adama&apos;s vibrant
              centre.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-gold-500/40 pl-4">
                <p className="font-display text-4xl font-medium text-ink-900">
                  <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={260} className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/#facilities" className="btn-outline-dark">
              Discover the hotel
            </Link>
            <Link href="/#gallery" className="link-underline inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-900">
              View gallery <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Amenity marquee */}
      <div className="mt-24 border-y border-ink-900/10 bg-cream-100 py-5">
        <div className="flex overflow-hidden">
          <div className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-500">
                {item}
                <span className="h-1 w-1 rounded-full bg-gold-500" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
