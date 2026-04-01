import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { DataBoundaryState } from '@/lib/ui-cx';
import { boundaryStateToTranslationKey, boundaryToneByState } from '@/lib/ui-cx';

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
  const stateKey = boundaryStateToTranslationKey(state);
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
          <Badge tone={boundaryToneByState[state]}>{state}</Badge>
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
