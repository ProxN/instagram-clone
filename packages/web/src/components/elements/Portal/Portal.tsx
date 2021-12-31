import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    container.current = document.querySelector('#portal');

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, container.current as HTMLDivElement)
    : null;
};

export default Portal;
