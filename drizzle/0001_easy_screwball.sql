CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(40) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
