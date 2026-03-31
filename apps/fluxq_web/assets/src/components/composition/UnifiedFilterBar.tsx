import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface UnifiedFilterValue {
  readonly query: string;
  readonly lane: string;
  readonly status: string;
  readonly target: string;
  readonly timeWindow: string;
}

export interface UnifiedFilterBarProps {
  readonly defaultValue?: UnifiedFilterValue;
  readonly onChange?: (value: UnifiedFilterValue) => void;
}

const defaultValue: UnifiedFilterValue = {
  query: '',
  lane: 'all',
  status: 'all',
  target: 'all',
  timeWindow: '1h'
};

export function UnifiedFilterBar({ defaultValue: initial, onChange }: Readonly<UnifiedFilterBarProps>) {
  const { t } = useTranslation();
  const [value, setValue] = useState<UnifiedFilterValue>(initial ?? defaultValue);

  const activeChips = useMemo(() => {
    const chips: Array<{ key: keyof UnifiedFilterValue; label: string }> = [];

    if (value.lane !== 'all') chips.push({ key: 'lane', label: `${t('filters.laneLabel')}: ${t(`filters.laneOptions.${value.lane}`)}` });
    if (value.status !== 'all') chips.push({ key: 'status', label: `${t('filters.statusLabel')}: ${t(`filters.statusOptions.${value.status}`)}` });
    if (value.target !== 'all') chips.push({ key: 'target', label: `${t('filters.targetLabel')}: ${t(`filters.targetOptions.${value.target}`)}` });
    if (value.timeWindow !== 'all') chips.push({ key: 'timeWindow', label: `${t('filters.timeWindowLabel')}: ${t(`filters.timeOptions.${value.timeWindow}`)}` });

    return chips;
  }, [value, t]);

  const update = <K extends keyof UnifiedFilterValue>(key: K, nextValue: UnifiedFilterValue[K]) => {
    const next = { ...value, [key]: nextValue };
    setValue(next);
    onChange?.(next);
  };

  const clearFilters = () => {
    setValue(defaultValue);
    onChange?.(defaultValue);
  };

  return (
    <section className="space-y-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-base font-semibold">{t('filters.title')}</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>{t('filters.clear')}</Button>
          <Button variant="secondary" size="sm">{t('filters.apply')}</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Input
          value={value.query}
          onChange={(event) => update('query', event.target.value)}
          placeholder={t('filters.queryPlaceholder')}
          aria-label={t('filters.queryLabel')}
          className="xl:col-span-1"
        />

        <Select value={value.lane} onChange={(event) => update('lane', event.target.value)} aria-label={t('filters.laneLabel')}>
          <option value="all">{t('filters.laneOptions.all')}</option>
          <option value="fixture">{t('filters.laneOptions.fixture')}</option>
          <option value="live_smoke">{t('filters.laneOptions.live_smoke')}</option>
          <option value="live">{t('filters.laneOptions.live')}</option>
        </Select>

        <Select value={value.status} onChange={(event) => update('status', event.target.value)} aria-label={t('filters.statusLabel')}>
          <option value="all">{t('filters.statusOptions.all')}</option>
          <option value="queued">{t('filters.statusOptions.queued')}</option>
          <option value="running">{t('filters.statusOptions.running')}</option>
          <option value="retrying">{t('filters.statusOptions.retrying')}</option>
          <option value="degraded">{t('filters.statusOptions.degraded')}</option>
          <option value="timeout">{t('filters.statusOptions.timeout')}</option>
          <option value="failed">{t('filters.statusOptions.failed')}</option>
          <option value="cancelled">{t('filters.statusOptions.cancelled')}</option>
          <option value="success_recovered">{t('filters.statusOptions.success_recovered')}</option>
        </Select>

        <Select value={value.target} onChange={(event) => update('target', event.target.value)} aria-label={t('filters.targetLabel')}>
          <option value="all">{t('filters.targetOptions.all')}</option>
          <option value="primary_route">{t('filters.targetOptions.primary_route')}</option>
          <option value="fallback_route">{t('filters.targetOptions.fallback_route')}</option>
          <option value="simulator">{t('filters.targetOptions.simulator')}</option>
        </Select>

        <Select value={value.timeWindow} onChange={(event) => update('timeWindow', event.target.value)} aria-label={t('filters.timeWindowLabel')}>
          <option value="15m">{t('filters.timeOptions.15m')}</option>
          <option value="1h">{t('filters.timeOptions.1h')}</option>
          <option value="6h">{t('filters.timeOptions.6h')}</option>
          <option value="24h">{t('filters.timeOptions.24h')}</option>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeChips.length === 0 ? (
          <Badge tone="neutral">{t('filters.noActiveFilters')}</Badge>
        ) : (
          activeChips.map((chip) => (
            <Badge key={chip.key} tone="info">{chip.label}</Badge>
          ))
        )}
      </div>
    </section>
  );
}
