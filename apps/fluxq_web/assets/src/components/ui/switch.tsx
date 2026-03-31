import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly label?: string;
}

export function Switch({ className, label, ...props }: Readonly<SwitchProps>) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-[color:var(--fxq-text-secondary)]">
      <input
        type="checkbox"
        className={cn(
          'peer sr-only',
          className
        )}
        {...props}
      />
      <span className="relative h-5 w-9 rounded-full bg-[color:var(--fxq-outline-variant)] transition peer-checked:bg-[color:var(--fxq-action-primary-end)]">
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
