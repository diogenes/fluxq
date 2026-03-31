import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function OperationalStatusStripV2() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.statusStrip.title')}</h3>
        <Badge tone="info">fixture</Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.statusStrip.retryBudget')}</div>
          <div className="mt-1 text-base font-semibold">2 / 5</div>
        </div>

        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.statusStrip.timeoutPolicy')}</div>
          <div className="mt-1 text-base font-semibold">45s step / 120s run</div>
        </div>

        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.statusStrip.fallbackRoute')}</div>
          <div className="mt-1 text-base font-semibold">simulator</div>
        </div>

        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.statusStrip.terminalAttribution')}</div>
          <div className="mt-1 text-base font-semibold">provider_timeout</div>
        </div>
      </div>
    </Card>
  );
}
