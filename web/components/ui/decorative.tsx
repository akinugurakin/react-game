"use client";

import { cn } from "@/lib/utils";

export function WaveDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block h-[60px] w-full"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-muted/30"
          opacity=".25"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          className="fill-muted/30"
          opacity=".5"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          className="fill-background"
        />
      </svg>
    </div>
  );
}

export function GlowOrb({
  className,
  color = "bg-primary/10",
  size = "w-64 h-64",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        color,
        size,
        className
      )}
    />
  );
}

export function GridPattern({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none opacity-[0.03]", className)}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function GameIllustration({ type, className }: { type: "math" | "words" | "memory" | "puzzle"; className?: string }) {
  const illustrations = {
    math: (
      <svg viewBox="0 0 200 160" className={cn("w-full h-full", className)}>
        <defs>
          <linearGradient id="mathBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="12" fill="url(#mathBg)" />
        <text x="40" y="55" fontSize="32" fill="white" opacity="0.9" fontWeight="bold">2+3</text>
        <text x="100" y="95" fontSize="28" fill="white" opacity="0.7" fontWeight="bold">=5</text>
        <text x="130" y="45" fontSize="20" fill="white" opacity="0.3">×</text>
        <text x="25" y="130" fontSize="18" fill="white" opacity="0.3">÷</text>
        <text x="155" y="125" fontSize="24" fill="white" opacity="0.3">+</text>
        <circle cx="160" cy="35" r="15" fill="white" opacity="0.1" />
        <circle cx="30" cy="95" r="10" fill="white" opacity="0.1" />
      </svg>
    ),
    words: (
      <svg viewBox="0 0 200 160" className={cn("w-full h-full", className)}>
        <defs>
          <linearGradient id="wordsBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="12" fill="url(#wordsBg)" />
        <text x="30" y="55" fontSize="28" fill="white" opacity="0.9" fontWeight="bold">ABC</text>
        <rect x="25" y="70" width="35" height="35" rx="6" fill="white" opacity="0.2" />
        <text x="33" y="95" fontSize="20" fill="white" fontWeight="bold">K</text>
        <rect x="65" y="70" width="35" height="35" rx="6" fill="white" opacity="0.2" />
        <text x="73" y="95" fontSize="20" fill="white" fontWeight="bold">E</text>
        <rect x="105" y="70" width="35" height="35" rx="6" fill="white" opacity="0.2" />
        <text x="113" y="95" fontSize="20" fill="white" fontWeight="bold">D</text>
        <rect x="145" y="70" width="35" height="35" rx="6" fill="white" opacity="0.2" />
        <text x="153" y="95" fontSize="20" fill="white" fontWeight="bold">İ</text>
        <circle cx="170" cy="35" r="12" fill="white" opacity="0.1" />
        <text x="40" y="135" fontSize="14" fill="white" opacity="0.4">kelime bul...</text>
      </svg>
    ),
    memory: (
      <svg viewBox="0 0 200 160" className={cn("w-full h-full", className)}>
        <defs>
          <linearGradient id="memoryBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="12" fill="url(#memoryBg)" />
        <rect x="25" y="25" width="45" height="50" rx="8" fill="white" opacity="0.25" />
        <text x="38" y="58" fontSize="24">⭐</text>
        <rect x="78" y="25" width="45" height="50" rx="8" fill="white" opacity="0.15" />
        <text x="93" y="57" fontSize="20" fill="white">?</text>
        <rect x="131" y="25" width="45" height="50" rx="8" fill="white" opacity="0.25" />
        <text x="144" y="58" fontSize="24">⭐</text>
        <rect x="25" y="85" width="45" height="50" rx="8" fill="white" opacity="0.15" />
        <text x="40" y="117" fontSize="20" fill="white">?</text>
        <rect x="78" y="85" width="45" height="50" rx="8" fill="white" opacity="0.25" />
        <text x="91" y="118" fontSize="24">🎯</text>
        <rect x="131" y="85" width="45" height="50" rx="8" fill="white" opacity="0.15" />
        <text x="146" y="117" fontSize="20" fill="white">?</text>
      </svg>
    ),
    puzzle: (
      <svg viewBox="0 0 200 160" className={cn("w-full h-full", className)}>
        <defs>
          <linearGradient id="puzzleBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <rect width="200" height="160" rx="12" fill="url(#puzzleBg)" />
        <rect x="30" y="30" width="55" height="45" rx="6" fill="white" opacity="0.3" transform="rotate(5 57 52)" />
        <rect x="95" y="25" width="55" height="45" rx="6" fill="white" opacity="0.2" transform="rotate(-3 122 47)" />
        <rect x="50" y="80" width="55" height="45" rx="6" fill="white" opacity="0.2" transform="rotate(2 77 102)" />
        <rect x="115" y="85" width="55" height="45" rx="6" fill="white" opacity="0.3" transform="rotate(-5 142 107)" />
        <circle cx="70" cy="55" r="8" fill="white" opacity="0.4" />
        <path d="M 130 50 L 140 40 L 150 50 L 140 60 Z" fill="white" opacity="0.4" />
        <polygon points="80,105 90,95 100,105" fill="white" opacity="0.4" />
      </svg>
    ),
  };

  return illustrations[type];
}
