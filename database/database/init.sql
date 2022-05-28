CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "users" (
  "userid" uuid PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
  "name" varchar(200),
  "email" varchar(200),
  "creationdate" timestamp
);

CREATE TABLE "user_data" (
  "userid" uuid,
  "password" varchar(128),
  "passwordsalt" varchar(128),
  "isapproved" bit,
  "iscanceled" bit
);

CREATE TABLE "locations" (
  "userid" uuid,
  "lat" double precision,
  "long" double precision,
  "locationdate" timestamp
);

CREATE TABLE "circle" (
  "circleid" uuid PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
  "name" varchar(200),
  "token" varchar(6),
  "owneruserid" uuid
);

CREATE TABLE "circleusers" (
  "circleid" uuid,
  "userid" uuid,
  "online" bit,
);

ALTER TABLE "user_data" ADD FOREIGN KEY ("userid") REFERENCES "users" ("userid");

ALTER TABLE "locations" ADD FOREIGN KEY ("userid") REFERENCES "users" ("userid");

ALTER TABLE "circle" ADD FOREIGN KEY ("owneruserid") REFERENCES "users" ("userid");

ALTER TABLE "circleusers" ADD FOREIGN KEY ("circleid") REFERENCES "circle" ("circleid");

ALTER TABLE "circleusers" ADD FOREIGN KEY ("userid") REFERENCES "users" ("userid");