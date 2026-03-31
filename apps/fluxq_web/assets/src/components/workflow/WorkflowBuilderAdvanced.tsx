import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type WorkflowNode = {
  id: string;
  labelKey: string;
  x: number;
  y: number;
  tone: 'info' | 'warning' | 'success';
};

const nodes: WorkflowNode[] = [
  { id: 'n1', labelKey: 'runtime.workflowAdvanced.nodes.intake', x: 30, y: 24, tone: 'info' },
  { id: 'n2', labelKey: 'runtime.workflowAdvanced.nodes.quantumStep', x: 180, y: 24, tone: 'warning' },
  { id: 'n3', labelKey: 'runtime.workflowAdvanced.nodes.portabilityCheck', x: 340, y: 24, tone: 'info' },
  { id: 'n4', labelKey: 'runtime.workflowAdvanced.nodes.fallbackRoute', x: 340, y: 104, tone: 'success' }
];

const edges = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
  { from: 'n2', to: 'n4' }
];

function findNode(id: string) {
  return nodes.find((node) => node.id === id);
}

export function WorkflowBuilderAdvanced() {
  const { t } = useTranslation();

  return (
    <section className="grid min-w-0 gap-4 2xl:grid-cols-[260px_minmax(0,1fr)_320px]">
      <Card className="min-w-0 space-y-3">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.workflowAdvanced.paletteTitle')}</h3>
        <div className="space-y-2 text-xs text-[color:var(--fxq-text-secondary)]">
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">{t('runtime.workflowAdvanced.palette.quantumStep')}</div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">{t('runtime.workflowAdvanced.palette.classicalStep')}</div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">{t('runtime.workflowAdvanced.palette.controlBranch')}</div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">{t('runtime.workflowAdvanced.palette.fallbackRoute')}</div>
        </div>
      </Card>

      <Card className="min-w-0 space-y-3 overflow-hidden">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-lg font-semibold">{t('runtime.workflowAdvanced.canvasTitle')}</h3>
          <Badge tone="warning">{t('runtime.workflowAdvanced.validationState')}</Badge>
        </div>
        <div className="relative min-h-[220px] overflow-x-auto rounded-[var(--fxq-radius-md)] border border-dashed border-white/20 bg-[color:var(--fxq-background-surface-mid)]/50 p-3">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 180" aria-hidden="true">
            {edges.map((edge) => {
              const from = findNode(edge.from);
              const to = findNode(edge.to);
              if (!from || !to) return null;

              const startX = from.x + 92;
              const startY = from.y + 18;
              const endX = to.x;
              const endY = to.y + 18;
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="color-mix(in srgb, var(--fxq-semantic-info) 56%, transparent)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          <div className="relative min-w-[520px] min-h-[180px]">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute w-[92px] rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-2"
                style={{ left: node.x, top: node.y }}
              >
                <div className="text-[10px] uppercase text-[color:var(--fxq-text-secondary)]">{node.id}</div>
                <div className="mt-1 truncate text-xs font-medium">{t(node.labelKey)}</div>
                <Badge tone={node.tone} className="mt-2">{node.tone}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="min-w-0 space-y-3">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.workflowAdvanced.inspectorTitle')}</h3>
        <div className="space-y-2 text-xs text-[color:var(--fxq-text-secondary)]">
          <div>{t('runtime.workflowAdvanced.inspectorNode')}</div>
          <div>{t('runtime.workflowAdvanced.inspectorTimeout')}</div>
          <div>{t('runtime.workflowAdvanced.inspectorRetry')}</div>
          <div>{t('runtime.workflowAdvanced.inspectorFallback')}</div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button size="sm">{t('runtime.workflowAdvanced.validate')}</Button>
          <Button size="sm" variant="secondary">{t('runtime.workflowAdvanced.preview')}</Button>
        </div>
      </Card>
    </section>
  );
}
