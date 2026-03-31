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
    <Card className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
      <div className="min-w-0 space-y-3">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
          <h3 className="fxq-display min-w-0 text-lg font-semibold break-words">{t('runtime.workflowBuilder.title')}</h3>
          <Badge tone={toneByState[validationState]}>{t(`runtime.workflowBuilder.validation.${validationState}`)}</Badge>
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-dashed border-white/20 p-4 text-sm text-[color:var(--fxq-text-secondary)] sm:p-6">
          {t('runtime.workflowBuilder.canvas')}
        </div>
        <div className="min-w-0 rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
          <div className="font-medium">{t('runtime.workflowBuilder.palette')}</div>
          <ul className="mt-2 space-y-1 break-words text-xs text-[color:var(--fxq-text-secondary)]">
            <li>{t('runtime.workflowBuilder.checks.retryPolicy')}</li>
            <li>{t('runtime.workflowBuilder.checks.timeoutFallback')}</li>
            <li>{t('runtime.workflowBuilder.checks.deterministicBaseline')}</li>
          </ul>
        </div>
      </div>
      <div className="min-w-0 rounded-[var(--fxq-radius-md)] border border-white/8 p-3 text-sm">
        <div className="font-medium">{t('runtime.workflowBuilder.inspector')}</div>
        <div className="mt-2 space-y-2 break-words text-xs text-[color:var(--fxq-text-secondary)]">
          <div className="min-w-0 break-words">{t('runtime.workflowBuilder.inspectorFields.nodeType')}</div>
          <div className="min-w-0 break-words">{t('runtime.workflowBuilder.inspectorFields.timeout')}</div>
          <div className="min-w-0 break-words">{t('runtime.workflowBuilder.inspectorFields.fallback')}</div>
          {validationState === 'error' ? (
            <div className="min-w-0 break-words text-[color:var(--fxq-semantic-error)]">{t('runtime.workflowBuilder.validationError')}</div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
