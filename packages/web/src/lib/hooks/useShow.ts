import { useBreakpoint } from '@xstyled/styled-components';
import { useEffect, useState } from 'react';

export const useShow = (breakpoints: string[]) => {
  const breakpoint = useBreakpoint();
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (breakpoint && breakpoints.includes(breakpoint)) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [breakpoint, breakpoints]);

  return { showSuggestions };
};
