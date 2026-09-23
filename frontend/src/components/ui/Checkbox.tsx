import React, { useId } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, checked, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start gap-3 cursor-pointer select-none min-h-[44px] py-2 items-center',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              type="checkbox"
              ref={ref}
              id={checkboxId}
              checked={checked}
              disabled={disabled}
              className={cn(
                'peer appearance-none w-5 h-5 rounded-md border border-[#DDE5E2] bg-white transition-all duration-200 checked:bg-[#0F766E] checked:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/40 focus:outline-none cursor-pointer',
                disabled && 'cursor-not-allowed',
                className
              )}
              {...props}
            />
            <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none stroke-[3]" />
          </div>
          {label && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-stone-800">{label}</span>
              {description && <span className="text-xs text-stone-500">{description}</span>}
            </div>
          )}
        </label>
        {error && <p className="text-xs text-red-600 font-medium pl-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
