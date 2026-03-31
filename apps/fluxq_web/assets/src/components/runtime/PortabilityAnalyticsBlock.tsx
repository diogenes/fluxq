import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { PortabilityDecisionFrame } from '@/components/runtime/PortabilityDecisionFrame';

export function PortabilityAnalyticsBlock() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">{t('runtime.portability.title')}</h3>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.portability.subtitle')}</p>
      <div className="grid gap-3 md:grid-cols-3 text-sm">
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.portability.matrix')}</div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.portability.confidence')}</div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.portability.sampleQuality')}</div>
      </div>
      <PortabilityDecisionFrame />
    </Card>
  );
}
