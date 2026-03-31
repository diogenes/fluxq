import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Table, DenseRow } from '@/components/ui/table';
import type { OperationalState } from '@/lib/domain';

interface DenseRowModel {
  readonly id: string;
  readonly workflowRun: string;
  readonly lane: 'fixture' | 'live_smoke' | 'live';
  readonly status: OperationalState;
  readonly queueWaitMs: number;
  readonly executionDurationMs: number;
  readonly retryBudget: string;
  readonly terminalAttribution: string;
  readonly comparability: 'green' | 'amber' | 'red';
  readonly updatedLabel: string;
  readonly updatedAgoSeconds: number;
}

const rows: DenseRowModel[] = [
  {
    id: 'run-042',
    workflowRun: 'qml-portability-check / run-042',
    lane: 'live_smoke',
    status: 'retrying',
    queueWaitMs: 820,
    executionDurationMs: 14210,
    retryBudget: '2 / 5',
    terminalAttribution: 'timeout_signal',
    comparability: 'amber',
    updatedLabel: '12s ago',
    updatedAgoSeconds: 12
  },
  {
    id: 'run-041',
    workflowRun: 'qml-portability-check / run-041',
    lane: 'fixture',
    status: 'success_recovered',
    queueWaitMs: 210,
    executionDurationMs: 9800,
    retryBudget: '0 / 5',
    terminalAttribution: 'success_recovered',
    comparability: 'green',
    updatedLabel: '1m ago',
    updatedAgoSeconds: 60
  },
  {
    id: 'run-040',
    workflowRun: 'hybrid-optimizer / run-040',
    lane: 'live',
    status: 'timeout',
    queueWaitMs: 1540,
    executionDurationMs: 45600,
    retryBudget: '5 / 5',
    terminalAttribution: 'timeout_exceeded',
    comparability: 'red',
    updatedLabel: '2m ago',
    updatedAgoSeconds: 120
  }
];

type SortKey = 'queueWaitMs' | 'executionDurationMs' | 'updated';

const toneByStatus: Record<OperationalState, 'neutral' | 'info' | 'warning' | 'error' | 'success'> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'warning',
  timeout: 'error',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success'
};

const toneByComparability: Record<DenseRowModel['comparability'], 'success' | 'warning' | 'error'> = {
  green: 'success',
  amber: 'warning',
  red: 'error'
};

export function DenseDataTable() {
  const { t } = useTranslation();
  const [sort, setSort] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'updated',
    direction: 'asc'
  });

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const multiplier = sort.direction === 'asc' ? 1 : -1;

      if (sort.key === 'updated') {
        return (a.updatedAgoSeconds - b.updatedAgoSeconds) * multiplier;
      }

      return ((a[sort.key] as number) - (b[sort.key] as number)) * multiplier;
    });

    return copy;
  }, [sort]);

  const toggleSort = (key: SortKey) => {
    setSort((current) => {
      if (current.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }

      return { key, direction: 'asc' };
    });
  };

  const sortAttrFor = (key: SortKey) => {
    if (sort.key !== key) return 'none';
    return sort.direction === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <Table>
      <thead>
        <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-[color:var(--fxq-text-secondary)]">
          <th className="sticky left-0 bg-[color:var(--fxq-background-surface-low)] px-3 py-2">{t('runtime.denseTable.headers.workflowRun')}</th>
          <th className="px-3 py-2">{t('runtime.denseTable.headers.lane')}</th>
          <th className="px-3 py-2">{t('runtime.denseTable.headers.status')}</th>
          <th className="px-3 py-2" aria-sort={sortAttrFor('queueWaitMs')}>
            <button type="button" className="text-inherit" onClick={() => toggleSort('queueWaitMs')}>
              {t('runtime.denseTable.headers.queueWait')}
            </button>
          </th>
          <th className="px-3 py-2" aria-sort={sortAttrFor('executionDurationMs')}>
            <button type="button" className="text-inherit" onClick={() => toggleSort('executionDurationMs')}>
              {t('runtime.denseTable.headers.executionDuration')}
            </button>
          </th>
          <th className="px-3 py-2">{t('runtime.denseTable.headers.retryBudget')}</th>
          <th className="px-3 py-2">{t('runtime.denseTable.headers.terminalAttribution')}</th>
          <th className="px-3 py-2">{t('runtime.denseTable.headers.comparability')}</th>
          <th className="px-3 py-2" aria-sort={sortAttrFor('updated')}>
            <button type="button" className="text-inherit" onClick={() => toggleSort('updated')}>
              {t('runtime.denseTable.headers.updated')}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <DenseRow key={row.id}>
            <td className="sticky left-0 bg-[color:var(--fxq-background-surface-low)] px-3 py-2 font-medium">{row.workflowRun}</td>
            <td className="px-3 py-2">{row.lane}</td>
            <td className="px-3 py-2"><Badge tone={toneByStatus[row.status]}>{row.status}</Badge></td>
            <td className="px-3 py-2 fxq-mono">{row.queueWaitMs}</td>
            <td className="px-3 py-2 fxq-mono">{row.executionDurationMs}</td>
            <td className="px-3 py-2">{row.retryBudget}</td>
            <td className="px-3 py-2">{t(`runtime.denseTable.terminalAttribution.${row.terminalAttribution}`)}</td>
            <td className="px-3 py-2"><Badge tone={toneByComparability[row.comparability]}>{row.comparability}</Badge></td>
            <td className="px-3 py-2">{row.updatedLabel}</td>
          </DenseRow>
        ))}
      </tbody>
    </Table>
  );
}
