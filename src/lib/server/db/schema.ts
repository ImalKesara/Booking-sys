import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial,  timestamp, pgEnum, varchar } from 'drizzle-orm/pg-core';


export const statusEnum = pgEnum("status", ["available", "booked", "started", "completed", "no_show"])

export type BookingStatus = typeof statusEnum.enumValues[number];
export const bookingSlot = pgTable("booking_slot", {
  id: serial("id").primaryKey(),
  bookingCode: varchar("booking_code", { length: 6 }).notNull().unique(),
  starts: timestamp("starts", { withTimezone: true }).notNull(),
  ends: timestamp("ends", { withTimezone: true }).notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 255 }),
  status: statusEnum("status").notNull().default("available")
})


export type BookingSlot = InferSelectModel<typeof bookingSlot>;
