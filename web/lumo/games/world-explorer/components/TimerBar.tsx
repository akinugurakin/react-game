"use client";

interface TimerBarProps {
  formatted: string;
  progress: number;
  isUrgent: boolean;
}

export function TimerBar({ formatted, progress, isUrgent }: TimerBarProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-end">
        <span
          className={`font-mono text-sm font-extrabold px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
            isUrgent
              ? "text-destructive bg-destructive/10 animate-pulse"
              : "text-foreground bg-muted"
          }`}
        >
          {formatted}
        </span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isUrgent ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
