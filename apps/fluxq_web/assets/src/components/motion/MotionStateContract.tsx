import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface MotionStateContractProps {
  readonly reducedMotion?: boolean;
}

export function MotionStateContract({ reducedMotion = false }: Readonly<MotionStateContractProps>) {
  const { t } = useTranslation();

  const duration = useMemo(() => (reducedMotion ? '0ms' : '180ms'), [reducedMotion]);
  const policies = useMemo(
    () => [
      { state: 'retrying', transition: reducedMotion ? 'none' : 'pulse-in', duration },
      { state: 'timeout', transition: reducedMotion ? 'none' : 'attention-highlight', duration },
      { state: 'fallback_engaged', transition: reducedMotion ? 'none' : 'route-shift', duration },
      { state: 'success_recovered', transition: reducedMotion ? 'none' : 'settle-fade', duration }
    ],
    [duration, reducedMotion]
  );

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="fxq-display text-lg font-semibold">Motion/state contract</h3>
        <Badge tone={reducedMotion ? 'warning' : 'info'}>{reducedMotion ? 'reduced-motion' : 'standard-motion'}</Badge>
      </div>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">Transition duration: {duration}</p>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
        {t('state.retrying.title')}
        {' -> '}
        {t('state.successRecovered.title')}
        {' -> '}
        {t('state.degraded.title')}
      </div>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">policy matrix</div>
        <div className="mt-2 grid gap-2 text-xs">
          {policies.map((policy) => (
            <div key={policy.state} className="grid grid-cols-3 gap-2 border-b border-white/8 pb-2 last:border-b-0 last:pb-0">
              <span className="fxq-mono">{policy.state}</span>
              <span>{policy.transition}</span>
              <span className="text-[color:var(--fxq-text-secondary)]">{policy.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
