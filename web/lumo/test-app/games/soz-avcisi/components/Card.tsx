"use client";

interface CardProps {
  text: string;
  state: "idle" | "selected" | "matched" | "wrong";
  disabled: boolean;
  onClick: () => void;
}

export function Card({ text, state, disabled, onClick }: CardProps) {
  const baseClasses =
    "relative flex items-center justify-center min-h-[56px] px-3 py-4 rounded-lg border-2 font-semibold text-sm sm:text-base transition-all duration-200 ease-in-out cursor-pointer select-none";

  const stateClasses: Record<CardProps["state"], string> = {
    idle: "bg-card border-border text-card-foreground shadow hover:shadow-lg hover:border-primary/40 active:scale-[0.97]",
    selected:
      "bg-primary/10 border-primary text-primary shadow-lg scale-[1.03]",
    matched:
      "bg-accent/15 border-accent text-accent-foreground shadow opacity-80 pointer-events-none",
    wrong:
      "bg-destructive/10 border-destructive text-destructive shadow animate-shake pointer-events-none",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || state === "matched"}
      className={`${baseClasses} ${stateClasses[state]} ${
        disabled || state === "matched"
          ? "cursor-default"
          : ""
      }`}
    >
      <span className="text-center leading-snug">{text}</span>
      {state === "matched" && (
        <span className="absolute top-1 right-1.5 text-accent text-xs">✓</span>
      )}
    </button>
  );
}
