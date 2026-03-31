import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface WorkflowBuilderScaffoldProps {
  readonly validationState?: 'valid' | 'warning' | 'error';
}

const toneByState: Record<NonNullable<WorkflowBuilderScaffoldProps['validationState']>, 'success' | 'warning' | 'error'> = {
  valid: 'success',
  warning: 'warning',
  error: 'error'
};

export function WorkflowBuilderScaffold({ validationState = 'warning' }: Readonly<WorkflowBuilderScaffoldProps>) {
  const { t } = useTranslation();

  return (
    <Card className="grid gap-3 md:grid-cols-[1fr_260px]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.workflowBuilder.title')}</h3>
          <Badge tone={toneByState[validationState]}>{t(`runtime.workflowBuilder.validation.${validationState}`)}</Badge>
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-dashed border-white/20 p-6 text-sm text-[color:var(--fxq-text-secondary)]">
          {t('runtime.workflowBuilder.canvas')}
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
          <div className="font-medium">{t('runtime.workflowBuilder.palette')}</div>
          <ul className="mt-2 space-y-1 text-xs text-[color:var(--fxq-text-secondary)]">
            <li>{t('runtime.workflowBuilder.checks.retryPolicy')}</li>
            <li>{t('runtime.workflowBuilder.checks.timeoutFallback')}</li>
            <li>{t('runtime.workflowBuilder.checks.deterministicBaseline')}</li>
          </ul>
        </div>
      </div>
      <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
        <div className="font-medium">{t('runtime.workflowBuilder.inspector')}</div>
        <div className="mt-2 space-y-2 text-xs text-[color:var(--fxq-text-secondary)]">
          <div>{t('runtime.workflowBuilder.inspectorFields.nodeType')}</div>
          <div>{t('runtime.workflowBuilder.inspectorFields.timeout')}</div>
          <div>{t('runtime.workflowBuilder.inspectorFields.fallback')}</div>
          {validationState === 'error' ? (
            <div className="text-[color:var(--fxq-semantic-error)]">{t('runtime.workflowBuilder.validationError')}</div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
