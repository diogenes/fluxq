import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import type { StructuredLogRecordContract, TimelineEventContract, TraceNodeContract } from '@/lib/ui-cx';

function TraceNode({ node, depth = 0 }: Readonly<{ node: TraceNodeContract; depth?: number }>) {
  return (
    <li className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-[var(--fxq-radius-sm)] border border-white/8 bg-white/4 px-2 py-1.5" style={{ marginLeft: `${depth * 12}px` }}>
        <Badge tone="neutral">{node.state}</Badge>
        <span className="min-w-0 flex-1 truncate fxq-mono text-sm">{node.title}</span>
        <span className="fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">{node.durationMs ?? 0}ms</span>
      </div>
      {node.children && node.children.length > 0 ? (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => <TraceNode key={child.id} node={child} depth={depth + 1} />)}
        </ul>
      ) : null}
    </li>
  );
}

export function TimelineTraceLogsFamily() {
  const { t } = useTranslation();
  const timelineEvents = useMemo<TimelineEventContract[]>(
    () => [
      {
        id: 'evt-queue',
        timestamp: '10:12:04',
        title: t('runtime.cx.timelineTraceLogs.events.stepQueued.title'),
        span: t('runtime.cx.timelineTraceLogs.events.stepQueued.span'),
        logExcerpt: t('runtime.cx.timelineTraceLogs.events.stepQueued.logExcerpt'),
        severity: 'info'
      },
      {
        id: 'evt-retry',
        timestamp: '10:12:08',
        title: t('runtime.cx.timelineTraceLogs.events.retryTriggered.title'),
        span: t('runtime.cx.timelineTraceLogs.events.retryTriggered.span'),
        logExcerpt: t('runtime.cx.timelineTraceLogs.events.retryTriggered.logExcerpt'),
        severity: 'warning'
      },
      {
        id: 'evt-fallback',
        timestamp: '10:12:15',
        title: t('runtime.cx.timelineTraceLogs.events.fallbackEngaged.title'),
        span: t('runtime.cx.timelineTraceLogs.events.fallbackEngaged.span'),
        logExcerpt: t('runtime.cx.timelineTraceLogs.events.fallbackEngaged.logExcerpt'),
        severity: 'error'
      }
    ],
    [t]
  );
  const traceTree = useMemo<TraceNodeContract[]>(
    () => [
      {
        id: 'node-root',
        title: t('runtime.cx.timelineTraceLogs.trace.runExecute'),
        state: 'retrying',
        durationMs: 6140,
        children: [
          { id: 'node-queue', title: t('runtime.cx.timelineTraceLogs.trace.queueWait'), state: 'loading', durationMs: 820 },
          {
            id: 'node-route',
            title: t('runtime.cx.timelineTraceLogs.trace.routePrimary'),
            state: 'timeout',
            durationMs: 2130,
            children: [
              { id: 'node-retry', title: t('runtime.cx.timelineTraceLogs.trace.retryHandler'), state: 'retrying', durationMs: 1430 },
              { id: 'node-fallback', title: t('runtime.cx.timelineTraceLogs.trace.routeFallback'), state: 'fallback_engaged', durationMs: 1760 }
            ]
          }
        ]
      }
    ],
    [t]
  );
  const logRows = useMemo<StructuredLogRecordContract[]>(
    () => [
      {
        id: 'log-1',
        timestamp: '10:12:04.110',
        level: 'info',
        message: t('runtime.cx.timelineTraceLogs.logs.accepted'),
        attributes: { lane: 'live_smoke' } as Record<string, string | number | boolean>
      },
      {
        id: 'log-2',
        timestamp: '10:12:08.561',
        level: 'warning',
        message: t('runtime.cx.timelineTraceLogs.logs.retryBudget'),
        attributes: { attempt: 2, max_attempts: 5 } as Record<string, string | number | boolean>
      },
      {
        id: 'log-3',
        timestamp: '10:12:15.029',
        level: 'error',
        message: t('runtime.cx.timelineTraceLogs.logs.fallback'),
        attributes: { timeout_ms: 45000 } as Record<string, string | number | boolean>
      }
    ],
    [t]
  );
  const [selectedId, setSelectedId] = useState(timelineEvents[0].id);
  const selected = useMemo(
    () => timelineEvents.find((event) => event.id === selectedId) ?? timelineEvents[0],
    [selectedId]
  );

  return (
    <section className="grid min-w-0 gap-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3 lg:grid-cols-2 xl:grid-cols-3">
      <article className="min-w-0 space-y-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cx.timelineTraceLogs.timelineTitle')}</h3>
        <div className="space-y-2">
          {timelineEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              aria-pressed={selectedId === event.id}
              className="flex w-full min-w-0 items-start justify-between gap-2 rounded-[var(--fxq-radius-md)] border border-white/8 p-2 text-left hover:bg-white/4 aria-pressed:border-[color:var(--fxq-semantic-info)]"
              onClick={() => setSelectedId(event.id)}
            >
              <div className="min-w-0">
                <div className="text-sm font-medium break-words">{event.title}</div>
                <div className="text-xs text-[color:var(--fxq-text-secondary)]">{event.timestamp}</div>
              </div>
              <Badge tone={event.severity}>{event.severity}</Badge>
            </button>
          ))}
        </div>
        <div className="rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
          <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.cx.timelineTraceLogs.correlation')}</div>
          <div className="mt-1 break-all fxq-mono text-sm">{selected.span}</div>
          <div className="mt-1 break-words text-sm">{selected.logExcerpt}</div>
        </div>
      </article>

      <article className="min-w-0 space-y-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cx.timelineTraceLogs.traceTitle')}</h3>
        <ul className="space-y-1">
          {traceTree.map((node) => <TraceNode key={node.id} node={node} />)}
        </ul>
      </article>

      <article className="min-w-0 space-y-2 xl:col-span-1">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.cx.timelineTraceLogs.logsTitle')}</h3>
        <div className="max-h-64 space-y-1 overflow-auto rounded-[var(--fxq-radius-md)] border border-white/8 p-2">
          {logRows.map((row) => (
            <div key={row.id} className="rounded-[var(--fxq-radius-sm)] border border-white/8 bg-white/4 p-2">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Badge tone={row.level === 'error' ? 'error' : row.level === 'warning' ? 'warning' : 'info'}>{row.level}</Badge>
                <span className="fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">{row.timestamp}</span>
              </div>
              <p className="mt-1 break-words text-sm">{row.message}</p>
              {row.attributes ? (
                <div className="mt-1 break-all fxq-mono text-xs text-[color:var(--fxq-text-secondary)]">
                  {Object.entries(row.attributes).map(([key, value]) => `${key}=${String(value)}`).join(' ')}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
