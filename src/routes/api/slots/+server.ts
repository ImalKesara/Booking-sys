import { db } from "$lib/server/db";
import { bookingSlot } from "$lib/server/db/schema";
import { generateRandomHex } from "$lib/utils";
import { json } from "@sveltejs/kit";

export async function GET() {
  const slots = await db.select().from(bookingSlot)
  return json(slots)
  // return new Response(
  //   JSON.stringify(slots),
  //   {
  //     headers: { 'Content-Type': 'application/json; charset=utf-8' },
  //     status: 200
  //   }
  // )
}


export async function POST({ request }) {
  const data = await request.json()
  const result = await db.insert(bookingSlot).values({
    bookingCode: generateRandomHex(),
    starts: new Date(data.starts),
    ends: new Date(data.starts),
    status: "available"
  }).returning()

  console.log(result)

  return json(result[0]);
}
