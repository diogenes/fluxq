import type { Meta, StoryObj } from '@storybook/react';
import { KpiMetricCardFamily } from '@/components/families/KpiMetricCardFamily';
import { FilterTabbedTableFamily } from '@/components/families/FilterTabbedTableFamily';
import { TimelineTraceLogsFamily } from '@/components/families/TimelineTraceLogsFamily';
import { ActionRailInspectorFamily } from '@/components/families/ActionRailInspectorFamily';
import { OnboardingFlowKit } from '@/components/onboarding/OnboardingFlowKit';

function MatrixShowcase() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h3 className="fxq-display text-base font-semibold">Desktop family stack</h3>
        <div className="space-y-4">
          <KpiMetricCardFamily lane="live" />
          <FilterTabbedTableFamily />
          <TimelineTraceLogsFamily />
          <ActionRailInspectorFamily />
          <OnboardingFlowKit />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="fxq-display text-base font-semibold">Mobile sampling</h3>
        <div className="max-w-[390px] space-y-4 rounded-[var(--fxq-radius-lg)] border border-white/10 p-3">
          <KpiMetricCardFamily lane="live_smoke" />
          <ActionRailInspectorFamily />
          <OnboardingFlowKit degraded />
        </div>
      </div>
    </section>
  );
}

const meta: Meta<typeof MatrixShowcase> = {
  title: 'Composition/Family Variant Matrix',
  component: MatrixShowcase
};

export default meta;

type Story = StoryObj<typeof MatrixShowcase>;

export const Default: Story = {};
