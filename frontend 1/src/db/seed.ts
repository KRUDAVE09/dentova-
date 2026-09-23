import { db } from "@/db";
import { activity, chairs, clinicSettings, inventory, messages, patients, visits } from "@/db/schema";
import { asc, desc, sql } from "drizzle-orm";
import { todayISO, TREATMENTS, type ClinicData } from "@/lib/types";

export async function seedClinic() {
  await db.transaction(async tx => {
    await tx.execute(sql`select pg_advisory_xact_lock(72840)`);
    if ((await tx.select().from(clinicSettings).limit(1)).length) return;
    await tx.insert(clinicSettings).values({ id: 1 });
    const names = [
      ["Olivia Rhye", 32, "Female", "peach"], ["James Wilson", 46, "Male", "sage"],
      ["Emma Thompson", 28, "Female", "lavender"], ["Liam Anderson", 35, "Male", "blue"],
      ["Sophia Chen", 24, "Female", "peach"], ["Noah Williams", 42, "Male", "rose"],
      ["Ava Martinez", 31, "Female", "sage"], ["Isabella Brown", 38, "Female", "lavender"],
      ["Ethan Davis", 51, "Male", "sand"], ["Mia Robinson", 26, "Female", "rose"],
      ["Lucas Taylor", 29, "Male", "blue"], ["Charlotte Lee", 40, "Female", "lavender"],
      ["Benjamin Clark", 33, "Male", "sage"], ["Amelia Walker", 36, "Female", "peach"],
    ] as const;
    const people = await tx.insert(patients).values(names.map(([name, age, gender, color], i) => ({
      name, age, gender, color, email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      phone: `(415) 555-${String(101 + i).padStart(4, "0")}`,
      notes: i === 2 ? "Prefers morning appointments. Please explain each step before treatment." : "No known allergies recorded. Confirm medical history at each visit.",
    }))).returning();
    const ago = (minutes: number) => new Date(Date.now() - minutes * 60000).toISOString();
    await tx.insert(chairs).values([
      { name: "Chair 01", status: "in_treatment", doctor: "Dr. Sarah Miller", patientId: people[0].id, treatment: "Root canal treatment", startedAt: ago(18) },
      { name: "Chair 02", status: "available", doctor: "Dr. Sarah Miller" },
      { name: "Chair 03", status: "in_treatment", doctor: "Dr. Daniel Kim", patientId: people[1].id, treatment: "Routine check-up", startedAt: ago(12) },
    ]);
    const date = todayISO();
    const seedVisits = [
      { patientId: people[0].id, date, time: "10:00", treatment: "Root canal treatment", doctor: "Dr. Sarah Miller", duration: 60, status: "in_treatment", checkedInAt: ago(25), amount: 65000 },
      { patientId: people[1].id, date, time: "10:15", treatment: "Routine check-up", doctor: "Dr. Daniel Kim", duration: 30, status: "in_treatment", checkedInAt: ago(20), amount: 8500 },
      ...[12, 9, 8, 6, 5].map((minutes, i) => ({
        patientId: people[i + 2].id, date, time: ["10:30", "10:45", "11:00", "11:15", "11:30"][i],
        treatment: ["Teeth cleaning", "Dental consultation", "Filling restoration", "Routine check-up", "Teeth whitening"][i],
        doctor: i % 2 ? "Dr. Daniel Kim" : "Dr. Sarah Miller", duration: 45, status: "waiting", checkedInAt: ago(minutes),
        kind: i === 3 ? "walk-in" : "scheduled", amount: [12000, 6500, 18000, 8500, 25000][i],
      })),
      ...Array.from({ length: 7 }, (_, i) => ({
        patientId: people[i + 7].id, date, time: `${String(12 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
        treatment: TREATMENTS[i % 6].name, doctor: i % 2 ? "Dr. Daniel Kim" : "Dr. Emily Carter",
        duration: TREATMENTS[i % 6].duration, status: "upcoming", amount: TREATMENTS[i % 6].amount,
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        patientId: people[(i + 4) % people.length].id, date, time: `${String(8 + Math.floor(i / 5)).padStart(2, "0")}:${String((i % 5) * 10).padStart(2, "0")}`,
        treatment: TREATMENTS[i % 6].name, doctor: i % 2 ? "Dr. Daniel Kim" : "Dr. Sarah Miller",
        duration: TREATMENTS[i % 6].duration, status: "completed", amount: TREATMENTS[i % 6].amount,
        paymentStatus: i < 7 ? "paid" : "pending", followUpSent: i < 6,
      })),
    ];
    await tx.insert(visits).values(seedVisits);
    await tx.insert(inventory).values([
      { name: "Nitrile examination gloves", category: "Protective equipment", quantity: 24, minimum: 10, unit: "boxes" },
      { name: "Disposable face masks", category: "Protective equipment", quantity: 18, minimum: 8, unit: "boxes" },
      { name: "Composite resin A2", category: "Restorative materials", quantity: 3, minimum: 5, unit: "syringes" },
      { name: "Dental anesthetic", category: "Clinical supplies", quantity: 12, minimum: 5, unit: "boxes" },
      { name: "Sterilization pouches", category: "Infection control", quantity: 4, minimum: 6, unit: "packs" },
      { name: "Prophy polishing paste", category: "Preventive care", quantity: 16, minimum: 5, unit: "jars" },
    ]);
    await tx.insert(messages).values([
      { patientId: people[2].id, content: "Hi! Just checking if I should arrive a little early for my cleaning today?", direction: "incoming", createdAt: ago(35) },
      { patientId: people[4].id, content: "Thank you for the reminder. I’ll be there for my 11 AM appointment!", direction: "incoming", createdAt: ago(48) },
      { patientId: people[7].id, content: "Could you send me the aftercare instructions from my last visit? Thank you.", direction: "incoming", createdAt: ago(80) },
    ]);
    await tx.insert(activity).values([
      { title: "Emma Thompson checked in", detail: "Teeth cleaning · Waiting room", createdAt: ago(12) },
      { title: "Treatment started for James Wilson", detail: "Chair 03 · Dr. Daniel Kim", createdAt: ago(12) },
      { title: "Chair 02 is ready", detail: "Cleaning completed · Available for the next patient", createdAt: ago(5) },
    ]);
  });
}

export async function getClinicData(): Promise<ClinicData> {
  await seedClinic();
  const [people, seats, appointments, stock, inbox, log, settings] = await Promise.all([
    db.select().from(patients).orderBy(asc(patients.name)),
    db.select().from(chairs).orderBy(asc(chairs.id)),
    db.select().from(visits).orderBy(asc(visits.time)),
    db.select().from(inventory).orderBy(asc(inventory.id)),
    db.select().from(messages).orderBy(asc(messages.createdAt)),
    db.select().from(activity).orderBy(desc(activity.createdAt)).limit(20),
    db.select().from(clinicSettings).limit(1),
  ]);
  return { patients: people, chairs: seats, visits: appointments, inventory: stock, messages: inbox, activity: log, settings: settings[0] };
}
