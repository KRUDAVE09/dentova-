import React from 'react';
import { cn } from '../../utils/cn';
import type { ButtonSize, ButtonVariant } from '../../types/ui';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  badgeCount?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  'aria-label': ariaLabel,
  variant = 'ghost',
  size = 'md',
  badgeCount,
  className,
  ...props
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'w-9 h-9 min-h-[36px] min-w-[36px] p-1.5 text-xs rounded-lg',
    md: 'w-11 h-11 min-h-[44px] min-w-[44px] p-2 text-sm rounded-xl',
    lg: 'w-12 h-12 min-h-[48px] min-w-[48px] p-2.5 text-base rounded-xl',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#0F766E] text-white hover:bg-[#0D655E]',
    secondary: 'bg-[#F7F9F8] text-[#17201E] hover:bg-[#DDF3EF]/60 border border-[#DDE5E2]',
    outline: 'bg-transparent text-[#17201E] hover:bg-[#DDF3EF]/40 border border-[#DDE5E2]',
    ghost: 'bg-transparent text-[#64706C] hover:bg-[#DDF3EF]/40 hover:text-[#0F766E]',
    glass: 'glass-panel text-[#17201E] hover:bg-white/90 border border-white/80',
    teal: 'bg-[#0F766E] text-white hover:bg-[#0D655E]',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none shrink-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#0F766E] rounded-full ring-2 ring-white">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
};
