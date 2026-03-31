import type { Meta, StoryObj } from '@storybook/react';
import { TraceTreePro } from './TraceTreePro';

const meta: Meta<typeof TraceTreePro> = {
  title: 'Families/Trace Tree Pro',
  component: TraceTreePro
};

export default meta;

type Story = StoryObj<typeof TraceTreePro>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
