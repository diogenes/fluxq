import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DataBoundary } from '@/components/state/DataBoundary';
import {
  normalizeQueryState,
  queryStateToBoundaryState,
  type DataBoundaryState,
  type Lane,
  type QueryStateContract,
  type StructuredLogRecordContract
} from '@/lib/ui-cx';

const logRecords: StructuredLogRecordContract[] = [
  {
    id: 'l-001',
    timestamp: '10:12:04.110',
    level: 'info',
    message: 'Run accepted into queue.',
    attributes: { lane: 'live_smoke', correlation_id: 'corr-42' }
  },
  {
    id: 'l-002',
    timestamp: '10:12:08.561',
    level: 'warning',
    message: 'Retry budget decremented.',
    attributes: { attempt: 2, max_attempts: 5 }
  },
  {
    id: 'l-003',
    timestamp: '10:12:15.029',
    level: 'error',
    message: 'Primary route timed out; fallback engaged.',
    attributes: { timeout_ms: 45000, route: 'primary_route' }
  }
];

export interface LogViewerProps {
  readonly boundaryState?: DataBoundaryState;
  readonly queryState?: QueryStateContract;
}

export function LogViewer({ boundaryState, queryState }: Readonly<LogViewerProps>) {
  const { t } = useTranslation();
  const normalizedQueryState = normalizeQueryState(queryState);
  const [query, setQuery] = useState(normalizedQueryState.query ?? '');
  const [level, setLevel] = useState<'all' | 'debug' | 'info' | 'warning' | 'error'>('all');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const resolvedBoundaryState = boundaryState ?? queryStateToBoundaryState(normalizedQueryState);
  const lane: Lane = normalizedQueryState.lane && normalizedQueryState.lane !== 'all'
    ? normalizedQueryState.lane
    : 'live_smoke';

  const filtered = useMemo(() => {
    return logRecords.filter((record) => {
      if (level !== 'all' && record.level !== level) return false;
      if (query.length > 0 && !record.message.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [level, query]);

  const toggleExpanded = (id: string) => {
    setExpanded((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <DataBoundary state={resolvedBoundaryState} lane={lane} actionLabelKey="actions.export">
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.logViewer.title')}</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">{t('runtime.cy.logViewer.copy')}</Button>
            <Button size="sm" variant="secondary">{t('runtime.cy.logViewer.export')}</Button>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t('runtime.cy.logViewer.searchLabel')}
            placeholder={t('runtime.cy.logViewer.searchPlaceholder')}
          />
          <Select value={level} onChange={(event) => setLevel(event.target.value as typeof level)} aria-label={t('runtime.cy.logViewer.levelLabel')}>
            <option value="all">{t('runtime.cy.logViewer.levels.all')}</option>
            <option value="debug">{t('runtime.cy.logViewer.levels.debug')}</option>
            <option value="info">{t('runtime.cy.logViewer.levels.info')}</option>
            <option value="warning">{t('runtime.cy.logViewer.levels.warning')}</option>
            <option value="error">{t('runtime.cy.logViewer.levels.error')}</option>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm text-[color:var(--fxq-text-secondary)]">
            {t('runtime.cy.logViewer.empty')}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((record) => (
              <div key={record.id} className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/3 p-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={record.level === 'error' ? 'error' : record.level === 'warning' ? 'warning' : 'info'}>
                      {t(`runtime.cy.logViewer.levels.${record.level}`)}
                    </Badge>
                    <span className="fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">{record.timestamp}</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => toggleExpanded(record.id)}>
                    {expanded[record.id] ? t('runtime.cy.logViewer.collapse') : t('runtime.cy.logViewer.expand')}
                  </Button>
                </div>
                <p className="mt-1 text-sm break-words">{record.message}</p>
                {expanded[record.id] && record.attributes ? (
                  <pre className="mt-2 overflow-x-auto rounded-[var(--fxq-radius-sm)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-2 text-xs">
                    {JSON.stringify(record.attributes, null, 2)}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </DataBoundary>
  );
}
