import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import type { DropdownItem } from '../../types/ui';

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-40 mt-2 w-56 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl py-1.5 animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          role="menu"
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {item.dividerBefore && <div className="h-px bg-stone-200/80 my-1" />}
              <button
                disabled={item.disabled}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full min-h-[44px] px-3.5 py-2 text-sm text-left flex items-center gap-2.5 font-medium transition-colors select-none',
                  item.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-900',
                  item.disabled && 'opacity-50 cursor-not-allowed'
                )}
                role="menuitem"
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="truncate">{item.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
