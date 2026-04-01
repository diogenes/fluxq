import type { Meta, StoryObj } from '@storybook/react';
import { FormSystem } from './FormSystem';

const meta: Meta<typeof FormSystem> = {
  title: 'Composition/FormSystem',
  component: FormSystem
};

export default meta;

type Story = StoryObj<typeof FormSystem>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
