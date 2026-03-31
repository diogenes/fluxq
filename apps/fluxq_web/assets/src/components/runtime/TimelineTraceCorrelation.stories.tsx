import type { Meta, StoryObj } from '@storybook/react';
import { TimelineTraceCorrelation } from './TimelineTraceCorrelation';

const meta: Meta<typeof TimelineTraceCorrelation> = {
  title: 'Runtime/Timeline Trace Correlation',
  component: TimelineTraceCorrelation
};

export default meta;

type Story = StoryObj<typeof TimelineTraceCorrelation>;

export const Default: Story = {};
