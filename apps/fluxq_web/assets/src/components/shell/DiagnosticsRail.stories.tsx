import type { Meta, StoryObj } from '@storybook/react';
import { DiagnosticsRail } from './DiagnosticsRail';
import { diagnosticsRailItems } from '@/data/mockData';

const meta: Meta<typeof DiagnosticsRail> = {
  title: 'Shell/DiagnosticsRail',
  component: DiagnosticsRail,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof DiagnosticsRail>;

export const Expanded: Story = {
  args: {
    items: diagnosticsRailItems,
    collapsed: false
  }
};

export const Collapsed: Story = {
  args: {
    items: diagnosticsRailItems,
    collapsed: true
  }
};
