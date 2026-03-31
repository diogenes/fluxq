import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

export function TelemetryChartStub() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">{t('runtime.telemetry.title')}</h3>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.telemetry.subtitle')}</p>
      <div className="grid grid-cols-12 gap-2">
        {[24, 40, 32, 56, 46, 38, 60, 44, 52, 34, 28, 48].map((height, index) => (
          <div key={index} className="rounded-sm bg-[color:var(--fxq-action-primary-end)]/70" style={{ height }} />
        ))}
      </div>
    </Card>
  );
}
