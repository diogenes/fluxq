import type { ReactNode } from 'react';
import { Menu, Search, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RuntimeLane } from '@/lib/domain';

export interface TopNavProps {
  readonly lane: RuntimeLane;
  readonly collapsed: boolean;
  readonly onToggleSidebar: () => void;
  readonly rightActions?: ReactNode;
}

const laneTone: Record<RuntimeLane, 'info' | 'warning' | 'success'> = {
  fixture: 'info',
  live_smoke: 'warning',
  live: 'success'
};

export function TopNav({
  lane,
  collapsed,
  onToggleSidebar,
  rightActions
}: Readonly<TopNavProps>) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[color:color-mix(in_srgb,var(--fxq-background-base)_86%,black_14%)]/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            aria-label={collapsed ? t('actions.expandSidebar') : t('actions.collapseSidebar')}
            onClick={onToggleSidebar}
            size="sm"
            variant="ghost"
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--fxq-radius-md)] border border-white/10 fxq-gradient-action text-[#0b0f1a] shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="fxq-display truncate text-base font-bold tracking-tight sm:text-lg">
                {t('app.brand')}
              </div>
              <div className="truncate text-xs text-[color:var(--fxq-text-secondary)] sm:text-sm">
                {t('app.subtitle')}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <label className="flex w-full max-w-xl items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-[color:var(--fxq-text-secondary)]">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">{t('shell.topNav.search')}</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Badge tone={laneTone[lane]}>{t(`app.lane.${lane === 'live_smoke' ? 'liveSmoke' : lane}`)}</Badge>
          <Button size="sm" variant="secondary" className="hidden sm:inline-flex">
            {t('shell.topNav.primaryAction')}
          </Button>
          {rightActions ? <div className="hidden lg:flex items-center gap-2">{rightActions}</div> : null}
        </div>
      </div>
      <div className="border-t border-white/6 px-4 py-2 sm:px-6 lg:hidden">
        <label className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-[color:var(--fxq-text-secondary)]">
          <Search className="h-4 w-4 shrink-0" />
          <span className="truncate">{t('shell.topNav.search')}</span>
        </label>
      </div>
    </header>
  );
}
