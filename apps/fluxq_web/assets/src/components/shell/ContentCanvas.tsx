import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

export interface ContentCanvasProps extends PropsWithChildren {
  readonly title?: string;
  readonly subtitle?: string;
}

export function ContentCanvas({ title, subtitle, children }: Readonly<ContentCanvasProps>) {
  const { t } = useTranslation();

  return (
    <main className="min-w-0 flex-1 space-y-4 overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8">
      <Card className="bg-[color:var(--fxq-background-surface-mid)]/70">
        <div className="space-y-1">
          <div className="fxq-display text-lg font-semibold">{title ?? t('shell.canvas.title')}</div>
          <div className="text-sm text-[color:var(--fxq-text-secondary)]">
            {subtitle ?? t('shell.canvas.subtitle')}
          </div>
        </div>
      </Card>
      {children}
    </main>
  );
}
