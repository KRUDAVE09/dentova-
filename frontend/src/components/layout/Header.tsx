import React from 'react';
import { useClinic } from '../../hooks/useClinic';
import type { ChairPresetCount } from '../../types/clinic';
import { IconButton } from '../ui/IconButton';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { useToast } from '../../hooks/useToast';
import {
  Menu,
  Bell,
  Search,
  Armchair,
  ChevronDown,
  User,
  Settings,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';

export interface HeaderProps {
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav }) => {
  const { clinicConfig, activeChair, setActiveChairId, setChairPresetCount } = useClinic();
  const { showToast } = useToast();

  const handleChairPresetChange = (count: ChairPresetCount) => {
    setChairPresetCount(count);
    showToast(
      'Clinic Preset Updated',
      `Switched clinic layout configuration to ${count} ${count === 1 ? 'chair' : 'chairs'}.`,
      'info'
    );
  };

  const chairPresetItems = [
    {
      id: 'preset-1',
      label: '1 Chair Clinic (Solo Practice)',
      onClick: () => handleChairPresetChange(1),
    },
    {
      id: 'preset-2',
      label: '2 Chairs Clinic (Duo Practice)',
      onClick: () => handleChairPresetChange(2),
    },
    {
      id: 'preset-5',
      label: '5 Chairs Clinic (Standard Suite)',
      onClick: () => handleChairPresetChange(5),
    },
    {
      id: 'preset-10',
      label: '10+ Chairs Clinic (Enterprise Center)',
      onClick: () => handleChairPresetChange(10),
    },
  ];

  const profileItems = [
    {
      id: 'profile-view',
      label: 'Dr. Smith (Lead Dentist)',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'settings-view',
      label: 'Clinic Preferences',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      dividerBefore: true,
      onClick: () => showToast('Auth Placeholder', 'Sign out action placeholder.', 'warning'),
    },
  ];

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Nav Toggle + Clinic Brand */}
      <div className="flex items-center gap-3">
        <IconButton
          icon={<Menu className="w-5 h-5 text-stone-700" />}
          aria-label="Toggle mobile navigation menu"
          onClick={onToggleMobileNav}
          className="lg:hidden"
        />

        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-stone-900 leading-none flex items-center gap-2">
              <span>{clinicConfig.name}</span>
            </h1>
            <span className="text-xs text-stone-500 font-normal hidden sm:inline">
              Multi-Chair SaaS Engine
            </span>
          </div>
        </div>
      </div>

      {/* Center: Multi-Chair Configuration Switcher */}
      <div className="hidden md:flex items-center gap-2 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200/80">
        <Armchair className="w-4 h-4 text-[#0F766E] ml-1.5" />
        <span className="text-xs font-semibold text-stone-700">Chairs:</span>
        <Dropdown
          trigger={
            <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-xs font-bold text-stone-800 rounded-lg shadow-xs hover:bg-stone-50 border border-stone-200 transition-colors">
              <span>{clinicConfig.chairCount} Operatories</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>
          }
          items={chairPresetItems}
          align="left"
        />

        {/* Chair status pills or compact representation */}
        <div className="h-4 w-px bg-stone-300 mx-1" />
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs">
          {clinicConfig.chairs.length <= 4 ? (
            clinicConfig.chairs.map((chair) => (
              <button
                key={chair.id}
                onClick={() => setActiveChairId(chair.id)}
                className="focus:outline-none"
              >
                <Badge
                  size="sm"
                  variant={
                    chair.id === activeChair?.id
                      ? 'teal'
                      : chair.status === 'occupied'
                      ? 'danger'
                      : chair.status === 'available'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {chair.name.split(' ')[0]}
                </Badge>
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2 pr-2">
              <Badge variant="teal">Selected: {activeChair?.name || 'None'}</Badge>
              <span className="text-xs text-stone-500 font-medium whitespace-nowrap">{clinicConfig.chairs.length} Total</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, Search, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search */}
        <div className="relative hidden xl:block w-48">
          <input
            type="text"
            placeholder="Search patient, chart..."
            className="w-full bg-stone-100/90 text-xs text-stone-800 placeholder:text-stone-400 rounded-xl pl-8 pr-3 py-2 border border-stone-200 focus:outline-none focus:border-[#0F766E] focus:bg-white transition-all"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Notifications */}
        <IconButton
          icon={<Bell className="w-5 h-5 text-stone-600" />}
          aria-label="View notifications"
          badgeCount={3}
          onClick={() =>
            showToast('Notifications', 'You have 3 unread patient alerts.', 'info')
          }
        />

        {/* Settings Quick Link */}
        <IconButton
          icon={<SlidersHorizontal className="w-5 h-5 text-stone-600" />}
          aria-label="Quick chair layout settings"
          className="hidden sm:inline-flex"
          onClick={() =>
            showToast('Multi-Chair Config', 'Active chairs configured cleanly across 1-10+ seats.', 'info')
          }
        />

        <div className="h-6 w-px bg-stone-200 mx-0.5 hidden sm:block" />

        {/* User Profile */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-stone-100 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#17201E] text-[#5EEAD4] font-bold text-xs flex items-center justify-center border border-stone-700 shadow-xs">
                SJ
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-stone-900 leading-tight">Dr. Smith</span>
                <span className="text-[10px] text-stone-500">Lead Dentist</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden lg:block" />
            </div>
          }
          items={profileItems}
          align="right"
        />
      </div>
    </header>
  );
};
