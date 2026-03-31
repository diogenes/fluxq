import { useTranslation } from 'react-i18next';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface IncidentActionRailProps {
  readonly severity?: 'S1' | 'S2' | 'S3';
}

const toneBySeverity: Record<NonNullable<IncidentActionRailProps['severity']>, 'error' | 'warning' | 'info'> = {
  S1: 'error',
  S2: 'warning',
  S3: 'info'
};

export function IncidentActionRail({ severity = 'S2' }: Readonly<IncidentActionRailProps>) {
  const { t } = useTranslation();

  return (
    <aside className="space-y-3 rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-3">
      <div className="flex items-center justify-between">
        <h4 className="fxq-display text-sm font-semibold">{t('runtime.incidentRail.title')}</h4>
        <Badge tone={toneBySeverity[severity]}>{severity}</Badge>
      </div>

      <Alert tone={toneBySeverity[severity]} title={t('runtime.incidentRail.summaryTitle')}>
        {t('runtime.incidentRail.summaryDescription')}
      </Alert>

      <div className="grid gap-2">
        <Button size="sm">{t('actions.retry')}</Button>
        <Button size="sm" variant="secondary">{t('actions.reroute')}</Button>
        <Button size="sm" variant="secondary">{t('actions.export')}</Button>
        <Button size="sm" variant="ghost">{t('actions.acknowledge')}</Button>
      </div>
    </aside>
  );
}
