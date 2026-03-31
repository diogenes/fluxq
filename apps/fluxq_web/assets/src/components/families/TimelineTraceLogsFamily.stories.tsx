import type { Meta, StoryObj } from '@storybook/react';
import { TimelineTraceLogsFamily } from './TimelineTraceLogsFamily';

const meta: Meta<typeof TimelineTraceLogsFamily> = {
  title: 'Families/Timeline Trace Logs Family',
  component: TimelineTraceLogsFamily
};

export default meta;

type Story = StoryObj<typeof TimelineTraceLogsFamily>;

export const Default: Story = {};
