import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    tone: 'info',
    title: 'Operational notice',
    children: 'Filter updates are available for this surface.'
  }
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Degradation detected',
    children: 'Latency drift is approaching configured threshold.'
  }
};

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Incident requires action',
    children: 'Retry budget is nearly exhausted; review fallback policy.'
  }
};
