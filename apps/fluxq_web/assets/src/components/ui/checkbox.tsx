import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Checkbox({ className, ...props }: Readonly<CheckboxProps>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-low)] text-[color:var(--fxq-action-primary-start)] focus:ring-[color:var(--fxq-action-primary-start)]',
        className
      )}
      {...props}
    />
  );
}
