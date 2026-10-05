import type { Metadata } from "next";
import { fallbackRooms } from "@/db/seed-data";
import { getRooms } from "@/lib/queries";
import { parseStaySearch } from "@/lib/stay";
import BookingFlow from "@/components/booking/BookingFlow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Check live availability, compare rooms and suites, and reserve your stay at Ayu International Hotel, Adama. Best rate guaranteed when you book direct.",
  robots: { index: false, follow: true },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = parseStaySearch(params);
  const rooms = await getRooms().catch(() => fallbackRooms());

  return (
    <main id="main" className="min-h-screen bg-cream-100 pb-24 pt-28 lg:pt-36">
      <BookingFlow rooms={rooms} initialSearch={search} />
    </main>
  );
}
