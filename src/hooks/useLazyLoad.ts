"use client";

import { useState, useEffect, useRef } from "react";

interface UseLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const useLazyLoad = (
  options: UseLazyLoadOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
  const { rootMargin = "50px", threshold = 0.1, triggerOnce = true } = options;

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return [ref, isInView];
};

export default useLazyLoad;
