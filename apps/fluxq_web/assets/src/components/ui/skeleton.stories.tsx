import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

function SkeletonPreview() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

const meta: Meta<typeof SkeletonPreview> = {
  title: 'UI/Skeleton',
  component: SkeletonPreview
};

export default meta;

type Story = StoryObj<typeof SkeletonPreview>;

export const Default: Story = {};
