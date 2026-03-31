import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'rounded-[var(--fxq-radius-md)] border p-3',
  {
    variants: {
      tone: {
        neutral: 'border-white/10 bg-white/4 text-[color:var(--fxq-text-primary)]',
        info:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-info)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-info)_14%,transparent)] text-[color:var(--fxq-semantic-info)]',
        success:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-success)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-success)_14%,transparent)] text-[color:var(--fxq-semantic-success)]',
        warning:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-warning)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-warning)_14%,transparent)] text-[color:var(--fxq-semantic-warning)]',
        error:
          'border-[color:color-mix(in_srgb,var(--fxq-semantic-error)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--fxq-semantic-error)_14%,transparent)] text-[color:var(--fxq-semantic-error)]'
      }
    },
    defaultVariants: {
      tone: 'neutral'
    }
  }
);

export interface AlertProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  readonly title?: string;
}

export function Alert({ className, tone, title, children, ...props }: Readonly<AlertProps>) {
  return (
    <div className={cn(alertVariants({ tone }), className)} role="status" {...props}>
      {title ? <div className="text-sm font-semibold">{title}</div> : null}
      {children ? <div className={cn('text-sm', title ? 'mt-1' : undefined)}>{children}</div> : null}
    </div>
  );
}
