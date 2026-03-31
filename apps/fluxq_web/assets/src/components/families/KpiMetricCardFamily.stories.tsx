import type { Meta, StoryObj } from '@storybook/react';
import { KpiMetricCardFamily } from './KpiMetricCardFamily';

const meta: Meta<typeof KpiMetricCardFamily> = {
  title: 'Families/KPI Metric Card Family',
  component: KpiMetricCardFamily
};

export default meta;

type Story = StoryObj<typeof KpiMetricCardFamily>;

export const Fixture: Story = {
  args: {
    lane: 'fixture'
  }
};

export const Live: Story = {
  args: {
    lane: 'live'
  }
};

export const LiveSmoke: Story = {
  args: {
    lane: 'live_smoke'
  }
};

export const MobileFixture: Story = {
  args: {
    lane: 'fixture'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
