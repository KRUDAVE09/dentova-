import React from 'react';
import { cn } from '../../utils/cn';
import type { TabItem } from '../../types/ui';

export interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'segmented';
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  variant = 'pills',
  fullWidth = false,
  className,
}) => {
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex p-1 bg-stone-200/60 rounded-xl gap-1 border border-[#DDE5E2]',
          fullWidth && 'w-full',
          className
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex-1 min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 select-none',
                isActive
                  ? 'bg-white text-[#0F766E] shadow-xs border border-[#DDE5E2]'
                  : 'text-[#64706C] hover:text-[#17201E] hover:bg-white/50',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 text-[10px] rounded-full font-bold',
                    isActive ? 'bg-[#0F766E] text-white' : 'bg-stone-300/60 text-[#64706C]'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex border-b border-[#DDE5E2] gap-2 overflow-x-auto no-scrollbar',
        fullWidth && 'w-full justify-between',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'min-h-[44px] px-4 py-2.5 text-sm font-semibold transition-all duration-200 flex items-center gap-2 border-b-2 -mb-px shrink-0 select-none',
              isActive
                ? 'border-[#0F766E] text-[#0F766E]'
                : 'border-transparent text-[#64706C] hover:text-[#17201E] hover:border-stone-300',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 text-xs rounded-full font-bold',
                  isActive ? 'bg-[#DDF3EF] text-[#0F766E]' : 'bg-stone-100 text-[#64706C]'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
