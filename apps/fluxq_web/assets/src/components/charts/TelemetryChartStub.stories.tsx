import type { Meta, StoryObj } from '@storybook/react';
import { TelemetryChartStub } from './TelemetryChartStub';

const meta: Meta<typeof TelemetryChartStub> = {
  title: 'Telemetry/Chart Stubs',
  component: TelemetryChartStub
};

export default meta;

type Story = StoryObj<typeof TelemetryChartStub>;

export const Default: Story = {};
