import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { ActionGuardContract, DataBoundaryState } from '@/lib/ui-cx';

const guardedActions: ActionGuardContract[] = [
  {
    actionId: 'retry-step',
    labelKey: 'runtime.cy.actionGuard.actions.retryStep',
    requiresConfirmation: false
  },
  {
    actionId: 'reroute-safe',
    labelKey: 'runtime.cy.actionGuard.actions.rerouteSafe',
    requiresConfirmation: true
  },
  {
    actionId: 'cancel-run',
    labelKey: 'runtime.cy.actionGuard.actions.cancelRun',
    requiresConfirmation: true,
    policyState: 'read_only'
  }
];

const toneByPolicy: Record<Extract<DataBoundaryState, 'policy_blocked' | 'read_only' | 'maintenance'>, 'error' | 'neutral' | 'warning'> = {
  policy_blocked: 'error',
  read_only: 'neutral',
  maintenance: 'warning'
};

export function ActionGuard() {
  const { t } = useTranslation();
  const [pendingAction, setPendingAction] = useState<ActionGuardContract | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [lastActionId, setLastActionId] = useState<string | null>(null);

  const canConfirm = useMemo(() => {
    if (!pendingAction) return false;
    return confirmText.trim().toLowerCase() === pendingAction.actionId;
  }, [confirmText, pendingAction]);

  const handleAction = (action: ActionGuardContract) => {
    if (action.policyState) return;
    if (!action.requiresConfirmation) {
      setLastActionId(action.actionId);
      return;
    }
    setPendingAction(action);
    setConfirmText('');
  };

  const closeDialog = () => {
    setPendingAction(null);
    setConfirmText('');
  };

  const confirmDialog = () => {
    if (!pendingAction || !canConfirm) return;
    setLastActionId(pendingAction.actionId);
    closeDialog();
  };

  return (
    <section className="space-y-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.actionGuard.title')}</h3>
        {lastActionId ? (
          <Badge tone="success">{t('runtime.cy.actionGuard.lastAction', { id: lastActionId })}</Badge>
        ) : (
          <Badge tone="info">{t('runtime.cy.actionGuard.idle')}</Badge>
        )}
      </div>

      <p className="text-sm text-[color:var(--fxq-text-secondary)]">
        {t('runtime.cy.actionGuard.description')}
      </p>

      <div className="grid min-w-0 gap-2 sm:grid-cols-3">
        {guardedActions.map((action) => (
          <div key={action.actionId} className="min-w-0 rounded-[var(--fxq-radius-sm)] border border-white/8 p-2">
            <div className="min-w-0 text-sm font-medium break-words">{t(action.labelKey)}</div>
            <div className="mt-1 flex flex-wrap gap-2">
              <Badge tone={action.requiresConfirmation ? 'warning' : 'info'}>
                {action.requiresConfirmation
                  ? t('runtime.cy.actionGuard.requiresConfirmation')
                  : t('runtime.cy.actionGuard.safe')}
              </Badge>
              {action.policyState ? (
                <Badge tone={toneByPolicy[action.policyState]}>
                  {t(`runtime.cy.actionGuard.policies.${action.policyState}`)}
                </Badge>
              ) : null}
            </div>
            <Button
              type="button"
              size="sm"
              className="mt-2 w-full"
              disabled={Boolean(action.policyState)}
              onClick={() => handleAction(action)}
            >
              {t('runtime.cy.actionGuard.execute')}
            </Button>
          </div>
        ))}
      </div>

      <Dialog
        title={t('runtime.cy.actionGuard.confirmTitle')}
        description={t('runtime.cy.actionGuard.confirmDescription', { token: pendingAction?.actionId ?? '-' })}
        open={Boolean(pendingAction)}
      >
        <div className="space-y-3">
          <Input
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            placeholder={t('runtime.cy.actionGuard.confirmPlaceholder')}
            aria-label={t('runtime.cy.actionGuard.confirmLabel')}
          />
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" size="sm" variant="ghost" onClick={closeDialog}>
              {t('runtime.cy.actionGuard.cancel')}
            </Button>
            <Button type="button" size="sm" variant="secondary" disabled={!canConfirm} onClick={confirmDialog}>
              {t('runtime.cy.actionGuard.confirm')}
            </Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
