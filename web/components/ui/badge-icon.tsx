"use client";

import {
  Trophy,
  Star,
  Flame,
  Crown,
  Shield,
  Zap,
  Target,
  Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GameBadge {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  earned: boolean;
}

export const ALL_BADGES: GameBadge[] = [
  { id: "first-game", name: "İlk Oyun", icon: Star, color: "text-amber-400", bgColor: "bg-amber-400/15", earned: true },
  { id: "10-games", name: "10 Oyun", icon: Flame, color: "text-orange-500", bgColor: "bg-orange-500/15", earned: true },
  { id: "50-games", name: "50 Oyun", icon: Zap, color: "text-blue-500", bgColor: "bg-blue-500/15", earned: true },
  { id: "high-score", name: "Yüksek Skor", icon: Trophy, color: "text-yellow-500", bgColor: "bg-yellow-500/15", earned: true },
  { id: "champion", name: "Şampiyon", icon: Crown, color: "text-purple-500", bgColor: "bg-purple-500/15", earned: false },
  { id: "perfect", name: "Mükemmel", icon: Target, color: "text-emerald-500", bgColor: "bg-emerald-500/15", earned: false },
  { id: "defender", name: "Savunucu", icon: Shield, color: "text-sky-500", bgColor: "bg-sky-500/15", earned: false },
  { id: "master", name: "Usta", icon: Award, color: "text-rose-500", bgColor: "bg-rose-500/15", earned: false },
];

interface BadgeIconProps {
  badge: GameBadge;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const badgeSizeMap = {
  sm: { container: "w-8 h-8", icon: "h-4 w-4" },
  md: { container: "w-10 h-10", icon: "h-5 w-5" },
  lg: { container: "w-12 h-12", icon: "h-6 w-6" },
};

export function BadgeIcon({ badge, size = "md", showLabel = false }: BadgeIconProps) {
  const s = badgeSizeMap[size];
  const Icon = badge.icon;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          s.container,
          "flex items-center justify-center rounded-xl",
          badge.earned ? badge.bgColor : "bg-muted",
          "transition-all duration-200",
          !badge.earned && "opacity-40 grayscale"
        )}
        title={badge.name}
      >
        <Icon className={cn(s.icon, badge.earned ? badge.color : "text-muted-foreground")} />
      </div>
      {showLabel && (
        <span className={cn(
          "text-[10px] font-medium",
          badge.earned ? "text-foreground" : "text-muted-foreground"
        )}>
          {badge.name}
        </span>
      )}
    </div>
  );
}
