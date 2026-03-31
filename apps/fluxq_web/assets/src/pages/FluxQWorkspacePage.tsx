import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import { OperationalStatePack } from '@/components/state/OperationalStatePack';
import { CorePrimitivesShowcase } from '@/components/composition/CorePrimitivesShowcase';
import { UnifiedFilterBar } from '@/components/composition/UnifiedFilterBar';
import { DenseDataTable } from '@/components/composition/DenseDataTable';
import { RunDetailBlock } from '@/components/runtime/RunDetailBlock';
import { ProviderHealthBlock } from '@/components/runtime/ProviderHealthBlock';
import { PortabilityAnalyticsBlock } from '@/components/runtime/PortabilityAnalyticsBlock';
import { LivebookLinkageBlock } from '@/components/runtime/LivebookLinkageBlock';
import { OperationalStatusStripV2 } from '@/components/runtime/OperationalStatusStripV2';
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
        <UnifiedFilterBar />
        <OperationalStatusStripV2 />
        <DenseDataTable />
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
