import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ActionRailActionContract } from '@/lib/ui-cx';

const actions: ActionRailActionContract[] = [
  { id: 'retry', labelKey: 'runtime.cx.actionInspector.actions.retry', tone: 'warning' },
  { id: 'reroute', labelKey: 'runtime.cx.actionInspector.actions.reroute', tone: 'info' },
  { id: 'cancel', labelKey: 'runtime.cx.actionInspector.actions.cancel', tone: 'error' },
  { id: 'bundle', labelKey: 'runtime.cx.actionInspector.actions.bundle', tone: 'neutral' }
];

export function ActionRailInspectorFamily() {
  const { t } = useTranslation();

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.cx.actionInspector.title')}</h3>
        <Badge tone="warning">{t('runtime.cx.actionInspector.severity')}</Badge>
      </div>

      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <section className="min-w-0 space-y-2 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <h4 className="text-sm font-semibold uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.actionRail')}</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {actions.map((action) => (
              <Button
                key={action.id}
                type="button"
                variant={action.tone === 'warning' ? 'secondary' : 'ghost'}
                className={action.tone === 'error' ? 'border-[color:var(--fxq-error)] text-[color:var(--fxq-error)] hover:bg-[color:var(--fxq-error)]/10' : undefined}
              >
                {t(action.labelKey)}
              </Button>
            ))}
          </div>
        </section>

        <aside className="min-w-0 space-y-2 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <h4 className="text-sm font-semibold uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.inspector')}</h4>
          <dl className="space-y-1 text-sm">
            <div className="flex min-w-0 justify-between gap-3">
              <dt className="text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.fields.target')}</dt>
              <dd className="min-w-0 break-all fxq-mono">{t('runtime.cx.actionInspector.values.target')}</dd>
            </div>
            <div className="flex min-w-0 justify-between gap-3">
              <dt className="text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.fields.lane')}</dt>
              <dd className="fxq-mono">{t('runtime.cx.actionInspector.values.lane')}</dd>
            </div>
            <div className="flex min-w-0 justify-between gap-3">
              <dt className="text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.fields.timeout')}</dt>
              <dd className="fxq-mono">{t('runtime.cx.actionInspector.values.timeout')}</dd>
            </div>
            <div className="flex min-w-0 justify-between gap-3">
              <dt className="text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.actionInspector.fields.retries')}</dt>
              <dd className="fxq-mono">{t('runtime.cx.actionInspector.values.retries')}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Card>
  );
}
