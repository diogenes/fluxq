import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import type { HeatmapCellContract, LaneMixContract, TrendPointContract } from '@/lib/ui-cx';

function toPoints(values: readonly TrendPointContract[]) {
  return values
    .map((point, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - point.value;
      return `${x},${y}`;
    })
    .join(' ');
}

export function TrendLineChart({
  points,
  ariaLabel,
  threshold
}: Readonly<{
  points: readonly TrendPointContract[];
  ariaLabel: string;
  threshold?: number;
}>) {
  const linePoints = toPoints(points);

  return (
    <div className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-mid)]/60 p-3">
      <svg viewBox="0 0 100 100" className="h-40 w-full" preserveAspectRatio="none" role="img" aria-label={ariaLabel}>
        <polyline fill="none" stroke="var(--fxq-action-primary-end)" strokeWidth="2" points={linePoints} />
        {threshold !== undefined ? (
          <polyline
            fill="none"
            stroke="color-mix(in srgb, var(--fxq-semantic-warning) 72%, transparent)"
            strokeDasharray="3 3"
            strokeWidth="1.5"
            points={`0,${100 - threshold} 100,${100 - threshold}`}
          />
        ) : null}
      </svg>
    </div>
  );
}

export function LaneStateMixChart({ rows }: Readonly<{ rows: readonly LaneMixContract[] }>) {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
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
  );
}

export function HeatmapGridChart({ cells }: Readonly<{ cells: readonly HeatmapCellContract[] }>) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-1 sm:grid-cols-6">
      {cells.map((cell) => (
        <div
          key={`${cell.row}-${cell.column}`}
          className="h-9 rounded-[var(--fxq-radius-sm)] border border-white/8"
          style={{
            backgroundColor: `color-mix(in srgb, var(--fxq-semantic-info) ${Math.round(cell.intensity * 100)}%, transparent)`
          }}
          title={`${t('runtime.chartSuite.cellLabel')} ${cell.row + 1}:${cell.column + 1}`}
        />
      ))}
    </div>
  );
}

export function ChartPrimitiveLegend() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone="success">{t('runtime.chartSuite.legend.healthy')}</Badge>
      <Badge tone="warning">{t('runtime.chartSuite.legend.degraded')}</Badge>
      <Badge tone="error">{t('runtime.chartSuite.legend.failed')}</Badge>
    </div>
  );
}
