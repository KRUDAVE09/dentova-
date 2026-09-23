import React from 'react';
import { cn } from '../../utils/cn';
import type { TableColumn } from '../../types/ui';
import { EmptyState } from './EmptyState';

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data records found',
  emptyIcon,
  isLoading = false,
  className,
  onRowClick,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-stone-200/80 p-8 flex justify-center items-center min-h-[250px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-[#0F766E] rounded-full animate-spin" />
          <p className="text-sm font-medium text-stone-500">Loading data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl border border-stone-200/80 p-8">
        <EmptyState title="No records" description={emptyMessage} icon={emptyIcon} />
      </div>
    );
  }

  return (
    <div className={cn('w-full bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 bg-stone-50/70 text-stone-600 text-xs font-bold uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={cn(
                    'px-4 py-3.5 sm:px-6 sm:py-4 select-none',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm text-stone-800">
            {data.map((item, index) => {
              const key = keyExtractor(item, index);
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    'transition-colors duration-150 hover:bg-stone-50/80',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={`${key}-${col.key}`}
                      className={cn(
                        'px-4 py-3.5 sm:px-6 sm:py-4 text-stone-800',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right'
                      )}
                    >
                      {col.render
                        ? col.render(item, index)
                        : (item as Record<string, any>)[col.key] !== undefined
                        ? String((item as Record<string, any>)[col.key])
                        : null}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
