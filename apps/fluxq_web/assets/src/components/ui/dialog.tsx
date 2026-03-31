import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface DialogProps extends PropsWithChildren {
  readonly title: string;
  readonly description?: string;
  readonly open?: boolean;
}

export function Dialog({ title, description, open = false, children }: Readonly<DialogProps>) {
  return (
    <div
      className={cn(
        'w-full rounded-[var(--fxq-radius-lg)] border border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-mid)] p-4',
        open ? 'block' : 'hidden'
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <h3 className="fxq-display text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-1 text-sm text-[color:var(--fxq-text-secondary)]">{description}</p> : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}
