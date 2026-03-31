import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { WorkspaceOverview } from '@/components/workspace/WorkspaceOverview';

const meta: Meta<typeof AppShell> = {
  title: 'Shell/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const DesktopExpanded: Story = {
  args: {
    lane: 'fixture',
    title: 'Workspace overview',
    subtitle: 'Expanded desktop shell'
  },
  render: (args) => (
    <AppShell {...args}>
      <WorkspaceOverview />
    </AppShell>
  )
};

export const DesktopCollapsed: Story = {
  args: {
    lane: 'live_smoke',
    title: 'Workspace overview',
    subtitle: 'Collapsed desktop shell',
    initialSidebarCollapsed: true
  },
  render: (args) => (
    <AppShell {...args}>
      <WorkspaceOverview />
    </AppShell>
  )
};

export const MobileStacked: Story = {
  args: {
    lane: 'live',
    title: 'Workspace overview',
    subtitle: 'Compact stacked shell',
    initialSidebarCollapsed: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: (args) => (
    <AppShell {...args}>
      <WorkspaceOverview />
    </AppShell>
  )
};
