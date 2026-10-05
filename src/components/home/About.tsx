import Image from "next/image";
import Link from "next/link";
import { HOTEL } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

const STATS = [
  { value: new Date().getFullYear() - HOTEL.founded, suffix: "+", label: "Years in Adama" },
  { value: 6, suffix: "", label: "Room & suite types" },
  { value: 24, suffix: "h", label: "Front desk & security" },
  { value: 45, suffix: " min", label: "From Addis by expressway" },
];

const MARQUEE = [
  "Outdoor Swimming Pool",
  "Garden Restaurant & Bar",
  "Conference & Banquet Halls",
  "24-hour Front Desk",
  "Sauna",
  "Massage & Beauty Salon",
  "Gymnasium",
  "Free Wi-Fi",
  "Free Private Parking",
  "Lift to All Floors",
  "Air Conditioning",
  "Non-Smoking Rooms",
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
                src={IMG.entrance}
                alt="Entrance canopy of Ayu International Hotel"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="img-zoom absolute -bottom-10 right-0 aspect-[4/3] w-[55%] overflow-hidden rounded-[1.5rem] border-[6px] border-cream-50 shadow-[0_40px_80px_-30px_rgba(18,17,16,0.45)]">
              <Image
                src={IMG.lawn}
                alt="Garden lawn and walkways at the hotel"
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
            <span className="eyebrow">About Ayu Int Hotel</span>
            <h2 className="display-lg mt-5 text-ink-900">
              At the centre of Adama,
              <br className="hidden sm:block" /> a garden to come home to
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-500 sm:text-base">
            <p>
              {HOTEL.name} has welcomed guests to {HOTEL.address.city} since {HOTEL.founded}. It stands beside the
              Aba Geda monument in the Gurmu area of town — close to the businesses and government offices of the
              city centre, yet set back behind its own walled garden.
            </p>
            <p>
              Inside you will find {`single, double, twin and deluxe rooms`} alongside family rooms and an
              executive suite, all with air conditioning, satellite television, refrigerator and en-suite hot
              water. Outside, a paved garden path leads past the fountain to the swimming pool, the restaurant and
              the bar — with private parking for guests arriving by car.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-gold-500/40 pl-4">
                <p className="font-display text-4xl font-medium text-ink-900">
                  <CountUp value={s.value} suffix={s.suffix} />
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
