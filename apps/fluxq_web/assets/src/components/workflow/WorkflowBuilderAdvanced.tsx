import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { WorkflowEdgeContract, WorkflowNodeContract } from '@/lib/ui-cx';

const nodes: WorkflowNodeContract[] = [
  { id: 'n1', labelKey: 'runtime.workflowAdvanced.nodes.intake', x: 30, y: 24, tone: 'info' },
  { id: 'n2', labelKey: 'runtime.workflowAdvanced.nodes.quantumStep', x: 180, y: 24, tone: 'warning' },
  { id: 'n3', labelKey: 'runtime.workflowAdvanced.nodes.portabilityCheck', x: 340, y: 24, tone: 'info' },
  { id: 'n4', labelKey: 'runtime.workflowAdvanced.nodes.fallbackRoute', x: 340, y: 104, tone: 'success' }
];

const edges: WorkflowEdgeContract[] = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
  { from: 'n2', to: 'n4' }
];

const nodeMeta: Record<string, { timeout: string; retries: string; fallback: string }> = {
  n1: { timeout: '10s', retries: '0 / 1', fallback: 'none' },
  n2: { timeout: '45s', retries: '2 / 5', fallback: 'simulator' },
  n3: { timeout: '20s', retries: '1 / 2', fallback: 'cached_result' },
  n4: { timeout: '15s', retries: '0 / 1', fallback: 'terminal_route' }
};

function findNode(id: string) {
  return nodes.find((node) => node.id === id);
}

export function WorkflowBuilderAdvanced() {
  const { t } = useTranslation();
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[1].id);
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? nodes[0],
    [selectedNodeId]
  );
  const selectedMeta = nodeMeta[selectedNode.id];

  const validationChecks = useMemo(
    () => [
      { id: 'check-retry', label: t('runtime.workflowAdvanced.checks.retryBudget'), state: 'warning' as const },
      { id: 'check-timeout', label: t('runtime.workflowAdvanced.checks.timeoutFallback'), state: 'error' as const },
      { id: 'check-baseline', label: t('runtime.workflowAdvanced.checks.deterministicBaseline'), state: 'success' as const }
    ],
    [t]
  );

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

        <div className="flex flex-wrap gap-2">
          <Badge tone="info">{t('runtime.workflowAdvanced.legend.ready')}</Badge>
          <Badge tone="warning">{t('runtime.workflowAdvanced.legend.requiresReview')}</Badge>
          <Badge tone="error">{t('runtime.workflowAdvanced.legend.blocked')}</Badge>
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
              const isPathBlocked = edge.to === 'n3';

              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={`M ${startX} ${startY} C ${startX + 40} ${startY}, ${endX - 40} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={isPathBlocked
                    ? 'color-mix(in srgb, var(--fxq-semantic-error) 56%, transparent)'
                    : 'color-mix(in srgb, var(--fxq-semantic-info) 56%, transparent)'}
                  strokeWidth="2"
                  strokeDasharray={isPathBlocked ? '4 4' : undefined}
                />
              );
            })}
          </svg>

          <div className="relative min-w-[520px] min-h-[180px]">
            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                aria-pressed={selectedNodeId === node.id}
                className="absolute w-[92px] rounded-[var(--fxq-radius-md)] border border-white/8 bg-[color:var(--fxq-background-surface-low)] p-2 text-left aria-pressed:border-[color:var(--fxq-semantic-info)]"
                style={{ left: node.x, top: node.y }}
              >
                <div className="text-[10px] uppercase text-[color:var(--fxq-text-secondary)]">{node.id}</div>
                <div className="mt-1 truncate text-xs font-medium">{t(node.labelKey)}</div>
                <Badge tone={node.tone} className="mt-2">{node.tone}</Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {validationChecks.map((check) => (
            <div key={check.id} className="rounded-[var(--fxq-radius-md)] border border-white/8 bg-white/3 p-2 text-xs">
              <div className="mb-1"><Badge tone={check.state}>{check.state}</Badge></div>
              <p className="break-words text-[color:var(--fxq-text-secondary)]">{check.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="min-w-0 space-y-3">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.workflowAdvanced.inspectorTitle')}</h3>
        <div className="space-y-2 text-xs text-[color:var(--fxq-text-secondary)]">
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
            {t('runtime.workflowAdvanced.inspectorNode')}: <span className="fxq-mono text-[color:var(--fxq-text-primary)]">{selectedNode.id}</span>
          </div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
            {t('runtime.workflowAdvanced.inspectorTimeout')}: <span className="fxq-mono text-[color:var(--fxq-text-primary)]">{selectedMeta.timeout}</span>
          </div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
            {t('runtime.workflowAdvanced.inspectorRetry')}: <span className="fxq-mono text-[color:var(--fxq-text-primary)]">{selectedMeta.retries}</span>
          </div>
          <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
            {t('runtime.workflowAdvanced.inspectorFallback')}: <span className="fxq-mono text-[color:var(--fxq-text-primary)]">{selectedMeta.fallback}</span>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button size="sm">{t('runtime.workflowAdvanced.validate')}</Button>
          <Button size="sm" variant="secondary">{t('runtime.workflowAdvanced.preview')}</Button>
        </div>
      </Card>
    </section>
  );
}
