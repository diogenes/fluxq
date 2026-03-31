import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

export function LivebookLinkageBlock() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <h3 className="fxq-display text-lg font-semibold">{t('runtime.livebook.title')}</h3>
      <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.livebook.subtitle')}</p>
      <div className="grid gap-3 md:grid-cols-3 text-sm">
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.livebook.provenance')}</div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.livebook.checklist')}</div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">{t('runtime.livebook.bundle')}</div>
      </div>
    </Card>
  );
}
