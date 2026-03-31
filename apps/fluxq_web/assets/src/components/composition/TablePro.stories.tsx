import type { Meta, StoryObj } from '@storybook/react';
import { TablePro } from './TablePro';

const meta: Meta<typeof TablePro> = {
  title: 'Composition/TablePro',
  component: TablePro
};

export default meta;

type Story = StoryObj<typeof TablePro>;

export const Default: Story = {};
export const Loading: Story = { args: { boundaryState: 'loading' } };
export const Degraded: Story = { args: { boundaryState: 'degraded' } };
export const Error: Story = { args: { boundaryState: 'error' } };
export const PolicyBlocked: Story = { args: { boundaryState: 'policy_blocked' } };

export const Mobile: Story = {
  args: { boundaryState: 'success_recovered' },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
