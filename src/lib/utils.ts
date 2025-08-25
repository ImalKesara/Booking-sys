import type { BookingSlot } from "./server/db/schema";


export function groupByDateSlots(slots: BookingSlot[]) {
  return slots.reduce((acc, slot) => {
    const dateKey = slot.starts.toDateString();
    acc[dateKey] ||= [];
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, BookingSlot[]>)
}
