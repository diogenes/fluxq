import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataBoundary } from '@/components/state/DataBoundary';
import type { DataBoundaryState, Lane } from '@/lib/ui-cx';

interface TableProRow {
  readonly id: string;
  readonly workflow: string;
  readonly lane: Lane;
  readonly state: 'healthy' | 'degraded' | 'timeout';
  readonly latencyMs: number;
  readonly updated: string;
  readonly details: string;
}

const rows: TableProRow[] = [
  { id: 'run-101', workflow: 'portability-check', lane: 'fixture', state: 'healthy', latencyMs: 42, updated: '12s ago', details: 'comparability stable' },
  { id: 'run-102', workflow: 'provider-health-audit', lane: 'live_smoke', state: 'degraded', latencyMs: 86, updated: '42s ago', details: 'retry budget pressure' },
  { id: 'run-103', workflow: 'hybrid-optimizer', lane: 'live', state: 'timeout', latencyMs: 190, updated: '1m ago', details: 'timeout threshold exceeded' },
  { id: 'run-104', workflow: 'trace-correlation', lane: 'fixture', state: 'healthy', latencyMs: 37, updated: '2m ago', details: 'trace links synchronized' },
  { id: 'run-105', workflow: 'fallback-check', lane: 'live_smoke', state: 'healthy', latencyMs: 49, updated: '3m ago', details: 'fallback path ready' }
];

const toneByState: Record<TableProRow['state'], 'success' | 'warning' | 'error'> = {
  healthy: 'success',
  degraded: 'warning',
  timeout: 'error'
};

type ColumnId = 'workflow' | 'lane' | 'state' | 'latencyMs' | 'updated';

export interface TableProProps {
  readonly boundaryState?: DataBoundaryState;
}

export function TablePro({ boundaryState = 'success_recovered' }: Readonly<TableProProps>) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnId, boolean>>({
    workflow: true,
    lane: true,
    state: true,
    latencyMs: true,
    updated: true
  });

  const pageSize = 3;
  const filtered = useMemo(
    () => rows.filter((row) => row.workflow.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const boundedPage = Math.min(page, totalPages);
  const paginated = filtered.slice((boundedPage - 1) * pageSize, boundedPage * pageSize);

  const toggleColumn = (column: ColumnId) => {
    setVisibleColumns((current) => ({ ...current, [column]: !current[column] }));
  };

  const toggleExpanded = (id: string) => {
    setExpandedRows((current) => ({ ...current, [id]: !current[id] }));
  };

  const isFilterZero = query.length > 0 && filtered.length === 0;

  return (
    <DataBoundary state={boundaryState} lane="live_smoke" actionLabelKey="actions.review">
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.tablePro.title')}</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(visibleColumns) as ColumnId[]).map((column) => (
              <Button
                key={column}
                type="button"
                size="sm"
                variant={visibleColumns[column] ? 'secondary' : 'ghost'}
                onClick={() => toggleColumn(column)}
              >
                {t(`runtime.cy.tablePro.columns.${column}`)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
            aria-label={t('runtime.cy.tablePro.queryLabel')}
            placeholder={t('runtime.cy.tablePro.queryPlaceholder')}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm text-[color:var(--fxq-text-secondary)]">
            {isFilterZero ? t('runtime.cy.tablePro.filterZero') : t('runtime.cy.tablePro.empty')}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[var(--fxq-radius-md)] border border-white/8">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-[color:var(--fxq-text-secondary)]">
                  <th className="sticky left-0 bg-[color:var(--fxq-background-surface-low)] px-3 py-2 text-left">{t('runtime.cy.tablePro.columns.workflow')}</th>
                  {visibleColumns.lane ? <th className="px-3 py-2 text-left">{t('runtime.cy.tablePro.columns.lane')}</th> : null}
                  {visibleColumns.state ? <th className="px-3 py-2 text-left">{t('runtime.cy.tablePro.columns.state')}</th> : null}
                  {visibleColumns.latencyMs ? <th className="px-3 py-2 text-left">{t('runtime.cy.tablePro.columns.latencyMs')}</th> : null}
                  {visibleColumns.updated ? <th className="px-3 py-2 text-left">{t('runtime.cy.tablePro.columns.updated')}</th> : null}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row) => (
                  <Fragment key={row.id}>
                    <tr key={row.id} className="border-b border-white/5 last:border-0">
                      <td className="sticky left-0 bg-[color:var(--fxq-background-surface-low)] px-3 py-2 font-medium">
                        <button type="button" className="text-left underline decoration-dotted" onClick={() => toggleExpanded(row.id)}>
                          {row.workflow}
                        </button>
                      </td>
                      {visibleColumns.lane ? <td className="px-3 py-2">{row.lane}</td> : null}
                      {visibleColumns.state ? <td className="px-3 py-2"><Badge tone={toneByState[row.state]}>{t(`runtime.cy.tablePro.states.${row.state}`)}</Badge></td> : null}
                      {visibleColumns.latencyMs ? <td className="px-3 py-2 fxq-mono">{row.latencyMs}</td> : null}
                      {visibleColumns.updated ? <td className="px-3 py-2">{row.updated}</td> : null}
                    </tr>
                    {expandedRows[row.id] ? (
                      <tr className="border-b border-white/5 last:border-0">
                        <td className="px-3 py-2 text-[color:var(--fxq-text-secondary)]" colSpan={1 + Number(visibleColumns.lane) + Number(visibleColumns.state) + Number(visibleColumns.latencyMs) + Number(visibleColumns.updated)}>
                          {row.details}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-[color:var(--fxq-text-secondary)]">
            {t('runtime.cy.tablePro.pagination', { page: boundedPage, totalPages })}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" disabled={boundedPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
              {t('runtime.cy.tablePro.previous')}
            </Button>
            <Button size="sm" variant="ghost" disabled={boundedPage >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
              {t('runtime.cy.tablePro.next')}
            </Button>
          </div>
        </div>
      </section>
    </DataBoundary>
  );
}
