"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ArrowDownToLine, ArrowUpRight, Bell, Box, CalendarDays, Check, ChevronDown, ChevronRight, ChevronsUpDown, CircleHelp, CreditCard, LayoutDashboard, Menu, MessageSquare, Plus, Search, Settings2, ShieldCheck, Sparkles, Stethoscope, Users, X, Armchair, HeartHandshake, ChartNoAxesCombined } from "lucide-react";
import type { ClinicData, Section } from "@/lib/types";
import { todayISO } from "@/lib/types";
import { Avatar, Tooth } from "@/components/ui";
import { ClinicProvider, queueFor, useClinic } from "@/components/clinic-context";
import { WaitingRoom, Metrics, Overview } from "@/components/workspace";
import { Modules, exportData } from "@/components/modules";
import { WorkflowDialogs } from "@/components/dialogs";

const NAV = [
  { label: "Overview", icon: LayoutDashboard }, { label: "Appointments", icon: CalendarDays },
  { label: "Patients", icon: Users }, { label: "Waiting room", icon: Armchair },
  { label: "Treatments", icon: Stethoscope }, { label: "Billing", icon: CreditCard },
  { label: "Follow-ups", icon: HeartHandshake }, { label: "Inventory", icon: Box },
  { label: "Messages", icon: MessageSquare },
] as const;
const SUBTITLES: Record<Section, string> = {
  "Waiting room": "A little less waiting. A lot more smiling.",
  Overview: "A clear picture of your clinic. A calmer day ahead.",
  Appointments: "Make time for better care, one appointment at a time.",
  Patients: "Every patient, every detail. Thoughtfully connected.",
  Treatments: "Exceptional care starts with the right treatment.",
  Billing: "Less paperwork. More peace of mind.",
  "Follow-ups": "Great care doesn’t end when the appointment does.",
  Inventory: "Everything your team needs, right when they need it.",
  Messages: "A little conversation goes a long way.",
  Reports: "Meaningful insights for a healthier practice.",
  Settings: "Your clinic. Your team. Your way of working.",
};

export default function DentFlow({ initialData, initialNow }: { initialData: ClinicData; initialNow: number }) {
  return <ClinicProvider initialData={initialData} initialNow={initialNow}><Shell/></ClinicProvider>;
}

function Shell() {
  const { data, section, navigate, openDialog, date, setDate, offline } = useClinic();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popover, setPopover] = useState<"notifications" | "profile" | "clinic" | "date" | null>(null);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const unread = data.messages.filter(m => !m.read && m.direction === "incoming").length;
  const waiting = queueFor(data);
  useEffect(() => {
    if (!popover) return;
    const close = (event: MouseEvent) => { if (!(event.target as HTMLElement).closest("[data-popover]")) setPopover(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setPopover(null); };
    document.addEventListener("mousedown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, [popover]);
  const go = (next: Section) => { navigate(next); setMobileOpen(false); setPopover(null); };
  const quickAction = () => {
    if (section === "Patients") openDialog({ type: "new-patient" });
    else if (section === "Waiting room") openDialog({ type: "checkin" });
    else if (section === "Billing" || section === "Reports") exportData(data, section);
    else if (section === "Inventory") openDialog({ type: "inventory", itemId: data.inventory[0]?.id });
    else if (section === "Messages") openDialog({ type: "compose" });
    else if (section === "Follow-ups") go("Messages");
    else openDialog({ type: "appointment" });
  };
  const actionLabel = section === "Patients" ? "Add patient" : section === "Waiting room" ? "Check in patient" : section === "Billing" ? "Export invoices" : section === "Reports" ? "Export report" : section === "Inventory" ? "Update stock" : section === "Messages" ? "New message" : section === "Follow-ups" ? "View messages" : "New appointment";
  const chosenDate = new Date(`${section === "Appointments" ? date : todayISO()}T12:00:00`);
  return <div className="app-shell" ref={shellRef}>
    {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)}/>}
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} aria-label="Main navigation">
      <button className="brand" onClick={() => go("Overview")} aria-label="DentFlow overview"><span className="brand-mark"><Tooth size={28}/></span><span>Dent<span className="brand-flow">Flow</span><span className="brand-period">.</span></span></button>
      <div className="clinic-switch-wrap" data-popover>
        <button className="clinic-switch" onClick={() => setPopover(popover === "clinic" ? null : "clinic")} aria-expanded={popover === "clinic"}><span className="clinic-symbol"><Tooth size={23}/></span><span className="clinic-switch-label"><strong>{data.settings.name}</strong><small><i/> San Francisco, CA</small></span><ChevronsUpDown size={14}/></button>
        {popover === "clinic" && <div className="popover clinic-popover"><span className="eyebrow">YOUR WORKSPACE</span><div className="workspace-current"><span><strong>{data.settings.name}</strong><small>Demo workspace · Professional plan</small></span><Check size={16}/></div><button onClick={() => go("Settings")}><Settings2 size={16}/> Manage your clinic <ChevronRight size={14}/></button></div>}
      </div>
      <div className="navigation-scroll"><div className="nav-label">WORKSPACE</div><nav className="nav-list">{NAV.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${section === label ? "nav-item-active" : ""}`} onClick={() => go(label)} aria-current={section === label ? "page" : undefined}><Icon size={19} strokeWidth={1.7}/><span>{label}</span>{label === "Appointments" && <span className="nav-count">{data.visits.filter(v => ["upcoming", "waiting"].includes(v.status) && v.date === todayISO()).length}</span>}{label === "Messages" && unread > 0 && <span className="nav-count nav-count-purple">{unread}</span>}{label === "Waiting room" && section === label && <span className="nav-active-dot"/>}</button>)}</nav>
      <div className="nav-divider"/><div className="nav-label nav-label-second">CLINIC & INSIGHTS</div><nav className="nav-list"><button className={`nav-item ${section === "Reports" ? "nav-item-active" : ""}`} onClick={() => go("Reports")}><ChartNoAxesCombined size={19} strokeWidth={1.7}/><span>Reports</span></button><button className={`nav-item ${section === "Settings" ? "nav-item-active" : ""}`} onClick={() => go("Settings")}><Settings2 size={19} strokeWidth={1.7}/><span>Settings</span></button></nav></div>
      <div className="sidebar-bottom"><div className="support-card"><span className="support-icon"><Sparkles size={19}/></span><strong>A little help, a better flow.</strong><p>We’re here for you and your clinic.</p><button onClick={() => openDialog({ type: "help" })}>Help & resources <ArrowUpRight size={15}/></button></div><div className="system-status"><span className={`live-dot ${offline ? "live-dot-warning" : ""}`}/>{offline ? "Reconnecting to your clinic" : "All systems operational"}<ShieldCheck size={13}/></div><div className="sidebar-copyright">Made for healthier smiles <Tooth size={12}/></div></div>
    </aside>
    <div className="main-shell"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation"><Menu size={22}/></button><div className="breadcrumb"><span>Clinic workspace</span><ChevronRight size={14}/><strong>{section}</strong></div></div><div className="topbar-right"><button className="global-search" onClick={() => openDialog({ type: "search" })}><Search size={16}/><span>Search anything...</span><kbd>⌘ K</kbd></button><div className="notification-wrap" data-popover><button className="icon-button notification-button" aria-label="View notifications" aria-expanded={popover === "notifications"} onClick={() => setPopover(popover === "notifications" ? null : "notifications")}><Bell size={20} strokeWidth={1.7}/>{!notificationsRead && <i/>}</button>{popover === "notifications" && <div className="popover notification-popover"><div className="popover-heading"><h3>Notifications</h3><button className="text-button" onClick={() => setNotificationsRead(true)}>{notificationsRead ? "All caught up" : "Mark all read"}</button></div><button className="notification-item" onClick={() => go("Waiting room")}><span className="notice-icon lavender"><Armchair size={18}/></span><span><strong>{waiting.length} patients in the waiting room</strong><small>Your next smile is ready for you.</small></span></button><button className="notification-item" onClick={() => go("Inventory")}><span className="notice-icon amber"><Box size={18}/></span><span><strong>{data.inventory.filter(i => i.quantity < i.minimum).length} supplies need your attention</strong><small>Check your low-stock items.</small></span></button><button className="notification-item" onClick={() => go("Messages")}><span className="notice-icon sage"><MessageSquare size={18}/></span><span><strong>{unread} unread patient messages</strong><small>A little reply makes a big difference.</small></span></button></div>}</div><span className="topbar-divider"/><div className="profile-wrap" data-popover><button className="profile-button" onClick={() => setPopover(popover === "profile" ? null : "profile")} aria-expanded={popover === "profile"}><span className="profile-avatar"><Avatar name="Sarah Miller" color="peach"/><i/></span><span className="profile-label"><strong>Dr. Sarah Miller</strong><small>Clinic administrator</small></span><ChevronDown size={14}/></button>{popover === "profile" && <div className="popover profile-popover"><span className="eyebrow">YOUR ACCOUNT</span><strong>Dr. Sarah Miller</strong><small>Demo clinic administrator</small><button onClick={() => go("Settings")}><Settings2 size={16}/> Workspace settings</button><button onClick={() => { setPopover(null); openDialog({ type: "help" }); }}><CircleHelp size={16}/> Help & design principles</button></div>}</div></div></header>
      <main className="main-content" id="main-content" tabIndex={-1}><div className="page-heading"><div><div className="page-title-line"><h1>{section === "Overview" ? "Good morning, Dr. Sarah" : section}</h1>{section === "Waiting room" && <span className="live-label"><span className={`live-dot ${offline ? "live-dot-warning" : ""}`}/>{offline ? "Reconnecting" : "Live"}</span>}</div><p>{SUBTITLES[section]}</p></div><div className="page-actions">{!["Settings", "Messages"].includes(section) && <div className="date-wrap" data-popover><button className="button button-white date-button" onClick={() => setPopover(popover === "date" ? null : "date")} aria-expanded={popover === "date"}><CalendarDays size={16}/><span>{section !== "Appointments" || date === todayISO() ? "Today, " : ""}{chosenDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span><ChevronDown size={13}/></button>{popover === "date" && <div className="popover date-popover"><label htmlFor="workspace-date">Choose an appointment date</label><input id="workspace-date" type="date" value={date} onChange={e => { if (e.target.value) { setDate(e.target.value); go("Appointments"); } }}/><button className="text-button" onClick={() => { setDate(todayISO()); go("Appointments"); }}>Back to today</button></div>}</div>}{section !== "Settings" && <button className="button button-primary" onClick={quickAction}>{section === "Reports" || section === "Billing" ? <ArrowDownToLine size={16}/> : section === "Follow-ups" ? <MessageSquare size={16}/> : <Plus size={18}/>}<span>{actionLabel}</span></button>}</div></div>
      {section === "Waiting room" ? <><Metrics/><WaitingRoom/></> : section === "Overview" ? <><Metrics/><Overview/></> : <Modules/>}
      <footer className="page-footer"><span><ShieldCheck size={13}/> A little more clarity. A lot more care.</span><span>DentFlow <span className="footer-dot">·</span> Demo workspace</span></footer></main>
    </div><WorkflowDialogs/>
  </div>;
}
