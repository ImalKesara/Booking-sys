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

export const users = pgTable("users",{
  id : serial("id").primaryKey(),
  email: varchar("email", { length: 40 }).notNull().unique(),
  password : varchar("password", {length : 100}).notNull()
})


export type BookingSlot = InferSelectModel<typeof bookingSlot>;
export type Users = InferSelectModel<typeof users>;
