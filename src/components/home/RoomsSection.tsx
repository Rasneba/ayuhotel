import Link from "next/link";
import type { Room } from "@/db/schema";
import RoomCard from "@/components/rooms/RoomCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

export default function RoomsSection({ rooms }: { rooms: Room[] }) {
  return (
    <section id="rooms" className="scroll-mt-24 bg-cream-100 py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Rooms & Suites"
            title="Rooms for resting, working and travelling together"
            description="Every room is air-conditioned, with satellite television, a refrigerator, an in-room safe and en-suite hot water. Choose the bed that suits your trip — singles, doubles, twins, family rooms or the executive suite."
          />
          <Reveal delay={150} className="shrink-0">
            <Link href="/rooms" className="link-underline inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-900">
              Compare all rooms <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={(i % 3) * 110} className="h-full">
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
