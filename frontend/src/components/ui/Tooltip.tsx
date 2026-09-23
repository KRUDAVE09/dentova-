import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  const showTooltip = () => {
    timeoutId = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionStyles = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full mb-1',
    bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full mt-1',
    left: 'top-1/2 -left-2 -translate-y-1/2 -translate-x-full mr-1',
    right: 'top-1/2 -right-2 -translate-y-1/2 translate-x-full ml-1',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in duration-150',
            positionStyles[position]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};
