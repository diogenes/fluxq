import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: Readonly<TextareaProps>) {
  return (
    <textarea
      className={cn(
        'min-h-24 w-full rounded-[var(--fxq-radius-md)] border border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-low)] px-3 py-2 text-sm text-[color:var(--fxq-text-primary)] outline-none transition focus:border-[color:var(--fxq-action-primary-start)]',
        className
      )}
      {...props}
    />
  );
}
