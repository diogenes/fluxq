import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowBuilderPro } from './WorkflowBuilderPro';

const meta: Meta<typeof WorkflowBuilderPro> = {
  title: 'Workflow/Builder Pro',
  component: WorkflowBuilderPro
};

export default meta;

type Story = StoryObj<typeof WorkflowBuilderPro>;

export const Fixture: Story = {
  args: {
    lane: 'fixture'
  }
};

export const LiveSmoke: Story = {
  args: {
    lane: 'live_smoke'
  }
};

export const Mobile: Story = {
  args: {
    lane: 'live'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
