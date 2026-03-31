import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import type { RuntimeLane } from '@/lib/domain';

export interface FluxQWorkspacePageProps {
  readonly lane?: RuntimeLane;
}

export default function FluxQWorkspacePage({
  lane = 'fixture'
}: Readonly<FluxQWorkspacePageProps>) {
  const { t } = useTranslation();

  return (
    <AppShell lane={lane} title={t('workspace.title')} subtitle={t('workspace.description')}>
      <WorkspaceOverview />
    </AppShell>
  );
}
