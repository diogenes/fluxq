export const englishResources = {
  translation: {
    app: {
      brand: 'FluxQ',
      subtitle: 'Observability-first orchestration control plane',
      lane: {
        fixture: 'fixture',
        liveSmoke: 'live_smoke',
        live: 'live'
      }
    },
    shell: {
      topNav: {
        search: 'Search runs, workflows, providers',
        primaryAction: 'Open incident rail'
      },
      leftNav: {
        overview: 'Overview',
        workflowCatalog: 'Workflow Catalog',
        runHistory: 'Run History',
        providerHealth: 'Provider Health',
        portabilityAnalytics: 'Portability Analytics',
        alerts: 'Alerts',
        workflowBuilder: 'Workflow Builder',
        livebookBridge: 'Livebook Bridge',
        settings: 'Settings',
        teamAdmin: 'Team/Admin'
      },
      sections: {
        operations: 'Operations',
        analysis: 'Analysis',
        build: 'Build',
        governance: 'Governance'
      },
      diagnostics: {
        title: 'Diagnostics rail',
        subtitle: 'Visible by default for incident triage'
      },
      canvas: {
        title: 'Content canvas',
        subtitle: 'Primary operator workspace'
      }
    },
    state: {
      empty: {
        title: 'Nothing to show yet',
        description: 'This surface will populate once a workflow or run is selected.'
      },
      loading: {
        title: 'Loading live context',
        description: 'Synchronizing the latest operational evidence.'
      },
      degraded: {
        title: 'Degraded',
        description: 'Action is still available, but confidence is reduced.'
      },
      error: {
        title: 'Error',
        description: 'The requested evidence could not be loaded.'
      },
      retrying: {
        title: 'Retrying',
        description: 'The control plane is attempting recovery.'
      },
      timeout: {
        title: 'Timeout',
        description: 'The current operation exceeded its expected window.'
      },
      fallbackEngaged: {
        title: 'Fallback engaged',
        description: 'A safer route was selected to preserve progress.'
      },
      cancelled: {
        title: 'Cancelled',
        description: 'This action stopped before completion.'
      },
      successRecovered: {
        title: 'Recovered',
        description: 'The system returned to a healthy state.'
      }
    },
    workspace: {
      title: 'Control plane workspace',
      description: 'Inspect deterministic and live lanes without provider jargon.',
      fixtureDescription: 'Deterministic baseline for repeatable operator checks.',
      liveSmokeDescription: 'Safe live validation with limited scope.',
      liveDescription: 'Active live operations with full correlation signals.',
      statePackLabel: 'state pack',
      laneBadge: 'lane'
    },
    actions: {
      review: 'Review evidence',
      compare: 'Compare runs',
      export: 'Export bundle',
      diagnostics: 'Diagnostics',
      toggleSidebar: 'Toggle sidebar',
      collapseSidebar: 'Collapse sidebar',
      expandSidebar: 'Expand sidebar',
      retry: 'Retry now',
      reroute: 'Reroute',
      acknowledge: 'Acknowledge'
    },
    primitives: {
      inputPlaceholder: 'Search correlation id',
      textareaPlaceholder: 'Add incident note',
      selectDefault: 'Choose lane',
      checkbox: 'Require deterministic baseline',
      switch: 'Enable reduced motion',
      dialogTitle: 'Confirm recovery action',
      dialogDescription: 'This action attempts recovery without exposing provider-specific payload details.',
      sheetTitle: 'Incident action rail',
      dropdownLabel: 'Quick actions',
      tooltipLabel: 'Correlation evidence is attached.',
      alertInfoTitle: 'Operational notice',
      alertWarningTitle: 'Degradation detected',
      alertErrorTitle: 'Incident requires action',
      alertInfoBody: 'Filter updates are available for this surface.',
      alertWarningBody: 'Latency drift is approaching configured threshold.',
      alertErrorBody: 'Retry budget is nearly exhausted; review fallback policy.'
    },
    filters: {
      title: 'Unified filter bar',
      queryLabel: 'Query',
      queryPlaceholder: 'Search run id, workflow, or correlation id',
      laneLabel: 'Lane',
      statusLabel: 'Status',
      targetLabel: 'Execution target',
      timeWindowLabel: 'Time window',
      clear: 'Clear filters',
      apply: 'Apply',
      noActiveFilters: 'No active filters',
      laneOptions: {
        all: 'all lanes',
        fixture: 'fixture',
        live_smoke: 'live_smoke',
        live: 'live'
      },
      statusOptions: {
        all: 'all states',
        queued: 'queued',
        running: 'running',
        retrying: 'retrying',
        degraded: 'degraded',
        timeout: 'timeout',
        failed: 'failed',
        cancelled: 'cancelled',
        success_recovered: 'success_recovered'
      },
      targetOptions: {
        all: 'all targets',
        primary_route: 'primary_route',
        fallback_route: 'fallback_route',
        simulator: 'simulator'
      },
      timeOptions: {
        '15m': 'last 15m',
        '1h': 'last 1h',
        '6h': 'last 6h',
        '24h': 'last 24h'
      }
    },
    runtime: {
      runDetail: {
        title: 'Run detail',
        subtitle: 'Timeline, trace, logs, and incident context.',
        timeline: 'Timeline',
        trace: 'Trace',
        logs: 'Logs',
        incidentRail: 'Incident rail'
      },
      incidentRail: {
        title: 'Incident action rail v2',
        summaryTitle: 'Active incident',
        summaryDescription: 'Retry pressure increased and fallback route may be required.'
      },
      providerHealth: {
        title: 'Provider health',
        subtitle: 'Status strip and diagnostics panel.',
        status: 'Status strip',
        diagnostics: 'Diagnostics panel',
        actions: 'Action rail'
      },
      statusStrip: {
        title: 'Operational status strip v2',
        retryBudget: 'Retry budget',
        timeoutPolicy: 'Timeout policy',
        fallbackRoute: 'Fallback route',
        terminalAttribution: 'Terminal attribution'
      },
      portability: {
        title: 'Portability analytics',
        subtitle: 'Comparability matrix with confidence and sample quality.',
        matrix: 'Comparability matrix',
        confidence: 'Confidence band',
        sampleQuality: 'Sample quality'
      },
      livebook: {
        title: 'Livebook linkage',
        subtitle: 'Provenance chain and reproducibility checklist.',
        provenance: 'Provenance chain',
        checklist: 'Reproducibility checklist',
        bundle: 'Bundle actions'
      },
      workflowBuilder: {
        title: 'Workflow builder scaffold',
        canvas: 'Canvas',
        palette: 'Node palette',
        inspector: 'Inspector shell'
      },
      telemetry: {
        title: 'Telemetry chart stubs',
        subtitle: 'Semantic placeholders aligned to approved design contracts.'
      }
    }
  }
} as const;
