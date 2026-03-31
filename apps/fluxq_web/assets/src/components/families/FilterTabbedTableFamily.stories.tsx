import type { Meta, StoryObj } from '@storybook/react';
import { FilterTabbedTableFamily } from './FilterTabbedTableFamily';

const meta: Meta<typeof FilterTabbedTableFamily> = {
  title: 'Families/Filter Tabbed Table Family',
  component: FilterTabbedTableFamily
};

export default meta;

type Story = StoryObj<typeof FilterTabbedTableFamily>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
