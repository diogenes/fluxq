import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function PortabilityDecisionFrame() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3 lg:grid-cols-3">
      <div>
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.confidenceBand')}</div>
        <div className="mt-1 flex items-center gap-2">
          <Badge tone="warning">{t('runtime.portabilityDecision.confidenceValue')}</Badge>
          <span className="text-sm">{t('runtime.portabilityDecision.confidenceHint')}</span>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.sampleQuality')}</div>
        <div className="mt-1 flex items-center gap-2">
          <Badge tone="info">{t('runtime.portabilityDecision.sampleQualityValue')}</Badge>
          <span className="text-sm">{t('runtime.portabilityDecision.sampleCount')}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.recommendedAction')}</div>
        <Button size="sm" variant="secondary">{t('runtime.portabilityDecision.compareBaseline')}</Button>
      </div>
    </div>
  );
}
