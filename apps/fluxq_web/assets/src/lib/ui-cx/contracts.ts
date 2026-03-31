import type { OperationalState, RuntimeLane } from '@/lib/domain';

export type Lane = RuntimeLane;
export type DataBoundaryState =
  | OperationalState
  | 'no_access'
  | 'policy_blocked'
  | 'read_only'
  | 'maintenance';

export interface MetricValueContract {
  readonly key: string;
  readonly labelKey: string;
  readonly value: string | number;
  readonly unit?: string;
  readonly trend?: 'up' | 'down' | 'flat';
  readonly severity?: 'neutral' | 'info' | 'warning' | 'error' | 'success';
}

export interface TableColumnContract<Row> {
  readonly key: string;
  readonly headerKey: string;
  readonly sortable?: boolean;
  readonly dense?: boolean;
  readonly render: (row: Row) => string | number;
}

export interface TimelineEventContract {
  readonly id: string;
  readonly timestamp: string;
  readonly title: string;
  readonly span: string;
  readonly logExcerpt: string;
  readonly severity: 'info' | 'warning' | 'error';
}

export interface TraceNodeContract {
  readonly id: string;
  readonly title: string;
  readonly state: OperationalState;
  readonly durationMs?: number;
  readonly children?: ReadonlyArray<TraceNodeContract>;
}

export interface StructuredLogRecordContract {
  readonly id: string;
  readonly timestamp: string;
  readonly level: 'debug' | 'info' | 'warning' | 'error';
  readonly message: string;
  readonly attributes?: Readonly<Record<string, string | number | boolean>>;
}

export interface ActionRailActionContract {
  readonly id: string;
  readonly labelKey: string;
  readonly tone?: 'neutral' | 'info' | 'warning' | 'error' | 'success';
  readonly disabled?: boolean;
  readonly disabledReasonKey?: string;
}

export interface WorkflowNodeContract {
  readonly id: string;
  readonly labelKey: string;
  readonly x: number;
  readonly y: number;
  readonly tone: 'info' | 'warning' | 'success';
}

export interface WorkflowEdgeContract {
  readonly from: string;
  readonly to: string;
}

export interface OnboardingStepContract {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly state: 'pending' | 'active' | 'completed' | 'blocked';
  readonly requiredInputs?: ReadonlyArray<string>;
}

export interface TrendPointContract {
  readonly value: number;
}

export interface LaneMixContract {
  readonly lane: RuntimeLane;
  readonly segments: readonly [number, number, number];
}

export interface HeatmapCellContract {
  readonly row: number;
  readonly column: number;
  readonly intensity: number;
}

export interface QueryStateContract {
  readonly query?: string;
  readonly lane?: Lane | 'all';
  readonly status?: DataBoundaryState | 'all';
  readonly page?: number;
  readonly pageSize?: number;
  readonly sortBy?: string;
  readonly sortDirection?: 'asc' | 'desc';
}

export interface DataBoundaryContract {
  readonly state: DataBoundaryState;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly actionLabelKey?: string;
}

export interface TableProContract<Row> {
  readonly rows: ReadonlyArray<Row>;
  readonly columns: ReadonlyArray<TableColumnContract<Row>>;
  readonly queryState: QueryStateContract;
  readonly totalRows?: number;
  readonly emptyStateKey: string;
}

export interface LogViewerContract {
  readonly records: ReadonlyArray<StructuredLogRecordContract>;
  readonly queryState: QueryStateContract;
  readonly enableJsonExpand?: boolean;
}

export interface TraceTreeContract {
  readonly events: ReadonlyArray<TimelineEventContract>;
  readonly nodes: ReadonlyArray<TraceNodeContract>;
  readonly selectedEventId?: string;
}

export interface WorkflowBuilderProContract {
  readonly nodes: ReadonlyArray<WorkflowNodeContract>;
  readonly edges: ReadonlyArray<WorkflowEdgeContract>;
  readonly selectedNodeId?: string;
  readonly queryState?: QueryStateContract;
}

export interface TelemetryProContract {
  readonly trend: ReadonlyArray<TrendPointContract>;
  readonly laneMix: ReadonlyArray<LaneMixContract>;
  readonly heatmap: ReadonlyArray<HeatmapCellContract>;
  readonly queryState?: QueryStateContract;
}

export interface ActionGuardContract {
  readonly actionId: string;
  readonly labelKey: string;
  readonly requiresConfirmation: boolean;
  readonly policyState?: Extract<DataBoundaryState, 'policy_blocked' | 'read_only' | 'maintenance'>;
}
