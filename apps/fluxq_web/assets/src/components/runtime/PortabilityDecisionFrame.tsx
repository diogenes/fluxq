import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function PortabilityDecisionFrame() {
  return (
    <div className="grid gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-3 lg:grid-cols-3">
      <div>
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">confidence band</div>
        <div className="mt-1 flex items-center gap-2">
          <Badge tone="warning">0.71</Badge>
          <span className="text-sm">near threshold</span>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">sample quality</div>
        <div className="mt-1 flex items-center gap-2">
          <Badge tone="info">medium</Badge>
          <span className="text-sm">1,200 samples</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">recommended action</div>
        <Button size="sm" variant="secondary">Compare with fixture baseline</Button>
      </div>
    </div>
  );
}
