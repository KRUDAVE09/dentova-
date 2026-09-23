import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOutsideClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOutsideClick = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] h-[90vh]',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => closeOnOutsideClick && onClose()}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative w-full rounded-2xl glass-modal shadow-2xl overflow-hidden flex flex-col z-10 border border-white/80 my-8 animate-in zoom-in-95 duration-200',
          sizeStyles[size]
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-200/60 bg-white/40">
            <div className="flex flex-col gap-1 pr-6">
              {title && <h3 className="text-lg font-bold text-stone-900 tracking-tight">{title}</h3>}
              {description && <p className="text-sm text-stone-500">{description}</p>}
            </div>
            <IconButton
              icon={<X className="w-5 h-5 text-stone-500" />}
              aria-label="Close modal"
              onClick={onClose}
              variant="ghost"
              size="sm"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[70vh] flex-1 text-stone-800">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 sm:p-5 border-t border-stone-200/60 bg-stone-50/60">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
