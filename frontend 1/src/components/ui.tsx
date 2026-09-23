"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, Inbox, X } from "lucide-react";
import { initials } from "@/lib/types";

export function Tooth({ className = "", size = 26 }: { className?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true"><path d="M16 6.3c-2-1.7-5.9-2.4-8.2.1C3.1 11.5 7 17.1 8.5 23c.7 2.7 1.5 4.3 3.2 4.3 2.1 0 1.5-9.3 4.3-9.3s2.2 9.3 4.3 9.3c1.7 0 2.5-1.6 3.2-4.3 1.5-5.9 5.4-11.5.7-16.6C21.9 3.9 18 4.6 16 6.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 6c1.5 1.7 3.5 2.6 5.8 2.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}

export function DentalChair({ className = "", size = 76 }: { className?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 100 90" fill="none" className={className} aria-hidden="true"><path d="M25 28 21 20c-1.1-2 .1-4.6 2.4-5.3l3.3-1c1.9-.6 3.8.3 4.7 2L36 24" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round"/><path d="m26 26 6.5-3c2-.9 4.4-.1 5.4 1.9l11 21.5H75a7 7 0 0 1 7 7v4H42L24.2 32a4 4 0 0 1 1.8-6Z" fill="currentColor" fillOpacity=".055" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round"/><path d="M37 57v6h44v-6M56 64v14m-17 3h34M50 35h14c4 0 6 3 6 7m17 21V26c0-9-7-16-16-16H54" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M51 7h7v8h-7a4 4 0 0 1 0-8Z" stroke="currentColor" strokeWidth="2.7"/><path d="m48 20-3 4m9-3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5"/></svg>;
}

export function Avatar({ name, color = "lavender", small = false, className = "" }: { name: string; color?: string; small?: boolean; className?: string }) {
  return <span className={`avatar avatar-${color} ${small ? "avatar-sm" : ""} ${className}`} aria-hidden="true">{initials(name)}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = { available: "Available", in_treatment: "In treatment", cleaning: "Cleaning", waiting: "Waiting", upcoming: "Scheduled", completed: "Completed", cancelled: "Cancelled", paid: "Paid", pending: "Unpaid", "walk-in": "Walk-in" };
  return <span className={`status-badge status-${status}`}><span className="status-dot"/>{labels[status] ?? status}</span>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span className="empty-icon"><Inbox size={26}/></span><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function Modal({ title, subtitle, children, onClose, wide = false }: { title: string; subtitle?: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  const titleId = useId();
  const container = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    const oldFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => { const firstField = container.current?.querySelector<HTMLElement>("input:not([disabled]), select:not([disabled]), textarea:not([disabled])"); (firstField ?? container.current?.querySelector<HTMLElement>("button"))?.focus(); }, 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key === "Tab") {
        const elements = Array.from(container.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex="0"]') ?? []);
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(timer); document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKey); oldFocus?.focus(); };
  }, []);
  return createPortal(<div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div role="dialog" aria-modal="true" aria-labelledby={titleId} ref={container} className={`modal ${wide ? "modal-wide" : ""}`}><div className="modal-heading"><div><span className="eyebrow">DENTFLOW WORKSPACE</span><h2 id={titleId}>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20}/></button></div>{children}</div></div>, document.body);
}

export function Toast({ message, error, onClose }: { message: string; error?: boolean; onClose: () => void }) {
  return <div className={`toast ${error ? "toast-error" : ""}`} role={error ? "alert" : "status"}><span className="toast-symbol">{error ? <X size={18}/> : <Check size={18}/>}</span><span>{message}</span><button className="icon-button" onClick={onClose} aria-label="Dismiss notification"><X size={16}/></button></div>;
}
