import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RunDetailBlock() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.runDetail.title')}</h3>
          <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.runDetail.subtitle')}</p>
        </div>
        <Badge tone="warning">live_smoke</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[t('runtime.runDetail.timeline'), t('runtime.runDetail.trace'), t('runtime.runDetail.logs'), t('runtime.runDetail.incidentRail')].map((item) => (
          <div key={item} className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/4 p-3 text-sm">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
