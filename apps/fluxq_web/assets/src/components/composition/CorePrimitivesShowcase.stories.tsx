import type { Meta, StoryObj } from '@storybook/react';
import { CorePrimitivesShowcase } from './CorePrimitivesShowcase';

const meta: Meta<typeof CorePrimitivesShowcase> = {
  title: 'Primitives/Core Showcases',
  component: CorePrimitivesShowcase
};

export default meta;

type Story = StoryObj<typeof CorePrimitivesShowcase>;

export const Default: Story = {};
