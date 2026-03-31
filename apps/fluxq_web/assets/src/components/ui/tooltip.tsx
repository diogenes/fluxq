import type { PropsWithChildren } from 'react';

export interface TooltipProps extends PropsWithChildren {
  readonly text: string;
}

export function Tooltip({ text, children }: Readonly<TooltipProps>) {
  return (
    <span title={text} className="inline-flex cursor-help items-center">
      {children}
    </span>
  );
}
