import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs px-2 py-1 font-medium', className)}
      {...props}
    />
  );
}
