import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

export function WorkflowBuilderScaffold() {
  const { t } = useTranslation();

  return (
    <Card className="grid gap-3 md:grid-cols-[1fr_260px]">
      <div className="space-y-3">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.workflowBuilder.title')}</h3>
        <div className="rounded-[var(--fxq-radius-md)] border border-dashed border-white/20 p-6 text-sm text-[color:var(--fxq-text-secondary)]">
          {t('runtime.workflowBuilder.canvas')}
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">{t('runtime.workflowBuilder.palette')}</div>
      </div>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">{t('runtime.workflowBuilder.inspector')}</div>
    </Card>
  );
}
