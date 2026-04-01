import type { Meta, StoryObj } from '@storybook/react';
import { ActionGuard } from './ActionGuard';

const meta: Meta<typeof ActionGuard> = {
  title: 'Composition/ActionGuard',
  component: ActionGuard
};

export default meta;

type Story = StoryObj<typeof ActionGuard>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
