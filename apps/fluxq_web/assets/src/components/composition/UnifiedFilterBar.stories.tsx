import type { Meta, StoryObj } from '@storybook/react';
import { UnifiedFilterBar } from './UnifiedFilterBar';

const meta: Meta<typeof UnifiedFilterBar> = {
  title: 'Composition/Unified Filter Bar',
  component: UnifiedFilterBar
};

export default meta;

type Story = StoryObj<typeof UnifiedFilterBar>;

export const Default: Story = {};

export const Preset: Story = {
  args: {
    defaultValue: {
      query: 'run-42',
      lane: 'live_smoke',
      status: 'retrying',
      target: 'fallback_route',
      timeWindow: '6h'
    }
  }
};
