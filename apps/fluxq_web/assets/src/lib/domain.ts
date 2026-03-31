export type RuntimeLane = 'fixture' | 'live_smoke' | 'live';

export type OperationalState =
  | 'empty'
  | 'loading'
  | 'degraded'
  | 'error'
  | 'retrying'
  | 'timeout'
  | 'fallback_engaged'
  | 'cancelled'
  | 'success_recovered';

export type ShellDensity = 'compact' | 'expanded';

export interface ReadonlyTokenChip {
  readonly key: string;
  readonly labelKey: string;
  readonly tone: 'neutral' | 'info' | 'success' | 'warning' | 'error';
}

export interface ReadonlyNavItem {
  readonly key: string;
  readonly labelKey: string;
  readonly href: string;
  readonly icon: string;
  readonly tone?: ReadonlyTokenChip['tone'];
  readonly shortcut?: string;
}

export interface ReadonlyNavSection {
  readonly key: string;
  readonly titleKey: string;
  readonly items: ReadonlyArray<ReadonlyNavItem>;
}

export interface ReadonlyDiagnosticsItem {
  readonly key: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly state: OperationalState;
  readonly actionKey?: string;
}

export interface ReadonlyStateCard {
  readonly key: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly state: OperationalState;
}
