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
    </Card>
  );
}
