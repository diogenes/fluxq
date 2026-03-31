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
      {
        stateKey: 'state.retrying.title',
        transition: reducedMotion ? t('runtime.motion.transitions.none') : t('runtime.motion.transitions.pulseIn'),
        duration
      },
      {
        stateKey: 'state.timeout.title',
        transition: reducedMotion ? t('runtime.motion.transitions.none') : t('runtime.motion.transitions.attentionHighlight'),
        duration
      },
      {
        stateKey: 'state.fallbackEngaged.title',
        transition: reducedMotion ? t('runtime.motion.transitions.none') : t('runtime.motion.transitions.routeShift'),
        duration
      },
      {
        stateKey: 'state.successRecovered.title',
        transition: reducedMotion ? t('runtime.motion.transitions.none') : t('runtime.motion.transitions.settleFade'),
        duration
      }
    ],
    [duration, reducedMotion, t]
  );

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.motion.title')}</h3>
        <Badge tone={reducedMotion ? 'warning' : 'info'}>
          {reducedMotion ? t('runtime.motion.reduced') : t('runtime.motion.standard')}
        </Badge>
      </div>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">
        {t('runtime.motion.transitionDuration')}: {duration}
      </p>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
        {t('state.retrying.title')}
        {' -> '}
        {t('state.successRecovered.title')}
        {' -> '}
        {t('state.degraded.title')}
      </div>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.motion.policyMatrix')}</div>
        <div className="mt-2 grid gap-2 text-xs">
          {policies.map((policy) => (
            <div key={policy.stateKey} className="grid grid-cols-3 gap-2 border-b border-white/8 pb-2 last:border-b-0 last:pb-0">
              <span className="fxq-mono">{t(policy.stateKey)}</span>
              <span>{policy.transition}</span>
              <span className="text-[color:var(--fxq-text-secondary)]">{policy.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
