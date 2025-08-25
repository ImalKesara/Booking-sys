import { generateRandomHex } from '../utils.ts';
import { db } from './index.ts';
import { bookingSlot, type BookingStatus } from './schema.ts';


async function seed() {
  const now = new Date();
  const startHour = 9;
  const endHour = 17;
  const slotDurationMinutes = 30;


  const slots: {
    bookingCode: string;
    starts: Date;
    ends: Date;
    status: BookingStatus;
  }[] = [];

  for (let dayOffet = 0; dayOffet < 2; dayOffet++) {
    for (let hour = startHour; hour < endHour; hour++) {
      for (let i = 0; i < 60; i += slotDurationMinutes) {
        const start = new Date(now);
        start.setDate(now.getDate() + dayOffet);
        start.setHours(hour, i, 0, 0)

        const end = new Date(start);
        end.setMinutes(end.getMinutes() + slotDurationMinutes)

        slots.push({
          bookingCode: generateRandomHex(),
          starts: start,
          ends: end,
          status: "available"
        })
      }
    }
  }
  await db.insert(bookingSlot).values(slots)

}
seed().then(() => {
  console.log('Seeeding finished');
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
});

