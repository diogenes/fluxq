import type { ComponentType, SVGProps } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpenText,
  ChartColumn,
  ChevronLeft,
  History,
  LayoutDashboard,
  Settings2,
  Shield,
  Workflow
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ReadonlyNavItem, ReadonlyNavSection } from '@/lib/domain';
import { cn } from '@/lib/utils';

export interface SideNavProps {
  readonly collapsed: boolean;
  readonly sections: ReadonlyArray<ReadonlyNavSection>;
  readonly onToggleCollapse: () => void;
}

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'layout-dashboard': LayoutDashboard,
  history: History,
  activity: Activity,
  'chart-column': ChartColumn,
  'alert-triangle': AlertTriangle,
  workflow: Workflow,
  'book-open-text': BookOpenText,
  settings: Settings2,
  shield: Shield
};

function NavIcon({ name }: Readonly<{ name: string }>) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className="h-4 w-4 shrink-0" />;
}

function NavItemRow({
  item,
  collapsed
}: Readonly<{ item: ReadonlyNavItem; collapsed: boolean }>) {
  const { t } = useTranslation();

  return (
    <a
      className={cn(
        'group flex items-center gap-3 rounded-[var(--fxq-radius-md)] px-3 py-2 text-sm transition-colors duration-150 hover:bg-white/5 hover:text-white',
        collapsed ? 'justify-center px-2' : 'justify-start'
      )}
      href={item.href}
    >
      <NavIcon name={item.icon} />
      {!collapsed ? (
        <>
          <span className="min-w-0 flex-1 truncate">{t(item.labelKey)}</span>
          {item.shortcut ? (
            <span className="fxq-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fxq-text-secondary)]">
              {item.shortcut}
            </span>
          ) : null}
        </>
      ) : null}
      {!collapsed && item.tone ? <Badge tone={item.tone}>{item.tone}</Badge> : null}
    </a>
  );
}

export function SideNav({ collapsed, sections, onToggleCollapse }: Readonly<SideNavProps>) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'fxq-panel-rail relative flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] p-3',
        collapsed ? 'w-full xl:w-[92px]' : 'w-full xl:w-[280px]'
      )}
    >
      <div className="flex items-center justify-between gap-3 px-1 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--fxq-radius-md)] fxq-gradient-action text-[#0b0f1a]">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          {!collapsed ? (
            <div>
              <div className="fxq-display text-sm font-semibold">{t('app.brand')}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--fxq-text-secondary)]">
                {t('workspace.title')}
              </div>
            </div>
          ) : null}
        </div>
        <Button
          aria-label={collapsed ? t('actions.expandSidebar') : t('actions.collapseSidebar')}
          onClick={onToggleCollapse}
          size="sm"
          variant="ghost"
          className="hidden lg:inline-flex"
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      <div className="space-y-4 overflow-y-auto pr-1">
        {sections.map((section) => (
          <section key={section.key} className="space-y-2">
            {!collapsed ? (
              <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--fxq-text-secondary)]">
                {t(section.titleKey)}
              </div>
            ) : null}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItemRow key={item.key} item={item} collapsed={collapsed} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {!collapsed ? (
        <div className="mt-auto border-t border-white/8 pt-4">
          <Badge tone="neutral" className="mb-3">
            {t('app.lane.fixture')} / {t('app.lane.liveSmoke')} / {t('app.lane.live')}
          </Badge>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1">
              {t('actions.review')}
            </Button>
            <Button size="sm" variant="ghost">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
