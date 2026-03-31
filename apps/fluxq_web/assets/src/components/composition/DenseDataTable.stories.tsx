import type { Meta, StoryObj } from '@storybook/react';
import { DenseDataTable } from './DenseDataTable';

const meta: Meta<typeof DenseDataTable> = {
  title: 'Composition/Dense Data Table',
  component: DenseDataTable
};

export default meta;

type Story = StoryObj<typeof DenseDataTable>;

export const Default: Story = {};
