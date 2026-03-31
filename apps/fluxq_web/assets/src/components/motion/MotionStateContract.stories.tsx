import type { Meta, StoryObj } from '@storybook/react';
import { MotionStateContract } from './MotionStateContract';

const meta: Meta<typeof MotionStateContract> = {
  title: 'Motion/State Contract',
  component: MotionStateContract
};

export default meta;

type Story = StoryObj<typeof MotionStateContract>;

export const Standard: Story = {
  args: { reducedMotion: false }
};

export const ReducedMotion: Story = {
  args: { reducedMotion: true }
};
