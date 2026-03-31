import type { Meta, StoryObj } from '@storybook/react';
import { JourneyCompositionMatrix } from './JourneyCompositionMatrix';

const meta: Meta<typeof JourneyCompositionMatrix> = {
  title: 'Composition/Journey Composition Matrix',
  component: JourneyCompositionMatrix
};

export default meta;

type Story = StoryObj<typeof JourneyCompositionMatrix>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
