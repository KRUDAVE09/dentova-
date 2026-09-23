import React from 'react';
import { cn } from '../../utils/cn';
import type { ToastMessage } from '../../types/ui';
import { useToast } from '../../hooks/useToast';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { IconButton } from './IconButton';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />,
  };

  return (
    <div
      className={cn(
        'glass-toast rounded-2xl p-4 flex items-start gap-3 pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 shadow-xl border border-white/80'
      )}
      role="alert"
    >
      {icons[toast.type]}
      <div className="flex-1 flex flex-col gap-0.5 pr-2">
        <h4 className="text-sm font-bold text-stone-900 leading-snug">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs text-stone-600 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <IconButton
        icon={<X className="w-4 h-4 text-stone-400 hover:text-stone-700" />}
        aria-label="Dismiss toast"
        size="sm"
        variant="ghost"
        onClick={onDismiss}
      />
    </div>
  );
};
