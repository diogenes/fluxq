import type { PropsWithChildren } from 'react';

export interface SheetProps extends PropsWithChildren {
  readonly title: string;
}

export function Sheet({ title, children }: Readonly<SheetProps>) {
  return (
    <aside className="fxq-panel-rail rounded-[var(--fxq-radius-lg)] p-4" aria-label={title}>
      <h3 className="fxq-display text-base font-semibold">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </aside>
  );
}
