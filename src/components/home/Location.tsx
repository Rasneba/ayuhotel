import Image from "next/image";
import { HOTEL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Car, MapPin, Plane, Trees } from "@/components/ui/Icons";

const NEARBY = [
  { place: "Addis Ababa (Bole Airport)", distance: "95 km · about 45–60 min via the expressway", Icon: Plane },
  { place: "Adama city centre & Franco Square", distance: "1 km · a short walk or 5 min drive", Icon: Car },
  { place: "Adama Science & Technology University", distance: "6 km · 12 min", Icon: Car },
  { place: "Sodere Hot Springs", distance: "25 km · 30 min", Icon: Trees },
  { place: "Lake Beseka & Mount Fantale", distance: "60 km · about 1 hour", Icon: Trees },
  { place: "Awash National Park", distance: "120 km · about 2 hours", Icon: Trees },
];

export default function Location() {
  return (
    <section id="location" className="scroll-mt-24 bg-cream-100 py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start">
        <Reveal direction="left" className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-ink-900/10 bg-cream-200 shadow-[0_40px_80px_-40px_rgba(18,17,16,0.4)] sm:aspect-[16/11]">
            <iframe
              title={`Map showing ${HOTEL.name} in Adama, Ethiopia`}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="map-frame absolute inset-0 h-full w-full border-0"
            />
            <div className="glass-dark pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-2xl p-4 text-cream-50 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs sm:p-5">
              <p className="flex items-start gap-2 text-sm">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" />
                <span>
                  {HOTEL.address.street}
                  <br />
                  {HOTEL.address.city}, {HOTEL.address.region}, {HOTEL.address.country}
                </span>
              </p>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300 hover:text-gold-200"
              >
                Get directions <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-5 rounded-[1.5rem] border border-ink-900/10 bg-white p-5">
            <div className="img-zoom relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={IMG.statue}
                alt="The Aba Geda monument in Adama, close to Ayu International Hotel"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-700">On the doorstep</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                {HOTEL.address.landmark} — the fountain square where the city gathers, two minutes from the front
                door.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-4">
          <Reveal>
            <span className="eyebrow">Location</span>
            <h2 className="display-lg mt-5 text-ink-900">In the centre of Adama, on the road to the Rift Valley</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500 sm:text-base">
              Adama (Nazret) sits where the highlands fall away into the Great Rift Valley — an easy stop on the
              Addis Ababa to Djibouti road and a popular base for the hot springs at Sodere and the lakes beyond.
              The hotel is in Gurmu, in the middle of town, with its own private parking for guests arriving by car
              or minibus.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {NEARBY.map((n) => (
                <li key={n.place} className="flex items-center gap-4 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-gold-700 shadow-sm">
                    <n.Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{n.place}</p>
                    <p className="text-[12px] text-ink-500">{n.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="mt-7 rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5 text-sm text-ink-600">
            <p className="font-semibold text-ink-900">Arriving from the airport?</p>
            <p className="mt-1">
              Tell reception your flight details and the hotel will arrange a pick-up from Bole International
              Airport (a charge applies). Public minibuses and taxis from Adama&apos;s bus station also stop a few
              minutes&apos; walk from the gate.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
