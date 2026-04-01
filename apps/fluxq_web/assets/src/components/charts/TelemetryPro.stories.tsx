import type { Meta, StoryObj } from '@storybook/react';
import { TelemetryPro } from './TelemetryPro';

const meta: Meta<typeof TelemetryPro> = {
  title: 'Telemetry/TelemetryPro',
  component: TelemetryPro
};

export default meta;

type Story = StoryObj<typeof TelemetryPro>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
