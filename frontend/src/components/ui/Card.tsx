import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverable = false,
  selected = false,
  className,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#DDE5E2] shadow-[0_2px_10px_-2px_rgba(23,32,30,0.04)] transition-all duration-200',
        hoverable && 'hover:shadow-[0_8px_24px_-4px_rgba(23,32,30,0.08)] hover:border-stone-300',
        selected && 'border-[#0F766E] ring-1 ring-[#0F766E]/40 bg-[#DDF3EF]/30',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
