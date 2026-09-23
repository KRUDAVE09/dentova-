import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useClinic } from '../../hooks/useClinic';
import type { ChairPresetCount } from '../../types/clinic';
import {
  X,
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
  Armchair,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { IconButton } from '../ui/IconButton';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { clinicConfig, setChairPresetCount } = useClinic();

  if (!isOpen) return null;

  const navItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Patients', href: ROUTES.PATIENTS, icon: Users },
    { label: 'Appointments', href: ROUTES.APPOINTMENTS, icon: Calendar, badge: '12' },
    { label: 'Waiting Room', href: ROUTES.WAITING_ROOM, icon: Clock, badge: '4' },
    { label: 'Follow-ups', href: ROUTES.FOLLOW_UPS, icon: HeartHandshake },
    { label: 'Treatments', href: ROUTES.TREATMENTS, icon: Stethoscope },
    { label: 'Billing', href: ROUTES.BILLING, icon: Receipt },
    { label: 'Inventory', href: ROUTES.INVENTORY, icon: Package },
    { label: 'Messages', href: ROUTES.MESSAGES, icon: MessageSquare, badge: '3' },
    { label: 'Reports', href: ROUTES.REPORTS, icon: BarChart3 },
    { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <div className="relative w-4/5 max-w-xs bg-[#17201E] text-stone-200 h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-250">
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <span className="font-bold text-white tracking-wider text-base">DENTOVA</span>
          </div>
          <IconButton
            icon={<X className="w-5 h-5 text-stone-400" />}
            aria-label="Close menu"
            onClick={onClose}
            variant="ghost"
          />
        </div>

        {/* Multi-Chair Switcher Mobile Widget */}
        <div className="p-4 bg-stone-900/80 border-b border-stone-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
            <span className="flex items-center gap-1.5">
              <Armchair className="w-4 h-4 text-[#14B8A6]" />
              Clinic Preset
            </span>
            <span className="text-[#5EEAD4]">{clinicConfig.chairCount} Chairs</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {[1, 2, 5, 10].map((preset) => (
              <button
                key={preset}
                onClick={() => setChairPresetCount(preset as ChairPresetCount)}
                className={cn(
                  'py-1.5 text-xs font-bold rounded-lg border text-center transition-all min-h-[36px]',
                  clinicConfig.chairCount === preset
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                )}
              >
                {preset} {preset === 10 ? '+' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.href ||
              (item.href !== ROUTES.DASHBOARD && location.pathname.startsWith(item.href));

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px]',
                  isActive
                    ? 'bg-[#0F766E] text-white font-semibold shadow-md'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-white' : 'text-stone-400')} />
                <span className="truncate flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs font-bold rounded-full',
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-800 text-[#5EEAD4]'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 text-xs text-stone-500 text-center">
          Dentova Dental SaaS v1.0.0
        </div>
      </div>
    </div>
  );
};
