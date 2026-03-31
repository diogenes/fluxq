import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function PortabilityDecisionFrame() {
  const { t } = useTranslation();

  return (
    <div className="grid min-w-0 gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3 lg:grid-cols-3">
      <div className="min-w-0">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.confidenceBand')}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge tone="warning">{t('runtime.portabilityDecision.confidenceValue')}</Badge>
          <span className="min-w-0 break-words text-sm">{t('runtime.portabilityDecision.confidenceHint')}</span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.sampleQuality')}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge tone="info">{t('runtime.portabilityDecision.sampleQualityValue')}</Badge>
          <span className="min-w-0 break-words text-sm">{t('runtime.portabilityDecision.sampleCount')}</span>
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.portabilityDecision.recommendedAction')}</div>
        <Button size="sm" variant="secondary" className="w-full whitespace-normal break-words sm:w-auto">
          {t('runtime.portabilityDecision.compareBaseline')}
        </Button>
      </div>
    </div>
  );
}
