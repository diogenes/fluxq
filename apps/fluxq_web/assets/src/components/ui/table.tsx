import type { PropsWithChildren, TableHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type TableProps = PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>;

export function Table({ className, children, ...props }: Readonly<TableProps>) {
  return (
    <div className="overflow-x-auto rounded-[var(--fxq-radius-md)] border border-[color:var(--fxq-outline-variant)]">
      <table className={cn('w-full min-w-[640px] border-collapse text-left text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function DenseRow({ children }: Readonly<PropsWithChildren>) {
  return <tr className="border-b border-white/6 text-xs leading-tight">{children}</tr>;
}
