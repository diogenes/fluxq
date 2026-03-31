import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { DataBoundaryState } from '@/lib/ui-cx';

const toneByState: Record<DataBoundaryState, 'neutral' | 'info' | 'warning' | 'error' | 'success'> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'info',
  timeout: 'warning',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success',
  no_access: 'warning',
  policy_blocked: 'error',
  read_only: 'neutral',
  maintenance: 'warning'
};

const keyForState: Record<DataBoundaryState, string> = {
  empty: 'empty',
  loading: 'loading',
  degraded: 'degraded',
  error: 'error',
  retrying: 'retrying',
  timeout: 'timeout',
  fallback_engaged: 'fallbackEngaged',
  cancelled: 'cancelled',
  success_recovered: 'successRecovered',
  no_access: 'noAccess',
  policy_blocked: 'policyBlocked',
  read_only: 'readOnly',
  maintenance: 'maintenance'
};

export interface DataBoundaryProps extends PropsWithChildren {
  readonly state: DataBoundaryState;
  readonly lane?: 'fixture' | 'live_smoke' | 'live';
  readonly actionLabelKey?: string;
  readonly onAction?: () => void;
}

export function DataBoundary({
  state,
  lane = 'fixture',
  actionLabelKey,
  onAction,
  children
}: Readonly<DataBoundaryProps>) {
  const { t } = useTranslation();
  const stateKey = keyForState[state];
  const title = t(`state.${stateKey}.title`);
  const description = t(`state.${stateKey}.description`);

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="fxq-display text-base font-semibold">{title}</h3>
          <p className="text-sm text-[color:var(--fxq-text-secondary)]">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="info">{lane}</Badge>
          <Badge tone={toneByState[state]}>{state}</Badge>
        </div>
      </div>

      {actionLabelKey ? (
        <div className="flex justify-end">
          <Button size="sm" variant="secondary" onClick={onAction}>
            {t(actionLabelKey)}
          </Button>
        </div>
      ) : null}

      <div className="min-w-0 rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/3 p-3">
        {children}
      </div>
    </Card>
  );
}
