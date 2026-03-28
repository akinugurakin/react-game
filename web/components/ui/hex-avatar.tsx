"use client";

import { cn } from "@/lib/utils";

interface HexAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  borderColor?: string;
  className?: string;
  image?: string;
  online?: boolean;
  gradient?: string;
}

const sizeMap = {
  sm: { container: "w-9 h-9", text: "text-xs", dot: "w-2.5 h-2.5 -bottom-0 -right-0", ring: "ring-2" },
  md: { container: "w-12 h-12", text: "text-sm", dot: "w-3 h-3 -bottom-0 -right-0", ring: "ring-2" },
  lg: { container: "w-18 h-18", text: "text-lg", dot: "w-3.5 h-3.5 bottom-0 right-0", ring: "ring-[3px]" },
  xl: { container: "w-24 h-24", text: "text-2xl", dot: "w-4 h-4 bottom-0.5 right-0.5", ring: "ring-4" },
};

const defaultGradients = [
  "from-indigo-500 to-cyan-400",
  "from-rose-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-amber-500 to-yellow-400",
];

export function HexAvatar({
  initials,
  size = "md",
  borderColor = "ring-background",
  className,
  image,
  online,
  gradient,
}: HexAvatarProps) {
  const s = sizeMap[size];
  const grad =
    gradient || defaultGradients[initials.charCodeAt(0) % defaultGradients.length];

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          s.container,
          "relative overflow-hidden rounded-full",
          "flex items-center justify-center",
          `bg-gradient-to-br ${grad}`,
          "text-white font-bold",
          s.text,
          s.ring,
          borderColor
        )}
      >
        {image ? (
          <img
            src={image}
            alt={initials}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="drop-shadow-sm">{initials}</span>
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute block rounded-full border-2 border-background",
            s.dot,
            online ? "bg-emerald-500" : "bg-gray-400"
          )}
        />
      )}
    </div>
  );
}
