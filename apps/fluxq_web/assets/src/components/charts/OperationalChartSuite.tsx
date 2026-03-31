import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ChartPrimitiveLegend,
  HeatmapGridChart,
  LaneStateMixChart,
  TrendLineChart
} from './ChartPrimitives';
import type { HeatmapCellContract, LaneMixContract, TrendPointContract } from '@/lib/ui-cx';

const latencyPoints: TrendPointContract[] = [62, 58, 71, 64, 78, 74, 69, 81, 76, 68, 66, 72].map((value) => ({ value }));
const throughputHeatmap: HeatmapCellContract[] = [
  [0.22, 0.3, 0.45, 0.6, 0.38, 0.25],
  [0.18, 0.52, 0.74, 0.81, 0.5, 0.28],
  [0.24, 0.32, 0.58, 0.73, 0.62, 0.33],
  [0.14, 0.26, 0.44, 0.65, 0.48, 0.2]
].flatMap((row, rowIndex) => row.map((intensity, columnIndex) => ({ row: rowIndex, column: columnIndex, intensity })));
const laneMix: LaneMixContract[] = [
  { lane: 'fixture', segments: [78, 14, 8] },
  { lane: 'live_smoke', segments: [52, 30, 18] },
  { lane: 'live', segments: [34, 37, 29] }
];

export function OperationalChartSuite() {
  const { t } = useTranslation();

  return (
    <section className="grid min-w-0 gap-4 xl:grid-cols-2">
      <Card className="min-w-0 space-y-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.latencyTrendTitle')}</h3>
          <Badge tone="warning">{t('runtime.chartSuite.latencyP95')}</Badge>
        </div>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.latencyTrendSubtitle')}</p>
        <TrendLineChart points={latencyPoints} threshold={70} ariaLabel={t('runtime.chartSuite.latencyAria')} />
      </Card>

      <Card className="min-w-0 space-y-3">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.stateMixTitle')}</h3>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.stateMixSubtitle')}</p>
        <ChartPrimitiveLegend />
        <LaneStateMixChart rows={laneMix} />
      </Card>

      <Card className="min-w-0 space-y-3 xl:col-span-2">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.chartSuite.heatmapTitle')}</h3>
          <Badge tone="info">{t('runtime.chartSuite.heatmapWindow')}</Badge>
        </div>
        <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.chartSuite.heatmapSubtitle')}</p>
        <HeatmapGridChart cells={throughputHeatmap} />
      </Card>
    </section>
  );
}
