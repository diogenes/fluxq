import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/ui/card';
import {
  ChartPrimitiveLegend,
  HeatmapGridChart,
  LaneStateMixChart,
  TrendLineChart
} from './ChartPrimitives';
import type { HeatmapCellContract, LaneMixContract, TrendPointContract } from '@/lib/ui-cx';

const points: TrendPointContract[] = [62, 58, 71, 64, 78, 74, 69, 81, 76, 68, 66, 72].map((value) => ({ value }));
const rows: LaneMixContract[] = [
  { lane: 'fixture', segments: [78, 14, 8] },
  { lane: 'live_smoke', segments: [52, 30, 18] },
  { lane: 'live', segments: [34, 37, 29] }
];
const cells: HeatmapCellContract[] = [
  [0.22, 0.3, 0.45, 0.6, 0.38, 0.25],
  [0.18, 0.52, 0.74, 0.81, 0.5, 0.28],
  [0.24, 0.32, 0.58, 0.73, 0.62, 0.33],
  [0.14, 0.26, 0.44, 0.65, 0.48, 0.2]
].flatMap((row, rowIndex) => row.map((intensity, columnIndex) => ({ row: rowIndex, column: columnIndex, intensity })));

function Showcase() {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <Card className="space-y-2">
        <TrendLineChart points={points} threshold={70} ariaLabel="Latency trend" />
      </Card>
      <Card className="space-y-2">
        <LaneStateMixChart rows={rows} />
      </Card>
      <Card className="space-y-2 xl:col-span-2">
        <ChartPrimitiveLegend />
        <HeatmapGridChart cells={cells} />
      </Card>
    </section>
  );
}

const meta: Meta<typeof Showcase> = {
  title: 'Telemetry/Chart Primitives',
  component: Showcase
};

export default meta;

type Story = StoryObj<typeof Showcase>;

export const Default: Story = {};
