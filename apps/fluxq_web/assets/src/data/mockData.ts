import type {
  ReadonlyDiagnosticsItem,
  ReadonlyNavSection,
  ReadonlyStateCard,
  RuntimeLane
} from '@/lib/domain';

export const runtimeLanes: ReadonlyArray<RuntimeLane> = ['fixture', 'live_smoke', 'live'];

export const shellSections: ReadonlyArray<ReadonlyNavSection> = [
  {
    key: 'operations',
    titleKey: 'shell.sections.operations',
    items: [
      {
        key: 'overview',
        labelKey: 'shell.leftNav.overview',
        href: '#overview',
        icon: 'layout-dashboard',
        tone: 'info'
      },
      {
        key: 'run-history',
        labelKey: 'shell.leftNav.runHistory',
        href: '#runs',
        icon: 'history',
        tone: 'neutral'
      },
      {
        key: 'provider-health',
        labelKey: 'shell.leftNav.providerHealth',
        href: '#provider-health',
        icon: 'activity',
        tone: 'warning'
      }
    ]
  },
  {
    key: 'analysis',
    titleKey: 'shell.sections.analysis',
    items: [
      {
        key: 'portability',
        labelKey: 'shell.leftNav.portabilityAnalytics',
        href: '#portability',
        icon: 'chart-column',
        tone: 'success'
      },
      {
        key: 'alerts',
        labelKey: 'shell.leftNav.alerts',
        href: '#alerts',
        icon: 'alert-triangle',
        tone: 'error'
      }
    ]
  },
  {
    key: 'build',
    titleKey: 'shell.sections.build',
    items: [
      {
        key: 'builder',
        labelKey: 'shell.leftNav.workflowBuilder',
        href: '#builder',
        icon: 'workflow',
        tone: 'info'
      },
      {
        key: 'livebook',
        labelKey: 'shell.leftNav.livebookBridge',
        href: '#livebook',
        icon: 'book-open-text',
        tone: 'neutral'
      }
    ]
  },
  {
    key: 'governance',
    titleKey: 'shell.sections.governance',
    items: [
      {
        key: 'settings',
        labelKey: 'shell.leftNav.settings',
        href: '#settings',
        icon: 'settings',
        tone: 'neutral'
      },
      {
        key: 'team-admin',
        labelKey: 'shell.leftNav.teamAdmin',
        href: '#team-admin',
        icon: 'shield',
        tone: 'neutral'
      }
    ]
  }
];

export const diagnosticsRailItems: ReadonlyArray<ReadonlyDiagnosticsItem> = [
  {
    key: 'lane-choice',
    titleKey: 'app.subtitle',
    descriptionKey: 'workspace.description',
    state: 'success_recovered',
    actionKey: 'actions.review'
  },
  {
    key: 'retry-budget',
    titleKey: 'state.retrying.title',
    descriptionKey: 'state.retrying.description',
    state: 'retrying',
    actionKey: 'actions.compare'
  },
  {
    key: 'fallback-route',
    titleKey: 'state.fallbackEngaged.title',
    descriptionKey: 'state.fallbackEngaged.description',
    state: 'fallback_engaged',
    actionKey: 'actions.export'
  }
];

export const shellStateCards: ReadonlyArray<ReadonlyStateCard> = [
  {
    key: 'empty',
    titleKey: 'state.empty.title',
    descriptionKey: 'state.empty.description',
    state: 'empty'
  },
  {
    key: 'loading',
    titleKey: 'state.loading.title',
    descriptionKey: 'state.loading.description',
    state: 'loading'
  },
  {
    key: 'degraded',
    titleKey: 'state.degraded.title',
    descriptionKey: 'state.degraded.description',
    state: 'degraded'
  },
  {
    key: 'timeout',
    titleKey: 'state.timeout.title',
    descriptionKey: 'state.timeout.description',
    state: 'timeout'
  },
  {
    key: 'cancelled',
    titleKey: 'state.cancelled.title',
    descriptionKey: 'state.cancelled.description',
    state: 'cancelled'
  },
  {
    key: 'recovered',
    titleKey: 'state.successRecovered.title',
    descriptionKey: 'state.successRecovered.description',
    state: 'success_recovered'
  }
];
