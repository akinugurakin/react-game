"use client";

import { useEffect, useState } from "react";

interface FeedbackFlashProps {
  type: "correct" | "wrong" | null;
  /** Correction text shown on wrong answer */
  correction?: string;
}

export function FeedbackFlash({ type, correction }: FeedbackFlashProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [type]);

  if (!visible || !type) return null;

  return (
    <div
      className={`text-center text-sm font-bold transition-all duration-300 ${
        type === "correct" ? "text-accent" : "text-destructive"
      }`}
      style={{
        animation: "feedbackPop 0.3s ease-out",
      }}
    >
      {type === "correct" ? (
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-lg">✓</span> Correct!
        </span>
      ) : (
        <div className="space-y-0.5">
          <span className="flex items-center justify-center gap-1.5">
            <span className="text-lg">✗</span> Not quite!
          </span>
          {correction && (
            <p className="text-xs font-semibold text-muted-foreground">
              {correction}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
