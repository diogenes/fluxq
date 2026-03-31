import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const latencyPoints = [62, 58, 71, 64, 78, 74, 69, 81, 76, 68, 66, 72];
const throughputHeatmap = [
  [0.22, 0.3, 0.45, 0.6, 0.38, 0.25],
  [0.18, 0.52, 0.74, 0.81, 0.5, 0.28],
  [0.24, 0.32, 0.58, 0.73, 0.62, 0.33],
  [0.14, 0.26, 0.44, 0.65, 0.48, 0.2]
];

function toPoints(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(' ');
}

export function OperationalChartSuite() {
  const { t } = useTranslation();
  const linePoints = toPoints(latencyPoints);

  return (
    <section className="grid min-w-0 gap-4 xl:grid-cols-2">
      <Card className="min-w-0 space-y-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.latencyTrendTitle')}</h3>
          <Badge tone="warning">{t('runtime.chartSuite.latencyP95')}</Badge>
        </div>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.latencyTrendSubtitle')}</p>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-mid)]/60 p-3">
          <svg viewBox="0 0 100 100" className="h-40 w-full" preserveAspectRatio="none" role="img" aria-label={t('runtime.chartSuite.latencyAria')}>
            <polyline fill="none" stroke="var(--fxq-action-primary-end)" strokeWidth="2" points={linePoints} />
            <polyline
              fill="none"
              stroke="color-mix(in srgb, var(--fxq-semantic-warning) 72%, transparent)"
              strokeDasharray="3 3"
              strokeWidth="1.5"
              points="0,30 100,30"
            />
          </svg>
        </div>
      </Card>

      <Card className="min-w-0 space-y-3">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.stateMixTitle')}</h3>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.stateMixSubtitle')}</p>
        <div className="space-y-3">
          {[
            { lane: 'fixture', segments: [78, 14, 8] },
            { lane: 'live_smoke', segments: [52, 30, 18] },
            { lane: 'live', segments: [34, 37, 29] }
          ].map((row) => (
            <div key={row.lane} className="space-y-1">
              <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{row.lane}</div>
              <div className="flex h-3 overflow-hidden rounded-full border border-white/8">
                <div style={{ width: `${row.segments[0]}%` }} className="bg-[color:var(--fxq-semantic-success)]" />
                <div style={{ width: `${row.segments[1]}%` }} className="bg-[color:var(--fxq-semantic-warning)]" />
                <div style={{ width: `${row.segments[2]}%` }} className="bg-[color:var(--fxq-semantic-error)]" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="min-w-0 space-y-3 xl:col-span-2">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.heatmapTitle')}</h3>
          <Badge tone="info">{t('runtime.chartSuite.heatmapWindow')}</Badge>
        </div>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.heatmapSubtitle')}</p>
        <div className="grid gap-1 sm:grid-cols-6">
          {throughputHeatmap.flatMap((row, rowIndex) =>
            row.map((value, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="h-9 rounded-[var(--fxq-radius-sm)] border border-white/8"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--fxq-semantic-info) ${Math.round(value * 100)}%, transparent)`
                }}
                title={`${t('runtime.chartSuite.cellLabel')} ${rowIndex + 1}:${columnIndex + 1}`}
              />
            ))
          )}
        </div>
      </Card>
    </section>
  );
}
