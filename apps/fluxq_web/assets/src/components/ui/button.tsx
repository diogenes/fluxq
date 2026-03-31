import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--fxq-radius-md)] border px-4 py-2 text-sm font-medium transition-[transform,opacity,background-color,border-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fxq-action-primary-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--fxq-background-base)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-transparent text-[#0b0f1a] fxq-gradient-action shadow-[0_12px_24px_rgba(0,0,0,0.18)] hover:translate-y-[-1px]',
        secondary:
          'border-[color:var(--fxq-outline-variant)] bg-[color:var(--fxq-background-surface-low)] text-[color:var(--fxq-text-primary)] hover:bg-[color:var(--fxq-background-surface-mid)]',
        ghost:
          'border-transparent bg-transparent text-[color:var(--fxq-text-secondary)] hover:bg-white/5 hover:text-[color:var(--fxq-text-primary)]'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-11 px-5 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, children, ...props }: Readonly<ButtonProps>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      type={props.type ?? 'button'}
      {...props}
    >
      {children}
    </button>
  );
}
