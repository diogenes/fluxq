import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: Readonly<CardProps>) {
  return (
    <div
      className={cn(
        'fxq-panel rounded-[calc(var(--fxq-radius-lg)+2px)] p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
