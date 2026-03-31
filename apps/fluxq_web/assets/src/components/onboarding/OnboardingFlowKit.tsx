import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { OnboardingStepContract } from '@/lib/ui-cx';

const steps: OnboardingStepContract[] = [
  {
    id: 'step-1',
    titleKey: 'runtime.onboarding.steps.connectTelemetry.title',
    descriptionKey: 'runtime.onboarding.steps.connectTelemetry.description',
    state: 'completed'
  },
  {
    id: 'step-2',
    titleKey: 'runtime.onboarding.steps.configureLane.title',
    descriptionKey: 'runtime.onboarding.steps.configureLane.description',
    state: 'active'
  },
  {
    id: 'step-3',
    titleKey: 'runtime.onboarding.steps.runFixture.title',
    descriptionKey: 'runtime.onboarding.steps.runFixture.description',
    state: 'pending'
  },
  {
    id: 'step-4',
    titleKey: 'runtime.onboarding.steps.reviewFallback.title',
    descriptionKey: 'runtime.onboarding.steps.reviewFallback.description',
    state: 'blocked'
  }
];

const toneByState: Record<OnboardingStepContract['state'], 'neutral' | 'info' | 'success' | 'warning' | 'error'> = {
  pending: 'neutral',
  active: 'info',
  completed: 'success',
  blocked: 'warning'
};

export interface OnboardingFlowKitProps {
  readonly degraded?: boolean;
}

export function OnboardingFlowKit({ degraded = false }: Readonly<OnboardingFlowKitProps>) {
  const { t } = useTranslation();
  const readiness = useMemo(
    () => [
      { id: 'ready-01', text: t('runtime.onboarding.readiness.deterministic'), ok: true },
      { id: 'ready-02', text: t('runtime.onboarding.readiness.traceCorrelation'), ok: true },
      { id: 'ready-03', text: t('runtime.onboarding.readiness.fallbackPath'), ok: !degraded },
      { id: 'ready-04', text: t('runtime.onboarding.readiness.alertRouting'), ok: !degraded }
    ],
    [degraded, t]
  );

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.onboarding.title')}</h3>
          <p className="text-sm text-[color:var(--fxq-text-secondary)]">{t('runtime.onboarding.subtitle')}</p>
        </div>
        <Badge tone={degraded ? 'warning' : 'success'}>
          {degraded ? t('runtime.onboarding.status.needsReview') : t('runtime.onboarding.status.ready')}
        </Badge>
      </div>

      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <section className="min-w-0 space-y-2">
          {steps.map((step, index) => (
            <article key={step.id} className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/4 p-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">{index + 1}</span>
                <h4 className="text-sm font-semibold">{t(step.titleKey)}</h4>
                <Badge tone={toneByState[step.state]}>{t(`runtime.onboarding.stepStates.${step.state}`)}</Badge>
              </div>
              <p className="mt-1 text-sm text-[color:var(--fxq-text-secondary)]">{t(step.descriptionKey)}</p>
            </article>
          ))}
        </section>

        <aside className="min-w-0 space-y-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <h4 className="text-sm font-semibold uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.onboarding.readinessTitle')}</h4>
          <ul className="space-y-1">
            {readiness.map((item) => (
              <li key={item.id} className="flex min-w-0 items-start justify-between gap-2 text-sm">
                <span className="min-w-0 break-words">{item.text}</span>
                <Badge tone={item.ok ? 'success' : 'warning'}>
                  {item.ok ? t('runtime.onboarding.readinessState.ok') : t('runtime.onboarding.readinessState.review')}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button size="sm">{t('runtime.onboarding.actions.continue')}</Button>
            <Button size="sm" variant="secondary">{t('runtime.onboarding.actions.openGuide')}</Button>
          </div>
        </aside>
      </div>
    </Card>
  );
}
