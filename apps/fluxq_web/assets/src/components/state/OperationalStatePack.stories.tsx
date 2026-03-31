import type { Meta, StoryObj } from '@storybook/react';
import { OperationalStatePack } from './OperationalStatePack';

const meta: Meta<typeof OperationalStatePack> = {
  title: 'State/Operational State Pack',
  component: OperationalStatePack
};

export default meta;

type Story = StoryObj<typeof OperationalStatePack>;

export const FullPack: Story = {};
