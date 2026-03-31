import type { Meta, StoryObj } from '@storybook/react';
import { ActionRailInspectorFamily } from './ActionRailInspectorFamily';

const meta: Meta<typeof ActionRailInspectorFamily> = {
  title: 'Families/Action Rail Inspector Family',
  component: ActionRailInspectorFamily
};

export default meta;

type Story = StoryObj<typeof ActionRailInspectorFamily>;

export const Default: Story = {};
