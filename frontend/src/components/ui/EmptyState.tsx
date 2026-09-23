import React from 'react';
import { cn } from '../../utils/cn';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'There are currently no records available for display in this view.',
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-8 sm:p-12', className)}>
      <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4 border border-stone-200/60 shadow-sm">
        {icon || <FolderOpen className="w-8 h-8 text-stone-400" />}
      </div>
      <h3 className="text-base font-bold text-stone-800 mb-1">{title}</h3>
      <p className="text-sm text-stone-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="teal" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
