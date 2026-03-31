import type { Meta, StoryObj } from '@storybook/react';
import { IncidentActionRail } from './IncidentActionRail';

const meta: Meta<typeof IncidentActionRail> = {
  title: 'Runtime/Incident Action Rail v2',
  component: IncidentActionRail
};

export default meta;

type Story = StoryObj<typeof IncidentActionRail>;

export const SeverityS1: Story = {
  args: { severity: 'S1' }
};

export const SeverityS2: Story = {
  args: { severity: 'S2' }
};
