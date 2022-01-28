import { useEffect, useState } from 'react';

type DebounceOptions = {
  value: string;
  delay?: number;
};

export const useDebounce = ({ value, delay = 500 }: DebounceOptions) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};
