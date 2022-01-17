import { useBreakpoint } from '@xstyled/styled-components';
import { useEffect, useState } from 'react';

export const useShow = (breakpoints: string[]) => {
  const breakpoint = useBreakpoint();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (breakpoint && breakpoints.includes(breakpoint)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [breakpoint, breakpoints]);

  return { show };
};
