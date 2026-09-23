import React from 'react';
import { cn } from '../../utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'selected' | 'teal' | 'occupied' | 'available' | 'cleaning' | 'maintenance';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantStyles = {
    default: 'glass-panel',
    selected: 'glass-card-selected',
    teal:
      'bg-gradient-to-br from-white/92 via-[#DDF3EF]/40 to-[#DDF3EF]/70 backdrop-blur-md border border-[#0F766E]/30 shadow-[0_8px_30px_rgb(15,118,110,0.1)]',
    occupied: 'chair-glass-occupied',
    available: 'chair-glass-available',
    cleaning: 'chair-glass-cleaning',
    maintenance: 'chair-glass-maintenance',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300 relative overflow-hidden',
        variantStyles[variant],
        hoverable && 'hover:scale-[1.01] hover:shadow-lg cursor-pointer',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
