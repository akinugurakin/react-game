"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountdownOptions {
  initialSeconds: number;
  onTimeUp: () => void;
  autoStart?: boolean;
}

export function useCountdown({
  initialSeconds,
  onTimeUp,
  autoStart = true,
}: UseCountdownOptions) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  const stoppedRef = useRef(false);

  onTimeUpRef.current = onTimeUp;

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoStart) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!stoppedRef.current) onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoStart]);

  const isUrgent = timeLeft <= 15;
  const progress = timeLeft / initialSeconds;

  const formatted = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
    .toString()
    .padStart(2, "0")}`;

  return { timeLeft, formatted, isUrgent, progress, stop };
}
