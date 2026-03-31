import { useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

export function useShellState(initialCollapsed = false) {
  const isWideScreen = useMediaQuery('(min-width: 1280px)');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(initialCollapsed);
  const [diagnosticsCollapsed, setDiagnosticsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (!isWideScreen) {
      setSidebarCollapsed(true);
      setDiagnosticsCollapsed(true);
    } else {
      setSidebarCollapsed(initialCollapsed);
      setDiagnosticsCollapsed(false);
    }
  }, [initialCollapsed, isWideScreen]);

  return {
    isWideScreen,
    sidebarCollapsed,
    setSidebarCollapsed,
    diagnosticsCollapsed,
    setDiagnosticsCollapsed
  } as const;
}
