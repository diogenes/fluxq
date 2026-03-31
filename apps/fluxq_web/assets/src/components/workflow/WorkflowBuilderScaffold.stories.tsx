import type { Meta, StoryObj } from '@storybook/react';
import { WorkflowBuilderScaffold } from './WorkflowBuilderScaffold';

const meta: Meta<typeof WorkflowBuilderScaffold> = {
  title: 'Workflow/Builder Scaffold',
  component: WorkflowBuilderScaffold
};

export default meta;

type Story = StoryObj<typeof WorkflowBuilderScaffold>;

export const Default: Story = {};

export const Valid: Story = {
  args: { validationState: 'valid' }
};

export const Error: Story = {
  args: { validationState: 'error' }
};
