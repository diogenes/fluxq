import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { runtimeLanes, shellStateCards } from '@/data/mockData';

export function WorkspaceOverview() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        {runtimeLanes.map((lane) => (
          <Card key={lane} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="fxq-display text-base font-semibold">{t(`app.lane.${lane === 'live_smoke' ? 'liveSmoke' : lane}`)}</div>
              <Badge tone={lane === 'live' ? 'success' : lane === 'live_smoke' ? 'warning' : 'info'}>
                {t('workspace.laneBadge')}
              </Badge>
            </div>
            <div className="text-sm text-[color:var(--fxq-text-secondary)]">
              {lane === 'fixture'
                ? t('workspace.fixtureDescription')
                : lane === 'live_smoke'
                  ? t('workspace.liveSmokeDescription')
                  : t('workspace.liveDescription')}
            </div>
            <Button size="sm" variant="secondary">
              {t('actions.compare')}
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between gap-3 pb-3">
          <div>
            <div className="fxq-display text-lg font-semibold">{t('workspace.title')}</div>
            <div className="text-sm text-[color:var(--fxq-text-secondary)]">{t('workspace.description')}</div>
          </div>
          <Badge tone="neutral">{t('workspace.statePackLabel')}</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {shellStateCards.map((card) => (
            <div key={card.key} className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/3 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{t(card.titleKey)}</div>
                <Badge tone="neutral">{card.state}</Badge>
              </div>
              <div className="mt-2 text-sm text-[color:var(--fxq-text-secondary)]">{t(card.descriptionKey)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
