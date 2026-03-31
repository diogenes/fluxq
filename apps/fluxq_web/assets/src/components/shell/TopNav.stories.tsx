import type { Meta, StoryObj } from '@storybook/react';
import { TopNav } from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Shell/TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof TopNav>;

export const FixtureLane: Story = {
  args: {
    lane: 'fixture',
    collapsed: false,
    onToggleSidebar: () => undefined
  }
};

export const LiveSmokeLane: Story = {
  args: {
    lane: 'live_smoke',
    collapsed: true,
    onToggleSidebar: () => undefined
  }
};
