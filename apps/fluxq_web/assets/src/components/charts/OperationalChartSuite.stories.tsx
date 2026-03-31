import type { Meta, StoryObj } from '@storybook/react';
import { OperationalChartSuite } from './OperationalChartSuite';

const meta: Meta<typeof OperationalChartSuite> = {
  title: 'Telemetry/Operational Chart Suite',
  component: OperationalChartSuite
};

export default meta;

type Story = StoryObj<typeof OperationalChartSuite>;

export const Desktop: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
