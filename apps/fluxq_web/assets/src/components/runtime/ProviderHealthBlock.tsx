import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProviderHealthBlock() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">{t('runtime.providerHealth.title')}</h3>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.providerHealth.subtitle')}</p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.providerHealth.status')}</div>
          <Badge tone="success" className="mt-2">stable</Badge>
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">{t('runtime.providerHealth.diagnostics')}</div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">{t('runtime.providerHealth.actions')}</div>
      </div>
    </Card>
  );
}
