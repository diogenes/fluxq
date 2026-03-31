import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';
import { shellSections } from '@/data/mockData';

const meta: Meta<typeof SideNav> = {
  title: 'Shell/SideNav',
  component: SideNav,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof SideNav>;

export const Expanded: Story = {
  args: {
    collapsed: false,
    sections: shellSections,
    onToggleCollapse: () => undefined
  }
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    sections: shellSections,
    onToggleCollapse: () => undefined
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};
