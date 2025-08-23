
import { db } from "$lib/server/db";
import { bookingSlot } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";


export async function GET({ params }) {
  const slot = await db.select().from(bookingSlot).where(eq(bookingSlot.id, Number(params.id)))
  return json(slot[0])
}


export async function PUT({ params, request }) {
  const slot = await request.json();
  const updated = await db.update(bookingSlot).set({
    customerName: slot.customerName,
    customerPhone: slot.customerPhone,
    status: slot.status ?? "booked"
  }).where(eq(bookingSlot.id, Number(params.id))).returning()
  return json(updated[0])
}


export async function DELETE({ params }) {
  await db.delete(bookingSlot).where(eq(bookingSlot.id, Number(params.id)));
  return new Response(null, { status: 204 })
}
