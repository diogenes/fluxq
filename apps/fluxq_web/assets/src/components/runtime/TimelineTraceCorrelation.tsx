import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';

type CorrelatedEvent = {
  readonly id: string;
  readonly timestamp: string;
  readonly title: string;
  readonly span: string;
  readonly logExcerpt: string;
  readonly severity: 'info' | 'warning' | 'error';
};

const events: CorrelatedEvent[] = [
  {
    id: 'evt-1',
    timestamp: '10:12:04',
    title: 'Step queued',
    span: 'nxq.workflow.run.queue',
    logExcerpt: 'queue wait started for run-042',
    severity: 'info'
  },
  {
    id: 'evt-2',
    timestamp: '10:12:08',
    title: 'Retry triggered',
    span: 'nxq.provider.submit.retry',
    logExcerpt: 'retry policy invoked after transient timeout',
    severity: 'warning'
  },
  {
    id: 'evt-3',
    timestamp: '10:12:15',
    title: 'Fallback engaged',
    span: 'nxq.provider.route.fallback',
    logExcerpt: 'fallback route selected based on circuit state',
    severity: 'error'
  }
];

export function TimelineTraceCorrelation() {
  const [selectedId, setSelectedId] = useState(events[0].id);

  const selected = useMemo(
    () => events.find((event) => event.id === selectedId) ?? events[0],
    [selectedId]
  );

  return (
    <section className="grid gap-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-2">
        <h3 className="fxq-display text-base font-semibold">Timeline + trace correlation</h3>
        <div className="space-y-2">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setSelectedId(event.id)}
              className="flex w-full items-center justify-between gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-2 text-left hover:bg-white/4"
            >
              <div>
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-[color:var(--fxq-text-secondary)]">{event.timestamp}</div>
              </div>
              <Badge tone={event.severity}>{event.severity}</Badge>
            </button>
          ))}
        </div>
      </div>

      <aside className="rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">correlated span</div>
        <div className="mt-1 fxq-mono text-sm">{selected.span}</div>
        <div className="mt-3 text-xs uppercase text-[color:var(--fxq-text-secondary)]">log excerpt</div>
        <div className="mt-1 text-sm">{selected.logExcerpt}</div>
      </aside>
    </section>
  );
}
