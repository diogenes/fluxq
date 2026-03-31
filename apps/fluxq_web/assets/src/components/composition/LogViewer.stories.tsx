import type { Meta, StoryObj } from '@storybook/react';
import { LogViewer } from './LogViewer';

const meta: Meta<typeof LogViewer> = {
  title: 'Composition/LogViewer',
  component: LogViewer
};

export default meta;

type Story = StoryObj<typeof LogViewer>;

export const Default: Story = {};
export const Loading: Story = { args: { boundaryState: 'loading' } };
export const Error: Story = { args: { boundaryState: 'error' } };
export const PolicyBlocked: Story = { args: { boundaryState: 'policy_blocked' } };
export const ReadOnly: Story = { args: { boundaryState: 'read_only' } };

export const Mobile: Story = {
  args: { boundaryState: 'success_recovered' },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
