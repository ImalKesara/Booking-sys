
import { db } from "$lib/server/db";
import { bookingSlot } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
export async function POST({ params }) {
  const cleared = await db.update(bookingSlot).set({
    customerName: null,
    customerPhone: null,
    status: "available",
  }).where(eq(bookingSlot.id, Number(params.id))).returning()

  return json(cleared[0])
}
