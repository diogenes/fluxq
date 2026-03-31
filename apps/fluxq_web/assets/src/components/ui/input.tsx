import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Readonly<InputProps>) {
  return (
    <input
      className={cn(
        'w-full rounded-[var(--fxq-radius-md)] border border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-low)] px-3 py-2 text-sm text-[color:var(--fxq-text-primary)] outline-none transition focus:border-[color:var(--fxq-action-primary-start)]',
        className
      )}
      {...props}
    />
  );
}
