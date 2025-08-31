import { db } from '$lib/server/db';
import { bookingSlot } from '$lib/server/db/schema';
import { generateRandomHex } from '$lib/server/utils';
import { json } from '@sveltejs/kit';

export async function GET() {
	const slots = await db.select().from(bookingSlot).orderBy(bookingSlot.starts);
	return json(slots);
}

export async function POST({ request }) {
	const data = await request.json();
	const result = await db
		.insert(bookingSlot)
		.values({
			bookingCode: generateRandomHex(),
			starts: new Date(data.starts),
			ends: new Date(data.starts),
			status: 'available'
		})
		.returning();
	return json(result[0]);
}
