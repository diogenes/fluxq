import {
  AlertTriangle,
  ArrowRight,
  CircleCheckBig,
  CircleDashed,
  CircleSlash2,
  Clock3,
  RotateCcw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ReadonlyDiagnosticsItem } from '@/lib/domain';
import { cn } from '@/lib/utils';

export interface DiagnosticsRailProps {
  readonly items: ReadonlyArray<ReadonlyDiagnosticsItem>;
  readonly collapsed: boolean;
}

const stateIcon: Record<ReadonlyDiagnosticsItem['state'], typeof CircleDashed> = {
  empty: CircleDashed,
  loading: RotateCcw,
  degraded: AlertTriangle,
  error: CircleSlash2,
  retrying: RotateCcw,
  timeout: Clock3,
  fallback_engaged: ArrowRight,
  cancelled: CircleSlash2,
  success_recovered: CircleCheckBig
};

const stateTone: Record<ReadonlyDiagnosticsItem['state'], 'neutral' | 'info' | 'success' | 'warning' | 'error'> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'warning',
  timeout: 'warning',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success'
};

export function DiagnosticsRail({ items, collapsed }: Readonly<DiagnosticsRailProps>) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'fxq-panel-rail flex h-full min-w-0 flex-col gap-3 rounded-[24px] p-4',
        collapsed ? 'w-full xl:w-[96px]' : 'w-full xl:w-[320px]'
      )}
    >
      <div className="space-y-1">
        <div className="fxq-display text-base font-semibold">{t('shell.diagnostics.title')}</div>
        {!collapsed ? (
          <div className="text-sm text-[color:var(--fxq-text-secondary)]">{t('shell.diagnostics.subtitle')}</div>
        ) : null}
      </div>

      <div className="min-w-0 space-y-3 overflow-y-auto">
        {items.map((item) => {
          const Icon = stateIcon[item.state];

          return (
            <Card key={item.key} className="bg-[color:var(--fxq-background-surface-mid)]/80 p-3">
              <div className={cn('flex items-start gap-3', collapsed && 'justify-center')}>
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  <Icon className="h-4 w-4" />
                </div>
                {!collapsed ? (
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{t(item.titleKey)}</div>
                        <div className="truncate text-xs text-[color:var(--fxq-text-secondary)]">
                          {t(item.descriptionKey)}
                        </div>
                      </div>
                      <Badge tone={stateTone[item.state]}>{item.state}</Badge>
                    </div>
                    {item.actionKey ? (
                      <Button size="sm" variant="secondary" className="w-full">
                        {t(item.actionKey)}
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>
    </aside>
  );
}
