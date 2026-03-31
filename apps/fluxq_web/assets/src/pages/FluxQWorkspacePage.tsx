import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import { OperationalStatePack } from '@/components/state/OperationalStatePack';
import { CorePrimitivesShowcase } from '@/components/composition/CorePrimitivesShowcase';
import { RunDetailBlock } from '@/components/runtime/RunDetailBlock';
import { ProviderHealthBlock } from '@/components/runtime/ProviderHealthBlock';
import { PortabilityAnalyticsBlock } from '@/components/runtime/PortabilityAnalyticsBlock';
import { LivebookLinkageBlock } from '@/components/runtime/LivebookLinkageBlock';
import { WorkflowBuilderScaffold } from '@/components/workflow/WorkflowBuilderScaffold';
import { MotionStateContract } from '@/components/motion/MotionStateContract';
import { TelemetryChartStub } from '@/components/charts/TelemetryChartStub';
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
      <div className="space-y-4">
        <WorkspaceOverview />
        <OperationalStatePack />
        <CorePrimitivesShowcase />
        <RunDetailBlock />
        <ProviderHealthBlock />
        <PortabilityAnalyticsBlock />
        <LivebookLinkageBlock />
        <WorkflowBuilderScaffold />
        <MotionStateContract reducedMotion={false} />
        <TelemetryChartStub />
      </div>
    </AppShell>
  );
}
