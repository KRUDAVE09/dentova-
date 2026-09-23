import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions,
  icon,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 mb-4', className)}>
      <div className="flex items-center gap-2.5">
        {icon && <div className="text-[#0F766E] shrink-0">{icon}</div>}
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
