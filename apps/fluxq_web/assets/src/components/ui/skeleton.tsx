import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: Readonly<SkeletonProps>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--fxq-radius-md)] bg-[color:color-mix(in_srgb,var(--fxq-outline-variant)_28%,transparent)] motion-reduce:animate-none',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
