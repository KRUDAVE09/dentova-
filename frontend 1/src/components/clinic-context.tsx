"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { ClinicData, Mutation, Section, Visit } from "@/lib/types";
import { todayISO } from "@/lib/types";
import { Toast } from "@/components/ui";

export type DialogState = {
  type: "checkin" | "appointment" | "patient" | "new-patient" | "assign" | "chair" | "chairs" | "inventory" | "confirm" | "search" | "help" | "compose";
  patientId?: number; visitId?: number; chairId?: number; itemId?: number; treatment?: string;
  title?: string; description?: string; confirmLabel?: string; mutation?: Mutation;
};
type Context = {
  data: ClinicData; section: Section; navigate: (section: Section) => void;
  now: number; date: string; setDate: (date: string) => void;
  dialog: DialogState | null; openDialog: (dialog: DialogState) => void; closeDialog: () => void;
  busy: boolean; offline: boolean; refresh: () => Promise<boolean>;
  mutate: (mutation: Mutation, silent?: boolean) => Promise<boolean>;
  notify: (message: string, error?: boolean) => void;
};
const ClinicContext = createContext<Context | null>(null);
export const SECTIONS: Section[] = ["Overview", "Appointments", "Patients", "Waiting room", "Treatments", "Billing", "Follow-ups", "Inventory", "Messages", "Reports", "Settings"];
export function queueFor(data: ClinicData): Visit[] {
  return data.visits.filter(v => v.status === "waiting").sort((a, b) => b.priority - a.priority || new Date(a.checkedInAt ?? 0).getTime() - new Date(b.checkedInAt ?? 0).getTime());
}
export function useClinic() { const context = useContext(ClinicContext); if (!context) throw new Error("Clinic context is required"); return context; }

export function ClinicProvider({ initialData, initialNow, children }: { initialData: ClinicData; initialNow: number; children: ReactNode }) {
  const [data, setData] = useState(initialData);
  const [section, setSection] = useState<Section>("Waiting room");
  const [date, setDate] = useState(todayISO);
  const [now, setNow] = useState(initialNow);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const [toast, setToast] = useState<{ message: string; error?: boolean } | null>(null);
  const notify = useCallback((message: string, error = false) => setToast({ message, error }), []);
  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/clinic", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to refresh");
      setData(await response.json()); setNow(Date.now()); setOffline(false); return true;
    } catch { setOffline(true); return false; }
  }, []);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    const match = SECTIONS.find(s => s.toLowerCase().replaceAll(" ", "-") === requested);
    if (match) setSection(match);
    const interval = setInterval(() => { setNow(Date.now()); void refresh(); }, 30000);
    return () => clearInterval(interval);
  }, [refresh]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(null), 5500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") { event.preventDefault(); setDialog({ type: "search" }); }
    };
    window.addEventListener("keydown", keyboard); return () => window.removeEventListener("keydown", keyboard);
  }, []);
  const navigate = (next: Section) => {
    setSection(next);
    window.history.replaceState(null, "", next === "Waiting room" ? "/" : `/?view=${next.toLowerCase().replaceAll(" ", "-")}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const mutate = async (mutation: Mutation, silent = false) => {
    if (busy) return false;
    setBusy(true);
    try {
      const response = await fetch("/api/clinic", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mutation) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      const fresh = await refresh();
      if (!silent) notify(fresh ? result.message : "Your change was saved. Reconnecting to refresh the workspace…");
      return true;
    } catch (error) { notify(error instanceof Error ? error.message : "Unable to save your change.", true); return false; }
    finally { setBusy(false); }
  };
  return <ClinicContext.Provider value={{ data, section, navigate, now, date, setDate, dialog, openDialog: setDialog, closeDialog: () => setDialog(null), busy, offline, refresh, mutate, notify }}>{children}{toast && <Toast message={toast.message} error={toast.error} onClose={() => setToast(null)}/>}</ClinicContext.Provider>;
}
