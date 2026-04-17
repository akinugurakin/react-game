"use client";

import { useState, useCallback, useRef } from "react";

export function useStreak() {
  const [current, setCurrent] = useState(0);
  const bestRef = useRef(0);

  const hit = useCallback(() => {
    setCurrent((prev) => {
      const next = prev + 1;
      if (next > bestRef.current) bestRef.current = next;
      return next;
    });
  }, []);

  const miss = useCallback(() => setCurrent(0), []);

  return {
    current,
    best: bestRef.current,
    hit,
    miss,
    /** True when streak is high enough to show fire indicator */
    isHot: current >= 3,
  };
}
