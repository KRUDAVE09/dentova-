import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const clinicSettings = pgTable("clinic_settings", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().default("Smile Dental Clinic"),
  email: text("email").notNull().default("hello@smiledental.example"),
  phone: text("phone").notNull().default("(415) 555-0100"),
  remindersEnabled: boolean("reminders_enabled").notNull().default(true),
});

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull().default(30),
  gender: text("gender").notNull().default("Not specified"),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  color: text("color").notNull().default("lavender"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const chairs = pgTable("chairs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull().default("available"),
  doctor: text("doctor").notNull().default("Dr. Sarah Miller"),
  patientId: integer("patient_id").references(() => patients.id),
  treatment: text("treatment"),
  startedAt: timestamp("started_at", { mode: "string" }),
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  treatment: text("treatment").notNull(),
  doctor: text("doctor").notNull(),
  duration: integer("duration").notNull().default(30),
  status: text("status").notNull().default("upcoming"),
  kind: text("kind").notNull().default("scheduled"),
  checkedInAt: timestamp("checked_in_at", { mode: "string" }),
  priority: integer("priority").notNull().default(0),
  amount: integer("amount").notNull().default(12000),
  paymentStatus: text("payment_status").notNull().default("pending"),
  followUpSent: boolean("follow_up_sent").notNull().default(false),
});

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull(),
  minimum: integer("minimum").notNull(),
  unit: text("unit").notNull().default("boxes"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patients.id),
  content: text("content").notNull(),
  direction: text("direction").notNull().default("incoming"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const activity = pgTable("clinic_activity", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});
