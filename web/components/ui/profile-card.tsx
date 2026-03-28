"use client";

import { Gamepad2, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HexAvatar } from "@/components/ui/hex-avatar";
import { BadgeIcon, type GameBadge } from "@/components/ui/badge-icon";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  username: string;
  initials: string;
  avatarImage?: string;
  level?: number;
  totalGames: number;
  bestScore: number;
  totalTime: string;
  badges: GameBadge[];
  online?: boolean;
  className?: string;
}

export function ProfileCard({
  username,
  initials,
  avatarImage,
  level = 1,
  totalGames,
  bestScore,
  totalTime,
  badges,
  online,
  className,
}: ProfileCardProps) {
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* Banner */}
      <div className="relative h-28 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
        {/* Geometric light effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute right-1/4 top-0 h-24 w-[1px] rotate-[30deg] bg-gradient-to-b from-white/20 to-transparent" />
          <div className="absolute left-1/3 top-0 h-32 w-[1px] rotate-[-20deg] bg-gradient-to-b from-white/15 to-transparent" />
        </div>
        {/* Level badge */}
        <div className="absolute right-4 top-4 rounded-lg bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          Seviye {level}
        </div>
      </div>

      <CardContent className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-10 mb-4">
          <HexAvatar
            initials={initials}
            image={avatarImage}
            size="lg"
            online={online}
            borderColor="border-background"
          />
        </div>

        {/* Username */}
        <h3 className="text-xl font-bold">{username}</h3>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {earnedBadges.slice(0, 5).map((badge) => (
              <BadgeIcon key={badge.id} badge={badge} size="sm" />
            ))}
            {earnedBadges.length > 5 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-xs font-medium text-muted-foreground">
                +{earnedBadges.length - 5}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
          <div className="text-center">
            <Gamepad2 className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
            <p className="text-lg font-extrabold">{totalGames}</p>
            <p className="text-[11px] text-muted-foreground">Oyun</p>
          </div>
          <div className="text-center">
            <Trophy className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
            <p className="text-lg font-extrabold">{bestScore.toLocaleString("tr-TR")}</p>
            <p className="text-[11px] text-muted-foreground">En İyi Skor</p>
          </div>
          <div className="text-center">
            <Clock className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
            <p className="text-lg font-extrabold">{totalTime}</p>
            <p className="text-[11px] text-muted-foreground">Süre</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
