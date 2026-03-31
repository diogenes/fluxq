import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowBuilderAdvanced } from './WorkflowBuilderAdvanced';

const meta: Meta<typeof WorkflowBuilderAdvanced> = {
  title: 'Workflow/Builder Advanced',
  component: WorkflowBuilderAdvanced
};

export default meta;

type Story = StoryObj<typeof WorkflowBuilderAdvanced>;

export const Desktop: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
