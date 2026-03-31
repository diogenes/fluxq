import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DenseRow, Table } from '@/components/ui/table';
import type { Lane } from '@/lib/ui-cx';

interface TabRow {
  readonly id: string;
  readonly workflow: string;
  readonly lane: Lane;
  readonly state: 'healthy' | 'degraded' | 'timeout';
  readonly latencyMs: number;
  readonly drift: 'low' | 'medium' | 'high';
}

const rows: TabRow[] = [
  { id: 'row-01', workflow: 'portability-check', lane: 'fixture', state: 'healthy', latencyMs: 42, drift: 'low' },
  { id: 'row-02', workflow: 'provider-health-audit', lane: 'live_smoke', state: 'degraded', latencyMs: 84, drift: 'medium' },
  { id: 'row-03', workflow: 'hybrid-optimizer', lane: 'live', state: 'timeout', latencyMs: 190, drift: 'high' },
  { id: 'row-04', workflow: 'trace-pack-validation', lane: 'fixture', state: 'healthy', latencyMs: 36, drift: 'low' }
];

type TabKey = 'all' | 'degraded' | 'timeouts';

const toneByState: Record<TabRow['state'], 'success' | 'warning' | 'error'> = {
  healthy: 'success',
  degraded: 'warning',
  timeout: 'error'
};

export function FilterTabbedTableFamily() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [lane, setLane] = useState<'all' | Lane>('all');
  const [tab, setTab] = useState<TabKey>('all');

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      if (lane !== 'all' && row.lane !== lane) return false;
      if (query.length > 0 && !row.workflow.toLowerCase().includes(query.toLowerCase())) return false;
      if (tab === 'degraded' && row.state !== 'degraded') return false;
      if (tab === 'timeouts' && row.state !== 'timeout') return false;
      return true;
    });
  }, [lane, query, tab]);

  return (
    <section className="space-y-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cx.filterTable.title')}</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant={tab === 'all' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTab('all')}>
            {t('runtime.cx.filterTable.tabs.all')}
          </Button>
          <Button type="button" variant={tab === 'degraded' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTab('degraded')}>
            {t('runtime.cx.filterTable.tabs.degraded')}
          </Button>
          <Button type="button" variant={tab === 'timeouts' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTab('timeouts')}>
            {t('runtime.cx.filterTable.tabs.timeouts')}
          </Button>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Input
          aria-label={t('runtime.cx.filterTable.queryLabel')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('runtime.cx.filterTable.queryPlaceholder')}
        />
        <Select value={lane} onChange={(event) => setLane(event.target.value as 'all' | Lane)} aria-label={t('runtime.cx.filterTable.laneLabel')}>
          <option value="all">{t('runtime.cx.filterTable.laneOptions.all')}</option>
          <option value="fixture">{t('runtime.cx.filterTable.laneOptions.fixture')}</option>
          <option value="live_smoke">{t('runtime.cx.filterTable.laneOptions.live_smoke')}</option>
          <option value="live">{t('runtime.cx.filterTable.laneOptions.live')}</option>
        </Select>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-[color:var(--fxq-text-secondary)]">
            <th className="px-3 py-2 text-left">{t('runtime.cx.filterTable.headers.workflow')}</th>
            <th className="px-3 py-2 text-left">{t('runtime.cx.filterTable.headers.lane')}</th>
            <th className="px-3 py-2 text-left">{t('runtime.cx.filterTable.headers.state')}</th>
            <th className="px-3 py-2 text-left">{t('runtime.cx.filterTable.headers.latency')}</th>
            <th className="px-3 py-2 text-left">{t('runtime.cx.filterTable.headers.drift')}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row) => (
            <DenseRow key={row.id}>
              <td className="px-3 py-2 font-medium">{row.workflow}</td>
              <td className="px-3 py-2">{row.lane}</td>
              <td className="px-3 py-2"><Badge tone={toneByState[row.state]}>{row.state}</Badge></td>
              <td className="px-3 py-2 fxq-mono">{row.latencyMs}ms</td>
              <td className="px-3 py-2">{row.drift}</td>
            </DenseRow>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
