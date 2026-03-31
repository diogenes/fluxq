import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingFlowKit } from './OnboardingFlowKit';

const meta: Meta<typeof OnboardingFlowKit> = {
  title: 'Onboarding/Flow Kit',
  component: OnboardingFlowKit
};

export default meta;

type Story = StoryObj<typeof OnboardingFlowKit>;

export const Ready: Story = {
  args: {
    degraded: false
  }
};

export const NeedsReview: Story = {
  args: {
    degraded: true
  }
};

export const Mobile: Story = {
  args: {
    degraded: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
