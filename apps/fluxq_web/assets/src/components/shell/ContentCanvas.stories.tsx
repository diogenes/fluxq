import type { Meta, StoryObj } from '@storybook/react';
import { ContentCanvas } from './ContentCanvas';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof ContentCanvas> = {
  title: 'Shell/ContentCanvas',
  component: ContentCanvas,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof ContentCanvas>;

export const Default: Story = {
  args: {
    title: 'Content canvas',
    subtitle: 'Primary operator workspace'
  },
  render: (args) => (
    <ContentCanvas {...args}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>Canvas block A</Card>
        <Card>Canvas block B</Card>
      </div>
    </ContentCanvas>
  )
};
