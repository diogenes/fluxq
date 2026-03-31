import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import { OperationalStatePack } from '@/components/state/OperationalStatePack';
import { CorePrimitivesShowcase } from '@/components/composition/CorePrimitivesShowcase';
import { UnifiedFilterBar } from '@/components/composition/UnifiedFilterBar';
import { DenseDataTable } from '@/components/composition/DenseDataTable';
import { JourneyCompositionMatrix } from '@/components/composition/JourneyCompositionMatrix';
import { KpiMetricCardFamily } from '@/components/families/KpiMetricCardFamily';
import { FilterTabbedTableFamily } from '@/components/families/FilterTabbedTableFamily';
import { TimelineTraceLogsFamily } from '@/components/families/TimelineTraceLogsFamily';
import { ActionRailInspectorFamily } from '@/components/families/ActionRailInspectorFamily';
import { OnboardingFlowKit } from '@/components/onboarding/OnboardingFlowKit';
import { RunDetailBlock } from '@/components/runtime/RunDetailBlock';
import { ProviderHealthBlock } from '@/components/runtime/ProviderHealthBlock';
import { PortabilityAnalyticsBlock } from '@/components/runtime/PortabilityAnalyticsBlock';
import { LivebookLinkageBlock } from '@/components/runtime/LivebookLinkageBlock';
import { OperationalStatusStripV2 } from '@/components/runtime/OperationalStatusStripV2';
import { WorkflowBuilderScaffold } from '@/components/workflow/WorkflowBuilderScaffold';
import { WorkflowBuilderAdvanced } from '@/components/workflow/WorkflowBuilderAdvanced';
import { MotionStateContract } from '@/components/motion/MotionStateContract';
import { TelemetryChartStub } from '@/components/charts/TelemetryChartStub';
import { OperationalChartSuite } from '@/components/charts/OperationalChartSuite';
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
        <JourneyCompositionMatrix />
        <KpiMetricCardFamily lane={lane} />
        <FilterTabbedTableFamily />
        <TimelineTraceLogsFamily />
        <ActionRailInspectorFamily />
        <OnboardingFlowKit />
        <OperationalStatePack />
        <CorePrimitivesShowcase />
        <RunDetailBlock />
        <ProviderHealthBlock />
        <PortabilityAnalyticsBlock />
        <LivebookLinkageBlock />
        <WorkflowBuilderScaffold />
        <WorkflowBuilderAdvanced />
        <MotionStateContract reducedMotion={false} />
        <OperationalChartSuite />
        <TelemetryChartStub />
      </div>
    </AppShell>
  );
}
