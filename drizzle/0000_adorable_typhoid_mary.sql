CREATE TYPE "public"."status" AS ENUM('available', 'booked', 'started', 'completed', 'no_show');--> statement-breakpoint
CREATE TABLE "booking_slot" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_code" varchar(6) NOT NULL,
	"starts" timestamp with time zone NOT NULL,
	"ends" timestamp with time zone NOT NULL,
	"customer_name" varchar(255),
	"customer_phone" varchar(255),
	"status" "status" DEFAULT 'available' NOT NULL,
	CONSTRAINT "booking_slot_booking_code_unique" UNIQUE("booking_code")
);
