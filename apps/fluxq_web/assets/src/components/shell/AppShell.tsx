import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ContentCanvas } from '@/components/shell/ContentCanvas';
import { DiagnosticsRail } from '@/components/shell/DiagnosticsRail';
import { SideNav } from '@/components/shell/SideNav';
import { TopNav } from '@/components/shell/TopNav';
import type { RuntimeLane } from '@/lib/domain';
import { cn } from '@/lib/utils';
import { diagnosticsRailItems, shellSections } from '@/data/mockData';
import { useShellState } from '@/hooks/useShellState';

export interface AppShellProps extends PropsWithChildren {
  readonly lane: RuntimeLane;
  readonly title?: string;
  readonly subtitle?: string;
  readonly initialSidebarCollapsed?: boolean;
}

export function AppShell({
  lane,
  title,
  subtitle,
  initialSidebarCollapsed = false,
  children
}: Readonly<AppShellProps>) {
  const { t } = useTranslation();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    diagnosticsCollapsed,
    setDiagnosticsCollapsed
  } = useShellState(initialSidebarCollapsed);

  return (
    <div className="min-h-screen bg-[color:var(--fxq-background-base)] text-[color:var(--fxq-text-primary)]">
      <TopNav
        collapsed={sidebarCollapsed}
        lane={lane}
        onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
        rightActions={
          <Button size="sm" variant="ghost" onClick={() => setDiagnosticsCollapsed((value) => !value)}>
            {t('actions.diagnostics')}
          </Button>
        }
      />

      <div
        className={cn(
          'mx-auto grid w-full gap-4 px-3 py-4 sm:px-4 lg:px-6',
          'xl:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)]'
        )}
      >
        <div className="order-2 min-w-0 xl:order-1">
          <SideNav
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
            sections={shellSections}
          />
        </div>

        <div className="order-1 min-w-0 xl:order-2">
          <ContentCanvas title={title} subtitle={subtitle}>
            {children}
          </ContentCanvas>
        </div>

        <div className="order-3 min-w-0">
          <DiagnosticsRail collapsed={diagnosticsCollapsed} items={diagnosticsRailItems} />
        </div>
      </div>
    </div>
  );
}
