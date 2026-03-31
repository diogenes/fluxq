import type { Meta, StoryObj } from '@storybook/react';
import { DataBoundary } from './DataBoundary';
import type { DataBoundaryState } from '@/lib/ui-cx';

const meta: Meta<typeof DataBoundary> = {
  title: 'State/Data Boundary',
  component: DataBoundary
};

export default meta;

type Story = StoryObj<typeof DataBoundary>;

function makeStory(state: DataBoundaryState): Story {
  return {
    args: {
      state,
      actionLabelKey: 'actions.review',
      children: 'Journey content slot'
    }
  };
}

export const Loading = makeStory('loading');
export const Degraded = makeStory('degraded');
export const Error = makeStory('error');
export const Timeout = makeStory('timeout');
export const NoAccess = makeStory('no_access');
export const PolicyBlocked = makeStory('policy_blocked');
export const ReadOnly = makeStory('read_only');
export const Maintenance = makeStory('maintenance');

export const Mobile: Story = {
  ...makeStory('policy_blocked'),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
