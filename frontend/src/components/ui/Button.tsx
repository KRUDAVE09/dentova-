import React from 'react';
import { cn } from '../../utils/cn';
import type { ButtonSize, ButtonVariant } from '../../types/ui';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[36px] gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl min-h-[44px] gap-2',
    lg: 'px-6 py-3.5 text-base rounded-xl min-h-[50px] gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#0F766E] text-white hover:bg-[#0D655E] shadow-xs hover:shadow-md border border-transparent font-semibold',
    secondary:
      'bg-[#F7F9F8] text-[#17201E] hover:bg-[#DDF3EF]/60 border border-[#DDE5E2]',
    outline:
      'bg-transparent text-[#17201E] hover:bg-[#DDF3EF]/40 border border-[#DDE5E2]',
    ghost:
      'bg-transparent text-[#17201E] hover:bg-[#DDF3EF]/40 hover:text-[#0F766E] border border-transparent',
    glass:
      'glass-panel text-[#17201E] hover:bg-white/90 border border-white/80 shadow-xs',
    teal:
      'bg-[#0F766E] text-white hover:bg-[#0D655E] shadow-xs hover:shadow-md border border-transparent font-semibold',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-xs border border-transparent',
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
