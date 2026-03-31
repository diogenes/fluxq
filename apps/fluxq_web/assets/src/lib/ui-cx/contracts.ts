import type { OperationalState, RuntimeLane } from '@/lib/domain';

export type Lane = RuntimeLane;

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
