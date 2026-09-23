import React from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-rose-50/50 border border-rose-200/60',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 mb-4 border border-rose-200 shadow-sm">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-stone-900 mb-1">{title}</h3>
      <p className="text-sm text-stone-600 max-w-sm mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
          Retry Loading
        </Button>
      )}
    </div>
  );
};
