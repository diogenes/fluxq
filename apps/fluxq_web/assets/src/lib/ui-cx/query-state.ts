import type { DataBoundaryState, QueryStateContract } from './contracts';

export type BoundaryTone = 'neutral' | 'info' | 'warning' | 'error' | 'success';

export const boundaryToneByState: Record<DataBoundaryState, BoundaryTone> = {
  empty: 'neutral',
  loading: 'info',
  degraded: 'warning',
  error: 'error',
  retrying: 'info',
  timeout: 'warning',
  fallback_engaged: 'info',
  cancelled: 'neutral',
  success_recovered: 'success',
  no_access: 'warning',
  policy_blocked: 'error',
  read_only: 'neutral',
  maintenance: 'warning'
};

const boundaryI18nKeyByState: Record<DataBoundaryState, string> = {
  empty: 'empty',
  loading: 'loading',
  degraded: 'degraded',
  error: 'error',
  retrying: 'retrying',
  timeout: 'timeout',
  fallback_engaged: 'fallbackEngaged',
  cancelled: 'cancelled',
  success_recovered: 'successRecovered',
  no_access: 'noAccess',
  policy_blocked: 'policyBlocked',
  read_only: 'readOnly',
  maintenance: 'maintenance'
};

export function boundaryStateToTranslationKey(state: DataBoundaryState): string {
  return boundaryI18nKeyByState[state];
}

export function normalizeQueryState(state?: QueryStateContract): QueryStateContract {
  return {
    query: state?.query ?? '',
    lane: state?.lane ?? 'all',
    status: state?.status ?? 'all',
    page: state?.page ?? 1,
    pageSize: state?.pageSize ?? 25,
    sortBy: state?.sortBy ?? 'updated',
    sortDirection: state?.sortDirection ?? 'desc'
  };
}

export function queryStateToBoundaryState(state?: QueryStateContract): DataBoundaryState {
  const normalized = normalizeQueryState(state);
  if (!normalized.status || normalized.status === 'all') return 'success_recovered';
  return normalized.status;
}
