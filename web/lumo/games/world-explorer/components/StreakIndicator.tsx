"use client";

interface StreakIndicatorProps {
  count: number;
  visible: boolean;
}

export function StreakIndicator({ count, visible }: StreakIndicatorProps) {
  if (!visible) return null;

  return (
    <div className="flex justify-center">
      <span
        className="inline-flex items-center gap-1 text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full animate-bounce"
        style={{ animationDuration: "0.6s", animationIterationCount: "2" }}
      >
        <span className="text-sm">🔥</span>
        {count} streak!
      </span>
    </div>
  );
}
