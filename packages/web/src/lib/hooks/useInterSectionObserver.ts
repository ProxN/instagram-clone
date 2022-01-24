import { RefObject, useEffect } from 'react';

type ObserverProps = {
  target: RefObject<HTMLElement | null>;
  root?: RefObject<HTMLDivElement | null>;
  margin?: string;
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
};

export const useInterSectionObserver = ({
  enabled,
  onIntersect,
  root,
  target,
  margin,
  threshold = 1.0,
}: ObserverProps) => {
  useEffect(() => {
    if (!enabled) return;

    const options: { [key: string]: any } = {
      rootMargin: margin,
      threshold,
    };

    if (root && root.current) {
      options.root = root.current;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { ...options }
    );

    if (!(target && target.current)) return;

    observer.observe(target.current);

    return () => {
      if (target.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(target.current);
      }
    };
  }, [enabled, margin, onIntersect, root, target, threshold]);
};
