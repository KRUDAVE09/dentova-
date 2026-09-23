import React from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200/80',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-stone-800 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium text-stone-700">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">{title}</h1>
          {badge}
        </div>
        {description && <p className="text-sm text-stone-500 max-w-3xl leading-relaxed">{description}</p>}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">{actions}</div>}
    </div>
  );
};
