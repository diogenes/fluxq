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
      tooltipLabel: 'Correlation evidence is attached.'
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
      providerHealth: {
        title: 'Provider health',
        subtitle: 'Status strip and diagnostics panel.',
        status: 'Status strip',
        diagnostics: 'Diagnostics panel',
        actions: 'Action rail'
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
