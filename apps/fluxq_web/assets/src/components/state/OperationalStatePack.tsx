import { useTranslation } from 'react-i18next';
import type { OperationalState } from '@/lib/domain';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const orderedStates: OperationalState[] = [
  'empty',
  'loading',
  'degraded',
  'error',
  'retrying',
  'timeout',
  'fallback_engaged',
  'cancelled',
  'success_recovered'
];

const toneByState: Record<OperationalState, 'neutral' | 'info' | 'warning' | 'error' | 'success'> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'info',
  timeout: 'warning',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success'
};

function keyForState(state: OperationalState): string {
  if (state === 'fallback_engaged') return 'fallbackEngaged';
  if (state === 'success_recovered') return 'successRecovered';
  return state;
}

export function OperationalStatePack() {
  const { t } = useTranslation();

  return (
    <section className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">Operational state pack</h3>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {orderedStates.map((state) => {
          const key = keyForState(state);

          return (
            <div
              key={state}
              className={cn(
                'rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-3',
                state === 'degraded' && 'border-[color:var(--fxq-semantic-warning)]/40',
                state === 'error' && 'border-[color:var(--fxq-semantic-error)]/40',
                state === 'success_recovered' && 'border-[color:var(--fxq-semantic-success)]/40'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{t(`state.${key}.title`)}</div>
                <Badge tone={toneByState[state]}>{state}</Badge>
              </div>
              <div className="mt-2 text-sm text-[color:var(--fxq-text-secondary)]">
                {t(`state.${key}.description`)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
