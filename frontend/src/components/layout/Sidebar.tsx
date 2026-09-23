import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useClinic } from '../../hooks/useClinic';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  HeartHandshake,
  Stethoscope,
  Receipt,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Armchair,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface NavSection {
  title: string;
  items: SidebarNavItem[];
}

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { clinicConfig } = useClinic();

  const navSections: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
      ],
    },
    {
      title: 'Clinical Operations',
      items: [
        { label: 'Patients', href: ROUTES.PATIENTS, icon: Users },
        { label: 'Appointments', href: ROUTES.APPOINTMENTS, icon: Calendar, badge: '12' },
        { label: 'Waiting Room', href: ROUTES.WAITING_ROOM, icon: Clock, badge: '4' },
        { label: 'Follow-ups', href: ROUTES.FOLLOW_UPS, icon: HeartHandshake },
        { label: 'Treatments', href: ROUTES.TREATMENTS, icon: Stethoscope },
      ],
    },
    {
      title: 'Practice Management',
      items: [
        { label: 'Billing', href: ROUTES.BILLING, icon: Receipt },
        { label: 'Inventory', href: ROUTES.INVENTORY, icon: Package },
        { label: 'Messages', href: ROUTES.MESSAGES, icon: MessageSquare, badge: '3' },
        { label: 'Reports', href: ROUTES.REPORTS, icon: BarChart3 },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-[#17201E] text-stone-300 h-screen sticky top-0 transition-all duration-300 z-30 shrink-0 border-r border-stone-800 shadow-xl',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800/80">
        <NavLink to={ROUTES.DASHBOARD} className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
            D
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-wider text-lg leading-none">DENTOVA</span>
              <span className="text-[10px] text-[#5EEAD4] font-medium tracking-widest uppercase mt-0.5">Dental SaaS</span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors min-h-[32px]"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Multi-Chair Quick Summary */}
      {!isCollapsed && (
        <div className="mx-3 mt-3 p-3 rounded-xl bg-stone-800/60 border border-stone-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Armchair className="w-4 h-4 text-[#14B8A6]" />
            <span className="text-stone-300 font-medium">{clinicConfig.chairCount} Active Chairs</span>
          </div>
          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#0F766E]/20 text-[#5EEAD4] rounded border border-[#0F766E]/30">
            Multi-Chair
          </span>
        </div>
      )}

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400/80 mb-2">
                {section.title}
              </h3>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.href !== ROUTES.DASHBOARD && location.pathname.startsWith(item.href));

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group min-h-[44px]',
                    isActive
                      ? 'bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white shadow-md font-semibold'
                      : 'text-stone-300 hover:bg-stone-800/70 hover:text-white'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110',
                      isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'
                    )}
                  />
                  {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span
                      className={cn(
                        'px-2 py-0.5 text-xs font-bold rounded-full',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-800 text-[#5EEAD4] border border-stone-700'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Clinic Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-stone-800/80 bg-stone-900/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-800/40 border border-stone-700/30">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E]/20 flex items-center justify-center text-[#14B8A6] font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-semibold text-stone-200 truncate">{clinicConfig.name}</span>
              <span className="text-[10px] text-stone-400">Pro Plan • Multi-Chair</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
