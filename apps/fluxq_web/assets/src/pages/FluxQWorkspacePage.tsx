import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/shell/AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';
import { OperationalStatePack } from '@/components/state/OperationalStatePack';
import { DataBoundary } from '@/components/state/DataBoundary';
import { CorePrimitivesShowcase } from '@/components/composition/CorePrimitivesShowcase';
import { UnifiedFilterBar } from '@/components/composition/UnifiedFilterBar';
import { DenseDataTable } from '@/components/composition/DenseDataTable';
import { TablePro } from '@/components/composition/TablePro';
import { LogViewer } from '@/components/composition/LogViewer';
import { JourneyCompositionMatrix } from '@/components/composition/JourneyCompositionMatrix';
import { KpiMetricCardFamily } from '@/components/families/KpiMetricCardFamily';
import { FilterTabbedTableFamily } from '@/components/families/FilterTabbedTableFamily';
import { TimelineTraceLogsFamily } from '@/components/families/TimelineTraceLogsFamily';
import { TraceTreePro } from '@/components/families/TraceTreePro';
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
        <TablePro />
        <LogViewer />
        <JourneyCompositionMatrix />
        <KpiMetricCardFamily lane={lane} />
        <FilterTabbedTableFamily />
        <TimelineTraceLogsFamily />
        <TraceTreePro />
        <ActionRailInspectorFamily />
        <OnboardingFlowKit />
        <DataBoundary state="policy_blocked" lane={lane} actionLabelKey="actions.review">
          <p className="text-sm text-[color:var(--fxq-text-secondary)]">
            {t('workspace.description')}
          </p>
        </DataBoundary>
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
