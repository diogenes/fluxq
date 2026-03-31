import type { Meta, StoryObj } from '@storybook/react';
import { RunDetailBlock } from './RunDetailBlock';
import { ProviderHealthBlock } from './ProviderHealthBlock';
import { PortabilityAnalyticsBlock } from './PortabilityAnalyticsBlock';
import { LivebookLinkageBlock } from './LivebookLinkageBlock';

function RuntimeBlocksPreview() {
  return (
    <div className="space-y-4">
      <RunDetailBlock />
      <ProviderHealthBlock />
      <PortabilityAnalyticsBlock />
      <LivebookLinkageBlock />
    </div>
  );
}

const meta: Meta<typeof RuntimeBlocksPreview> = {
  title: 'Runtime/Surface Blocks',
  component: RuntimeBlocksPreview
};

export default meta;

type Story = StoryObj<typeof RuntimeBlocksPreview>;

export const Overview: Story = {};

export const MobileOverview: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
