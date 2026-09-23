import React from 'react';
import { cn } from '../../utils/cn';
import type { BadgeVariant } from '../../types/ui';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  dot = false,
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-800 border-rose-200/80',
    info: 'bg-sky-50 text-sky-800 border-sky-200/80',
    teal: 'bg-[#DDF3EF] text-[#0F766E] border-[#0F766E]/30 font-semibold',
    neutral: 'bg-stone-100 text-[#64706C] border-[#DDE5E2]',
  };

  const dotColors: Record<BadgeVariant, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    teal: 'bg-[#0F766E]',
    neutral: 'bg-stone-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1 rounded-md font-medium',
    md: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border border-solid shrink-0 select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
