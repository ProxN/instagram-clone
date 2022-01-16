import { RefObject, useEffect } from 'react';

type ObserverProps = {
  target: RefObject<HTMLElement | null>;
  margin?: string;
  onIntersect: () => void;
  enabled?: boolean;
};

export const useInterSectionObserver = ({
  enabled,
  onIntersect,
  target,
  margin,
}: ObserverProps) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      {
        rootMargin: margin,
        threshold: 1.0,
      }
    );

    if (!(target && target.current)) return;

    observer.observe(target.current);

    return () => {
      if (target.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(target.current);
      }
    };
  }, [enabled, margin, onIntersect, target]);
};
