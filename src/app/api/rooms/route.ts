import { fallbackRooms } from "@/db/seed-data";
import { getRooms } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rooms = await getRooms();
    if (!rooms.length) throw new Error("no rooms in database");
    return Response.json({ rooms });
  } catch (error) {
    console.error("GET /api/rooms — serving bundled rooms", error);
    return Response.json({ offline: true, rooms: fallbackRooms() });
  }
}
