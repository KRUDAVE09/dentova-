import type { activity, chairs, clinicSettings, inventory, messages, patients, visits } from "@/db/schema";

export type Patient = typeof patients.$inferSelect;
export type Chair = typeof chairs.$inferSelect;
export type Visit = typeof visits.$inferSelect;
export type InventoryItem = typeof inventory.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Activity = typeof activity.$inferSelect;
export type Settings = typeof clinicSettings.$inferSelect;
export type ClinicData = {
  patients: Patient[];
  chairs: Chair[];
  visits: Visit[];
  inventory: InventoryItem[];
  messages: Message[];
  activity: Activity[];
  settings: Settings;
};
export type Section = "Overview" | "Appointments" | "Patients" | "Waiting room" | "Treatments" | "Billing" | "Follow-ups" | "Inventory" | "Messages" | "Reports" | "Settings";
export type Mutation = Record<string, string | number | boolean | undefined> & { action: string };

export const TREATMENTS = [
  { name: "Routine check-up", duration: 30, amount: 8500, description: "A complete oral health assessment and a brighter, healthier smile.", category: "Preventive" },
  { name: "Teeth cleaning", duration: 45, amount: 12000, description: "Professional scaling and polishing for a fresh start.", category: "Preventive" },
  { name: "Root canal treatment", duration: 60, amount: 65000, description: "Gentle, precise care to restore and preserve the natural tooth.", category: "Restorative" },
  { name: "Dental consultation", duration: 30, amount: 6500, description: "Personalized advice and a treatment plan built around you.", category: "Consultation" },
  { name: "Filling restoration", duration: 45, amount: 18000, description: "Natural-looking restorations that protect your smile.", category: "Restorative" },
  { name: "Teeth whitening", duration: 60, amount: 25000, description: "A professionally guided treatment for a confident smile.", category: "Cosmetic" },
];
export const DOCTORS = ["Dr. Sarah Miller", "Dr. Daniel Kim", "Dr. Emily Carter"];
export function initials(name: string) { return name.replace(/^Dr\.\s*/, "").split(" ").map(p => p[0]).slice(0, 2).join(""); }
export function money(amount: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount / 100); }
export function timeLabel(time: string) { const [h, m] = time.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`; }
export function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
