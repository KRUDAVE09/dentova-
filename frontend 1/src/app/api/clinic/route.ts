import { db } from "@/db";
import { activity, chairs, clinicSettings, inventory, messages, patients, visits } from "@/db/schema";
import { getClinicData } from "@/db/seed";
import { DOCTORS, todayISO, TREATMENTS } from "@/lib/types";
import { and, asc, eq, inArray, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

class InputError extends Error {}
function text(value: unknown, fallback = "", max = 200) {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "string") throw new InputError("Please enter a valid text value.");
  const result = value.trim();
  if (result.length > max) throw new InputError(`Please keep this field under ${max} characters.`);
  return result;
}
function integer(value: unknown, min = 1, max = 100000) {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < min || n > max) throw new InputError(`Please enter a number between ${min} and ${max}.`);
  return n;
}
function dateValue(value: unknown) {
  const date = text(value, todayISO());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new InputError("Please select a valid date.");
  return date;
}

export async function GET() {
  try { return Response.json(await getClinicData(), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { console.error("Clinic read failed", error); return Response.json({ error: "We couldn’t load the clinic. Please try again." }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (!body || Array.isArray(body) || typeof body !== "object") throw new InputError("Invalid request.");
    const action = text(body.action);
    const result = await db.transaction(async tx => {
      await tx.execute(sql`select pg_advisory_xact_lock(72841)`);
      const log = async (title: string, detail: string) => { await tx.insert(activity).values({ title, detail }); };
      const findPatient = async (id: number) => {
        const [patient] = await tx.select().from(patients).where(eq(patients.id, id));
        if (!patient) throw new InputError("This patient could not be found.");
        return patient;
      };
      const findVisit = async () => {
        const [visit] = await tx.select().from(visits).where(eq(visits.id, integer(body.visitId)));
        if (!visit) throw new InputError("This appointment could not be found.");
        return visit;
      };
      const addPatient = async () => {
        const name = text(body.name);
        if (name.length < 2) throw new InputError("Please enter the patient’s full name.");
        const email = text(body.email);
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InputError("Please enter a valid email address.");
        const [patient] = await tx.insert(patients).values({ name, age: integer(body.age ?? 30, 0, 120), gender: text(body.gender, "Not specified"), email, phone: text(body.phone), color: "lavender" }).returning();
        return patient;
      };
      const treatment = () => {
        const name = text(body.treatment, "Routine check-up");
        const option = TREATMENTS.find(t => t.name === name);
        if (!option) throw new InputError("Please select an available treatment.");
        return option;
      };
      const doctor = () => {
        const name = text(body.doctor, DOCTORS[0]);
        if (!DOCTORS.includes(name)) throw new InputError("Please select a clinic dentist.");
        return name;
      };
      const time = () => {
        const value = text(body.time, "10:30");
        if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) throw new InputError("Please choose a valid appointment time.");
        return value;
      };
      switch (action) {
        case "add-patient": {
          const patient = await addPatient();
          await log(`${patient.name} joined the clinic`, "New patient record created");
          return { message: "Patient added to your clinic.", patientId: patient.id };
        }
        case "check-in": {
          if (body.visitId) {
            const visit = await findVisit();
            if (visit.status !== "upcoming") throw new InputError("This appointment has already been checked in.");
            const active = await tx.select().from(visits).where(and(eq(visits.patientId, visit.patientId), inArray(visits.status, ["waiting", "in_treatment"])));
            if (active.length) throw new InputError("This patient is already in the waiting room or in treatment.");
            await tx.update(visits).set({ status: "waiting", checkedInAt: new Date().toISOString() }).where(eq(visits.id, visit.id));
            const patient = await findPatient(visit.patientId);
            await log(`${patient.name} checked in`, `${visit.treatment} · Waiting room`);
          } else {
            const patient = body.patientId ? await findPatient(integer(body.patientId)) : await addPatient();
            const active = await tx.select().from(visits).where(and(eq(visits.patientId, patient.id), inArray(visits.status, ["waiting", "in_treatment"])));
            if (active.length) throw new InputError("This patient is already in the waiting room or in treatment.");
            const service = treatment();
            const existing = await tx.select().from(visits).where(and(eq(visits.patientId, patient.id), eq(visits.date, todayISO()), eq(visits.status, "upcoming"))).orderBy(asc(visits.time));
            if (existing.length) {
              await tx.update(visits).set({ status: "waiting", checkedInAt: new Date().toISOString() }).where(eq(visits.id, existing[0].id));
            } else {
              await tx.insert(visits).values({ patientId: patient.id, date: todayISO(), time: time(), treatment: service.name, doctor: doctor(), duration: service.duration, amount: service.amount, status: "waiting", checkedInAt: new Date().toISOString(), kind: text(body.kind, "walk-in") === "scheduled" ? "scheduled" : "walk-in" });
            }
            await log(`${patient.name} checked in`, `${service.name} · Waiting room`);
          }
          return { message: "Patient checked in and added to the queue." };
        }
        case "appointment": {
          const patient = await findPatient(integer(body.patientId));
          const service = treatment();
          const chosenDate = dateValue(body.date);
          const chosenDoctor = doctor();
          const chosenTime = time();
          const minutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
          const existing = await tx.select().from(visits).where(and(eq(visits.date, chosenDate), eq(visits.doctor, chosenDoctor), inArray(visits.status, ["upcoming", "waiting", "in_treatment"])));
          const start = minutes(chosenTime);
          if (existing.some(v => start < minutes(v.time) + v.duration && start + service.duration > minutes(v.time))) throw new InputError("This dentist has an overlapping appointment. Please choose another time or dentist.");
          await tx.insert(visits).values({ patientId: patient.id, date: chosenDate, time: chosenTime, treatment: service.name, doctor: chosenDoctor, duration: service.duration, amount: service.amount });
          await log(`Appointment booked for ${patient.name}`, `${service.name} · ${chosenDate} at ${chosenTime}`);
          return { message: "Appointment successfully booked." };
        }
        case "assign": {
          const visit = await findVisit();
          if (visit.status !== "waiting") throw new InputError("This patient is no longer waiting. Please refresh the queue.");
          const [chair] = await tx.select().from(chairs).where(eq(chairs.id, integer(body.chairId)));
          if (!chair || chair.status !== "available") throw new InputError("This chair is no longer available. Please choose another chair.");
          const patient = await findPatient(visit.patientId);
          await tx.update(chairs).set({ status: "in_treatment", patientId: patient.id, treatment: visit.treatment, doctor: visit.doctor, startedAt: new Date().toISOString() }).where(eq(chairs.id, chair.id));
          await tx.update(visits).set({ status: "in_treatment" }).where(eq(visits.id, visit.id));
          await log(`${patient.name} called to ${chair.name}`, `${visit.treatment} · ${visit.doctor}`);
          return { message: `${patient.name} has been assigned to ${chair.name}.` };
        }
        case "complete": {
          const [chair] = await tx.select().from(chairs).where(eq(chairs.id, integer(body.chairId)));
          if (!chair || chair.status !== "in_treatment" || !chair.patientId) throw new InputError("This chair has no active treatment.");
          const patient = await findPatient(chair.patientId);
          await tx.update(visits).set({ status: "completed" }).where(and(eq(visits.patientId, chair.patientId), eq(visits.status, "in_treatment")));
          await tx.update(chairs).set({ status: "cleaning", patientId: null, treatment: null, startedAt: null }).where(eq(chairs.id, chair.id));
          await log(`Treatment completed for ${patient.name}`, `${chair.name} is being prepared for the next patient`);
          return { message: "Treatment completed. Mark the chair ready after cleaning." };
        }
        case "ready": {
          const [chair] = await tx.select().from(chairs).where(eq(chairs.id, integer(body.chairId)));
          if (!chair || chair.status !== "cleaning") throw new InputError("Only a chair being cleaned can be marked ready.");
          await tx.update(chairs).set({ status: "available" }).where(eq(chairs.id, chair.id));
          await log(`${chair.name} is ready`, "Cleaning completed · Available for the next patient");
          return { message: `${chair.name} is ready for the next smile.` };
        }
        case "queue-remove": {
          const visit = await findVisit();
          if (visit.status !== "waiting") throw new InputError("This patient is not in the waiting queue.");
          await tx.update(visits).set({ status: "cancelled" }).where(eq(visits.id, visit.id));
          return { message: "Patient removed from the waiting queue." };
        }
        case "queue-priority": {
          const visit = await findVisit();
          if (visit.status !== "waiting") throw new InputError("This patient is not in the waiting queue.");
          await tx.update(visits).set({ priority: 0 }).where(eq(visits.status, "waiting"));
          await tx.update(visits).set({ priority: 1 }).where(eq(visits.id, visit.id));
          return { message: "Patient moved to the front of the queue." };
        }
        case "settings": {
          const seats = await tx.select().from(chairs).orderBy(asc(chairs.id));
          const count = integer(body.chairCount ?? seats.length, 1, 24);
          if (count < seats.length) {
            const removed = seats.slice(count);
            if (removed.some(c => c.status !== "available")) throw new InputError("Chairs being removed must be available. Complete treatment and cleaning first.");
            await tx.delete(chairs).where(inArray(chairs.id, removed.map(c => c.id)));
          } else if (count > seats.length) {
            await tx.insert(chairs).values(Array.from({ length: count - seats.length }, (_, i) => ({ name: `Chair ${String(seats.length + i + 1).padStart(2, "0")}`, status: "available", doctor: DOCTORS[i % DOCTORS.length] })));
          }
          const [current] = await tx.select().from(clinicSettings).where(eq(clinicSettings.id, 1));
          const name = text(body.name, current.name);
          if (!name) throw new InputError("Please enter a clinic name.");
          await tx.update(clinicSettings).set({ name, email: text(body.email, current.email), phone: text(body.phone, current.phone), remindersEnabled: typeof body.remindersEnabled === "boolean" ? body.remindersEnabled : current.remindersEnabled }).where(eq(clinicSettings.id, 1));
          return { message: "Your clinic settings have been saved." };
        }
        case "stock": {
          const [item] = await tx.update(inventory).set({ quantity: integer(body.quantity, 0) }).where(eq(inventory.id, integer(body.itemId))).returning();
          if (!item) throw new InputError("This supply could not be found.");
          await log(`${item.name} stock updated`, `${item.quantity} ${item.unit} available`);
          return { message: "Stock quantity updated." };
        }
        case "send-message": {
          const patient = await findPatient(integer(body.patientId));
          const content = text(body.content, "", 5000);
          if (!content) throw new InputError("Write a message before sending.");
          await tx.insert(messages).values({ patientId: patient.id, content, direction: "outgoing", read: true });
          return { message: "Message saved to the patient conversation." };
        }
        case "read-messages": {
          await tx.update(messages).set({ read: true }).where(and(eq(messages.patientId, integer(body.patientId)), eq(messages.direction, "incoming")));
          return { message: "Conversation marked as read." };
        }
        case "pay": {
          const visit = await findVisit();
          if (visit.status === "cancelled") throw new InputError("A cancelled visit cannot be paid.");
          if (visit.paymentStatus === "paid") throw new InputError("This invoice has already been paid.");
          await tx.update(visits).set({ paymentStatus: "paid" }).where(eq(visits.id, visit.id));
          await log("Payment recorded", `Invoice DF-${String(visit.id).padStart(4, "0")} · Manual payment`);
          return { message: "Payment recorded and invoice marked as paid." };
        }
        case "follow-up": {
          const visit = await findVisit();
          if (visit.followUpSent) throw new InputError("A follow-up has already been recorded for this visit.");
          const patient = await findPatient(visit.patientId);
          await tx.insert(messages).values({ patientId: patient.id, direction: "outgoing", read: true, content: `Hi ${patient.name.split(" ")[0]}, we hope you’re feeling well after your ${visit.treatment.toLowerCase()}. Let us know if you have any questions. Your care team is here for you.` });
          await tx.update(visits).set({ followUpSent: true }).where(eq(visits.id, visit.id));
          return { message: "Follow-up saved to the patient conversation." };
        }
        case "notes": {
          const patient = await findPatient(integer(body.patientId));
          await tx.update(patients).set({ notes: text(body.notes, "", 5000) }).where(eq(patients.id, patient.id));
          return { message: "Patient notes saved." };
        }
        default: throw new InputError("This action is not supported.");
      }
    });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof InputError || error instanceof SyntaxError) return Response.json({ error: error.message }, { status: 400 });
    console.error("Clinic action failed", error);
    return Response.json({ error: "This change couldn’t be saved. Please try again." }, { status: 500 });
  }
}
