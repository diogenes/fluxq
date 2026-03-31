import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Lane, WorkflowEdgeContract, WorkflowNodeContract } from '@/lib/ui-cx';

const nodes: WorkflowNodeContract[] = [
  { id: 'n1', labelKey: 'runtime.workflowPro.nodes.intake', x: 24, y: 24, tone: 'info' },
  { id: 'n2', labelKey: 'runtime.workflowPro.nodes.quantumStep', x: 180, y: 24, tone: 'warning' },
  { id: 'n3', labelKey: 'runtime.workflowPro.nodes.portabilityCheck', x: 336, y: 24, tone: 'info' },
  { id: 'n4', labelKey: 'runtime.workflowPro.nodes.fallback', x: 336, y: 110, tone: 'success' }
];

const edges: WorkflowEdgeContract[] = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
  { from: 'n2', to: 'n4' }
];

export function WorkflowBuilderPro({ lane = 'fixture' }: Readonly<{ lane?: Lane }>) {
  const { t } = useTranslation();
  const [selectedNodeId, setSelectedNodeId] = useState('n2');
  const [historyCursor, setHistoryCursor] = useState(1);
  const [contextOpen, setContextOpen] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? nodes[0],
    [selectedNodeId]
  );

  const onCanvasKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = nodes.findIndex((node) => node.id === selectedNodeId);
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSelectedNodeId(nodes[Math.min(nodes.length - 1, currentIndex + 1)].id);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSelectedNodeId(nodes[Math.max(0, currentIndex - 1)].id);
    }
  };

  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="fxq-display text-lg font-semibold">{t('runtime.workflowPro.title')}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="info">{lane}</Badge>
          <Badge tone="warning">{t('runtime.workflowPro.validationWarning')}</Badge>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" onClick={() => setHistoryCursor((value) => Math.max(0, value - 1))} aria-label={t('runtime.workflowPro.undo')}>
              {t('runtime.workflowPro.undo')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setHistoryCursor((value) => Math.min(6, value + 1))} aria-label={t('runtime.workflowPro.redo')}>
              {t('runtime.workflowPro.redo')}
            </Button>
            <Button size="sm" variant="secondary">{t('runtime.workflowPro.addNode')}</Button>
          </div>

          <div
            tabIndex={0}
            onKeyDown={onCanvasKeyDown}
            className="relative min-h-[260px] overflow-x-auto rounded-[var(--fxq-radius-md)] border border-dashed border-white/20 bg-[color:var(--fxq-background-surface-mid)]/60 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fxq-action-primary-start)]"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 220" aria-hidden="true">
              {edges.map((edge) => {
                const from = nodes.find((node) => node.id === edge.from);
                const to = nodes.find((node) => node.id === edge.to);
                if (!from || !to) return null;
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={`M ${from.x + 96} ${from.y + 20} C ${from.x + 136} ${from.y + 20}, ${to.x - 40} ${to.y + 20}, ${to.x} ${to.y + 20}`}
                    fill="none"
                    stroke="color-mix(in srgb, var(--fxq-semantic-info) 55%, transparent)"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            <div className="relative min-h-[220px] min-w-[520px]">
              {nodes.map((node) => (
                <div key={node.id} style={{ left: node.x, top: node.y }} className="absolute">
                  <button
                    type="button"
                    aria-pressed={selectedNodeId === node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="w-[96px] rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-2 text-left aria-pressed:border-[color:var(--fxq-semantic-info)]"
                  >
                    <div className="text-[10px] uppercase text-[color:var(--fxq-text-secondary)]">{node.id}</div>
                    <div className="mt-1 truncate text-xs font-medium">{t(node.labelKey)}</div>
                    <Badge tone={node.tone} className="mt-2">{node.tone}</Badge>
                  </button>
                  <button
                    type="button"
                    className="mt-1 w-full rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]"
                    onClick={() => setContextOpen((current) => current === node.id ? null : node.id)}
                  >
                    {t('runtime.workflowPro.context')}
                  </button>
                  {contextOpen === node.id ? (
                    <div className="mt-1 space-y-1 rounded border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-1 text-[10px]">
                      <button type="button" className="w-full rounded border border-white/10 px-1 py-0.5">{t('runtime.workflowPro.actions.duplicate')}</button>
                      <button type="button" className="w-full rounded border border-white/10 px-1 py-0.5">{t('runtime.workflowPro.actions.delete')}</button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-2 rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
          <h4 className="text-sm font-semibold uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.workflowPro.inspector')}</h4>
          <div className="text-sm">{t('runtime.workflowPro.selected')}: <span className="fxq-mono">{selectedNode.id}</span></div>
          <div className="text-sm">{t('runtime.workflowPro.history')}: <span className="fxq-mono">{historyCursor}/6</span></div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
            <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.workflowPro.minimap')}</div>
            <div className="mt-2 h-24 rounded border border-white/10 bg-[color:var(--fxq-background-surface-mid)]/50">
              <div className="h-full w-1/2 rounded bg-[color:var(--fxq-semantic-info)]/25" />
            </div>
          </div>
        </aside>
      </div>
    </Card>
  );
}
