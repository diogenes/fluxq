import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { DataBoundary } from '@/components/state/DataBoundary';
import {
  ChartPrimitiveLegend,
  HeatmapGridChart,
  LaneStateMixChart,
  TrendLineChart
} from '@/components/charts/ChartPrimitives';
import {
  normalizeQueryState,
  queryStateToBoundaryState,
  type LaneMixContract,
  type QueryStateContract,
  type TelemetryProContract,
  type TrendPointContract,
  type HeatmapCellContract
} from '@/lib/ui-cx';

const latencyPoints: TrendPointContract[] = [64, 61, 58, 67, 70, 73, 78, 74, 68, 65, 62, 60].map((value) => ({ value }));
const laneMixRows: LaneMixContract[] = [
  { lane: 'fixture', segments: [79, 15, 6] },
  { lane: 'live_smoke', segments: [53, 29, 18] },
  { lane: 'live', segments: [33, 38, 29] }
];
const heatmapCells: HeatmapCellContract[] = [
  [0.2, 0.27, 0.31, 0.48, 0.44, 0.22],
  [0.29, 0.45, 0.63, 0.78, 0.58, 0.34],
  [0.32, 0.38, 0.56, 0.7, 0.61, 0.36],
  [0.17, 0.24, 0.42, 0.55, 0.49, 0.25]
].flatMap((row, rowIndex) => row.map((intensity, columnIndex) => ({ row: rowIndex, column: columnIndex, intensity })));

type ViewMode = 'trend' | 'mix' | 'heatmap';

const defaultContract: TelemetryProContract = {
  trend: latencyPoints,
  laneMix: laneMixRows,
  heatmap: heatmapCells,
  queryState: {
    lane: 'all',
    status: 'all',
    sortBy: 'updated',
    sortDirection: 'desc'
  }
};

export function TelemetryPro({ contract = defaultContract }: Readonly<{ contract?: TelemetryProContract }>) {
  const { t } = useTranslation();
  const [view, setView] = useState<ViewMode>('trend');
  const [queryState, setQueryState] = useState<QueryStateContract>(normalizeQueryState(contract.queryState));
  const resolvedBoundaryState = queryStateToBoundaryState(queryState);

  const statusSummary = useMemo(() => {
    return [
      `${t('runtime.cy.telemetryPro.query.lane')}: ${queryState.lane}`,
      `${t('runtime.cy.telemetryPro.query.status')}: ${queryState.status}`,
      `${t('runtime.cy.telemetryPro.query.sort')}: ${queryState.sortBy}/${queryState.sortDirection}`
    ];
  }, [queryState.lane, queryState.sortBy, queryState.sortDirection, queryState.status, t]);

  return (
    <DataBoundary state={resolvedBoundaryState} lane="live_smoke" actionLabelKey="actions.compare">
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.telemetryPro.title')}</h3>
          <Badge tone="info">{t(`runtime.cy.telemetryPro.views.${view}`)}</Badge>
        </div>

        <p className="text-sm text-[color:var(--fxq-text-secondary)]">
          {t('runtime.cy.telemetryPro.description')}
        </p>

        <div className="grid min-w-0 gap-2 md:grid-cols-3">
          <Select
            value={String(queryState.lane ?? 'all')}
            onChange={(event) => setQueryState((current) => ({ ...current, lane: event.target.value as QueryStateContract['lane'] }))}
            aria-label={t('runtime.cy.telemetryPro.query.lane')}
          >
            <option value="all">{t('filters.laneOptions.all')}</option>
            <option value="fixture">{t('filters.laneOptions.fixture')}</option>
            <option value="live_smoke">{t('filters.laneOptions.live_smoke')}</option>
            <option value="live">{t('filters.laneOptions.live')}</option>
          </Select>
          <Select
            value={String(queryState.status ?? 'all')}
            onChange={(event) => setQueryState((current) => ({ ...current, status: event.target.value as QueryStateContract['status'] }))}
            aria-label={t('runtime.cy.telemetryPro.query.status')}
          >
            <option value="all">{t('filters.statusOptions.all')}</option>
            <option value="success_recovered">{t('filters.statusOptions.success_recovered')}</option>
            <option value="degraded">{t('filters.statusOptions.degraded')}</option>
            <option value="retrying">{t('filters.statusOptions.retrying')}</option>
            <option value="timeout">{t('filters.statusOptions.timeout')}</option>
          </Select>
          <Select
            value={String(queryState.sortDirection ?? 'desc')}
            onChange={(event) => setQueryState((current) => ({ ...current, sortDirection: event.target.value as 'asc' | 'desc' }))}
            aria-label={t('runtime.cy.telemetryPro.query.sortDirection')}
          >
            <option value="desc">{t('runtime.cy.telemetryPro.query.desc')}</option>
            <option value="asc">{t('runtime.cy.telemetryPro.query.asc')}</option>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={view === 'trend' ? 'secondary' : 'ghost'} onClick={() => setView('trend')}>
            {t('runtime.cy.telemetryPro.views.trend')}
          </Button>
          <Button size="sm" variant={view === 'mix' ? 'secondary' : 'ghost'} onClick={() => setView('mix')}>
            {t('runtime.cy.telemetryPro.views.mix')}
          </Button>
          <Button size="sm" variant={view === 'heatmap' ? 'secondary' : 'ghost'} onClick={() => setView('heatmap')}>
            {t('runtime.cy.telemetryPro.views.heatmap')}
          </Button>
        </div>

        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-3">
          {view === 'trend' ? (
            <TrendLineChart points={contract.trend} threshold={70} ariaLabel={t('runtime.cy.telemetryPro.aria.trend')} />
          ) : null}
          {view === 'mix' ? (
            <div className="space-y-2">
              <ChartPrimitiveLegend />
              <LaneStateMixChart rows={contract.laneMix} />
            </div>
          ) : null}
          {view === 'heatmap' ? (
            <HeatmapGridChart cells={contract.heatmap} />
          ) : null}
        </div>

        <div className="rounded-[var(--fxq-radius-sm)] border border-white/8 p-2 text-xs text-[color:var(--fxq-text-secondary)]">
          {statusSummary.map((line) => (
            <div key={line} className="break-words">{line}</div>
          ))}
        </div>
      </section>
    </DataBoundary>
  );
}
