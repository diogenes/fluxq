import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatches = (): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
