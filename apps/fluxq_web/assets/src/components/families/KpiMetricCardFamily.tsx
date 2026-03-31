import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Lane, MetricValueContract } from '@/lib/ui-cx';

const toneBySeverity: Record<
  NonNullable<MetricValueContract['severity']>,
  'neutral' | 'info' | 'warning' | 'error' | 'success'
> = {
  neutral: 'neutral',
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success'
};

const trendSymbol: Record<NonNullable<MetricValueContract['trend']>, string> = {
  up: '+',
  down: '-',
  flat: '~'
};

const defaultMetrics: MetricValueContract[] = [
  { key: 'incident_pressure', labelKey: 'runtime.cx.kpi.metrics.incidentPressure', value: '6', trend: 'up', severity: 'warning' },
  { key: 'retry_ratio', labelKey: 'runtime.cx.kpi.metrics.retryRatio', value: '2/5', trend: 'flat', severity: 'info' },
  { key: 'timeout_risk', labelKey: 'runtime.cx.kpi.metrics.timeoutRisk', value: 'high', trend: 'up', severity: 'error' },
  { key: 'fallback_readiness', labelKey: 'runtime.cx.kpi.metrics.fallbackReadiness', value: 'stable', trend: 'down', severity: 'success' }
];

export interface KpiMetricCardFamilyProps {
  readonly lane?: Lane;
  readonly metrics?: ReadonlyArray<MetricValueContract>;
}

export function KpiMetricCardFamily({
  lane = 'fixture',
  metrics = defaultMetrics
}: Readonly<KpiMetricCardFamilyProps>) {
  const { t } = useTranslation();
  const normalized = useMemo(() => metrics.slice(0, 8), [metrics]);

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.cx.kpi.title')}</h3>
          <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.kpi.subtitle')}</p>
        </div>
        <Badge tone="info">{lane}</Badge>
      </div>

      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {normalized.map((metric) => {
          const severity = metric.severity ?? 'neutral';

          return (
            <article key={metric.key} className="min-w-0 rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/4 p-3">
              <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t(metric.labelKey)}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold break-all">{metric.value}{metric.unit ? ` ${metric.unit}` : ''}</span>
                {metric.trend ? <Badge tone={toneBySeverity[severity]}>{`${trendSymbol[metric.trend]} ${metric.trend}`}</Badge> : null}
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
