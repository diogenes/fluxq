import type { Meta, StoryObj } from '@storybook/react';
import { PortabilityDecisionFrame } from './PortabilityDecisionFrame';

const meta: Meta<typeof PortabilityDecisionFrame> = {
  title: 'Runtime/Portability Decision Framing',
  component: PortabilityDecisionFrame
};

export default meta;

type Story = StoryObj<typeof PortabilityDecisionFrame>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
