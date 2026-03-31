import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase',
  {
    variants: {
      tone: {
        neutral:
          'border-white/10 bg-white/5 text-[color:var(--fxq-text-secondary)]',
        info:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-info)_36%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-info)_12%,transparent)] text-[color:var(--fxq-semantic-info)]',
        success:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-success)_36%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-success)_12%,transparent)] text-[color:var(--fxq-semantic-success)]',
        warning:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-warning)_36%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-warning)_12%,transparent)] text-[color:var(--fxq-semantic-warning)]',
        error:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-error)_36%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-error)_12%,transparent)] text-[color:var(--fxq-semantic-error)]'
      }
    },
    defaultVariants: {
      tone: 'neutral'
    }
  }
);

export interface BadgeProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, children, ...props }: Readonly<BadgeProps>) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {children}
    </span>
  );
}
