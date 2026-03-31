import type { Meta, StoryObj } from '@storybook/react';
import { OperationalStatusStripV2 } from './OperationalStatusStripV2';

const meta: Meta<typeof OperationalStatusStripV2> = {
  title: 'Runtime/Operational Status Strip v2',
  component: OperationalStatusStripV2
};

export default meta;

type Story = StoryObj<typeof OperationalStatusStripV2>;

export const Default: Story = {};
