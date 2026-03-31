import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

type CorrelatedEvent = {
  readonly id: string;
  readonly timestamp: string;
  readonly title: string;
  readonly span: string;
  readonly logExcerpt: string;
  readonly severity: 'info' | 'warning' | 'error';
};

export function TimelineTraceCorrelation() {
  const { t } = useTranslation();
  const events = useMemo<CorrelatedEvent[]>(
    () => [
      {
        id: 'evt-1',
        timestamp: '10:12:04',
        title: t('runtime.timelineTrace.events.stepQueued.title'),
        span: t('runtime.timelineTrace.events.stepQueued.span'),
        logExcerpt: t('runtime.timelineTrace.events.stepQueued.logExcerpt'),
        severity: 'info'
      },
      {
        id: 'evt-2',
        timestamp: '10:12:08',
        title: t('runtime.timelineTrace.events.retryTriggered.title'),
        span: t('runtime.timelineTrace.events.retryTriggered.span'),
        logExcerpt: t('runtime.timelineTrace.events.retryTriggered.logExcerpt'),
        severity: 'warning'
      },
      {
        id: 'evt-3',
        timestamp: '10:12:15',
        title: t('runtime.timelineTrace.events.fallbackEngaged.title'),
        span: t('runtime.timelineTrace.events.fallbackEngaged.span'),
        logExcerpt: t('runtime.timelineTrace.events.fallbackEngaged.logExcerpt'),
        severity: 'error'
      }
    ],
    [t]
  );
  const [selectedId, setSelectedId] = useState(events[0].id);

  const selected = useMemo(
    () => events.find((event) => event.id === selectedId) ?? events[0],
    [selectedId]
  );

  return (
    <section className="grid min-w-0 gap-3 rounded-[var(--fxq-radius-lg)] border border-white/10 bg-[color:var(--fxq-background-surface-low)] p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
      <div className="min-w-0 space-y-2">
        <h3 className="fxq-display text-base font-semibold">{t('runtime.timelineTrace.title')}</h3>
        <div className="space-y-2">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setSelectedId(event.id)}
              className="flex min-w-0 w-full items-start justify-between gap-3 rounded-[var(--fxq-radius-md)] border border-white/8 p-2 text-left hover:bg-white/4"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium break-words">{event.title}</div>
                <div className="text-xs text-[color:var(--fxq-text-secondary)]">{event.timestamp}</div>
              </div>
              <Badge tone={event.severity}>{event.severity}</Badge>
            </button>
          ))}
        </div>
      </div>

      <aside className="min-w-0 overflow-hidden rounded-[var(--fxq-radius-md)] border border-white/8 p-3">
        <div className="text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.timelineTrace.correlatedSpan')}</div>
        <div className="mt-1 break-all fxq-mono text-sm">{selected.span}</div>
        <div className="mt-3 text-xs uppercase text-[color:var(--fxq-text-secondary)]">{t('runtime.timelineTrace.logExcerpt')}</div>
        <div className="mt-1 break-words text-sm">{selected.logExcerpt}</div>
      </aside>
    </section>
  );
}
