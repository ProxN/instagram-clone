import { useEffect, useRef, useState } from 'react';

export const useInputFocus = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFocusInput = () => {
    setInputFocus(true);
  };

  useEffect(() => {
    if (inputFocus) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [inputFocus]);

  return { handleFocusInput, inputRef, inputFocus };
};
