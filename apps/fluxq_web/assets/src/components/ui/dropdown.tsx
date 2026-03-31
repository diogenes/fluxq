import type { PropsWithChildren } from 'react';

export interface DropdownProps extends PropsWithChildren {
  readonly label: string;
}

export function Dropdown({ label, children }: Readonly<DropdownProps>) {
  return (
    <details className="group w-full rounded-[var(--fxq-radius-md)] border border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-low)] p-2 text-sm">
      <summary className="cursor-pointer list-none font-medium">{label}</summary>
      <div className="mt-2 space-y-1">{children}</div>
    </details>
  );
}
