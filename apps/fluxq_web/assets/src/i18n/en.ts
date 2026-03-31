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
      toggleDiagnostics: 'Toggle diagnostics rail',
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
        all: 'default window',
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
        laneValue: 'fixture',
        retryBudget: 'Retry budget',
        retryBudgetValue: '2 / 5',
        timeoutPolicy: 'Timeout policy',
        timeoutPolicyValue: '45s step / 120s run',
        fallbackRoute: 'Fallback route',
        fallbackRouteValue: 'simulator',
        terminalAttribution: 'Terminal attribution',
        terminalAttributionValue: 'timeout_signal'
      },
      denseTable: {
        headers: {
          workflowRun: 'workflow/run',
          lane: 'lane',
          status: 'status',
          queueWait: 'queue wait (ms)',
          executionDuration: 'execution duration (ms)',
          retryBudget: 'retry budget',
          terminalAttribution: 'terminal attribution',
          comparability: 'comparability',
          updated: 'updated'
        },
        terminalAttribution: {
          timeout_signal: 'timeout_signal',
          success_recovered: 'success_recovered',
          timeout_exceeded: 'timeout_exceeded'
        }
      },
      timelineTrace: {
        title: 'Timeline + trace correlation',
        correlatedSpan: 'correlated span',
        logExcerpt: 'log excerpt',
        events: {
          stepQueued: {
            title: 'Step queued',
            span: 'control.run.queue',
            logExcerpt: 'Queue wait started for run-042.'
          },
          retryTriggered: {
            title: 'Retry triggered',
            span: 'control.route.retry',
            logExcerpt: 'Retry policy invoked after transient timeout signal.'
          },
          fallbackEngaged: {
            title: 'Fallback engaged',
            span: 'control.route.fallback',
            logExcerpt: 'Fallback route selected based on current circuit state.'
          }
        }
      },
      portability: {
        title: 'Portability analytics',
        subtitle: 'Comparability matrix with confidence and sample quality.',
        matrix: 'Comparability matrix',
        confidence: 'Confidence band',
        sampleQuality: 'Sample quality'
      },
      portabilityDecision: {
        confidenceBand: 'confidence band',
        confidenceValue: '0.71',
        confidenceHint: 'near threshold',
        sampleQuality: 'sample quality',
        sampleQualityValue: 'medium',
        sampleCount: '1,200 samples',
        recommendedAction: 'recommended action',
        compareBaseline: 'Compare with fixture baseline'
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
        inspector: 'Inspector shell',
        validation: {
          valid: 'valid',
          warning: 'warning',
          error: 'error'
        },
        checks: {
          retryPolicy: 'Validate retries/backoff before publish.',
          timeoutFallback: 'Surface timeout and fallback policies.',
          deterministicBaseline: 'Require deterministic baseline check.'
        },
        inspectorFields: {
          nodeType: 'node type: quantum_step',
          timeout: 'timeout: 45s',
          fallback: 'fallback: simulator'
        },
        validationError: 'validation failed: missing retry policy'
      },
      workflowAdvanced: {
        paletteTitle: 'Node palette',
        canvasTitle: 'Workflow builder canvas',
        validationState: 'validation: warning',
        inspectorTitle: 'Inspector',
        inspectorNode: 'node: quantum_step',
        inspectorTimeout: 'timeout: 45s',
        inspectorRetry: 'retry budget: 2/5',
        inspectorFallback: 'fallback route: simulator',
        validate: 'Run validation',
        preview: 'Preview execution',
        legend: {
          ready: 'ready',
          requiresReview: 'requires review',
          blocked: 'blocked'
        },
        checks: {
          retryBudget: 'Retry budget nearing exhaustion on selected branch.',
          timeoutFallback: 'Timeout exceeds lane policy; fallback recommended.',
          deterministicBaseline: 'Deterministic baseline link verified.'
        },
        palette: {
          quantumStep: 'quantum_step',
          classicalStep: 'classical_step',
          controlBranch: 'control_branch',
          fallbackRoute: 'fallback_route'
        },
        nodes: {
          intake: 'intake',
          quantumStep: 'quantum_step',
          portabilityCheck: 'portability_check',
          fallbackRoute: 'fallback_route'
        }
      },
      motion: {
        title: 'Motion/state contract',
        reduced: 'reduced-motion',
        standard: 'standard-motion',
        transitionDuration: 'Transition duration',
        policyMatrix: 'policy matrix',
        transitions: {
          none: 'none',
          pulseIn: 'pulse-in',
          attentionHighlight: 'attention-highlight',
          routeShift: 'route-shift',
          settleFade: 'settle-fade'
        }
      },
      telemetry: {
        title: 'Telemetry chart stubs',
        subtitle: 'Semantic placeholders aligned to approved design contracts.'
      },
      chartSuite: {
        latencyTrendTitle: 'Latency trend',
        latencyTrendSubtitle: 'P50-P95 latency envelope across the last 12 windows.',
        latencyP95: 'p95 74ms',
        latencyAria: 'Latency trend chart',
        stateMixTitle: 'State mix by lane',
        stateMixSubtitle: 'Relative distribution of recovered, degraded, and failed states.',
        heatmapTitle: 'Throughput heatmap',
        heatmapSubtitle: 'Step throughput density across workflow stages and recent windows.',
        heatmapWindow: 'window: last 24h',
        cellLabel: 'Cell',
        legend: {
          healthy: 'healthy',
          degraded: 'degraded',
          failed: 'failed'
        }
      },
      journeyMatrix: {
        title: 'UI-CX Journey Composition Matrix',
        operatorOverview: 'Operator Overview',
        runDetail: 'Run Detail',
        workflowAuthoring: 'Workflow Authoring',
        providerOperations: 'Provider Operations',
        portabilityAnalytics: 'Portability Analytics',
        headers: {
          journey: 'journey',
          componentFamilies: 'component families',
          laneSemantics: 'lane semantics'
        }
      },
      cx: {
        kpi: {
          title: 'KPI + Metric Card Family',
          subtitle: 'Canonical operational KPIs for cross-journey status framing.',
          metrics: {
            incidentPressure: 'incident pressure',
            retryRatio: 'retry ratio',
            timeoutRisk: 'timeout risk',
            fallbackReadiness: 'fallback readiness'
          }
        },
        filterTable: {
          title: 'Filters + Tabbed Table Family',
          tabsLabel: 'table state tabs',
          tabs: {
            all: 'all rows',
            degraded: 'degraded',
            timeouts: 'timeouts'
          },
          queryLabel: 'workflow query',
          queryPlaceholder: 'Filter by workflow id',
          laneLabel: 'lane',
          laneOptions: {
            all: 'all lanes',
            fixture: 'fixture',
            live_smoke: 'live_smoke',
            live: 'live'
          },
          headers: {
            workflow: 'workflow',
            lane: 'lane',
            state: 'state',
            latency: 'latency',
            drift: 'drift narrative'
          },
          stateOptions: {
            healthy: 'healthy',
            degraded: 'degraded',
            timeout: 'timeout'
          },
          driftOptions: {
            low: 'low',
            medium: 'medium',
            high: 'high'
          }
        },
        timelineTraceLogs: {
          timelineTitle: 'Timeline events',
          traceTitle: 'Trace tree',
          logsTitle: 'Structured logs',
          correlation: 'correlation',
          events: {
            stepQueued: {
              title: 'Step queued',
              span: 'control.run.queue',
              logExcerpt: 'Queue wait started for run-042.'
            },
            retryTriggered: {
              title: 'Retry triggered',
              span: 'control.route.retry',
              logExcerpt: 'Retry policy invoked after transient timeout signal.'
            },
            fallbackEngaged: {
              title: 'Fallback engaged',
              span: 'control.route.fallback',
              logExcerpt: 'Fallback route selected based on current circuit state.'
            }
          },
          trace: {
            runExecute: 'run.execute',
            queueWait: 'queue.wait',
            routePrimary: 'route.primary',
            retryHandler: 'retry.handler',
            routeFallback: 'route.fallback'
          },
          logs: {
            accepted: 'Run accepted into queue.',
            retryBudget: 'Retry budget decremented.',
            fallback: 'Primary route timed out; fallback engaged.'
          }
        },
        actionInspector: {
          title: 'Action Rail + Inspector Family',
          severity: 'S2',
          actionRail: 'action rail',
          inspector: 'inspector',
          actions: {
            retry: 'retry now',
            reroute: 'reroute safely',
            cancel: 'cancel run',
            bundle: 'export bundle'
          },
          fields: {
            target: 'target',
            lane: 'lane',
            timeout: 'timeout',
            retries: 'retries'
          },
          values: {
            target: 'run-042/step-06',
            lane: 'live_smoke',
            timeout: '45s',
            retries: '2 / 5'
          }
        }
      },
      onboarding: {
        title: 'Onboarding Flow Kit',
        subtitle: 'Stepper and readiness checks for production-safe activation.',
        status: {
          ready: 'ready',
          needsReview: 'needs review'
        },
        readinessTitle: 'readiness checks',
        readinessState: {
          ok: 'ok',
          review: 'review'
        },
        stepStates: {
          pending: 'pending',
          active: 'active',
          completed: 'completed',
          blocked: 'blocked'
        },
        readiness: {
          deterministic: 'Deterministic fixture lane configured.',
          traceCorrelation: 'Trace and logs correlation enabled.',
          fallbackPath: 'Fallback path validated.',
          alertRouting: 'Alert routing configured.'
        },
        actions: {
          continue: 'Continue setup',
          openGuide: 'Open setup guide'
        },
        steps: {
          connectTelemetry: {
            title: 'Connect telemetry sources',
            description: 'Attach runtime event streams and baseline metrics.'
          },
          configureLane: {
            title: 'Configure deterministic lane',
            description: 'Set fixture defaults for repeatable verification.'
          },
          runFixture: {
            title: 'Run fixture validation',
            description: 'Execute first fixture flow and confirm observability.'
          },
          reviewFallback: {
            title: 'Review fallback policy',
            description: 'Ensure timeout and fallback rules are operator-visible.'
          }
        }
      }
    }
  }
} as const;
