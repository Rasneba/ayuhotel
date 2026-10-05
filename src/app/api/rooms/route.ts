import { getRooms } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rooms = await getRooms();
    return Response.json({ rooms });
  } catch (error) {
    console.error("GET /api/rooms", error);
    return Response.json({ error: "Unable to load rooms." }, { status: 500 });
  }
}
