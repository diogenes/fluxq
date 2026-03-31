import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TimelineEventContract, TraceNodeContract } from '@/lib/ui-cx';

interface FlattenedNode {
  readonly id: string;
  readonly title: string;
  readonly state: TraceNodeContract['state'];
  readonly depth: number;
  readonly durationMs?: number;
  readonly hasChildren: boolean;
  readonly parentId?: string;
}

const toneByState: Record<TraceNodeContract['state'], 'neutral' | 'info' | 'warning' | 'error' | 'success'> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'warning',
  timeout: 'error',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success'
};

function flattenTree(
  tree: ReadonlyArray<TraceNodeContract>,
  expanded: ReadonlySet<string>,
  depthLimit: number
): FlattenedNode[] {
  const flattened: FlattenedNode[] = [];

  const visit = (node: TraceNodeContract, depth: number, parentId?: string) => {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    flattened.push({
      id: node.id,
      title: node.title,
      state: node.state,
      depth,
      durationMs: node.durationMs,
      hasChildren,
      parentId
    });

    if (!hasChildren || depth >= depthLimit || !expanded.has(node.id)) return;
    node.children?.forEach((child) => visit(child, depth + 1, node.id));
  };

  tree.forEach((node) => visit(node, 0));
  return flattened;
}

export function TraceTreePro() {
  const { t } = useTranslation();
  const events = useMemo<TimelineEventContract[]>(
    () => [
      {
        id: 'evt-queue',
        timestamp: '10:12:04',
        title: t('runtime.cy.traceTree.events.queued.title'),
        span: 'run.queue',
        logExcerpt: t('runtime.cy.traceTree.events.queued.log'),
        severity: 'info'
      },
      {
        id: 'evt-route',
        timestamp: '10:12:08',
        title: t('runtime.cy.traceTree.events.routePrimary.title'),
        span: 'route.primary',
        logExcerpt: t('runtime.cy.traceTree.events.routePrimary.log'),
        severity: 'warning'
      },
      {
        id: 'evt-fallback',
        timestamp: '10:12:15',
        title: t('runtime.cy.traceTree.events.fallback.title'),
        span: 'route.fallback',
        logExcerpt: t('runtime.cy.traceTree.events.fallback.log'),
        severity: 'error'
      }
    ],
    [t]
  );
  const tree = useMemo<TraceNodeContract[]>(
    () => [
      {
        id: 'node-root',
        title: t('runtime.cy.traceTree.nodes.root'),
        state: 'retrying',
        durationMs: 6120,
        children: [
          {
            id: 'node-queue',
            title: t('runtime.cy.traceTree.nodes.queueWait'),
            state: 'loading',
            durationMs: 820
          },
          {
            id: 'node-route',
            title: t('runtime.cy.traceTree.nodes.routePrimary'),
            state: 'timeout',
            durationMs: 2100,
            children: [
              {
                id: 'node-retry',
                title: t('runtime.cy.traceTree.nodes.retry'),
                state: 'retrying',
                durationMs: 1440
              },
              {
                id: 'node-fallback',
                title: t('runtime.cy.traceTree.nodes.fallback'),
                state: 'fallback_engaged',
                durationMs: 1780
              }
            ]
          }
        ]
      }
    ],
    [t]
  );

  const [selectedTimelineId, setSelectedTimelineId] = useState(events[0].id);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['node-root', 'node-route']));
  const [depthLimit, setDepthLimit] = useState(3);
  const [selectedNodeId, setSelectedNodeId] = useState('node-route');

  const timelineToNodeMap = useMemo(
    () => ({
      'evt-queue': 'node-queue',
      'evt-route': 'node-route',
      'evt-fallback': 'node-fallback'
    }),
    []
  );

  const flattenedNodes = useMemo(
    () => flattenTree(tree, expandedNodes, depthLimit),
    [tree, expandedNodes, depthLimit]
  );
  const selectedIndex = flattenedNodes.findIndex((node) => node.id === selectedNodeId);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((current) => {
      const next = new Set(current);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const selectEvent = (eventId: string) => {
    setSelectedTimelineId(eventId);
    setSelectedNodeId(timelineToNodeMap[eventId as keyof typeof timelineToNodeMap] ?? 'node-root');
  };

  const onTreeKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (flattenedNodes.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = Math.min(selectedIndex + 1, flattenedNodes.length - 1);
      setSelectedNodeId(flattenedNodes[nextIndex].id);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.max(selectedIndex - 1, 0);
      setSelectedNodeId(flattenedNodes[nextIndex].id);
    }
  };

  return (
    <section className="grid gap-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <article className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.traceTree.timelineTitle')}</h3>
          <Badge tone="info">{t('runtime.cy.traceTree.syncEnabled')}</Badge>
        </div>
        <div className="space-y-2">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              aria-pressed={selectedTimelineId === event.id}
              onClick={() => selectEvent(event.id)}
              className="flex w-full items-start justify-between gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-2 text-left hover:bg-white/4 aria-pressed:border-[color:var(--fxq-semantic-info)]"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium break-words">{event.title}</div>
                <div className="text-xs text-[color:var(--fxq-text-secondary)]">{event.timestamp}</div>
              </div>
              <Badge tone={event.severity}>{event.severity}</Badge>
            </button>
          ))}
        </div>
      </article>

      <article className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="fxq-display text-base font-semibold">{t('runtime.cy.traceTree.traceTitle')}</h3>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => setExpandedNodes(new Set(['node-root', 'node-route', 'node-queue', 'node-retry', 'node-fallback']))}>
              {t('runtime.cy.traceTree.expandAll')}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setExpandedNodes(new Set(['node-root']))}>
              {t('runtime.cy.traceTree.collapseAll')}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="trace-depth" className="text-xs text-[color:var(--fxq-text-secondary)]">{t('runtime.cy.traceTree.depth')}</label>
          <input
            id="trace-depth"
            type="range"
            min={1}
            max={4}
            value={depthLimit}
            onChange={(event) => setDepthLimit(Number(event.target.value))}
          />
          <span className="fxq-mono text-xs">{depthLimit}</span>
        </div>
        <ul
          role="tree"
          aria-label={t('runtime.cy.traceTree.traceTitle')}
          tabIndex={0}
          onKeyDown={onTreeKeyDown}
          className="max-h-72 space-y-1 overflow-auto rounded-[var(--fxq-radius-md)] border border-white/8 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fxq-action-primary-start)]"
        >
          {flattenedNodes.map((node) => (
            <li key={node.id} role="treeitem" aria-selected={selectedNodeId === node.id} aria-expanded={node.hasChildren ? expandedNodes.has(node.id) : undefined}>
              <div
                className="flex items-center gap-2 rounded-[var(--fxq-radius-sm)] border border-white/8 px-2 py-1.5"
                style={{ marginLeft: `${node.depth * 14}px` }}
              >
                {node.hasChildren ? (
                  <button
                    type="button"
                    className="h-5 w-5 rounded border border-white/10 text-xs"
                    onClick={() => toggleNode(node.id)}
                    aria-label={expandedNodes.has(node.id) ? t('runtime.cy.traceTree.collapseNode') : t('runtime.cy.traceTree.expandNode')}
                  >
                    {expandedNodes.has(node.id) ? '-' : '+'}
                  </button>
                ) : (
                  <span className="inline-block h-5 w-5" />
                )}
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={selectedNodeId === node.id}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <Badge tone={toneByState[node.state]}>{node.state}</Badge>
                  <span className="min-w-0 truncate fxq-mono text-sm">{node.title}</span>
                  <span className="ml-auto fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">{node.durationMs ?? 0}ms</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
